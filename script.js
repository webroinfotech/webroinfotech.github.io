// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('gone'), 700);
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  const [s1, s2, s3] = menuToggle.querySelectorAll('span');
  s1.style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
  s2.style.opacity  = open ? '0' : '1';
  s3.style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

// ===== STICKY HEADER =====
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== SCROLL TO TOP =====
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== REVEAL ON SCROLL =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 85);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== COUNTER ANIMATION =====
const counterData = [
  { id: 'c1', target: 50 },
  { id: 'c2', target: 30 },
  { id: 'c3', target: 3  },
  { id: 'c4', target: 100 },
];

let counted = false;
const statsObs = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting || counted) return;
  counted = true;
  counterData.forEach(({ id, target }) => {
    const el = document.getElementById(id);
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n;
      if (n >= target) clearInterval(t);
    }, 28);
  });
}, { threshold: 0.4 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObs.observe(statsBar);

// ===== SKILL BAR ANIMATION =====
const skillCard = document.querySelector('.skill-card');
if (skillCard) {
  const skillObs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    document.querySelectorAll('.skill-fill').forEach(fill => {
      const w = fill.getAttribute('data-w');
      setTimeout(() => { fill.style.width = w + '%'; }, 200);
    });
    skillObs.disconnect();
  }, { threshold: 0.3 });
  skillObs.observe(skillCard);
}

// ===== TYPING ANIMATION =====
const typedEl = document.getElementById('typedWord');
const words = ['Websites', 'Apps', 'Portals', 'Stores', 'Solutions'];
let wIdx = 0, cIdx = 0, del = false;

function type() {
  const word = words[wIdx];
  typedEl.textContent = del ? word.slice(0, --cIdx) : word.slice(0, ++cIdx);
  if (!del && cIdx === word.length) {
    setTimeout(() => { del = true; type(); }, 1800);
    return;
  }
  if (del && cIdx === 0) {
    del = false;
    wIdx = (wIdx + 1) % words.length;
  }
  setTimeout(type, del ? 60 : 90);
}
setTimeout(type, 1200);

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ===== CONTACT FORM → WHATSAPP =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('name').value;
  const phone   = document.getElementById('phone').value;
  const email   = document.getElementById('email').value;
  const project = document.getElementById('project').value;
  const message = document.getElementById('message').value;

  const text =
`Hello Webro Infotech,

*New Project Inquiry* 🚀

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Project Type:* ${project || 'Not specified'}

*Message:*
${message}`;

  window.open('https://wa.me/919025186952?text=' + encodeURIComponent(text), '_blank');
  this.reset();
});

// ===== SMOOTH SCROLL (offset for fixed nav) =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

console.log('Webro Infotech — Loaded ✅');
