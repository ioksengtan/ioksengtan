/* Renders progress.html from data/projects-progress.json. No build step. */
(function () {
  var DATA_URL = "data/projects-progress.json";
  var FALLBACK_PHASES = {
    planning: "規劃中",
    building: "製作中",
    shipping: "上線推進",
    paused: "暫停"
  };

  var overviewEl = document.getElementById("pp-overview");
  var listEl = document.getElementById("pp-list");
  var disclaimerEl = document.getElementById("pp-disclaimer");
  var noteEl = document.getElementById("pp-note");
  var statusEl = document.getElementById("pp-status");

  var activeFilter = "all";
  var projects = [];
  var phaseLabels = FALLBACK_PHASES;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function safeUrl(value) {
    if (typeof value !== "string") return "";
    var trimmed = value.trim();
    if (!/^https:\/\//i.test(trimmed)) return "";
    return trimmed;
  }

  function repoId(url) {
    var match = String(url || "").match(/github\.com\/([^/]+\/[^/#?]+)/i);
    return match ? match[1].replace(/\.git$/, "") : "";
  }

  function clampProgress(value) {
    var number = Number(value);
    if (!isFinite(number)) return 0;
    if (number < 0) return 0;
    if (number > 100) return 100;
    return Math.round(number);
  }

  function phaseClass(phase) {
    if (FALLBACK_PHASES[phase] || phaseLabels[phase]) return phase;
    return "planning";
  }

  function setStatus(message, isError) {
    statusEl.hidden = !message;
    statusEl.textContent = message || "";
    statusEl.className = isError ? "pp-error" : "pp-loading";
  }

  function counts() {
    var tally = { all: projects.length };
    Object.keys(phaseLabels).forEach(function (phase) {
      tally[phase] = 0;
    });
    projects.forEach(function (project) {
      var phase = project.phase;
      if (!tally.hasOwnProperty(phase)) tally[phase] = 0;
      tally[phase] += 1;
    });
    return tally;
  }

  function renderOverview() {
    var tally = counts();
    var items = [{ key: "all", label: "全部" }];
    Object.keys(phaseLabels).forEach(function (phase) {
      items.push({ key: phase, label: phaseLabels[phase] });
    });

    overviewEl.textContent = "";
    items.forEach(function (item) {
      var button = el("button", "pp-stat" + (item.key === activeFilter ? " is-active" : ""));
      button.type = "button";
      button.setAttribute("aria-pressed", item.key === activeFilter ? "true" : "false");
      button.appendChild(el("span", "pp-stat-count", String(tally[item.key] || 0)));
      button.appendChild(el("span", "pp-stat-label", item.label));
      button.addEventListener("click", function () {
        activeFilter = item.key;
        renderOverview();
        renderList();
      });
      overviewEl.appendChild(button);
    });
  }

  function seedLabel(kind) {
    if (kind === "manual") return "手動填寫";
    return "種子估計";
  }

  function renderCard(project) {
    var phase = typeof project.phase === "string" ? project.phase : "planning";
    var card = el("article", "pp-card");
    card.setAttribute("data-phase", phaseClass(phase));

    var top = el("div", "pp-card-top");
    var titleWrap = el("div");
    titleWrap.appendChild(el("h3", "pp-name", project.name || project.id || "未命名專案"));
    var idText = repoId(project.repo);
    if (idText) titleWrap.appendChild(el("p", "pp-repo-id", idText));
    top.appendChild(titleWrap);

    var badges = el("div", "pp-badges");
    var phaseBadge = el("span", "pp-badge pp-badge--" + phaseClass(phase), phaseLabels[phase] || phase);
    badges.appendChild(phaseBadge);
    badges.appendChild(el("span", "pp-seed", seedLabel(project.progressKind)));
    top.appendChild(badges);
    card.appendChild(top);

    card.appendChild(el("p", "pp-blurb", project.blurb || ""));

    var progress = clampProgress(project.progress);
    var row = el("div", "pp-progress-row");
    var bar = el("div", "pp-bar");
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", "100");
    bar.setAttribute("aria-valuenow", String(progress));
    bar.setAttribute("aria-label", (project.name || "專案") + " 進度");
    var fill = el("span", "pp-bar-fill");
    fill.style.width = progress + "%";
    bar.appendChild(fill);
    row.appendChild(bar);
    row.appendChild(el("span", "pp-percent", progress + "%"));
    card.appendChild(row);

    if (project.progressBasis) {
      var basis = el("p", "pp-basis");
      basis.appendChild(el("strong", null, "估計依據："));
      basis.appendChild(document.createTextNode(project.progressBasis));
      card.appendChild(basis);
    }

    var milestone = el("p", "pp-milestone");
    milestone.appendChild(el("strong", null, "下一步："));
    milestone.appendChild(document.createTextNode(project.nextMilestone || "尚未填寫"));
    card.appendChild(milestone);

    var updated = el("p", "pp-updated");
    updated.appendChild(el("strong", null, "最近更新："));
    updated.appendChild(document.createTextNode(project.lastUpdated || "尚未填寫"));
    card.appendChild(updated);

    var links = el("div", "pp-links");
    var repo = safeUrl(project.repo);
    var live = safeUrl(project.live);
    if (repo) {
      var repoLink = el("a", null, "GitHub");
      repoLink.href = repo;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      links.appendChild(repoLink);
    } else {
      links.appendChild(el("span", "pp-seed", "Repo 待補"));
    }
    if (live) {
      var liveLink = el("a", null, "網站");
      liveLink.href = live;
      liveLink.target = "_blank";
      liveLink.rel = "noopener noreferrer";
      links.appendChild(liveLink);
    }
    card.appendChild(links);
    return card;
  }

  function renderList() {
    listEl.textContent = "";
    var visible = projects.filter(function (project) {
      return activeFilter === "all" || project.phase === activeFilter;
    });
    if (!visible.length) {
      listEl.appendChild(el("p", "pp-empty", "這個狀態目前沒有專案。"));
      return;
    }
    visible.forEach(function (project) {
      listEl.appendChild(renderCard(project));
    });
  }

  function render(data) {
    phaseLabels = Object.assign({}, FALLBACK_PHASES, data.phaseLabels || {});
    projects = Array.isArray(data.projects) ? data.projects : [];
    disclaimerEl.textContent = data.seedDisclaimer || "";
    noteEl.textContent = data.generatedFromPublicReposOn
      ? "種子資料整理日 " + data.generatedFromPublicReposOn + "。更新方式寫在 data/README.md。"
      : "更新方式寫在 data/README.md。";
    setStatus("", false);
    renderOverview();
    renderList();
  }

  setStatus("正在讀取專案資料…", false);
  fetch(DATA_URL, { cache: "no-cache" })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(render)
    .catch(function () {
      overviewEl.textContent = "";
      listEl.textContent = "";
      setStatus(
        "讀不到 data/projects-progress.json。請用靜態伺服器開這個網站（例如在專案根目錄執行 python3 -m http.server），不要直接用檔案路徑開啟。",
        true
      );
    });
})();
