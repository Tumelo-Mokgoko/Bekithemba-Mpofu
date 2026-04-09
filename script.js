// Extracted from portfolio.html <script> block

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';

  // Make ring black when over yellow sections for contrast
  const el = document.elementFromPoint(mx, my);
  const isOverYellow =
    !!(el && el.closest && (el.closest('#home') || el.closest('nav') || el.closest('.contact-inner')));
  ring.classList.toggle('is-black', isOverYellow);
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .btn, .social-icon, .footer-social, .project-card, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.opacity = '0.85';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '14px';
    cursor.style.height = '14px';
    ring.style.width = '40px';
    ring.style.height = '40px';
    ring.style.opacity = '0.5';
  });
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.skill-card, .project-card, .about-inner, .contact-inner').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  obs.observe(el);
});
