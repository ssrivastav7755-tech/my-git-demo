// ==============================
// JSA Law Modern — script.js
// ==============================

/* --- PRELOADER --- */
window.addEventListener('load', () => {
  const plFill = document.getElementById('plFill');
  const plText = document.getElementById('plText');
  const preloader = document.getElementById('preloader');

  let p = 0;
  const int = setInterval(() => {
    p += Math.random() * 15;
    if (p >= 100) {
      p = 100;
      clearInterval(int);
      plFill.style.width = '100%';
      plText.textContent = 'Ready.';
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.add('loaded');
      }, 500);
    } else {
      plFill.style.width = p + '%';
      plText.textContent = `Loading ${Math.floor(p)}%`;
    }
  }, 40);
});

/* --- CUSTOM CURSOR --- */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

if (window.matchMedia("(pointer: fine)").matches) {
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  const animateTrail = () => {
    const dx = mouseX - trailX;
    const dy = mouseY - trailY;
    trailX += dx * 0.15;
    trailY += dy * 0.15;
    cursorTrail.style.left = `${trailX}px`;
    cursorTrail.style.top = `${trailY}px`;
    requestAnimationFrame(animateTrail);
  };
  animateTrail();

  // Hover states
  document.querySelectorAll('a, button, .tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      cursorTrail.classList.add('hovered');
      if (el.classList.contains('btn')) {
        cursor.classList.add('hovered-btn');
        cursorTrail.classList.add('hovered-btn');
      }
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered', 'hovered-btn');
      cursorTrail.classList.remove('hovered', 'hovered-btn');
    });
  });
}

/* --- SCROLL PROGRESS --- */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + "%";
});

/* --- NAVBAR SCROLL --- */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('visible', window.scrollY > 400);
});

/* --- HAMBURGER (mobile) --- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  if (navLinks.style.display === 'flex') {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.flexDirection = 'column';
    navLinks.style.background = 'rgba(5,5,8,0.98)';
    navLinks.style.padding = '24px';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    navLinks.style.backdropFilter = 'blur(24px)';
  }
});

/* --- REVEAL ON SCROLL --- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* --- 3D TILT EFFECT --- */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // 3D Tilt calculations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Glow effect
    if (card.querySelector('.hc-glow')) {
      card.querySelector('.hc-glow').style.setProperty('--x', `${(x / rect.width) * 100}%`);
      card.querySelector('.hc-glow').style.setProperty('--y', `${(y / rect.height) * 100}%`);
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

/* --- MAGNETIC BUTTONS --- */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0px, 0px)';
  });
});

/* --- HERO TYPING EFFECT --- */
const typingText = document.getElementById('typingText');
if (typingText) {
  const words = ["Redefined.", "Elevated.", "Mastered."];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingText.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 100 : 150;
    if (!isDeleting && charIdx === currentWord.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      speed = 500;
    }
    setTimeout(type, speed);
  }
  setTimeout(type, 1500);
}

/* --- PARTICLE CANVAS --- */
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height, particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > width || this.x < 0) this.speedX *= -1;
      if (this.y > height || this.y < 0) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = `rgba(161, 19, 42, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(161, 19, 42, ${0.1 - dist / 1200})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

/* --- TESTIMONIAL SLIDER --- */
const testCards = document.querySelectorAll('.test-card');
const dots = document.querySelectorAll('.dot');
let current = 0;
let autoSlide;

function showSlide(idx) {
  testCards[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (idx + testCards.length) % testCards.length;
  testCards[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAuto() { autoSlide = setInterval(() => showSlide(current + 1), 6000); }
function stopAuto() { clearInterval(autoSlide); }

const testPrev = document.getElementById('testPrev');
const testNext = document.getElementById('testNext');
if (testPrev && testNext) {
  testPrev.addEventListener('click', () => { stopAuto(); showSlide(current - 1); startAuto(); });
  testNext.addEventListener('click', () => { stopAuto(); showSlide(current + 1); startAuto(); });
  dots.forEach((dot, idx) => dot.addEventListener('click', () => { stopAuto(); showSlide(idx); startAuto(); }));
  startAuto();
}

/* --- NUMBER COUNT-UP --- */
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEls = entry.target.querySelectorAll('.count-up');
      numEls.forEach(el => animateCount(el, parseInt(el.dataset.target), el.dataset.suffix));

      // Animate bars if any
      if (entry.target.classList.contains('count-card')) {
        entry.target.classList.add('visible-card');
      }

      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats, .count-card').forEach(el => countObserver.observe(el));

/* --- CONTACT FORM --- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = document.getElementById('submitBtn');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.8';
    setTimeout(() => {
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = '#10b981';
      submitBtn.style.color = '#fff';
      contactForm.reset();
      setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.style.background = '';
        submitBtn.style.opacity = '1';
      }, 4000);
    }, 1500);
  });
}

/* --- PARALLAX SCROLL --- */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrolled < 800) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled * 0.002);
  }
});
