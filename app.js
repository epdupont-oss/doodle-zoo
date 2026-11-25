/* Doodle Zoo: draw on paper, one shape at a time. */
(() => {
  const STORE_KEY = 'doodle-zoo-v1';
  const LEVELS = { easy: 'Little Artist', hard: 'Big Artist' };

  // Names are typed in on first launch and only ever stored on the phone.
  const DEFAULT_STATE = {
    setup: false,
    profiles: [
      { id: 'kid1', name: '', avatar: '🦋', color: '#ffe1ec', level: 'hard', speak: false, done: [] },
      { id: 'kid2', name: '', avatar: '🌷', color: '#e3f4ff', level: 'easy', speak: true, done: [] },
    ],
  };

  let state = load();
  let view = { screen: 'home' };
  const app = document.getElementById('app');

  /* ---------- storage ---------- */
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (s && Array.isArray(s.profiles)) return s;
    } catch (e) { /* ignore */ }
    return structuredClone(DEFAULT_STATE);
  }
  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  const profile = id => state.profiles.find(p => p.id === id);

  /* ---------- every animal is open; stars show what each child has drawn ---------- */
  // Some animals only have one level (e.g. Unicorn is Little Artist only): use the closest one.
  function levelKey(p, a) {
    if (a.levels[p.level]) return p.level;
    return ['easy', 'hard'].find(k => a.levels[k]);
  }
  const regularAnimals = () => ANIMALS.filter(a => a.levels.easy || a.levels.hard);
  const masterAnimals = () => ANIMALS.filter(a => a.levels.pro);

  /* ---------- geometry ---------- */
  const f = n => +n.toFixed(1);
  function toPath(s) {
    if (s.d) return s.d;
    if (s.c) { const [x, y, r] = s.c; return `M${x - r} ${y}A${r} ${r} 0 1 1 ${x + r} ${y}A${r} ${r} 0 1 1 ${x - r} ${y}`; }
    if (s.e) { const [x, y, rx, ry] = s.e; return `M${x - rx} ${y}A${rx} ${ry} 0 1 1 ${x + rx} ${y}A${rx} ${ry} 0 1 1 ${x - rx} ${y}`; }
    if (s.sc) { // scalloped ring (fluffy mane, clouds…): [cx, cy, r, bumps, rotationDeg]
      const [x, y, r, n, off = 0] = s.sc;
      const step = 2 * Math.PI / n, o = off * Math.PI / 180;
      const R = f(2 * r * Math.sin(step / 2) * 0.55);
      let d = '';
      for (let i = 0; i <= n; i++) {
        const a = o + i * step - Math.PI / 2;
        const px = f(x + r * Math.cos(a)), py = f(y + r * Math.sin(a));
        d += i === 0 ? `M${px} ${py}` : `A${R} ${R} 0 0 1 ${px} ${py}`;
      }
      return d;
    }
    return '';
  }
  function shapeEl(s) {
    let cls = 'ink';
    if (s.g) cls = 'guide';                       // light construction line
    else if (s.sh) cls = 'shade s' + s.sh;        // pencil shading, 1 light … 3 dark
    else {
      if (s.f === 'w') cls += ' white';           // white shine in eyes
      else if (s.f) cls += ' fill';
      if (s.t) cls += ' tone';                    // softer grey line (fur, texture)
    }
    const style = s.w ? ` style="stroke-width:${s.w}"` : '';
    return `<path class="${cls}" d="${toPath(s)}"${style}/>`;
  }

  /** SVG of a level's steps [0..upto]; the step at `now` is highlighted.
      Layers: guides at the back, then shading, then lines on top. */
  function drawingSVG(level, upto, now = -1, cls = '') {
    const vb = level.view || '0 0 400 400';
    const eraseAt = level.steps.findIndex(st => st.erase);
    const hideGuides = eraseAt >= 0 && upto >= eraseAt;
    const layers = { g: '', sh: '', ink: '' };
    level.steps.forEach((st, i) => {
      if (i > upto) return;
      const parts = { g: '', sh: '', ink: '' };
      (st.s || []).forEach(s => {
        const k = s.g ? 'g' : s.sh ? 'sh' : 'ink';
        if (k === 'g' && hideGuides) return;
        parts[k] += shapeEl(s);
      });
      for (const k in parts) if (parts[k]) layers[k] += `<g class="${i === now ? 'now' : ''}">${parts[k]}</g>`;
    });
    return `<svg class="${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${layers.g}${layers.sh}${layers.ink}</svg>`;
  }

  /** Animates the strokes of the highlighted step, one shape after another. */
  function animateNow(root) {
    const paths = [...root.querySelectorAll('.now path')];
    let delay = 250;
    paths.forEach(p => {
      if (p.classList.contains('shade') || p.classList.contains('white')) {
        p.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, delay, fill: 'both' });
        delay += 600;
        return;
      }
      const len = p.getTotalLength();
      const dur = Math.min(1800, Math.max(500, len * 3.2));
      p.style.strokeDasharray = `${len} ${len}`;
      p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: dur, delay, fill: 'both', easing: 'ease-in-out' });
      if (p.classList.contains('fill')) {
        p.animate([{ fillOpacity: 0 }, { fillOpacity: 1 }],
          { duration: 300, delay: delay + dur, fill: 'both' });
      }
      delay += dur + 120;
    });
  }

  /* ---------- speech (reads instructions to little ones) ---------- */
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.9; u.pitch = 1.1;
    speechSynthesis.speak(u);
  }

  /* ---------- keep screen awake while drawing ---------- */
  let wakeLock = null;
  async function keepAwake(on) {
    try {
      if (on && !wakeLock && navigator.wakeLock) wakeLock = await navigator.wakeLock.request('screen');
      if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
    } catch (e) { wakeLock = null; }
  }

  /* ---------- screens ---------- */
  function go(v) { view = v; render(); window.scrollTo(0, 0); }

  function renderHome() {
    keepAwake(false);
    app.innerHTML = `
      <h1 class="title">Doodle Zoo</h1>
      <p class="subtitle">Who is drawing today?</p>
      <div class="profiles">
        ${state.profiles.map(p => `
          <button class="profile" data-p="${p.id}">
            <span class="avatar" style="background:${p.color}">${p.avatar}</span>
            <span>
              <div class="name">${esc(p.name)}</div>
              <div class="meta">⭐ ${regularDone(p)} of ${regularAnimals().length} drawn${masterDone(p) ? ` · ✨ ${masterDone(p)}` : ''} · ${LEVELS[p.level]}</div>
            </span>
          </button>`).join('')}
      </div>
      <button class="grownups" data-act="settings">⚙️ For grown-ups</button>`;
    app.querySelectorAll('[data-p]').forEach(b => b.onclick = () => go({ screen: 'zoo', pid: b.dataset.p }));
    app.querySelector('[data-act=settings]').onclick = () => go({ screen: 'settings' });
  }

  function renderZoo() {
    keepAwake(false);
    const p = profile(view.pid);
    app.innerHTML = `
      <div class="bar">
        <button class="icon-btn" data-act="home" aria-label="Back">◀</button>
        <h1>${esc(p.name)}'s Zoo</h1>
        <span class="avatar" style="width:48px;height:48px;font-size:26px;background:${p.color}">${p.avatar}</span>
      </div>
      <div class="grid">
        ${ANIMALS.map((a, i) => {
          const k = levelKey(p, a);
          if (!k) return '';
          const done = p.done.includes(a.id);
          return `
            <button class="tile" data-i="${i}">
              ${done ? '<span class="badge star">⭐</span>' : ''}
              ${drawingSVG(a.levels[k], 99, -1, 'thumb')}
              <div class="label">${a.emoji} ${a.name}</div>
            </button>`;
        }).join('')}
      </div>
      ${showMaster(p) ? masterSection(p) : ''}`;
    app.querySelector('[data-act=home]').onclick = () => go({ screen: 'home' });
    app.querySelectorAll('[data-i]').forEach(b => b.onclick = () =>
      go({ screen: 'draw', pid: p.id, ai: +b.dataset.i, step: 0 }));
    app.querySelectorAll('[data-m]').forEach(b => b.onclick = () =>
      go({ screen: 'draw', pid: p.id, ai: +b.dataset.m, step: 0, lv: 'pro' }));
  }

  /* Master drawings: realistic versions with guide lines and shading. */
  const showMaster = p => p.master ?? true;
  const regularDone = p => p.done.filter(d => !d.includes(':')).length;
  const masterDone = p => p.done.filter(d => d.endsWith(':pro')).length;
  function masterSection(p) {
    return `
      <h2 class="section">✨ Master drawings</h2>
      <p class="note">Like real artists: light guide lines, small details and pencil shading.</p>
      <div class="grid">
        ${ANIMALS.map((a, i) => {
          if (!a.levels.pro) return '';
          const lvl = a.levels.pro;
          const done = p.done.includes(a.id + ':pro');
          return `
            <button class="tile" data-m="${i}">
              ${done ? '<span class="badge star">⭐</span>' : ''}
              ${drawingSVG(lvl, 99, -1, 'thumb')}
              <div class="label">✨ ${a.name}</div>
            </button>`;
        }).join('')}
      </div>`;
  }

  function renderDraw() {
    keepAwake(true);
    const p = profile(view.pid);
    const a = ANIMALS[view.ai];
    const pro = view.lv === 'pro';
    const lvl = a.levels[pro ? 'pro' : levelKey(p, a)];
    const doneId = pro ? a.id + ':pro' : a.id;
    const n = lvl.steps.length;
    const st = lvl.steps[view.step];
    const last = view.step === n - 1;
    app.innerHTML = `
      <div class="draw">
        <div class="bar">
          <button class="icon-btn" data-act="zoo" aria-label="Close">✕</button>
          <h1>${pro ? '✨' : a.emoji} ${a.name}</h1>
          <span class="spacer"></span>
        </div>
        <div class="progress">${lvl.steps.map((_, i) =>
          `<i class="${i < view.step ? 'done' : i === view.step ? 'now' : ''}"></i>`).join('')}</div>
        <div class="canvas">${drawingSVG(lvl, view.step, view.step)}</div>
        <div class="say">
          <p class="${st.say.length > 90 ? 'long' : ''}">${esc(st.say)}</p>
          <button class="icon-btn" data-act="speak" aria-label="Read aloud">🔊</button>
        </div>
        <div class="controls">
          <button class="btn" data-act="back" aria-label="Previous step">◀</button>
          <button class="btn" data-act="replay" aria-label="Show again">↻</button>
          <button class="btn primary ${last ? 'go' : ''}" data-act="next">${last ? 'Finished! 🎉' : 'Next ▶'}</button>
        </div>
      </div>`;
    animateNow(app.querySelector('.canvas'));
    if (p.speak) speak(st.say);

    app.querySelector('[data-act=zoo]').onclick = () => { speechSynthesis?.cancel(); go({ screen: 'zoo', pid: p.id }); };
    app.querySelector('[data-act=speak]').onclick = () => speak(st.say);
    app.querySelector('[data-act=replay]').onclick = () => render();
    app.querySelector('[data-act=back]').onclick = () => {
      if (view.step === 0) go({ screen: 'zoo', pid: p.id });
      else go({ ...view, step: view.step - 1 });
    };
    app.querySelector('[data-act=next]').onclick = () => {
      if (!last) return go({ ...view, step: view.step + 1 });
      const firstTime = !p.done.includes(doneId);
      if (firstTime) { p.done.push(doneId); save(); }
      go({ screen: 'done', pid: p.id, ai: view.ai, firstTime, lv: view.lv });
    };
  }

  function renderDone() {
    keepAwake(false);
    const p = profile(view.pid);
    const a = ANIMALS[view.ai];
    const pro = view.lv === 'pro';
    const lvl = a.levels[pro ? 'pro' : levelKey(p, a)];
    const masterTip = !pro && a.levels.pro && showMaster(p);
    app.innerHTML = `
      <div class="done-screen">
        <div class="stars">⭐⭐⭐</div>
        <h2>You drew a ${a.name}!</h2>
        <p>${pro ? 'What a real work of art! 🖼️' : 'Now color it in on your paper 🖍️'}</p>
        <div class="canvas">${drawingSVG(lvl, 99)}</div>
        ${masterTip ? `<p style="margin-top:14px">✨ Want a challenge? Try the Master ${a.name}!</p>` : ''}
        <div class="controls">
          <button class="btn primary go" data-act="zoo">Back to my zoo</button>
        </div>
      </div>`;
    const msg = `Well done ${p.name}! You drew a ${a.name}. Now color it in!` ;
    if (p.speak) speak(msg);
    confetti();
    app.querySelector('[data-act=zoo]').onclick = () => go({ screen: 'zoo', pid: p.id });
  }

  function renderSetup() {
    app.innerHTML = `
      <h1 class="title">Doodle Zoo</h1>
      <p class="subtitle">Hello grown-up! Who will be drawing?</p>
      <div class="settings">
        ${state.profiles.map((p, i) => `
          <div class="panel" data-p="${p.id}">
            <div class="row">
              <span class="avatar" style="width:56px;height:56px;font-size:30px;background:${p.color}">${p.avatar}</span>
              <input class="name-input" placeholder="Child ${i + 1}'s name" value="${esc(p.name)}" maxlength="20">
            </div>
            <div class="row">Level
              <div class="seg">${Object.entries(LEVELS).map(([k, v]) =>
                `<button data-level="${k}" class="${p.level === k ? 'on' : ''}">${v}</button>`).join('')}</div>
            </div>
          </div>`).join('')}
        <p class="note">Leave a name empty if only one child will use the app.
          Names stay on this phone. You can change everything later under “For grown-ups”.</p>
        <button class="btn primary go" data-act="start">Let’s draw! ✏️</button>
      </div>`;
    app.querySelectorAll('.panel').forEach(panel => {
      const p = profile(panel.dataset.p);
      panel.querySelector('input').oninput = e => { p.name = e.target.value.trim(); };
      panel.querySelectorAll('[data-level]').forEach(b => b.onclick = () => {
        p.level = b.dataset.level; p.speak = p.level === 'easy';
        panel.querySelectorAll('[data-level]').forEach(x => x.classList.toggle('on', x === b));
      });
    });
    app.querySelector('[data-act=start]').onclick = () => {
      const named = state.profiles.filter(p => p.name);
      if (!named.length) return app.querySelector('input').focus();
      state.profiles = named;
      state.setup = true; save(); go({ screen: 'home' });
    };
  }

  function renderSettings() {
    keepAwake(false);
    app.innerHTML = `
      <div class="bar">
        <button class="icon-btn" data-act="home" aria-label="Back">◀</button>
        <h1>For grown-ups</h1>
        <span class="spacer"></span>
      </div>
      <div class="settings">
        ${state.profiles.map(p => `
          <div class="panel" data-p="${p.id}">
            <div class="row">
              <span class="avatar" style="width:48px;height:48px;font-size:26px;background:${p.color}">${p.avatar}</span>
              <input class="name-input" value="${esc(p.name)}" maxlength="20" aria-label="Name">
            </div>
            <div class="row">Level
              <div class="seg">${Object.entries(LEVELS).map(([k, v]) =>
                `<button data-level="${k}" class="${p.level === k ? 'on' : ''}">${v}</button>`).join('')}</div>
            </div>
            <div class="row">Read steps aloud
              <div class="seg">
                <button data-speak="1" class="${p.speak ? 'on' : ''}">On</button>
                <button data-speak="0" class="${!p.speak ? 'on' : ''}">Off</button>
              </div>
            </div>
            <div class="row">Master drawings ✨
              <div class="seg">
                <button data-master="1" class="${showMaster(p) ? 'on' : ''}">Show</button>
                <button data-master="0" class="${!showMaster(p) ? 'on' : ''}">Hide</button>
              </div>
            </div>
            <div class="row">Stars: ${regularDone(p)} / ${regularAnimals().length}, Master ${masterDone(p)} / ${masterAnimals().length}
              <button class="small-btn danger" data-act="reset">Clear stars</button>
            </div>
          </div>`).join('')}
        <p class="note">Little Artist: fewer, bigger shapes (about ages 4–6).<br>
          Big Artist: more steps and details (about ages 7–10).<br>
          Every animal can be chosen by every child. Animals made for one level only
          (like the Unicorn) use that level for everyone.<br>
          Stars are saved on this phone only.</p>
      </div>`;
    app.querySelector('[data-act=home]').onclick = () => go({ screen: 'home' });
    app.querySelectorAll('.panel').forEach(panel => {
      const p = profile(panel.dataset.p);
      panel.querySelector('.name-input').onchange = e => { p.name = e.target.value.trim() || p.name; save(); };
      panel.querySelectorAll('[data-level]').forEach(b => b.onclick = () => { p.level = b.dataset.level; save(); render(); });
      panel.querySelectorAll('[data-master]').forEach(b => b.onclick = () => { p.master = b.dataset.master === '1'; save(); render(); });
      panel.querySelectorAll('[data-speak]').forEach(b => b.onclick = () => { p.speak = b.dataset.speak === '1'; save(); render(); });
      panel.querySelector('[data-act=reset]').onclick = () => {
        if (confirm(`Clear all of ${p.name}'s stars?`)) { p.done = []; save(); render(); }
      };
    });
  }

  /** Developer sheet: every animal, every level, finished. Open with #debug */
  function renderDebug() {
    app.style.maxWidth = 'none';
    const only = location.hash.split(':')[1]; // #debug:owl shows one animal, big
    app.innerHTML = `<div class="debug" ${only ? 'style="grid-template-columns:1fr"' : ''}>${ANIMALS.filter(a => !only || a.id === only)
      .flatMap(a => Object.entries(a.levels).map(([k, l]) =>
      `<figure>${drawingSVG(l, 99)}<figcaption>${a.name} · ${k} · ${l.steps.length} steps</figcaption></figure>`)).join('')}</div>`;
  }

  function confetti() {
    const box = document.createElement('div');
    box.className = 'confetti';
    const bits = ['⭐', '🎉', '✨', '🖍️', '💛', '🌈'];
    for (let i = 0; i < 28; i++) {
      const s = document.createElement('span');
      s.textContent = bits[i % bits.length];
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDuration = 2 + Math.random() * 2 + 's';
      s.style.animationDelay = Math.random() * 0.8 + 's';
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 5000);
  }

  function esc(t) { return String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function render() {
    if (location.hash.startsWith('#debug')) return renderDebug();
    if (!state.setup) return renderSetup();
    ({ home: renderHome, zoo: renderZoo, draw: renderDraw, done: renderDone, settings: renderSettings })[view.screen]();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && view.screen === 'draw') keepAwake(true);
  });
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js');
  render();
})();
