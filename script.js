// ── TYPED TEXT ──────────────────────────────────────
const roles = ['CS Student', 'Web Developer', 'Problem Solver', 'Open-Source Fan'];
let ri = 0, ci = 0, del = false;
const typed = document.getElementById('typed');
(function tick() {
  const cur = roles[ri];
  typed.textContent = cur.slice(0, ci += del ? -1 : 1);
  if (!del && ci === cur.length) { del = true; return setTimeout(tick, 1600); }
  if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(tick, del ? 60 : 100);
})();

// ── NAVBAR SCROLL + ACTIVE LINK ─────────────────────
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.links a');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 50);
  document.getElementById('top').classList.toggle('show', scrollY > 400);
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 120 && scrollY < s.offsetTop + s.offsetHeight - 120) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + s.id));
    }
  });
});

// ── SCROLL REVEAL + SKILL BARS ──────────────────────
const observer = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('show');
  e.target.querySelectorAll('.bar div').forEach(b => b.style.width = b.dataset.w);
  observer.unobserve(e.target);
}), { threshold: 0.15 });
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// ── PROJECT FILTER ───────────────────────────────────
document.querySelectorAll('.f').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.f').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('[data-c]').forEach(c =>
    c.classList.toggle('hide', btn.dataset.f !== 'all' && c.dataset.c !== btn.dataset.f)
  );
}));

// ── CONTACT FORM ─────────────────────────────────────
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, msg = document.getElementById('msg');
  const ok = f.name.value.trim() && f.email.value.includes('@') && f.msg.value.trim();
  msg.textContent = ok ? '✅ Sent! I\'ll get back to you soon.' : '❌ Please fill all fields correctly.';
  msg.className = ok ? 'ok' : 'err';
  if (ok) f.reset();
});

// ── FOOTER YEAR ──────────────────────────────────────
document.getElementById('yr').textContent = new Date().getFullYear();
