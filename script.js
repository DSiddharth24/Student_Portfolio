/* =============================================
   STUDENT PORTFOLIO — script.js
   Features:
   1. Navbar: scroll shadow + shrink
   2. Hamburger mobile menu
   3. Active nav link on scroll
   4. Typed / rotating text in hero
   5. Scroll-reveal animations
   6. Skill progress bars animate on view
   7. Project card filter tabs
   8. Contact form validation + feedback
   9. Back-to-top button
   10. Current year in footer
============================================= */

/* ── 1. NAVBAR SCROLL EFFECT ─────────────────── */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ── 2. HAMBURGER MENU ───────────────────────── */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

/* ── 3. ACTIVE NAV LINK ON SCROLL ────────────── */
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

const activateNav = () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navItems.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (match) match.classList.add('active');
    }
  });
};

window.addEventListener('scroll', activateNav);

/* ── 4. TYPED / ROTATING TEXT ───────────────── */
const roles = [
  'Computer Science Student',
  'Aspiring Developer',
  'Problem Solver',
  'Open-Source Enthusiast',
  'UI Tinkerer',
];

const typedEl   = document.getElementById('typed-role');
let   roleIndex = 0;
let   charIndex = 0;
let   isDeleting = false;

function type() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;          // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
    delay = 300;
  }

  setTimeout(type, delay);
}

type();

/* ── 5. SCROLL-REVEAL ────────────────────────── */
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .about-stats, .contact-card, .section-title'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach(el => {
  el.classList.add('hidden');
  revealObserver.observe(el);
});

/* ── 6. SKILL PROGRESS BARS ─────────────────── */
const skillBars = document.querySelectorAll('.skill-bar-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.level;
        barObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach(bar => barObserver.observe(bar));

/* ── 7. PROJECT FILTER TABS ──────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tag = card.dataset.category;
      if (filter === 'all' || tag === filter) {
        card.classList.remove('hidden-card');
      } else {
        card.classList.add('hidden-card');
      }
    });
  });
});

/* ── 8. CONTACT FORM ─────────────────────────── */
const form      = document.getElementById('contact-form');
const formMsg   = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear previous state
  formMsg.className = 'form-message';
  formMsg.textContent = '';

  if (!name || !email || !message) {
    showMsg('Please fill in all fields.', 'error');
    return;
  }
  if (!emailRe.test(email)) {
    showMsg('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate sending
  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    showMsg('Message sent! I\'ll get back to you soon. 🎉', 'success');
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 1200);
});

function showMsg(text, type) {
  formMsg.textContent = text;
  formMsg.classList.add(type);
}

/* ── 9. BACK-TO-TOP BUTTON ───────────────────── */
const topBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    topBtn.classList.add('visible');
  } else {
    topBtn.classList.remove('visible');
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── 10. CURRENT YEAR ────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
