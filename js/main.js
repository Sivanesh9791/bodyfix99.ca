/* ============================================================
   BodyFix99 — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Sticky header shadow on scroll ─────────────────── */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── 2. Hamburger menu toggle ───────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const headerNav = document.querySelector('.header-nav');

  if (hamburger && headerNav) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      headerNav.classList.toggle('active');
      hamburger.textContent = headerNav.classList.contains('active') ? '✕' : '☰';
    });

    headerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('active');
        hamburger.textContent = '☰';
      });
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.site-header')) {
        headerNav.classList.remove('active');
        hamburger.textContent = '☰';
      }
    });
  }

  /* ── 3. Smooth scroll for anchor links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 4. Active nav link based on current page ───────────── */
  const pageMap = {
    'index.html':               'Home',
    '':                         'Home',
    'sciatica-treatment.html':  'Sciatica Treatment',
    'lower-back-pain.html':     'Lower Back Pain',
    'neck-shoulder-pain.html':  'Neck & Shoulder Pain',
    'concussion-recovery.html': 'Concussion Recovery',
    'headaches-migraines.html': 'Headaches & Migraines',
    'about.html':               'About',
    'contact.html':             'Contact',
  };

  const filename = window.location.pathname.split('/').pop() || '';
  const activeLabel = pageMap[filename] || '';

  // Set active link simply based on text content match
  document.querySelectorAll('.header-nav ul li a').forEach(link => {
    if (link.textContent.trim() === activeLabel) {
      link.classList.add('active');
    }
  });

  /* ── 5. Fade-up scroll animations (Intersection Observer) ── */
  const fadeTargets = document.querySelectorAll(
    '.service-card, .step-card, .feature-box, .credential-card'
  );

  // Add fade-up class to all target elements
  fadeTargets.forEach(el => el.classList.add('fade-up'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeTargets.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeTargets.forEach(el => el.classList.add('visible'));
  }

})();

const header = document.getElementById('site-header');
function handleHeaderScroll() {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll();
