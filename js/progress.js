/* 讀 data/projects-progress.json 畫出專案進度一覽。不需建置。 */
(function () {
  var DATA_URL = "data/projects-progress.json";
  var LABELS = { green: "正常推進", yellow: "等我決定", gray: "暫停或規劃中" };
  var ORDER = { yellow: 0, green: 1, gray: 2 };

  var gridEl = document.getElementById("pp-grid");
  var statusEl = document.getElementById("pp-status");
  var updatedEl = document.getElementById("pp-updated");
  var summaryEl = document.getElementById("pp-summary");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function safeUrl(value) {
    if (typeof value !== "string") return "";
    var trimmed = value.trim();
    return /^https:\/\//i.test(trimmed) ? trimmed : "";
  }

  function link(text, url) {
    var href = safeUrl(url);
    if (!href) return el("span", null, text);
    var a = el("a", null, text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  function status(project) {
    return LABELS.hasOwnProperty(project.status) ? project.status : "gray";
  }

  function line(label, content, title) {
    var p = el("p", "pp-line");
    p.appendChild(el("b", null, label));
    p.appendChild(typeof content === "string" ? document.createTextNode(content) : content);
    if (title) p.title = title;
    return p;
  }

  function renderCard(project) {
    var s = status(project);
    var card = el("article", "pp-card");
    card.setAttribute("data-status", s);

    var nameRow = el("div", "pp-name-row");
    var dot = el("i", "pp-dot pp-dot--" + s);
    dot.setAttribute("role", "img");
    dot.setAttribute("aria-label", labels[s]);
    dot.title = labels[s];
    nameRow.appendChild(dot);
    nameRow.appendChild(el("h2", "pp-name", project.name || project.id || "未命名專案"));
    card.appendChild(nameRow);
    if (project.decision) {
      var flag = el("p", "pp-flag", "⚑ 待你決定：" + project.decision);
      flag.title = "等你決定：" + project.decision;
      card.appendChild(flag);
    }

    var latest = project.latest || {};
    var latestText = latest.text || "尚未填寫";
    card.appendChild(line("最新", link(latestText, latest.url), latestText));
    card.appendChild(line("下一步", project.next || "尚未填寫", project.next || ""));

    var details = project.details || {};
    var history = Array.isArray(details.history) ? details.history : [];
    var links = Array.isArray(details.links) ? details.links : [];
    if (project.decision || history.length || links.length) {
      var box = el("details", "pp-details");
      box.appendChild(el("summary", null, "詳情"));
      var body = el("div", "pp-details-body");
      if (project.decision) {
        var need = el("p");
        need.appendChild(el("b", null, "等你決定："));
        need.appendChild(document.createTextNode(project.decision));
        body.appendChild(need);
      }
      if (history.length) {
        var ul = el("ul");
        history.forEach(function (item) { ul.appendChild(el("li", null, item)); });
        body.appendChild(ul);
      }
      if (links.length) {
        var linkRow = el("div", "pp-links");
        links.forEach(function (item) {
          if (item && safeUrl(item.url)) linkRow.appendChild(link(item.label || item.url, item.url));
        });
        body.appendChild(linkRow);
      }
      box.appendChild(body);
      box.addEventListener("toggle", function () {
        card.classList.toggle("is-open", box.open);
      });
      card.appendChild(box);
    }
    return card;
  }

  var labels = LABELS;

  function render(data) {
    labels = Object.assign({}, LABELS, data.statusLabels || {});
    var projects = (Array.isArray(data.projects) ? data.projects : []).map(function (p, i) {
      return { p: p, i: i };
    });
    projects.sort(function (a, b) {
      return (ORDER[status(a.p)] - ORDER[status(b.p)]) || (a.i - b.i);
    });

    if (data.updatedOn) updatedEl.textContent = "資料更新：" + data.updatedOn;
    var tally = { green: 0, yellow: 0, gray: 0 };
    projects.forEach(function (x) { tally[status(x.p)] += 1; });
    summaryEl.textContent = projects.length + " 個專案：推進 " + tally.green + "・待決定 " + tally.yellow + "・暫停或規劃 " + tally.gray;

    gridEl.textContent = "";
    projects.forEach(function (x) { gridEl.appendChild(renderCard(x.p)); });
    statusEl.hidden = true;
  }

  fetch(DATA_URL, { cache: "no-cache" })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(render)
    .catch(function () {
      statusEl.className = "pp-status is-error";
      statusEl.textContent = "讀不到 data/projects-progress.json。本機預覽請在專案根目錄執行 python3 -m http.server，不要直接用檔案路徑開啟。";
    });
})();
