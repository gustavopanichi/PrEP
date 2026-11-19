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
    // one block per quote, so the column balancer can move them independently;
    // only the first carries the label (and lead), the rest read as its continuation
    const fig = it => `<figure>${it.intro ? `<p class="intro">${it.intro}</p>` : ""}<blockquote>“${it.q}”</blockquote>${it.attr ? `<figcaption>${it.attr}</figcaption>` : ""}</figure>`;
    const head = `<span class="label">${b.label}</span>${b.text ? `<p class="lead">${b.text}</p>` : ""}`;
    if (!b.items.length) return `<div class="quote ${b.kind}">${head}</div>`;
    return b.items.map((it, k) => `<div class="quote ${b.kind}${k ? " cont" : ""}">${k ? `<span class="label">${b.label}</span>` : head}${fig(it)}</div>`).join("");
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

  /* ---------- Illustration markup ----------
     Initiation and Internalization show camera UI. It is drawn here as SVG (in the original artwork's
     coordinates, 966 × 1718) on top of clean illustrations, so on hover only the picture zooms or plays. */
  const UI_FONT = `font-family="Geist, -apple-system, 'Helvetica Neue', Arial, sans-serif"`;
  const CAM_FONT = `font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"`;
  const YELLOW = "#ffc20f";
  const BRACKETS = [[21,339,85,403,"tl"],[880,339,943,403,"tr"],[21,740,85,803,"bl"],[880,740,943,803,"br"],
                    [274,467,297,490,"tl"],[465,467,488,490,"tr"],[274,637,297,661,"bl"],[465,637,488,661,"br"]]
    .map(([x0, y0, x1, y1, c]) => {
      const w = x1 - x0 + 1, h = y1 - y0 + 1, hy = c[0] === "t" ? y0 + 1 : y1 - 6, vx = c[1] === "l" ? x0 : x1 - 5;
      return `<rect x="${x0}" y="${hy}" width="${w}" height="6"/><rect x="${vx}" y="${y0}" width="6" height="${h}"/>`;
    }).join("");
  // "1 → 0.5" lens badge (Internalization)
  const ZOOM_BADGE = `
    <rect x="343" y="1490" width="279" height="112" rx="56" fill="#000" fill-opacity=".56"/>
    <circle cx="405" cy="1545.5" r="39" fill="#fff" fill-opacity=".13"/>
    <text x="401" y="1559" text-anchor="middle" font-size="39" font-weight="300" fill="#fff" ${UI_FONT}>1</text>
    <path d="M464 1545.5h37M492 1537l9.5 8.5-9.5 8.5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="562.5" cy="1545.5" r="38.5" fill="#fff" fill-opacity=".06" stroke="#f0bf2c" stroke-width="2.2"/>
    <text x="562.5" y="1559" text-anchor="middle" font-size="38" font-weight="300" fill="#f0bf2c" ${UI_FONT}>0.5</text>`;
  // phone camera chrome (Initiation): top bar + sliders, shutter, thumbnail, flip
  const SLIDERS = [["55", "CONTROL", 60, 214, 137.5], ["25", "VISIBILITY", 280, 436, 357.5], ["30", "EFFORT", 507, 664, 586], ["64", "INVOLVEMENT", 749, 905, 827.5]];
  const CAMERA = p => `
    <rect x="0" y="0" width="966" height="114" fill="#000"/>
    <circle cx="71" cy="56.5" r="31.5" fill="none" stroke="#fff" stroke-width="2.6"/>
    <path d="M77 36 58 60h12l-5 18 20-26H72z" fill="#fff"/>
    <circle cx="468.5" cy="56" r="32" fill="#232323"/>
    <path d="M455.5 49.5l13 13 13-13" fill="none" stroke="${YELLOW}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="895" cy="56" r="31.5" fill="none" stroke="#fff" stroke-width="2.6"/>
    <path d="M872.5 56c6-9 14-14 22.5-14s16.5 5 22.5 14c-6 9-14 14-22.5 14s-16.5-5-22.5-14z" fill="none" stroke="#fff" stroke-width="2.8" stroke-linejoin="round"/>
    <circle cx="895" cy="56" r="8" fill="none" stroke="#fff" stroke-width="2.8"/>
    <rect x="0" y="1333" width="966" height="385" fill="#000"/>
    ${SLIDERS.map(([v, label, x0, x1, cx]) => `
      <text x="${cx}" y="1394" text-anchor="middle" font-size="36" font-weight="700" fill="${YELLOW}" ${CAM_FONT}>${v}</text>
      <rect x="${x0}" y="1407" width="${x1 - x0}" height="9" rx="4.5" fill="#262626"/>
      <rect x="${x0}" y="1407" width="${Math.round((x1 - x0) * v / 100)}" height="9" rx="4.5" fill="${YELLOW}"/>
      <text x="${cx}" y="1456" text-anchor="middle" font-size="20.5" font-weight="700" fill="#fff" ${CAM_FONT}>${label}</text>`).join("")}
    <clipPath id="cam-thumb"><rect x="53" y="1521" width="135" height="135" rx="11"/></clipPath>
    <g clip-path="url(#cam-thumb)">
      <svg x="53" y="1521" width="135" height="135" viewBox="0 230 941 941" preserveAspectRatio="xMidYMid slice"><image href="${p.img}" width="941" height="1672"/></svg>
    </g>
    <circle cx="465" cy="1589" r="72.5" fill="none" stroke="#fff" stroke-width="7"/>
    <circle cx="465" cy="1589" r="64" fill="#fff"/>
    <circle cx="861.5" cy="1589" r="64" fill="#262626"/>
    <g fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round">
      <path d="M837.5 1585a24.5 24.5 0 0 1 47-5"/><path d="M885.5 1593a24.5 24.5 0 0 1-47 5"/>
    </g>
    <path d="M875 1578h20l-10 12z" fill="#fff" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M828 1600h20l-10-12z" fill="#fff" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>`;
  const uiLayer = inner => `<svg class="ui" viewBox="0 0 966 1718" preserveAspectRatio="none" aria-hidden="true">${inner}</svg>`;
  /* Hover clips: each card's still IS its clip's first frame, so image > video > image swaps are invisible. */
  const UI = {
    "before-relevance": { base: "assets/phase0-f1.jpg", video: "assets/phase0-hover-v3.mp4" },
    relevance:          { base: "assets/phase1-f1.jpg", video: "assets/phase1-hover-v3.mp4" },
    initiation: {            // camera chrome stays put; only the viewfinder zooms and plays the clip
      origin: "50% 42%",
      base: "assets/phase2-f1.jpg", video: "assets/phase2-hover-v3.mp4",
      over: p => uiLayer(CAMERA(p))
    },
    integration: {           // still = the clip's first frame
      base: "assets/phase3-v7-f2.jpg",
      video: "assets/phase3-hover-v2.mp4"
    },
    internalization: {       // focus brackets + lens badge stay put over the clean picture / clip
      base: "assets/phase4-f1.jpg", video: "assets/phase4-hover-v3.mp4",
      over: () => uiLayer(`<g fill="#fff">${BRACKETS}</g>${ZOOM_BADGE}`)
    },
    evolution:          { base: "assets/phase5-f2.jpg", video: "assets/phase5-hover-v4.mp4" }
  };
  const art = (p, lazy) => {
    const u = UI[p.id] || {};
    const origin = u.origin ? ` style="transform-origin:${u.origin}"` : "";
    return `<img class="art" src="${u.base || p.img}" alt=""${lazy ? ' loading="lazy"' : ""}${origin}>` +
      (u.video ? `<video class="art hover-video" src="${u.video}" muted playsinline preload="auto" tabindex="-1" aria-hidden="true"${origin}></video>` : "") +
      (u.over ? u.over(p) : "");
  };

  /* Hover video: play once per hover, show it only once its first frame is on screen,
     and when it ends fade back to the still (the last frame matches the first). */
  function wireHoverVideos() {
    if (!matchMedia("(hover: hover)").matches) return;
    $$("video.hover-video").forEach(v => {
      const card = v.closest(".phase"), media = v.closest(".phase__media");
      let busy = false;
      const reveal = () => v.classList.add("is-on");
      const play = () => {
        if (busy) return;
        busy = true;
        v.currentTime = 0;
        v.play().then(() => {
          if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(reveal); else reveal();
        }).catch(() => { busy = false; });
      };
      v.addEventListener("ended", () => {
        v.classList.remove("is-on");
        setTimeout(() => { busy = false; }, 450);   // allow the fade to finish before a replay
      });
      card.addEventListener("mouseenter", () => { if (!card.classList.contains("is-active")) play(); });
      media.addEventListener("mouseenter", () => { if (card.classList.contains("is-active")) play(); });
    });
  }

  /* ---------- Build cards ---------- */
  P.forEach((p, i) => {
    const el = document.createElement("article");
    el.className = "phase";
    el.id = "phase-" + p.id;
    el.innerHTML = `
      <button class="phase__hit" aria-expanded="false" aria-label="${p.label}: ${p.heading} Open this phase"></button>
      <div class="phase__media" style="--img:url('${p.img}')"><div class="stage">${art(p)}</div></div>
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
  wireHoverVideos();

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
  function fitPanel(panel, raw = false) {
    panel.classList.remove("scrolly");
    const ok = () => panel.scrollHeight <= panel.clientHeight + 1;
    const min = isMobile() ? 11 : 9.5, max = isMobile() ? 14 : Math.max(12, Math.min(14.5, innerWidth / 100));
    const grid = $(".ins-grid", panel);
    if (grid) grid.style.gridTemplateColumns = "";                          // let the stylesheet decide 1 vs 2 columns
    if (grid && getComputedStyle(grid).gridTemplateColumns.split(" ").length > 1) balance(panel, grid, ok, min, max);
    else fit(panel, ok, min, max);
    if (grid && !raw) {                                                      // insights share one size per phase
      const card = panel.closest(".phase");
      fitPhaseInsights(card);
      panel.style.fontSize = card.dataset.insightFs + "px";
    }
    if (!ok()) panel.classList.add("scrolly");
  }
  /* Every insight panel in a phase uses the same text size: the largest size at which all of them fit.
     Measured once per phase per window size (hidden panels are laid out invisibly to measure). */
  function fitPhaseInsights(card) {
    const key = innerWidth + "x" + innerHeight;
    if (card.dataset.insightKey === key) return;
    let size = Infinity;
    $$(".panel", card).filter(p => $(".ins-grid", p)).forEach(p => {
      const shown = p.classList.contains("is-current");
      if (!shown) { p.style.visibility = "hidden"; p.classList.add("is-current"); }
      fitPanel(p, true);
      size = Math.min(size, parseFloat(p.style.fontSize));
      if (!shown) { p.classList.remove("is-current"); p.style.visibility = ""; }
    });
    card.dataset.insightFs = size;
    card.dataset.insightKey = key;
  }
  /* Insight panels: keep the reading order (body > quotes > notes > Gilead box) but choose where the
     two columns split, so one long column doesn't force the whole panel's text smaller. */
  function balance(panel, grid, ok, min, max) {
    const main = $(".ins-main", grid), side = $(".ins-side", grid);
    const bodies = [...main.children].filter(el => el.classList.contains("ins-body"));
    const blocks = [...main.children, ...side.children].filter(el => !el.classList.contains("ins-body"));
    const split = k => { main.replaceChildren(...bodies, ...blocks.slice(0, k)); side.replaceChildren(...blocks.slice(k)); };
    const k0 = blocks.filter(el => el.classList.contains("quote")).length;     // the authored split
    const size = () => parseFloat(panel.style.fontSize);
    const RATIOS = ["1.25fr 1fr", "1fr 1fr", "1.5fr 1fr", "1fr 1.25fr"];       // first = the default look
    const apply = (k, r) => { split(k); grid.style.gridTemplateColumns = `minmax(0, ${r.split(" ")[0]}) minmax(0, ${r.split(" ")[1]})`; fit(panel, ok, min, max); };
    apply(k0, RATIOS[0]);
    let best = { k: k0, r: RATIOS[0], fs: size() };
    if (best.fs < max) {
      for (const r of RATIOS) for (let k = 0; k < blocks.length; k++) {      // side always keeps the Gilead box
        if (k === k0 && r === RATIOS[0]) continue;
        apply(k, r);
        if (size() > best.fs + 0.1) best = { k, r, fs: size() };
      }
    }
    apply(best.k, best.r);
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
  /* ---------- Priority Learning Areas ---------- */
  const L = window.LEARNING;
  const ICONS = {
    person: '<circle cx="12" cy="7.5" r="3.5"/><path d="M4.5 20.5c.6-4 3.7-6.5 7.5-6.5s6.9 2.5 7.5 6.5"/>',
    stethoscope: '<path d="M5 3.5v5a4.5 4.5 0 0 0 9 0v-5"/><path d="M9.5 13v2.5a4.5 4.5 0 0 0 9 0V13"/><circle cx="18.5" cy="11" r="2"/>',
    chat: '<path d="M20.5 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.4a8 8 0 1 1 15.1-4.1z"/><path d="M12.5 8v7M9 11.5h7"/>',
    pill: '<rect x="2.6" y="8.5" width="18.8" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/>'
  };
  const [l1, l2] = L.title.split(/ (.+)/);
  $("#pl").innerHTML = `
    <div class="ta-hero pl-hero">
      <h1>${l1} <span>${l2}</span></h1>
      <p class="pl-intro">${L.intro}</p>
    </div>
    <div class="ta-grid pl-grid">${L.areas.map(a => `<article class="ta-card pl-card">
        <div class="inner">
          <div class="tag pl-tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[a.icon]}</svg>${a.label}</div>
          <h3>${a.lead}</h3>
          <ul>${a.bullets.map(([b, t]) => `<li><strong>${b}</strong> ${t}</li>`).join("")}</ul>
        </div>
      </article>`).join("")}</div>`;

  /* both card pages: text scales so every card fits on one screen */
  function fitGridPage(root) {
    const grid = $(".ta-grid", root);
    const ok = () => $$(".ta-card .inner", root).every(n => n.scrollHeight <= n.clientHeight + 1);
    if (isMobile()) return fit(root, () => grid.clientHeight > 220 && ok(), 10, 14);
    fit(root, () => grid.clientHeight > 200 && ok(), 9.5, cardMax());
  }
  const fitTakeaways = () => fitGridPage($("#ta"));
  const fitLearning = () => fitGridPage($("#pl"));

  /* ---------- Routing ---------- */
  const views = $$("[data-view].view");
  function route() {
    const h = location.hash.slice(1);
    const phaseIdx = h.startsWith("phase-") ? P.findIndex(p => "phase-" + p.id === h) : -1;
    const view = phaseIdx > -1 ? "journey" : (["takeaways", "learning"].includes(h) ? h : "journey");
    const changed = document.body.dataset.view !== view;
    document.body.dataset.view = view;
    views.forEach(v => (v.hidden = v.dataset.view !== view));
    $$("[data-nav]").forEach(a => a.dataset.nav === view ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    if (view === "takeaways") requestAnimationFrame(fitTakeaways);
    if (view === "learning") requestAnimationFrame(fitLearning);
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
      if (document.body.dataset.view === "learning") fitLearning();
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
