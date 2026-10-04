/* 讀 data/growth.json 畫成長曲線。數字都在資料檔裡，這支程式只負責排版。 */
(function () {
  var DATA_URL = "data/growth.json";
  var SVG_NS = "http://www.w3.org/2000/svg";
  var SERIES = [
    { key: "works", label: "作品", color: "#c2410c" },
    { key: "content", label: "內容", color: "#1f9d55" },
    { key: "ideas", label: "點子", color: "#0b63c5" }
  ];

  var statusEl = document.getElementById("gc-status");
  var asofEl = document.getElementById("gc-asof");
  var statsEl = document.getElementById("gc-stats");
  var chartEl = document.getElementById("gc-chart");
  var recentEl = document.getElementById("gc-recent");
  var scaleEl = document.getElementById("gc-scale");
  var defsEl = document.getElementById("gc-defs");
  var projectsEl = document.getElementById("gc-projects");
  var reposEl = document.getElementById("gc-repos");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function svgEl(tag) {
    return document.createElementNS(SVG_NS, tag);
  }

  function fail(message) {
    statusEl.textContent = message;
    statusEl.classList.add("is-error");
  }

  function drawChart(svg, weeks, compact) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var width = 360;
    var padL = compact ? 2 : 28;
    var padR = compact ? 2 : 8;
    var panelH = compact ? 22 : 48;
    var axisH = compact ? 0 : 16;
    var height = SERIES.length * panelH + axisH + 2;
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    if (!weeks || !weeks.length) return;

    var plotW = width - padL - padR;
    var count = weeks.length;

    function xAt(index) {
      if (count === 1) return padL + plotW / 2;
      return padL + (index / (count - 1)) * plotW;
    }

    SERIES.forEach(function (series, row) {
      var max = 0;
      weeks.forEach(function (week) {
        if (week[series.key] > max) max = week[series.key];
      });
      var top = row * panelH;
      var base = top + panelH - (compact ? 3 : 6);
      var innerH = panelH - (compact ? 6 : 16);

      weeks.forEach(function (week, index) {
        if (!week.recent) return;
        var left = index === 0 ? padL : (xAt(index - 1) + xAt(index)) / 2;
        var right = index === count - 1 ? width - padR : (xAt(index) + xAt(index + 1)) / 2;
        var band = svgEl("rect");
        band.setAttribute("x", left.toFixed(1));
        band.setAttribute("y", top + 1);
        band.setAttribute("width", Math.max(0, right - left).toFixed(1));
        band.setAttribute("height", panelH - 2);
        band.setAttribute("fill", "rgba(194, 65, 12, 0.08)");
        svg.appendChild(band);
      });

      var path = svgEl("path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", series.color);
      path.setAttribute("stroke-width", compact ? "1.6" : "2");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("stroke-linecap", "round");
      var coords = weeks.map(function (week, index) {
        var value = week[series.key] || 0;
        var y = max === 0 ? base : base - (value / max) * innerH;
        return { x: xAt(index), y: y };
      });
      path.setAttribute("d", coords.map(function (point, index) {
        return (index === 0 ? "M" : "L") + point.x.toFixed(1) + " " + point.y.toFixed(1);
      }).join(" "));
      svg.appendChild(path);
      var last = coords[coords.length - 1];
      var dot = svgEl("circle");
      dot.setAttribute("cx", last.x.toFixed(1));
      dot.setAttribute("cy", last.y.toFixed(1));
      dot.setAttribute("r", compact ? "2" : "3");
      dot.setAttribute("fill", series.color);
      svg.appendChild(dot);

      if (!compact) {
        var name = svgEl("text");
        name.setAttribute("x", "0");
        name.setAttribute("y", top + 10);
        name.setAttribute("fill", series.color);
        name.setAttribute("font-size", "10");
        name.textContent = series.label;
        svg.appendChild(name);
      }
    });

    if (!compact) {
      var seen = {};
      weeks.forEach(function (week, index) {
        var year = String(week.start).slice(0, 4);
        if (seen[year]) return;
        seen[year] = true;
        var label = svgEl("text");
        label.setAttribute("x", xAt(index).toFixed(1));
        label.setAttribute("y", height - 2);
        label.setAttribute("fill", "#6b645b");
        label.setAttribute("font-size", "10");
        label.textContent = year;
        svg.appendChild(label);
      });
    }
  }

  function render(data) {
    var summary = data.summary || {};
    var totals = summary.totals || {};
    var recent = summary.recent || {};
    statusEl.hidden = true;
    asofEl.textContent = "資料日期：" + data.asOf + "（台北時間）";

    SERIES.forEach(function (series) {
      var card = el("article", "gc-stat");
      card.dataset.series = series.key;
      card.appendChild(el("span", null, series.label));
      card.appendChild(el("b", null, String(totals[series.key] || 0)));
      card.appendChild(el("small", null, "最近 7 天 +" + String(recent[series.key] || 0)));
      statsEl.appendChild(card);
    });

    var weeks = data.weeks || [];
    drawChart(chartEl, weeks, false);
    drawChart(recentEl, weeks.slice(-12), false);
    var described = SERIES.map(function (series) {
      return series.label + "累積 " + String(totals[series.key] || 0) + "，最近 7 天 +" + String(recent[series.key] || 0);
    }).join("。");
    chartEl.setAttribute("role", "img");
    chartEl.setAttribute("aria-label", "從最早一週到今天的三條累積曲線。" + described);
    recentEl.setAttribute("role", "img");
    recentEl.setAttribute("aria-label", "最近 12 週的三條累積曲線。" + described);
    scaleEl.textContent = "上面從最早一週畫到今天。下面把最近 12 週拉寬。三條線各自用自己的數量當高度。淡色直條是最近 7 天。";

    var definitions = data.definitions || {};
    SERIES.forEach(function (series) {
      if (definitions[series.key]) defsEl.appendChild(el("p", null, definitions[series.key]));
    });

    (data.projects || []).forEach(function (project) {
      var block = el("section", "gc-project");
      var title = el("h3", null, project.name);
      block.appendChild(title);
      var counts = SERIES.map(function (series) {
        return series.label + " " + String((project.totals || {})[series.key] || 0);
      }).join(" · ");
      var recentSum = SERIES.reduce(function (sum, series) {
        return sum + Number((project.recent || {})[series.key] || 0);
      }, 0);
      block.appendChild(el("p", null, counts + " · 最近 7 天 +" + recentSum));
      var spark = svgEl("svg");
      spark.setAttribute("aria-hidden", "true");
      drawChart(spark, project.weeks || [], true);
      block.appendChild(spark);
      projectsEl.appendChild(block);
    });

    var excluded = el("p", "gc-note", data.excluded || "");
    reposEl.appendChild(excluded);
    var counted = el("h3", null, "有計入的倉庫");
    var quiet = el("h3", null, "有看過、但沒有計入任何一筆的倉庫");
    counted.style.fontSize = "13px";
    quiet.style.fontSize = "13px";
    var countedList = el("ul", "gc-repos");
    var quietList = el("ul", "gc-repos");
    (data.repos || []).forEach(function (repo) {
      var item = el("li");
      var link = el("a", null, repo.name);
      if (typeof repo.url === "string" && repo.url.indexOf("https://github.com/ioksengtan/") === 0) {
        link.href = repo.url;
        link.rel = "noopener noreferrer";
      }
      item.appendChild(link);
      var detail = " · " + String(repo.eventCount || 0) + " 筆";
      if (repo.note) detail += " · " + repo.note;
      item.appendChild(document.createTextNode(detail));
      if (repo.eventCount) countedList.appendChild(item);
      else quietList.appendChild(item);
    });
    reposEl.appendChild(counted);
    reposEl.appendChild(countedList);
    reposEl.appendChild(quiet);
    reposEl.appendChild(quietList);
  }

  fetch(DATA_URL)
    .then(function (response) {
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    })
    .then(render)
    .catch(function () {
      fail("讀不到成長資料。請用本機伺服器開啟這個頁面。");
    });
})();
