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

  /* ---------- unlocking: animals open one after the other ---------- */
  function isUnlocked(p, i) { return i === 0 || p.done.includes(ANIMALS[i - 1].id); }
  function nextIndex(p) { return ANIMALS.findIndex((a, i) => isUnlocked(p, i) && !p.done.includes(a.id)); }

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
  const shapeEl = s => `<path class="ink${s.f ? ' fill' : ''}" d="${toPath(s)}"/>`;

  /** SVG of a level's steps [0..upto]; the step at `now` is highlighted. */
  function drawingSVG(level, upto, now = -1, cls = '') {
    const vb = level.view || '0 0 400 400';
    let g = '';
    level.steps.forEach((st, i) => {
      if (i > upto) return;
      g += `<g class="${i === now ? 'now' : ''}">${st.s.map(shapeEl).join('')}</g>`;
    });
    return `<svg class="${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">${g}</svg>`;
  }

  /** Animates the strokes of the highlighted step, one shape after another. */
  function animateNow(root) {
    const paths = [...root.querySelectorAll('.now path')];
    let delay = 250;
    paths.forEach(p => {
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
              <div class="meta">⭐ ${p.done.length} of ${ANIMALS.length} animals · ${LEVELS[p.level]}</div>
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
    const ni = nextIndex(p);
    app.innerHTML = `
      <div class="bar">
        <button class="icon-btn" data-act="home" aria-label="Back">◀</button>
        <h1>${esc(p.name)}'s Zoo</h1>
        <span class="avatar" style="width:48px;height:48px;font-size:26px;background:${p.color}">${p.avatar}</span>
      </div>
      <div class="grid">
        ${ANIMALS.map((a, i) => {
          if (!isUnlocked(p, i)) {
            return `<div class="tile locked"><div class="lock">🔒</div><div class="label">???</div></div>`;
          }
          const done = p.done.includes(a.id);
          const lvl = a.levels[p.level];
          return `
            <button class="tile ${i === ni ? 'next' : ''}" data-i="${i}">
              ${done ? '<span class="badge star">⭐</span>' : '<span class="badge">NEW</span>'}
              ${drawingSVG(lvl, 99, -1, 'thumb' + (done ? '' : ' old'))}
              <div class="label">${a.emoji} ${a.name}</div>
            </button>`;
        }).join('')}
      </div>`;
    app.querySelector('[data-act=home]').onclick = () => go({ screen: 'home' });
    app.querySelectorAll('[data-i]').forEach(b => b.onclick = () =>
      go({ screen: 'draw', pid: p.id, ai: +b.dataset.i, step: 0 }));
  }

  function renderDraw() {
    keepAwake(true);
    const p = profile(view.pid);
    const a = ANIMALS[view.ai];
    const lvl = a.levels[p.level];
    const n = lvl.steps.length;
    const st = lvl.steps[view.step];
    const last = view.step === n - 1;
    app.innerHTML = `
      <div class="draw">
        <div class="bar">
          <button class="icon-btn" data-act="zoo" aria-label="Close">✕</button>
          <h1>${a.emoji} ${a.name}</h1>
          <span class="spacer"></span>
        </div>
        <div class="progress">${lvl.steps.map((_, i) =>
          `<i class="${i < view.step ? 'done' : i === view.step ? 'now' : ''}"></i>`).join('')}</div>
        <div class="canvas">${drawingSVG(lvl, view.step, view.step)}</div>
        <div class="say">
          <p>${esc(st.say)}</p>
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
      const firstTime = !p.done.includes(a.id);
      if (firstTime) { p.done.push(a.id); save(); }
      go({ screen: 'done', pid: p.id, ai: view.ai, firstTime });
    };
  }

  function renderDone() {
    keepAwake(false);
    const p = profile(view.pid);
    const a = ANIMALS[view.ai];
    const lvl = a.levels[p.level];
    const nextA = ANIMALS[view.ai + 1];
    const unlocked = view.firstTime && nextA;
    app.innerHTML = `
      <div class="done-screen">
        <div class="stars">⭐⭐⭐</div>
        <h2>You drew a ${a.name}!</h2>
        <p>Now color it in on your paper 🖍️</p>
        <div class="canvas">${drawingSVG(lvl, 99)}</div>
        ${unlocked ? `<p style="margin-top:14px">🎁 A new animal is waiting in your zoo!</p>` : ''}
        <div class="controls">
          <button class="btn primary go" data-act="zoo">Back to my zoo</button>
        </div>
      </div>`;
    const msg = `Well done ${p.name}! You drew a ${a.name}. Now color it in!` + (unlocked ? ' A new animal is waiting in your zoo.' : '');
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
            <div class="row">Progress: ${p.done.length} / ${ANIMALS.length}
              <span>
                <button class="small-btn" data-act="unlock">Unlock all</button>
                <button class="small-btn danger" data-act="reset">Reset</button>
              </span>
            </div>
          </div>`).join('')}
        <p class="note">Little Artist: fewer, bigger shapes (about ages 4–6).<br>
          Big Artist: more steps and details (about ages 7–10).<br>
          Progress is saved on this phone only.</p>
      </div>`;
    app.querySelector('[data-act=home]').onclick = () => go({ screen: 'home' });
    app.querySelectorAll('.panel').forEach(panel => {
      const p = profile(panel.dataset.p);
      panel.querySelector('.name-input').onchange = e => { p.name = e.target.value.trim() || p.name; save(); };
      panel.querySelectorAll('[data-level]').forEach(b => b.onclick = () => { p.level = b.dataset.level; save(); render(); });
      panel.querySelectorAll('[data-speak]').forEach(b => b.onclick = () => { p.speak = b.dataset.speak === '1'; save(); render(); });
      panel.querySelector('[data-act=unlock]').onclick = () => {
        if (confirm(`Mark all animals as done for ${p.name}?`)) { p.done = ANIMALS.map(a => a.id); save(); render(); }
      };
      panel.querySelector('[data-act=reset]').onclick = () => {
        if (confirm(`Start ${p.name}'s zoo again from the first animal?`)) { p.done = []; save(); render(); }
      };
    });
  }

  /** Developer sheet: every animal, every level, finished. Open with #debug */
  function renderDebug() {
    app.style.maxWidth = 'none';
    app.innerHTML = `<div class="debug">${ANIMALS.flatMap(a => Object.entries(a.levels).map(([k, l]) =>
      `<figure>${drawingSVG(l, 99, l.steps.length - 1)}<figcaption>${a.name} · ${k} · ${l.steps.length} steps</figcaption></figure>`)).join('')}</div>`;
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
    if (location.hash === '#debug') return renderDebug();
    if (!state.setup) return renderSetup();
    ({ home: renderHome, zoo: renderZoo, draw: renderDraw, done: renderDone, settings: renderSettings })[view.screen]();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && view.screen === 'draw') keepAwake(true);
  });
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js');
  render();
})();
