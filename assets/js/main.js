// main.js — scroll animations, project modal, nav active state, parallax.
// PROJECTS must be loaded before this file (see index.html script order).

(function () {
  'use strict';

  // ── modal ─────────────────────────────────────────────────────────────────

  const overlay    = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody  = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  function openModal(idx) {
    if (!PROJECTS || !PROJECTS[idx]) return;
    const p = PROJECTS[idx];

    // title via textContent — no injection possible
    modalTitle.textContent = p.title;

    // tags from static data — safe to set as innerHTML
    const tagsHtml = p.tags
      .map(function (t) { return '<span class="modal-tag">' + t + '</span>'; })
      .join('');

    // body and github from static data — safe
    modalBody.innerHTML =
      '<div class="modal-tags">' + tagsHtml + '</div>' +
      p.body +
      '<a href="' + p.github + '" target="_blank" rel="noopener noreferrer" class="modal-link">' +
      'View on GitHub &rarr;</a>';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // wire project rows — data-project attribute drives which entry opens
  document.querySelectorAll('.proj-row').forEach(function (row) {
    row.addEventListener('click', function () {
      const idx = parseInt(row.dataset.project, 10);
      if (!isNaN(idx)) openModal(idx);
    });

    // keyboard accessibility — Enter and Space open the modal
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(row.dataset.project, 10);
        if (!isNaN(idx)) openModal(idx);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // ── scroll fade-in ────────────────────────────────────────────────────────

  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 80);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(function (el) { fadeObserver.observe(el); });

  // ── timeline ──────────────────────────────────────────────────────────────

  const tlItems = document.querySelectorAll('.tl-item');

  const tlObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 100);
      }
    });
  }, { threshold: 0.12 });

  tlItems.forEach(function (el) { tlObserver.observe(el); });

  // ── nav active state ──────────────────────────────────────────────────────

  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('nav a');

  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const target = '#' + entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === target);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(function (s) { navObserver.observe(s); });

  // ── hero parallax ─────────────────────────────────────────────────────────
  // passive listener — never blocks scroll

  const heroName = document.querySelector('h1.name');
  if (heroName) {
    window.addEventListener('scroll', function () {
      heroName.style.transform = 'translateY(' + (window.scrollY * 0.05) + 'px)';
    }, { passive: true });
  }

})();
