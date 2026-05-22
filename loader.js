/* ===================================================================
   YEDIDYA — INTRO LOADER (cinéma avec vidéo réelle)
=================================================================== */

(function () {
  // Force avec ?intro=1 ; sinon skip si déjà vu en session
  const force = new URLSearchParams(location.search).has('intro');
  const seen = sessionStorage.getItem('yedidya-intro-seen');
  if (seen && !force) return;

  // ----- DOM -----
  document.body.classList.add('intro-active');

  const loader = document.createElement('div');
  loader.id = 'intro-loader';
  loader.className = 'intro-loader';
  loader.innerHTML = `
    <button class="intro-skip" aria-label="Passer l'intro">
      Passer →
    </button>

    <!-- Vidéo en background -->
    <div class="intro-video-wrap">
      <video class="intro-video"
             autoplay
             muted
             loop
             playsinline
             preload="auto"
             poster="../assets/video/yedidya-kids-poster.jpg">
        <source src="../assets/video/yedidya-kids.webm" type="video/webm" />
        <source src="../assets/video/yedidya-kids.mp4"  type="video/mp4" />
      </video>
      <div class="intro-video-overlay"></div>
    </div>

    <div class="intro-particles"></div>

    <!-- STAGE 1 : LOGO + Citation -->
    <div class="intro-stage intro-stage-1 active" data-stage="1">
      <img class="intro-logo" src="../assets/logo/logo-yedidya-270.png" alt="Yedidya" />
      <p class="intro-tagline">
        « La religion authentique consiste à aider les orphelins<br/>
        et les veuves dans leurs détresses »
      </p>
    </div>

    <!-- STAGE 2 : Légendes poétiques pendant la vidéo -->
    <div class="intro-stage intro-stage-2" data-stage="2">
      <div class="intro-caption" id="intro-caption"></div>
    </div>

    <!-- STAGE 3 : INVITATION finale -->
    <div class="intro-stage intro-stage-3" data-stage="3">
      <div class="intro-message">
        <h1>Bienvenue chez<br/><em>Yedidya</em>.</h1>
        <p>
          Depuis 2020, une maison à Butembo<br/>
          accueille les enfants oubliés de l'Est-Congo.<br/>
          Aujourd'hui, ils ont besoin de vous.
        </p>
        <div class="intro-stats">
          <div class="intro-stat"><strong>42</strong><span>ENFANTS ACCUEILLIS</span></div>
          <div class="intro-stat"><strong>6</strong><span>ANS DE MISSION</span></div>
          <div class="intro-stat"><strong>★</strong><span>VALIDÉ UNICEF</span></div>
        </div>
        <button class="intro-enter" type="button">
          Entrer dans la maison <span class="arrow">↓</span>
        </button>
      </div>
    </div>

    <div class="intro-progress">
      <div class="intro-progress-bar"></div>
    </div>
  `;
  document.body.prepend(loader);

  const $  = sel => loader.querySelector(sel);
  const $$ = sel => loader.querySelectorAll(sel);

  // ----- Particules dorées (au-dessus de la vidéo) -----
  const particles = document.createElement('div');
  particles.className = 'intro-particles-overlay';
  loader.appendChild(particles);
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    particles.appendChild(p);
  }

  // ----- Vidéo : forcer autoplay même si bloqué -----
  const video = $('.intro-video');
  video.play().catch(() => {
    // Autoplay bloqué — afficher poster + lancer à la première interaction
    document.addEventListener('click', () => video.play(), { once: true });
  });

  // ----- Stages & timings -----
  const stages = {
    s1: $('[data-stage="1"]'),
    s2: $('[data-stage="2"]'),
    s3: $('[data-stage="3"]')
  };
  const caption = $('#intro-caption');
  const progressBar = $('.intro-progress-bar');

  // 4 légendes poétiques pendant la vidéo (2s chacune)
  const CAPTIONS = [
    'Quelque part à Butembo…',
    'Un sourire.',
    'Un foyer.',
    'Une famille.'
  ];
  const CAPTION_DURATION = 2200; // ms

  const TIMINGS = {
    stage1_end: 2000,
    stage2_start: 2000,
    stage2_end:   2000 + CAPTIONS.length * CAPTION_DURATION,
    stage3_start: 0
  };
  TIMINGS.stage3_start = TIMINGS.stage2_end;
  const TOTAL = TIMINGS.stage3_start + 200;

  let timeouts = [];
  let progressInterval = null;
  let dismissed = false;

  function setProgress(elapsed) {
    if (!progressBar) return;
    const pct = Math.min(100, (elapsed / TOTAL) * 100);
    progressBar.style.width = pct + '%';
  }

  function showStage(name) {
    Object.values(stages).forEach(el => el.classList.remove('active'));
    stages[name].classList.add('active');
  }

  function showCaption(idx) {
    caption.classList.remove('show');
    setTimeout(() => {
      caption.textContent = CAPTIONS[idx];
      caption.classList.add('show');
    }, 220);
  }

  function dismiss(immediate = false) {
    if (dismissed) return;
    dismissed = true;
    timeouts.forEach(clearTimeout);
    clearInterval(progressInterval);

    sessionStorage.setItem('yedidya-intro-seen', '1');

    // Fade out vidéo proprement
    if (video) {
      video.style.transition = 'opacity .5s';
      video.style.opacity = '0';
    }

    if (immediate) {
      loader.style.transition = 'opacity .3s ease';
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
        document.body.classList.remove('intro-active');
      }, 320);
    } else {
      loader.classList.add('hide');
      setTimeout(() => {
        loader.remove();
        document.body.classList.remove('intro-active');
      }, 1300);
    }
  }

  // ----- Timeline -----
  const t = (ms, fn) => timeouts.push(setTimeout(fn, ms));

  const startedAt = performance.now();
  progressInterval = setInterval(() => {
    if (dismissed) return;
    setProgress(performance.now() - startedAt);
  }, 80);

  // Stage 2 démarre + légendes en séquence
  t(TIMINGS.stage2_start, () => showStage('s2'));
  CAPTIONS.forEach((_, i) => {
    t(TIMINGS.stage2_start + i * CAPTION_DURATION, () => showCaption(i));
  });

  // Stage 3 : invitation finale (la vidéo continue en background)
  t(TIMINGS.stage3_start, () => {
    showStage('s3');
    setProgress(TOTAL);
  });

  // Skip & Enter
  $('.intro-skip').addEventListener('click', () => dismiss(true));
  $('.intro-enter').addEventListener('click', () => dismiss());

  // Skip avec Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !dismissed) dismiss(true);
  });
})();
