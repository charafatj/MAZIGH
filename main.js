/* MAZIGH — ⵎⴰⵣⵉⵖ */

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

function closeMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// Quick Add buttons
document.querySelectorAll('.btn--white.btn--sm').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    showToast();
  });
});

// Product card click
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => showToast());
});

// Size selection
document.querySelectorAll('.product-card__sizes span').forEach(span => {
  span.addEventListener('click', (e) => {
    e.stopPropagation();
    const siblings = span.parentElement.querySelectorAll('span');
    siblings.forEach(s => s.classList.remove('active'));
    span.classList.add('active');
  });
});

// Toast notification
let toastTimer;
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Newsletter form
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Eingeschrieben!';
  btn.style.background = '#3a7a3a';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Einschreiben';
    btn.style.background = '';
  }, 3000);
}

// Scroll reveal
const observerOptions = {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply reveal to elements
const revealEls = document.querySelectorAll(
  '.product-card, .motif-card, .value, .roots__right, .story__content'
);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`;
  revealObserver.observe(el);
});

// Parallax on hero floating letters
document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (clientX - cx) / cx;
  const dy = (clientY - cy) / cy;

  document.querySelectorAll('.hero__float').forEach((el, i) => {
    const depth = (i + 1) * 8;
    el.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
}, { passive: true });
