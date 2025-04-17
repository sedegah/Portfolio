// script.js

// ===== Dark Mode with Local Storage =====
const darkModeToggle = document.getElementById('toggle-dark-mode');
let darkMode = localStorage.getItem('darkMode') === 'true';

function applyDarkMode() {
  document.body.classList.toggle('dark-mode', darkMode);
  darkModeToggle.textContent = darkMode ? '☀️' : '🌙';
  darkModeToggle.setAttribute('aria-label', darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
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

// Set initial state for animation
document.querySelectorAll('.section, .skill-item, .project-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

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
  const originalText = heroText.textContent;
  heroText.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < originalText.length) {
      heroText.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, Math.random() * 50 + 30);
    }
  };
  
  setTimeout(typeWriter, 1000);
}

// ===== Progress Bar Animation =====
const animateProgressBars = () => {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    bar.style.transition = 'width 0s'; // Reset transition for initial animation
    setTimeout(() => {
      bar.style.width = width;
      bar.style.transition = 'width 1.5s ease-out'; // Smooth animation
    }, 50);
  });
};

// Run when progress bars are visible
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
`;
document.head.appendChild(style);

// ===== Animated Background Particles =====
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.15';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.min(window.innerWidth / 4, 150);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: `hsla(${Math.random() * 60 + 270}, 80%, 60%, ${Math.random() * 0.3 + 0.1})`
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize particles
initParticles(); i said add the back ground particles movng around
