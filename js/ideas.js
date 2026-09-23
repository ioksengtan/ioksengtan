(() => {
  const root = document.getElementById("idea-terrarium");
  const q = (s) => root.querySelector(s);
  const { groups, seeds, recipes } = window.IDEA_DATA;
  let fed = [],
    a = 2,
    b = 9;
  const storageKey = "ioksengtan.idea-terrarium.v1";
  // Store source paths, so saved memories survive changes to display names or ordering.
  function restore() {
    try {
      const s = JSON.parse(localStorage.getItem(storageKey));
      if (!s || s.version !== 1) return;
      const locate = (p) => seeds.findIndex((seed) => seed[2] === p);
      const sa = locate(s.a),
        sb = locate(s.b);
      if (sa >= 0) a = sa;
      if (sb >= 0) b = sb;
      fed = [
        ...new Set(
          (Array.isArray(s.pairs) ? s.pairs : [])
            .filter((p) => Array.isArray(p) && p.length === 2)
            .map((p) => p.map(locate))
            .filter((p) => p[0] >= 0 && p[1] >= 0 && p[0] !== p[1])
            .map((p) => p.sort((x, y) => x - y).join("-")),
        ),
      ];
    } catch {
      /* Missing, corrupt or blocked storage starts a usable fresh session. */
    }
  }
  restore();
  const save = () => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          version: 1,
          a: seeds[a][2],
          b: seeds[b][2],
          pairs: fed.map((k) => k.split("-").map((i) => seeds[i][2])),
        }),
      );
    } catch {
      q("#it-storage").textContent =
        "瀏覽器未允許儲存；這次的生長會保留到關閉頁面。";
    }
  };
  for (let g = 0; g < 3; g++) {
    const box = document.createElement("div");
    box.className = "it-cluster";
    const label = document.createElement("div");
    label.className = "it-cluster-label";
    label.innerHTML =
      '<span class="it-dot" style="--it-color:var(--viz-series-' +
      (g + 1) +
      ')"></span>';
    label.append(groups[g]);
    box.append(label);
    seeds.forEach((s, i) => {
      if (s[1] !== g) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "it-seed";
      button.textContent = s[0];
      button.dataset.seed = i;
      button.title = s[3];
      button.onclick = () => {
        if (a === i) return;
        b = i;
        sync();
        save();
      };
      box.append(button);
    });
    q("#it-seeds").append(box);
  }
  seeds.forEach((s, i) => {
    for (const id of ["#it-a", "#it-b"]) {
      const o = document.createElement("option");
      o.value = i;
      o.textContent = s[0];
      q(id).append(o);
    }
    const p = document.createElement("li");
    const link = sourceElement(s[2], s[0]);
    p.append(link, document.createTextNode(" — " + s[3]));
    q("#it-sources").append(p);
  });
  function sourceElement(source, label) {
    const el = document.createElement(
      source.startsWith("hot-stir-fry/") ? "span" : "a",
    );
    el.textContent = label;
    if (el.tagName === "A")
      el.href =
        "https://github.com/ioksengtan/idea/blob/main/" +
        source.split("/").map(encodeURIComponent).join("/");
    else el.append("（本機原型，尚未公開）");
    return el;
  }
  function recipe() {
    if (a === b)
      return [
        "選兩個不同的點子",
        "相同的點子還不會產生碰撞。",
        "更換材料 A 或 B，再試一次。",
      ];
    const key = [a, b].sort((x, y) => x - y).join("-");
    return (
      recipes[key] || [
        seeds[a][0] + " × " + seeds[b][0],
        "以「" + seeds[a][3] + "」作為輸入，讓「" + seeds[b][3] + "」回應它。",
        "只挑一個輸入事件和一個可見回應，先驗證這個組合是否有趣。",
      ]
    );
  }
  function draw() {
    const svg = q("#it-tree"),
      w = svg.clientWidth || 240,
      h = svg.clientHeight || 340;
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    svg.replaceChildren();
    const ns = "http://www.w3.org/2000/svg";
    const add = (tag, attrs, text) => {
      const el = document.createElementNS(ns, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      if (text) el.textContent = text;
      svg.append(el);
      return el;
    };
    const cx = w / 2,
      cy = h * 0.55,
      used = new Set(fed.flatMap((k) => k.split("-").map(Number)));
    add("ellipse", {
      cx,
      cy: h - 42,
      rx: w * 0.36,
      ry: 12,
      fill: "var(--muted)",
      opacity: ".5",
    });
    add("path", {
      d: `M ${cx} ${h - 45} Q ${cx - 18} ${cy + 45} ${cx} ${cy}`,
      fill: "none",
      stroke: "var(--border)",
      "stroke-width": 3,
    });
    for (let g = 0; g < 3; g++) {
      const angle = -Math.PI * 0.85 + g * Math.PI * 0.35,
        amount = [...used].filter((i) => seeds[i][1] === g).length,
        len = 35 + amount * 10,
        ex = cx + Math.cos(angle) * Math.min(len, w * 0.35),
        ey = cy + Math.sin(angle) * len;
      add("path", {
        d: `M ${cx} ${cy + 15} Q ${ex} ${cy} ${ex} ${ey}`,
        fill: "none",
        stroke: "var(--viz-series-" + (g + 1) + ")",
        "stroke-width": 2,
      });
      for (let j = 0; j < Math.max(1, amount); j++) {
        const lx = ex + (j % 2 ? 1 : -1) * Math.min(14 + j * 3, w * 0.1),
          ly = ey + j * 9;
        add("ellipse", {
          cx: lx,
          cy: ly,
          rx: 8,
          ry: 5,
          fill: "var(--viz-series-" + (g + 1) + ")",
          opacity: amount ? ".7" : ".18",
          transform: `rotate(${j % 2 ? 35 : -35} ${lx} ${ly})`,
        });
      }
    }
    add("circle", {
      cx,
      cy: cy + 14,
      r: 17 + Math.min(fed.length, 10),
      fill: "var(--viz-series-1)",
      opacity: ".18",
    });
    add("circle", { cx: cx - 5, cy: cy + 12, r: 2, fill: "var(--foreground)" });
    add("circle", { cx: cx + 5, cy: cy + 12, r: 2, fill: "var(--foreground)" });
    add(
      "text",
      { x: cx, y: h - 12, "text-anchor": "middle" },
      fed.length ? "已吸收 " + used.size + " 個點子" : "等待第一口靈感",
    );
    q("#it-count").textContent = fed.length + " 次不同碰撞";
    svg.setAttribute(
      "aria-label",
      "靈感生命體：已吸收 " +
        used.size +
        " 個點子，完成 " +
        fed.length +
        " 次不同碰撞",
    );
  }
  function sync(message) {
    q("#it-a").value = a;
    q("#it-b").value = b;
    root
      .querySelectorAll("[data-seed]")
      .forEach((el) =>
        el.setAttribute(
          "aria-pressed",
          Number(el.dataset.seed) === a || Number(el.dataset.seed) === b
            ? "true"
            : "false",
        ),
      );
    q("#it-feed").disabled = a === b;
    const r = recipe();
    q("#it-result").replaceChildren();
    for (const [tag, text] of [
      ["h2", a === b ? "選兩個不同的點子" : r[0]],
      ["p", message || "碰撞提案 · " + r[1]],
      ["p", "最小實驗 · " + r[2]],
    ]) {
      const el = document.createElement(tag);
      el.textContent = text;
      q("#it-result").append(el);
    }
    const sources = document.createElement("div");
    sources.className = "it-source-links";
    [...new Set([a, b])].forEach((i) => {
      const link = sourceElement(seeds[i][2], "原始筆記：" + seeds[i][0]);
      sources.append(link);
    });
    q("#it-result").append(sources);
    q("#it-history").replaceChildren();
    fed
      .slice()
      .reverse()
      .forEach((k) => {
        const li = document.createElement("li");
        li.textContent = k
          .split("-")
          .map((i) => seeds[i][0])
          .join(" × ");
        q("#it-history").append(li);
      });
    q("#it-history-wrap").hidden = !fed.length;
    draw();
  }
  q("#it-a").onchange = (e) => {
    a = Number(e.target.value);
    sync();
    save();
  };
  q("#it-b").onchange = (e) => {
    b = Number(e.target.value);
    sync();
    save();
  };
  q("#it-feed").onclick = () => {
    if (a === b) return;
    const key = [a, b].sort((x, y) => x - y).join("-");
    if (fed.includes(key)) {
      sync("這組養分已吸收；換一個點子，長出另一種可能。");
      return;
    }
    fed.push(key);
    sync("已餵養 · " + recipe()[1]);
    save();
  };
  new ResizeObserver(draw).observe(q("#it-life"));
  sync();
})();
