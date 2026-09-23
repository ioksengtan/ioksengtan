/* Renders commute.html from data/commute.json. No build step.
   How to edit the list: data/README.md */
(function () {
  var DATA_URL = "data/commute.json";
  var FALLBACK_LABELS = {
    ready: "可自用",
    rough: "勉強可用",
    "not-ready": "還沒準備好"
  };
  var OPEN_LABEL = { read: "開始讀", play: "開始玩" };

  var root = document.getElementById("cm-root");
  var statusEl = document.getElementById("cm-status");
  var metaEl = document.getElementById("cm-meta");
  var legendEl = document.getElementById("cm-legend");
  var jumpsEl = document.getElementById("cm-jumps");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function httpsUrl(value) {
    if (typeof value !== "string") return "";
    var trimmed = value.trim();
    if (!/^https:\/\//i.test(trimmed)) return "";
    return trimmed;
  }

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.hidden = !message;
    statusEl.textContent = message || "";
    if (isError) statusEl.setAttribute("data-error", "true");
    else statusEl.removeAttribute("data-error");
  }

  function badgeClass(status) {
    if (status === "ready" || status === "rough" || status === "not-ready") {
      return "cm-badge cm-badge-" + status;
    }
    return "cm-badge";
  }

  function badgeText(status, labels) {
    return labels[status] || "狀態不明";
  }

  function renderLegend(labels) {
    if (!legendEl) return;
    legendEl.textContent = "";
    ["ready", "rough", "not-ready"].forEach(function (key) {
      var item = el("li");
      item.appendChild(el("span", badgeClass(key), badgeText(key, labels)));
      legendEl.appendChild(item);
    });
  }

  function renderJumps(sections, items) {
    if (!jumpsEl) return;
    jumpsEl.textContent = "";
    sections.forEach(function (section) {
      var count = items.filter(function (item) {
        return item.section === section.id;
      }).length;
      var link = el("a", "", section.label + " " + count);
      link.href = "#cm-" + section.id;
      jumpsEl.appendChild(link);
    });
  }

  function renderCard(item, sectionId, labels) {
    var card = el("article", "cm-card");
    card.appendChild(el("p", badgeClass(item.status), badgeText(item.status, labels)));
    card.appendChild(el("h3", "", item.title || "未命名"));
    if (item.why) card.appendChild(el("p", "cm-why", item.why));
    if (item.note) card.appendChild(el("p", "cm-note", item.note));

    var actions = el("div", "cm-actions");
    var url = httpsUrl(item.url);
    var repo = httpsUrl(item.repo);
    if (url) {
      var open = el("a", "cm-open", OPEN_LABEL[sectionId] || "打開");
      open.href = url;
      actions.appendChild(open);
    } else {
      actions.appendChild(el("p", "cm-disabled", "還沒有可開的網頁"));
    }
    if (repo) {
      var repoLink = el("a", "cm-repo", "GitHub");
      repoLink.href = repo;
      actions.appendChild(repoLink);
    }
    card.appendChild(actions);
    return card;
  }

  function render(data) {
    var labels = data.statusLabels || FALLBACK_LABELS;
    var sections = Array.isArray(data.sections) ? data.sections : [];
    var items = Array.isArray(data.items) ? data.items : [];

    if (metaEl) {
      var bits = [];
      if (data.checkedOn) bits.push("連結查核日 " + data.checkedOn + "。可自用只代表那天那個網址有打開，不是推薦分數。");
      if (data.editNote) bits.push(data.editNote);
      metaEl.textContent = bits.join(" ");
    }

    renderLegend(labels);
    renderJumps(sections, items);

    root.textContent = "";
    sections.forEach(function (section) {
      var block = el("section", "cm-section");
      block.id = "cm-" + section.id;
      block.setAttribute("aria-labelledby", "cm-heading-" + section.id);
      var heading = el("h2", "", section.label || section.id);
      heading.id = "cm-heading-" + section.id;
      block.appendChild(heading);
      if (section.description) block.appendChild(el("p", "", section.description));

      var list = el("div", "cm-list");
      var matched = items.filter(function (item) {
        return item && item.section === section.id;
      });
      if (!matched.length) {
        list.appendChild(el("p", "cm-empty", "這區還沒有項目。"));
      } else {
        matched.forEach(function (item) {
          list.appendChild(renderCard(item, section.id, labels));
        });
      }
      block.appendChild(list);
      root.appendChild(block);
    });
  }

  function fail(message) {
    setStatus(message, true);
  }

  if (!window.fetch) {
    fail("這支瀏覽器讀不了清單檔。");
    return;
  }

  fetch(DATA_URL)
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (data) {
      render(data);
      setStatus("", false);
    })
    .catch(function () {
      fail("讀不到 data/commute.json。請用 GitHub Pages 或本機靜態伺服器開啟；直接點檔案時，瀏覽器通常會擋住這個讀取。");
    });
})();
