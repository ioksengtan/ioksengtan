#!/usr/bin/env python3
"""Rebuild data/growth.json from the public git history of ioksengtan's repositories.

No extra packages. Uses the GitHub API to list public repositories, then a
blob-less git clone to read history. Private repositories are not visible and
are not counted.

    python3 scripts/build-growth.py

Optional environment:
    GITHUB_TOKEN or GH_TOKEN   higher API rate limit (not required for public data)
    GROWTH_CACHE               clone cache directory (default: /tmp/ioksengtan-growth-mirrors)
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

OWNER = "ioksengtan"
TZ = ZoneInfo("Asia/Taipei")
RECENT_DAYS = 7
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "growth.json"
CACHE = Path(os.environ.get("GROWTH_CACHE", "/tmp/ioksengtan-growth-mirrors"))
SERIES = ("works", "content", "ideas")

PROJECT_NAMES = {
    "too_much_to_learn": "白話科技",
    "Listmap_v0d3": "Listmap",
    "celebrities": "Celebrities",
    "rechao": "來我家簡單吃（rechao）",
    "liuliu_walk": "溜溜繪本",
    "IlhaHometown": "IlhaHometown",
    "guess-lineup": "橘架猜排列",
    "normal_news": "正常新聞",
    "hikings": "登山路線比較",
    "jiaming_lake_2026": "嘉明湖 2026",
    "watch_sim": "手錶按鍵模擬器",
    "timer-relay": "計時停錶挑戰",
    "dice-block-puzzle": "多格拼圖填格",
    "idea": "靈感收集",
    "ioksengtan": "ioksengtan 個人站",
    "handwritten-letter": "手寫信",
}

PROJECT_ORDER = [
    "too_much_to_learn",
    "Listmap_v0d3",
    "celebrities",
    "rechao",
    "liuliu_walk",
    "IlhaHometown",
    "guess-lineup",
    "normal_news",
    "hikings",
    "jiaming_lake_2026",
    "watch_sim",
    "timer-relay",
    "idea",
    "ioksengtan",
    "handwritten-letter",
    "dice-block-puzzle",
]

TOPIC_PREFIXES = ("AI/", "Art/", "Business/", "Design/", "Education/", "Food/", "Maker/")
IDEA_LIST = "靈感收集點子清單.md"

DEFINITIONS = {
    "works": "作品：每個有 GitHub Pages 的公開倉庫算一件網站，日期是發布路徑上的 index.html（沒有的話改看 public/index.html 或 docs/index.html）第一次被加入的提交日；來我家簡單吃（rechao）不另計網站，改以 package.json 出現過的每個版本號各算一件；Celebrities 的 products 資料夾裡每個產品頁再各算一件。",
    "content": "內容：白話科技首頁目錄裡的每一篇文章、Listmap 的 stories 資料夾裡每一則故事頁、正常新聞每一期、登山路線比較每一條路線、Celebrities 的名人詞彙卡、金句卡、螢幕英語卡、語錄索引裡已核實的每一則，以及演講庫裡的每一場演講，各算一項，日期是該檔案或該編號第一次出現的提交日。",
    "ideas": "點子：靈感收集倉庫「靈感收集點子清單」的「已收集點子」裡每一條編號項目算一項，同檔後段的延伸筆記不另計；主題資料夾裡沒被這份清單提到的 Markdown 筆記再各算一項，日期是該句文字或該檔第一次出現的提交日。",
}

EXCLUDED = "沒算進來的部分：私人倉庫、分叉倉庫、GitHub 議題、語錄草稿、Celebrities 的遊戲詞表、溜溜繪本的跨頁圖片、嘉明湖遊記裡的照片、正常新聞每一期裡面轉載的各篇。有開 GitHub Pages 但發布分支沒有 index.html 的倉庫也不算作品。日期用提交的作者時間換成台北時間的日曆日；一週從週一到週日。最近 7 天含今天。"


def log(message: str) -> None:
    print(message, file=sys.stderr, flush=True)


def project_name(repo: str) -> str:
    return PROJECT_NAMES.get(repo, repo)


def auth_token() -> str:
    for key in ("GITHUB_TOKEN", "GH_TOKEN"):
        value = os.environ.get(key, "").strip()
        if value:
            return value
    try:
        out = subprocess.run(
            ["gh", "auth", "token"],
            capture_output=True,
            text=True,
            timeout=15,
            check=False,
        )
    except (OSError, subprocess.TimeoutExpired):
        return ""
    if out.returncode == 0:
        return out.stdout.strip()
    return ""


def api_json(path: str, token: str):
    url = path if path.startswith("https://") else f"https://api.github.com{path}"
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "ioksengtan-growth",
            "X-GitHub-Api-Version": "2022-11-28",
            **({"Authorization": f"Bearer {token}"} if token else {}),
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        if error.code == 404:
            return None
        detail = error.read().decode("utf-8", "replace")[:300]
        raise RuntimeError(f"GitHub API {error.code} for {url}: {detail}") from error


def list_public_repos(token: str) -> list[dict]:
    repos = []
    page = 1
    while True:
        batch = api_json(
            f"/users/{OWNER}/repos?per_page=100&page={page}&type=owner",
            token,
        )
        if not batch:
            break
        repos.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    public = []
    for repo in repos:
        if repo.get("private") or repo.get("fork"):
            continue
        if repo.get("owner", {}).get("login") != OWNER:
            continue
        public.append(repo)
    public.sort(key=lambda item: item["name"].lower())
    return public


def pages_source(name: str, token: str) -> dict | None:
    data = api_json(f"/repos/{OWNER}/{name}/pages", token)
    if not isinstance(data, dict):
        return None
    source = data.get("source") or {}
    return {
        "branch": source.get("branch") or "",
        "path": source.get("path") or "/",
        "buildType": data.get("build_type") or "",
    }


def index_path(source_path: str) -> str:
    cleaned = (source_path or "/").strip("/")
    if not cleaned:
        return "index.html"
    return f"{cleaned}/index.html"


def git(repo: Path, *args: str, timeout: int = 180) -> str:
    command = ["git", "-c", "core.quotepath=false", "-C", str(repo), *args]
    proc = subprocess.run(command, capture_output=True, timeout=timeout)
    if proc.returncode != 0:
        error = proc.stderr.decode("utf-8", "replace").strip()
        raise RuntimeError(f"git {' '.join(args[:5])} failed in {repo.name}: {error}")
    return proc.stdout.decode("utf-8", "replace")


def ref_exists(repo: Path, ref: str) -> bool:
    proc = subprocess.run(
        ["git", "-C", str(repo), "rev-parse", "--verify", "--quiet", ref],
        capture_output=True,
    )
    return proc.returncode == 0


def blob_exists(repo: Path, ref: str, path: str) -> bool:
    proc = subprocess.run(
        ["git", "-c", "core.quotepath=false", "-C", str(repo), "cat-file", "-e", f"{ref}:{path}"],
        capture_output=True,
    )
    return proc.returncode == 0


def ensure_clone(name: str) -> Path:
    dest = CACHE / name
    url = f"https://github.com/{OWNER}/{urllib.parse.quote(name)}.git"
    if dest.exists() and not (dest / "HEAD").exists():
        shutil.rmtree(dest)
    if not dest.exists():
        log(f"clone {name}")
        dest.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(
            [
                "git",
                "clone",
                "--filter=blob:none",
                "--no-checkout",
                "--single-branch",
                "--quiet",
                url,
                str(dest),
            ],
            check=True,
            timeout=600,
        )
    else:
        log(f"fetch {name}")
        subprocess.run(
            ["git", "-C", str(dest), "fetch", "--filter=blob:none", "--quiet", "--prune", "origin"],
            check=True,
            timeout=600,
        )
    return dest


def taipei_day(iso: str) -> date:
    text = iso.strip()
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    moment = datetime.fromisoformat(text)
    if moment.tzinfo is None:
        moment = moment.replace(tzinfo=timezone.utc)
    return moment.astimezone(TZ).date()


def week_start(day: date) -> date:
    return day - timedelta(days=day.weekday())


def first_commit_date(repo: Path, ref: str, path: str, diff_filter: str | None) -> str:
    """Oldest author date on this path.

    Do not combine --reverse with -n. Git applies -n before reversing, so
    --reverse -n 1 is the newest commit, not the oldest.
    """
    args = ["log", ref, "--full-history", "--reverse", "--pretty=format:%aI"]
    if diff_filter:
        args.extend(["--diff-filter", diff_filter])
    args.extend(["--", path])
    for line in git(repo, *args).splitlines():
        if line.strip():
            return line.strip()
    return ""


def first_added(repo: Path, ref: str, path: str) -> str:
    added = first_commit_date(repo, ref, path, "A")
    if added:
        return added
    touched = first_commit_date(repo, ref, path, None)
    if not touched:
        raise RuntimeError(f"{repo.name} has no commit for {path} on {ref}")
    return touched


def list_tree(repo: Path, ref: str) -> list[str]:
    return [line for line in git(repo, "ls-tree", "-r", "--name-only", ref).splitlines() if line]


def file_revisions(repo: Path, ref: str, path: str) -> list[tuple[str, str, str]]:
    """Oldest-first commits that touch path. Each item is (commit, author iso, path).

    --name-only is not used: with --full-history it can omit the filename on the
    commit that actually introduced a change, which would drop that commit.
    """
    raw = git(
        repo,
        "log",
        ref,
        "--full-history",
        "--reverse",
        "--pretty=tformat:%H%x09%aI",
        "--",
        path,
    )
    revisions = []
    for line in raw.splitlines():
        commit, separator, iso = line.strip().partition("\t")
        if separator and re.fullmatch(r"[0-9a-f]{40}", commit) and iso:
            revisions.append((commit, iso, path))
    return revisions


def show_file(repo: Path, commit: str, path: str) -> str:
    return git(repo, "show", f"{commit}:{path}")


def event(series: str, repo: str, kind: str, iso: str, item_id: str) -> dict:
    day = taipei_day(iso)
    return {
        "series": series,
        "repo": repo,
        "project": project_name(repo),
        "kind": kind,
        "date": day.isoformat(),
        "id": item_id,
    }


def parse_numbered_ideas(text: str) -> list[str]:
    lines = text.splitlines()
    start = None
    for index, line in enumerate(lines):
        if line.startswith("## ") and "已收集點子" in line:
            start = index + 1
            break
    if start is None:
        return []
    items = []
    for line in lines[start:]:
        if line.startswith("## "):
            break
        match = re.match(r"^(\d+)\.\s+(\S.*)$", line)
        if match:
            items.append(match.group(2).strip())
    return items


def normalize_idea(text: str) -> str:
    cleaned = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", text)
    cleaned = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", cleaned)
    return re.sub(r"\s+", " ", cleaned).strip()


def article_paths(html: str) -> list[str]:
    found = []
    seen = set()
    patterns = (
        r'<a\b[^>]*class="entry"[^>]*href="([^"]+)"',
        r'<a\b[^>]*href="([^"]+)"[^>]*class="entry"',
    )
    for pattern in patterns:
        for href in re.findall(pattern, html):
            path = urllib.parse.unquote(href).split("?", 1)[0].split("#", 1)[0]
            if "/" in path or not path.endswith(".html") or path in seen:
                continue
            seen.add(path)
            found.append(path)
    return found


def route_ids(text: str) -> list[str]:
    return re.findall(r'(?m)^[ \t]*id:\s*"([^"]+)"', text)


def cumulative_weeks(events: list[dict], as_of: date) -> list[dict]:
    usable = [item for item in events if date.fromisoformat(item["date"]) <= as_of]
    if not usable:
        return []
    start = week_start(min(date.fromisoformat(item["date"]) for item in usable))
    end = week_start(as_of)
    window_start = as_of - timedelta(days=RECENT_DAYS - 1)
    buckets: dict[date, Counter] = defaultdict(Counter)
    for item in usable:
        buckets[week_start(date.fromisoformat(item["date"]))][item["series"]] += 1
    running: Counter = Counter()
    weeks = []
    cursor = start
    while cursor <= end:
        running.update(buckets[cursor])
        week_end = cursor + timedelta(days=6)
        weeks.append(
            {
                "start": cursor.isoformat(),
                "works": running["works"],
                "content": running["content"],
                "ideas": running["ideas"],
                "recent": week_end >= window_start and cursor <= as_of,
            }
        )
        cursor += timedelta(days=7)
    return weeks


def series_counts(events: list[dict], as_of: date) -> tuple[dict, dict]:
    totals = {key: 0 for key in SERIES}
    recent = {key: 0 for key in SERIES}
    window_start = as_of - timedelta(days=RECENT_DAYS - 1)
    for item in events:
        day = date.fromisoformat(item["date"])
        if day > as_of:
            continue
        totals[item["series"]] += 1
        if window_start <= day <= as_of:
            recent[item["series"]] += 1
    return totals, recent


def dated_ids(repo: Path, ref: str, path: str, extractor) -> list[tuple[str, str]]:
    revisions = file_revisions(repo, ref, path)
    if not revisions:
        raise RuntimeError(f"{repo.name} has no history for {path}")
    first: dict[str, str] = {}
    final_text = None
    for commit, iso, historic_path in revisions:
        try:
            text = show_file(repo, commit, historic_path)
        except RuntimeError:
            continue
        final_text = text
        try:
            found = extractor(text, current_only=False)
        except (json.JSONDecodeError, ValueError, KeyError):
            continue
        for item_id in found:
            first.setdefault(item_id, iso)
    if final_text is None:
        final_text = show_file(repo, ref, path)
    current = extractor(final_text, current_only=True)
    missing = [item_id for item_id in current if item_id not in first]
    if missing:
        raise RuntimeError(f"{repo.name} {path} missing first-seen date for {missing[:5]}")
    return [(item_id, first[item_id]) for item_id in current]


def json_ids(text: str, current_only: bool, field: str, verified: bool = False) -> list[str]:
    data = json.loads(text)
    if isinstance(data, dict):
        data = data.get("speeches", [])
    found = []
    for item in data:
        if not isinstance(item, dict) or field not in item:
            continue
        if verified and current_only and item.get("status") != "verified":
            continue
        found.append(str(item[field]))
    return found


def analyze_repo(info: dict) -> dict:
    name = info["name"]
    notes = []
    events = []
    spot = {}
    commit = ""
    if not info["hasPages"]:
        notes.append("沒有 GitHub Pages，也不是這三條線的資料來源。")
        return {"name": name, "events": events, "notes": notes, "commit": commit, "spot": spot}

    repo = ensure_clone(name)
    source = info.get("pages") or {}
    pages_branch = source.get("branch") or info["defaultBranch"]
    if pages_branch and pages_branch != info["defaultBranch"]:
        log(f"fetch {name} {pages_branch}")
        subprocess.run(
            ["git", "-C", str(repo), "fetch", "--filter=blob:none", "--quiet", "origin", pages_branch],
            check=True,
            timeout=600,
        )
    ref = f"origin/{info['defaultBranch']}"
    if not ref_exists(repo, ref):
        raise RuntimeError(f"{name} is missing {ref}")
    commit = git(repo, "rev-parse", ref).strip()

    if name == "rechao":
        events.extend(rechao_versions(repo, ref))
        spot["rechaoVersions"] = [item["id"] for item in events if item["kind"] == "版本"]
    elif info["hasPages"]:
        source = info.get("pages") or {"branch": info["defaultBranch"], "path": "/"}
        branch = source.get("branch") or info["defaultBranch"]
        pages_ref = f"origin/{branch}"
        path = index_path(source.get("path") or "/")
        if not ref_exists(repo, pages_ref):
            notes.append(f"找不到發布分支 {branch}。")
        else:
            chosen = path if blob_exists(repo, pages_ref, path) else ""
            if not chosen and path == "index.html":
                for fallback in ("public/index.html", "docs/index.html"):
                    if blob_exists(repo, pages_ref, fallback):
                        chosen = fallback
                        break
            if chosen:
                events.append(event("works", name, "網站", first_added(repo, pages_ref, chosen), chosen))
            else:
                notes.append(f"有 GitHub Pages，但 {branch} 上沒有 {path}，所以不計入作品。")

    if name == "celebrities":
        for path in list_tree(repo, ref):
            if path.startswith("products/") and path.endswith(".html"):
                events.append(event("works", name, "產品頁", first_added(repo, ref, path), path))
        events.extend(card_events(repo, ref, "products/general-vocab/cards_data.json", "名人詞彙", spot, "vocabCards"))
        events.extend(card_events(repo, ref, "products/vocabulary-cards/cards_data.json", "金句", spot, "keynoteCards"))
        events.extend(card_events(repo, ref, "products/screen-english/cards_data.json", "螢幕英語", spot, "screenCards"))
        events.extend(
            record_events(
                repo,
                ref,
                "references/quotes_index.json",
                "語錄",
                lambda text, current_only: json_ids(text, current_only, "quote_id", verified=True),
                spot,
                "verifiedQuotes",
            )
        )
        events.extend(
            record_events(
                repo,
                ref,
                "references/speeches_database.json",
                "演講",
                lambda text, current_only: json_ids(text, current_only, "id"),
                spot,
                "speeches",
            )
        )

    if name == "too_much_to_learn":
        html = show_file(repo, ref, "index.html")
        paths = article_paths(html)
        spot["baihuaArticles"] = len(paths)
        if not paths:
            raise RuntimeError("白話科技首頁目錄沒有文章")
        for path in paths:
            events.append(event("content", name, "文章", first_added(repo, ref, path), path))

    if name == "Listmap_v0d3":
        stories = [
            path
            for path in list_tree(repo, ref)
            if re.fullmatch(r"stories/[^/]+\.html", path)
        ]
        stories.sort()
        spot["listmapStories"] = len(stories)
        spot["listmapStory100131"] = "stories/100131.html" in stories
        if not spot["listmapStory100131"]:
            raise RuntimeError("Listmap 沒有 stories/100131.html")
        for path in stories:
            events.append(event("content", name, "故事", first_added(repo, ref, path), path))

    if name == "normal_news":
        issues = [
            path
            for path in list_tree(repo, ref)
            if re.fullmatch(r"data/issues/\d{4}-\d{2}-\d{2}\.json", path)
        ]
        issues.sort()
        spot["newsIssues"] = len(issues)
        for path in issues:
            events.append(event("content", name, "每日報紙", first_added(repo, ref, path), path))

    if name == "hikings":
        pairs = dated_ids(repo, ref, "data/routes.js", lambda text, current_only: route_ids(text))
        spot["hikingRoutes"] = len(pairs)
        for item_id, iso in pairs:
            events.append(event("content", name, "登山路線", iso, item_id))

    if name == "idea":
        events.extend(idea_events(repo, ref, spot))

    return {"name": name, "events": events, "notes": notes, "commit": commit, "spot": spot}


def card_events(repo: Path, ref: str, path: str, kind: str, spot: dict, spot_key: str) -> list[dict]:
    return record_events(
        repo,
        ref,
        path,
        kind,
        lambda text, current_only: json_ids(text, current_only, "id"),
        spot,
        spot_key,
    )


def record_events(repo: Path, ref: str, path: str, kind: str, extractor, spot: dict, spot_key: str) -> list[dict]:
    pairs = dated_ids(repo, ref, path, extractor)
    spot[spot_key] = len(pairs)
    return [event("content", repo.name, kind, iso, item_id) for item_id, iso in pairs]


def rechao_versions(repo: Path, ref: str) -> list[dict]:
    revisions = file_revisions(repo, ref, "package.json")
    if not revisions:
        raise RuntimeError("來我家簡單吃（rechao）沒有 package.json 歷史")
    first: dict[str, str] = {}
    current_version = ""
    for commit, iso, historic_path in revisions:
        try:
            data = json.loads(show_file(repo, commit, historic_path))
        except (RuntimeError, json.JSONDecodeError):
            continue
        version = data.get("version")
        if isinstance(version, str) and version.strip():
            current_version = version.strip()
            first.setdefault(current_version, iso)
    if not current_version:
        raise RuntimeError("來我家簡單吃（rechao）的 package.json 沒有版本號")
    if current_version not in first:
        raise RuntimeError("來我家簡單吃（rechao）目前版本沒有對應的提交")
    return [event("works", "rechao", "版本", first[version], version) for version in first]


def idea_events(repo: Path, ref: str, spot: dict) -> list[dict]:
    revisions = file_revisions(repo, ref, IDEA_LIST)
    if not revisions:
        raise RuntimeError("找不到靈感收集點子清單的歷史")
    history = []
    final_items = None
    for commit, iso, historic_path in revisions:
        try:
            text = show_file(repo, commit, historic_path)
        except RuntimeError:
            continue
        items = [normalize_idea(item) for item in parse_numbered_ideas(text)]
        history.append((iso, items))
        final_items = items
    if not final_items:
        raise RuntimeError("靈感收集點子清單裡沒有編號點子")
    prefixes = [item[:20] for item in final_items if len(item) >= 20]
    if len(prefixes) != len(set(prefixes)):
        raise RuntimeError("點子清單有兩條前 20 個字相同，無法各自對到第一次出現的提交")
    dated = [None] * len(final_items)
    for iso, items in history:
        for historic in items:
            for index, current in enumerate(final_items):
                if dated[index] is not None:
                    continue
                if current == historic or (
                    len(current) >= 20 and len(historic) >= 20 and current[:20] == historic[:20]
                ):
                    dated[index] = iso
                    break
    missing = [final_items[index][:24] for index, iso in enumerate(dated) if iso is None]
    if missing:
        raise RuntimeError(f"這些點子對不到提交：{missing}")
    events = [
        event("ideas", "idea", "點子", iso, f"{index + 1:03d} {final_items[index][:40]}")
        for index, iso in enumerate(dated)
    ]
    spot["ideaListItems"] = len(events)

    list_text = show_file(repo, ref, IDEA_LIST)
    decoded = urllib.parse.unquote(list_text)
    compact_list = re.sub(r"\s+", "", decoded)
    note_count = 0
    for path in list_tree(repo, ref):
        if not path.endswith(".md") or not path.startswith(TOPIC_PREFIXES):
            continue
        filename = path.rsplit("/", 1)[-1]
        stem = re.sub(r"\s+", "", filename[:-3])
        if path in decoded or filename in decoded or (stem and stem in compact_list):
            continue
        events.append(event("ideas", "idea", "點子筆記", first_added(repo, ref, path), path))
        note_count += 1
    spot["ideaNotes"] = note_count
    return events


def repo_catalog(info: dict, result: dict | None) -> dict:
    entry = {
        "name": info["name"],
        "url": f"https://github.com/{OWNER}/{info['name']}",
        "hasPages": info["hasPages"],
        "defaultBranch": info["defaultBranch"],
        "eventCount": 0,
        "commit": "",
        "note": "",
    }
    if result:
        entry["eventCount"] = len(result["events"])
        entry["commit"] = result["commit"]
        entry["note"] = " ".join(result["notes"])
    return entry


def build_payload(repo_infos: list[dict], results: dict[str, dict], as_of: date) -> dict:
    events = []
    spots = {}
    for info in repo_infos:
        result = results.get(info["name"])
        if not result:
            continue
        events.extend(result["events"])
        spots.update(result["spot"])
    events.sort(key=lambda item: (item["date"], item["series"], item["repo"], item["kind"], item["id"]))
    totals, recent = series_counts(events, as_of)
    by_repo = defaultdict(list)
    for item in events:
        by_repo[item["repo"]].append(item)

    def sort_key(name: str):
        if name in PROJECT_ORDER:
            return (0, PROJECT_ORDER.index(name))
        return (1, project_name(name))

    projects = []
    for name in sorted(by_repo, key=sort_key):
        items = by_repo[name]
        project_totals, project_recent = series_counts(items, as_of)
        projects.append(
            {
                "repo": name,
                "name": project_name(name),
                "url": f"https://github.com/{OWNER}/{name}",
                "totals": project_totals,
                "recent": project_recent,
                "weeks": cumulative_weeks(items, as_of),
            }
        )

    missing_index = [
        entry["name"]
        for entry in (repo_catalog(info, results.get(info["name"])) for info in repo_infos)
        if "不計入作品" in (entry.get("note") or "")
    ]
    excluded = EXCLUDED
    if missing_index:
        excluded += "目前因此略過作品的倉庫：" + "、".join(missing_index) + "。"

    payload = {
        "generatedAt": datetime.now(TZ).isoformat(timespec="seconds"),
        "asOf": as_of.isoformat(),
        "timezone": "Asia/Taipei",
        "recentDays": RECENT_DAYS,
        "owner": OWNER,
        "definitions": DEFINITIONS,
        "excluded": excluded,
        "summary": {"totals": totals, "recent": recent},
        "weeks": cumulative_weeks(events, as_of),
        "projects": projects,
        "repos": [repo_catalog(info, results.get(info["name"])) for info in repo_infos],
        "spotChecks": spots,
        "events": events,
    }
    return payload


def prepare(info: dict, token: str) -> dict:
    prepared = {
        "name": info["name"],
        "hasPages": bool(info.get("has_pages")),
        "defaultBranch": info.get("default_branch") or "main",
        "pages": None,
    }
    if prepared["hasPages"]:
        prepared["pages"] = pages_source(prepared["name"], token)
        log(f"pages {prepared['name']} {prepared['pages']}")
    return prepared


def main() -> None:
    token = auth_token()
    log("listing public repositories")
    listed = list_public_repos(token)
    if not listed:
        raise RuntimeError("沒有列出任何公開倉庫")
    with ThreadPoolExecutor(max_workers=6) as pool:
        infos = list(pool.map(lambda item: prepare(item, token), listed))
    infos.sort(key=lambda item: item["name"].lower())
    to_read = [info for info in infos if info["hasPages"]]
    results = {}
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(analyze_repo, info): info["name"] for info in to_read}
        for future in as_completed(futures):
            name = futures[future]
            results[name] = future.result()
            log(f"counted {name}: {len(results[name]['events'])} events")
    for info in infos:
        results.setdefault(info["name"], {"name": info["name"], "events": [], "notes": ["沒有 GitHub Pages，也不是這三條線的資料來源。"], "commit": "", "spot": {}})
        if not info["hasPages"]:
            results[info["name"]]["notes"] = ["沒有 GitHub Pages，也不是這三條線的資料來源。"]

    as_of = datetime.now(TZ).date()
    payload = build_payload(infos, results, as_of)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    totals = payload["summary"]["totals"]
    recent = payload["summary"]["recent"]
    log(f"wrote {OUTPUT}")
    print(f"asOf {payload['asOf']}")
    print(f"works {totals['works']} recent {recent['works']}")
    print(f"content {totals['content']} recent {recent['content']}")
    print(f"ideas {totals['ideas']} recent {recent['ideas']}")
    print("spotChecks " + json.dumps(payload["spotChecks"], ensure_ascii=False, sort_keys=True))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        log(f"error: {error}")
        raise
