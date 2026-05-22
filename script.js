/* ===================================================================
   YEDIDYA — Version 2 "La Maison"
   Interactions : don granulaire, live banner, scroll reveal
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. BANDEAU LIVE — jour & heure de Butembo ---------- */
  const dayEl = document.getElementById('day-label');
  const timeEl = document.getElementById('time-label');
  if (dayEl && timeEl) {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const updateLive = () => {
      // Butembo est en CAT (UTC+2)
      const now = new Date();
      const butembo = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lubumbashi' }));
      dayEl.textContent = days[butembo.getDay()];
      timeEl.textContent = butembo.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };
    updateLive();
    setInterval(updateLive, 60000);
  }

  /* ---------- 2. SCROLL REVEAL ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(r => io.observe(r));

  /* ---------- 3. MODULE DE DON GRANULAIRE ---------- */
  const state = {
    amount: 25,
    customAmount: null,
    label: 'Une semaine de repas pour 1 enfant',
    freq: 'once'
  };

  const HELLOASSO_BASE = 'https://www.helloasso.com/associations/yedidya/formulaires/1';

  const $ = sel => document.querySelector(sel);
  const $$ = sel => document.querySelectorAll(sel);

  const giftLabelEl = $('#gift-label');
  const giftTotalEl = $('#gift-total');
  const giftFreqEl  = $('#gift-freq-label');
  const giftSubmit  = $('#gift-submit');

  function updateGiftUI() {
    const amount = state.customAmount || state.amount;
    if (giftLabelEl) giftLabelEl.textContent = state.label;
    if (giftTotalEl) giftTotalEl.textContent = (amount === 'custom' ? '...' : amount + ' €');
    if (giftFreqEl)  giftFreqEl.textContent = state.freq === 'monthly' ? '/mois à Yedidya' : 'à Yedidya';
  }

  // Boutons gift (les 12 cadeaux)
  $$('.gift').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.gift').forEach(g => g.classList.remove('active'));
      btn.classList.add('active');

      if (btn.dataset.amount === 'custom') {
        const v = prompt('Combien voulez-vous offrir ? (en €)', '50');
        const val = parseFloat(v);
        if (!isNaN(val) && val > 0) {
          state.customAmount = Math.round(val);
          state.amount = state.customAmount;
          state.label = 'Don libre de ' + state.customAmount + ' €';
        } else {
          // Annulé → repli sur 25 € comme défaut
          $$('.gift').forEach(g => g.classList.remove('active'));
          $$('.gift')[5].classList.add('active');
          state.amount = 25;
          state.customAmount = null;
          state.label = 'Une semaine de repas pour 1 enfant';
        }
      } else {
        state.customAmount = null;
        state.amount = parseInt(btn.dataset.amount, 10);
        state.label = btn.dataset.label;
      }

      updateGiftUI();
    });
  });

  // Fréquence
  $$('.donate-freq button').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.donate-freq button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.freq = btn.dataset.freq;
      updateGiftUI();
    });
  });

  // Submit
  if (giftSubmit) {
    giftSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const amount = state.customAmount || state.amount;
      const params = new URLSearchParams({
        amount: amount,
        frequency: state.freq === 'monthly' ? 'monthly' : 'once',
        gift: state.label
      });
      const url = `${HELLOASSO_BASE}?${params.toString()}`;

      // Démo : alerte (en prod : window.location.href = url)
      alert(
        `💛 Démo HelloAsso\n\n` +
        `Vous offrez : ${state.label}\n` +
        `Montant : ${amount} €\n` +
        `Fréquence : ${state.freq === 'monthly' ? 'Chaque mois' : 'Une fois'}\n\n` +
        `Redirection prévue vers :\n${url}`
      );
    });
  }

  /* ---------- 4. MENU MOBILE ---------- */
  const toggle = $('.menu-toggle');
  const navRooms = $('.nav-rooms');
  if (toggle && navRooms) {
    toggle.addEventListener('click', () => {
      const isOpen = navRooms.style.display === 'flex';
      if (isOpen) {
        navRooms.style.display = '';
      } else {
        Object.assign(navRooms.style, {
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '72px',
          right: '18px',
          background: 'var(--ivoire)',
          padding: '16px 20px',
          borderRadius: '16px',
          boxShadow: 'var(--shadow)',
          gap: '4px',
          alignItems: 'stretch',
          minWidth: '200px'
        });
      }
    });
  }

  /* ---------- 5. SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || !id) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Ferme le menu mobile si ouvert
        if (navRooms && navRooms.style.position === 'absolute') {
          navRooms.style.display = '';
        }
      }
    });
  });

  updateGiftUI();
});
