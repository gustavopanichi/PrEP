(() => {
  const P = window.PHASES, T = window.TAKEAWAYS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const journey = $("#journey");
  const EXPAND_MS = 900; // keep in sync with --xd in styles.css
  const isMobile = () => matchMedia("(max-width: 760px)").matches;
  const pad = n => String(n).padStart(2, "0");
  const arrowR = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const arrowL = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M14 8H3M7 3.5 2.5 8 7 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const plus = '<span class="plus" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span>';
  const tag = (p, withPlus) => `<div class="tag">${p.num ? `<b>${p.num}</b>` : ""}${p.label}${withPlus ? plus : ""}</div>`;

  /* ---------- Deep-dive markup ---------- */
  function block(b) {
    if (b.t === "note") return `<div class="note"><span class="label">${b.label}</span><p>${b.text}</p></div>`;
    if (b.t === "gilead") return `<div class="gilead"><span class="label">What it means for Gilead</span><p>${b.text}</p></div>`;
    return `<div class="quote ${b.kind}"><span class="label">${b.label}</span>${b.text ? `<p class="lead">${b.text}</p>` : ""}${
      b.items.map(it => `<figure>${it.intro ? `<p class="intro">${it.intro}</p>` : ""}<blockquote>“${it.q}”</blockquote>${it.attr ? `<figcaption>${it.attr}</figcaption>` : ""}</figure>`).join("")
    }</div>`;
  }
  function deep(p) {
    const pid = k => `p-${p.id}-${k}`;
    const tabs = [`<button class="tab" role="tab" id="t-${p.id}-0" aria-controls="${pid(0)}" data-panel-go="0">What’s happening</button>`]
      .concat(p.insights.map((ins, k) => `<button class="tab" role="tab" id="t-${p.id}-${k + 1}" aria-controls="${pid(k + 1)}" data-panel-go="${k + 1}" title="${ins.title.replace(/"/g, "&quot;")}"><small>${pad(k + 1)}</small><span class="lbl">Insight</span></button>`));
    const cols = p.happening.length === 3 ? 3 : 2;
    const happening = `<section class="panel" role="tabpanel" id="${pid(0)}" aria-labelledby="t-${p.id}-0">
        <p class="p-summary">${p.summary}</p>
        <h3 class="eyebrow">What’s happening</h3>
        <ol class="happening" style="--cols:${cols}">${p.happening.map(([t, d], k) => `<li><strong>${t}</strong>${d}</li>`).join("")}</ol>
      </section>`;
    const insights = p.insights.map((ins, k) => {
      const quotes = ins.blocks.filter(b => b.t === "quote");
      const side = ins.blocks.filter(b => b.t !== "quote");
      return `<section class="panel" role="tabpanel" id="${pid(k + 1)}" aria-labelledby="t-${p.id}-${k + 1}">
        <div class="ins-eyebrow">Human insight ${pad(k + 1)}</div>
        <h3 class="ins-title">${ins.title}</h3>
        <div class="ins-grid">
          <div class="ins-main">${ins.body.map(t => `<p class="ins-body">${t}</p>`).join("")}${quotes.map(block).join("")}</div>
          <div class="ins-side">${side.map(block).join("")}</div>
        </div>
      </section>`;
    }).join("");
    return `<div class="tabs">
        <div class="tablist" role="tablist" aria-label="${p.label} sections">${tabs.join("")}</div>
        <div class="stepper">
          <button class="prev" data-step="-1" aria-label="Previous">${arrowL}</button>
          <button class="next" data-step="1" aria-label="Next"><span class="nx-lbl"></span>${arrowR}</button>
        </div>
      </div>
      <div class="panels">${happening}${insights}</div>`;
  }

  /* ---------- Build cards ---------- */
  P.forEach((p, i) => {
    const el = document.createElement("article");
    el.className = "phase";
    el.id = "phase-" + p.id;
    el.innerHTML = `
      <button class="phase__hit" aria-expanded="false" aria-label="${p.label}: ${p.heading} Open this phase"></button>
      <div class="phase__media" style="--img:url('${p.img}')"><div class="stage"><img src="${p.img}" alt=""></div></div>
      <div class="phase__summary">
        ${tag(p, true)}
        <h2 class="phase__heading" tabindex="-1">${p.heading}</h2>
        <p class="phase__text">${p.summary}</p>
      </div>
      <button class="phase__close" aria-label="Close ${p.label} and show all phases">
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2l12 12M14 2 2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <div class="phase__deep">${deep(p)}</div>`;
    journey.appendChild(el);
  });
  const cards = $$(".phase", journey);

  /* ---------- Fit text to the space (no scrolling) ---------- */
  function fit(el, test, min, max) {
    el.style.fontSize = max + "px";
    if (test()) return;
    let lo = min, hi = max;
    for (let n = 0; n < 8; n++) {
      const mid = (lo + hi) / 2;
      el.style.fontSize = mid + "px";
      test() ? (lo = mid) : (hi = mid);
    }
    el.style.fontSize = lo + "px";
  }
  const cardMax = () => Math.max(12, Math.min(16, innerWidth / 92));
  function fitCards() {
    if (isMobile()) {
      if (S.active > -1) return;
      // 9:16 thumbnail sized from the measured row height
      journey.style.setProperty("--mthumb", ($(".phase__media", cards[0]).clientHeight * 9 / 16) + "px");
      return fit(journey, () => cards.every(c => $(".phase__summary", c).scrollHeight <= c.clientHeight - 8), 9.5, 15);
    }
    // Cards always fill the row width; each illustration is 9:16 at the card's
    // full width. Text shrinks to fit under it. If even the smallest text won't
    // fit, the overview drops the summary paragraph (it is in the opened view).
    const cs = getComputedStyle(journey);
    const gap = parseFloat(cs.columnGap) || 12;
    const H = journey.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 16;
    const full = (journey.clientWidth - 5 * gap) / 6 - 16;
    let w = full;
    const rest = cards.filter(c => !c.classList.contains("is-active"));
    const sums = rest.map(c => $(".phase__summary", c));
    const tallest = () => Math.max(...sums.map(s => s.offsetHeight));
    const ok = () => w * 16 / 9 + tallest() <= H;
    const maxF = Math.max(11, Math.min(15.5, w * 0.07));
    journey.style.setProperty("--colw", w + "px");
    journey.style.setProperty("--sumh", "auto");
    journey.classList.remove("compact");
    fit(journey, ok, 9.5, maxF);
    if (!ok()) { journey.classList.add("compact"); fit(journey, ok, 9.5, maxF); }
    // last resort on very short, wide windows: narrow the cards so nothing is cut off
    if (!ok()) { w = Math.max(80, (H - tallest()) * 9 / 16); journey.style.setProperty("--colw", w + "px"); }
    journey.style.setProperty("--rowoff", Math.max(0, (journey.clientWidth - (6 * (w + 16) + 5 * gap)) / 2) + "px");
    journey.style.setProperty("--sumh", tallest() + "px");
    journey.style.setProperty("--cardh", (H + 16) + "px"); // = every card's height (cards stretch to the row)
  }
  function fitPanel(panel) {
    panel.classList.remove("scrolly");
    const ok = () => panel.scrollHeight <= panel.clientHeight + 1;
    fit(panel, ok, isMobile() ? 11 : 9.5, isMobile() ? 14 : Math.max(12, Math.min(14.5, innerWidth / 100)));
    if (!ok()) panel.classList.add("scrolly");
  }

  /* ---------- State ---------- */
  const S = { active: -1, panel: 0 };
  let timer;

  function setActive(i, { focus = true } = {}) {
    if (i === S.active) return;
    S.active = i;
    S.panel = 0;
    clearTimeout(timer);
    cards.forEach((c, j) => {
      c.classList.toggle("is-active", j === i);
      c.classList.remove("is-revealed");
      $(".phase__hit", c).setAttribute("aria-expanded", j === i);
      $$(".panel", c).forEach(p => p.classList.remove("is-current"));
    });
    journey.classList.toggle("has-active", i > -1);
    journey.classList.add("is-animating");
    history.replaceState(null, "", i > -1 ? "#phase-" + P[i].id : "#journey");

    timer = setTimeout(() => {
      if (i > -1) {
        const c = cards[i];
        showPanel(0);
        c.classList.add("is-revealed");
        if (focus) $(".phase__heading", c).focus({ preventScroll: true });
      } else fitCards();
      journey.classList.remove("is-animating");
    }, EXPAND_MS);
  }

  function showPanel(k) {
    const c = cards[S.active];
    if (!c) return;
    const list = $$(".panel", c);
    k = Math.max(0, Math.min(list.length - 1, k));
    list.forEach((p, j) => p.classList.toggle("is-current", j === k));
    list[k].scrollTop = 0;
    fitPanel(list[k]);
    S.panel = k;

    const tabs = $$(".tab", c);
    tabs.forEach((t, j) => { t.setAttribute("aria-selected", j === k); t.tabIndex = j === k ? 0 : -1; });
    tabs[k].scrollIntoView({ block: "nearest", inline: "nearest" });

    const last = k === list.length - 1;
    const next = $(".stepper .next", c), prev = $(".stepper .prev", c);
    const nextPhase = P[S.active + 1];
    const nextLabel = nextPhase ? `Next phase: ${nextPhase.label}` : "Key Takeaways";
    next.classList.toggle("is-phase", last);
    $(".nx-lbl", next).textContent = last ? nextLabel : "";
    next.setAttribute("aria-label", last ? nextLabel : "Next section");
    prev.disabled = k === 0 && S.active === 0;
    prev.setAttribute("aria-label", k === 0 ? "Previous phase" : "Previous section");
  }
  function step(d) {
    const n = P[S.active].insights.length + 1;
    const k = S.panel + d;
    if (k < 0) { if (S.active > 0) setActive(S.active - 1); return; }
    if (k >= n) { S.active < P.length - 1 ? setActive(S.active + 1) : (location.hash = "takeaways"); return; }
    showPanel(k);
  }

  journey.addEventListener("click", e => {
    const card = e.target.closest(".phase");
    if (!card) return;
    if (e.target.closest(".phase__hit")) return setActive(cards.indexOf(card));
    if (e.target.closest(".phase__close")) { setActive(-1); $(".phase__hit", card).focus({ preventScroll: true }); return; }
    const go = e.target.closest("[data-panel-go]");
    if (go) return showPanel(+go.dataset.panelGo);
    const st = e.target.closest("[data-step]");
    if (st) return step(+st.dataset.step);
  });
  document.addEventListener("keydown", e => {
    if (document.body.dataset.view !== "journey" || S.active < 0) return;
    if (e.key === "Escape") { const c = cards[S.active]; setActive(-1); $(".phase__hit", c).focus({ preventScroll: true }); }
    else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });

  /* ---------- Key Takeaways ---------- */
  const [t1, t2] = T.title.split(/ (.+)/);
  $("#ta").innerHTML = `
    <div class="ta-hero">
      <h1>${t1} <span>${t2}</span></h1>
      <div class="ta-intro">${T.intro.map(t => `<p>${t}</p>`).join("")}</div>
    </div>
    <h2 class="ta-heading">${T.heading}</h2>
    <div class="ta-grid">${T.items.map(it => {
      const p = P.find(x => x.id === it.phase);
      return `<article class="ta-card">
        <div class="thumb"><img src="${p.img}" alt="" loading="lazy"></div>
        <div class="inner">
          ${tag(p, false)}
          <h3>${it.title}</h3>
          <ul>${it.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
          <button class="go" data-phase="${p.id}">See the phase ${arrowR}</button>
        </div>
      </article>`;
    }).join("")}</div>`;
  $("#ta").addEventListener("click", e => {
    const b = e.target.closest("[data-phase]");
    if (b) location.hash = "phase-" + b.dataset.phase;
  });
  function fitTakeaways() {
    const ta = $("#ta"), grid = $(".ta-grid", ta);
    if (isMobile()) return fit(ta, () => grid.clientHeight > 220 && $$(".ta-card", ta).every(c => $(".inner", c).scrollHeight <= c.clientHeight - 60), 10, 14);
    fit(ta, () => grid.clientHeight > 200 && $$(".ta-card .inner", ta).every(n => n.scrollHeight <= n.clientHeight + 1), 9.5, cardMax());
  }

  /* ---------- Routing ---------- */
  const views = $$("[data-view].view");
  function route() {
    const h = location.hash.slice(1);
    const phaseIdx = h.startsWith("phase-") ? P.findIndex(p => "phase-" + p.id === h) : -1;
    const view = phaseIdx > -1 ? "journey" : (h === "takeaways" ? h : "journey");
    const changed = document.body.dataset.view !== view;
    document.body.dataset.view = view;
    views.forEach(v => (v.hidden = v.dataset.view !== view));
    $$("[data-nav]").forEach(a => a.dataset.nav === view ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    if (view === "takeaways") requestAnimationFrame(fitTakeaways);
    if (view === "journey") {
      requestAnimationFrame(fitCards);
      if (phaseIdx > -1) setActive(phaseIdx, { focus: !changed });
      else if (h === "journey" && S.active > -1) setActive(-1);
    }
  }
  addEventListener("hashchange", route);

  let rz;
  addEventListener("resize", () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      fitCards();
      const cur = S.active > -1 && $(".panel.is-current", cards[S.active]);
      if (cur) fitPanel(cur);
      if (document.body.dataset.view === "takeaways") fitTakeaways();
    }, 120);
  });

  /* ---------- No widows: glue the last two words of every text block ---------- */
  function noWidow(el) {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let seenWord = false;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const t = nodes[i].nodeValue;
      for (let k = t.length - 1; k >= 0; k--) {
        const ch = t[k];
        if (ch === " ") { if (seenWord) { nodes[i].nodeValue = t.slice(0, k) + "\u00a0" + t.slice(k + 1); return; } }
        else if (!/\s/.test(ch)) seenWord = true;
      }
    }
  }
  $$("p, h2, h3, li, blockquote, figcaption").forEach(noWidow);

  route();
  fitCards();
  document.fonts && document.fonts.ready.then(() => {
    fitCards();
    const cur = S.active > -1 && $(".panel.is-current", cards[S.active]);
    if (cur) fitPanel(cur);
    if (document.body.dataset.view === "takeaways") fitTakeaways();
  });
})();
