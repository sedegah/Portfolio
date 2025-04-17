// ===== Dark Mode with Local Storage =====
const darkModeToggle = document.getElementById('toggle-dark-mode');
let darkMode = localStorage.getItem('darkMode') === 'true';
let particlesCanvas = null;
let animationFrameId = null;

function applyDarkMode() {
  document.body.classList.toggle('dark-mode', darkMode);
  darkModeToggle.textContent = darkMode ? '☀️' : '🌙';
  darkModeToggle.setAttribute('aria-label', darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  
  // Update particle colors
  const lightness = darkMode ? '60%' : '30%';
  const saturation = '80%';
  const baseHue = 270;
  particles.forEach(p => {
    p.color = `hsla(${Math.random() * 60 + baseHue}, ${saturation}, ${lightness}, ${p.color.split(',')[3]}`;
  });
}

darkModeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  applyDarkMode();
});

applyDarkMode();

// ===== Smooth Scrolling with Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Animate Elements on Scroll =====
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.section, .skill-item, .project-item');
  elements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < window.innerHeight - 100) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
};

document.querySelectorAll('.section, .skill-item, .project-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

// ===== Floating Badge Animation =====
const floatingBadge = document.querySelector('.floating-badge');
if (floatingBadge) {
  setInterval(() => {
    floatingBadge.style.transform = 'translateY(-5px)';
    setTimeout(() => {
      floatingBadge.style.transform = 'translateY(0)';
    }, 1000);
  }, 2000);
}

// ===== Skill Item Hover Effects =====
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const icon = item.querySelector('i, .custom-skill-icon');
    if (icon) {
      icon.style.transform = 'scale(1.1)';
      icon.style.transition = 'transform 0.3s ease';
    }
  });

  item.addEventListener('mouseleave', () => {
    const icon = item.querySelector('i, .custom-skill-icon');
    if (icon) {
      icon.style.transform = '';
    }
  });
});

// ===== Project Card Hover Effect =====
document.querySelectorAll('.project-item').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// ===== Typewriter Effect for Hero Text =====
const heroText = document.querySelector('.hero-content h1');
if (heroText) {
  const phrases = [
    'I build web experiences.',
    'JavaScript is my playground.',
    'Let’s create something amazing!',
    'Tech Developer | Creating Innovative Solutions for Real-World Challenges'
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

  function typePhrase() {
    const currentPhrase = phrases[phraseIndex];
    const displayedText = currentPhrase.slice(0, letterIndex);
    heroText.textContent = displayedText;

    if (!isDeleting && letterIndex < currentPhrase.length) {
      letterIndex++;
      setTimeout(typePhrase, Math.random() * 80 + 30);
    } 
    else if (isDeleting && letterIndex > 0) {
      letterIndex--;
      setTimeout(typePhrase, Math.random() * 40 + 20);
    } 
    else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(typePhrase, 1000);
      } 
      else {
        phraseIndex = phraseIndex === phrases.length - 1 ? 0 : phraseIndex + 1;
        isDeleting = false;
        setTimeout(typePhrase, 500);
      }
    }
  }
  setTimeout(typePhrase, 1000);
}

// ===== Progress Bar Animation =====
const animateProgressBars = () => {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    bar.style.transition = 'width 0s';
    setTimeout(() => {
      bar.style.width = width;
      bar.style.transition = 'width 1.5s ease-out';
    }, 50);
  });
};

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-container').forEach(container => {
  progressObserver.observe(container);
});

// ===== Dynamic Copyright Year =====
const yearElement = document.getElementById('copyright-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.id = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Tooltip for Skills =====
document.querySelectorAll('.skill-item').forEach(skill => {
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  tooltip.textContent = skill.querySelector('span').textContent;
  skill.appendChild(tooltip);

  skill.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
  });

  skill.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
  });
});

// ===== Add CSS for new elements =====
const style = document.createElement('style');
style.textContent = `
  #scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #8c3bff;
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    opacity: 0.9;
    transition: all 0.3s ease;
    z-index: 100;
  }
  #scroll-to-top:hover {
    opacity: 1;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(140, 59, 255, 0.4);
  }
  .skill-tooltip {
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    white-space: nowrap;
    z-index: 10;
  }
  body.dark-mode .skill-tooltip {
    background: #fff;
    color: #333;
  }
  .project-item {
    transition: all 0.3s ease !important;
  }
  .progress-fill {
    transition: width 1.5s ease-out !important;
  }
  canvas {
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
  }
`;
document.head.appendChild(style);

// ===== Mobile-Optimized Animated Background Particles =====
let particles = [];

function initParticles() {
  if (particlesCanvas) {
    document.body.removeChild(particlesCanvas);
    cancelAnimationFrame(animationFrameId);
    particles = [];
  }

  particlesCanvas = document.createElement('canvas');
  particlesCanvas.style.position = 'fixed';
  particlesCanvas.style.top = '0';
  particlesCanvas.style.left = '0';
  particlesCanvas.style.zIndex = '-1';
  particlesCanvas.style.opacity = '0.15';
  particlesCanvas.style.pointerEvents = 'none';
  document.body.appendChild(particlesCanvas);

  const ctx = particlesCanvas.getContext('2d');
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const particleCount = isMobile ? 75 : Math.min(window.innerWidth / 4, 150);
  const baseHue = 270;
  const lightness = darkMode ? '60%' : '30%';
  const saturation = '80%';

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * particlesCanvas.width,
      y: Math.random() * particlesCanvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
      color: `hsla(${Math.random() * 60 + baseHue}, ${saturation}, ${lightness}, ${Math.random() * 0.3 + 0.1})`
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > particlesCanvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > particlesCanvas.height) p.speedY *= -1;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(animateParticles);
  }

  animateParticles();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      particlesCanvas.width = window.innerWidth;
      particlesCanvas.height = window.innerHeight;
      particles.forEach(p => {
        p.x = Math.random() * particlesCanvas.width;
        p.y = Math.random() * particlesCanvas.height;
      });
    }, 200);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animateParticles();
    }
  });
}

// Initialize all components
initParticles();
