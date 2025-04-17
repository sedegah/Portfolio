// ===== Dark Mode with Local Storage =====
const darkModeToggle = document.getElementById('toggle-dark-mode');
let darkMode = localStorage.getItem('darkMode') === 'true';

function applyDarkMode() {
  document.body.classList.toggle('dark-mode', darkMode);
  darkModeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  darkModeToggle.setAttribute('aria-label', darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  
  // Update particles for dark mode
  if (darkMode) {
    document.querySelector('canvas')?.style?.setProperty('opacity', '0.08');
  } else {
    document.querySelector('canvas')?.style?.setProperty('opacity', '0.15');
  }
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
      
      // Update URL without page jump
      if (history.pushState) {
        history.pushState(null, null, this.getAttribute('href'));
      }
    }
  });
});

// ===== Animate Elements on Scroll =====
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.section, .skill-item, .project-item, .experience-item');
  elements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < window.innerHeight - 100) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
};

// Set initial state for animation
document.querySelectorAll('.section, .skill-item, .project-item, .experience-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// ===== Floating Badge Animation =====
const floatingBadge = document.querySelector('.floating-badge');
if (floatingBadge) {
  const floatAnimation = () => {
    floatingBadge.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      floatingBadge.style.transform = 'translateY(0)';
    }, 1000);
  };
  setInterval(floatAnimation, 2000);
  floatAnimation(); // Initial animation
}

// ===== Skill Item Hover Effects =====
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.05)';
    const icon = item.querySelector('i, .custom-skill-icon');
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(5deg)';
    }
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
    const icon = item.querySelector('i, .custom-skill-icon');
    if (icon) {
      icon.style.transform = '';
    }
  });
});

// ===== Project Card Hover Effect =====
document.querySelectorAll('.project-item').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
    card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
    card.querySelector('.project-image')?.style?.setProperty('filter', 'brightness(1.05)');
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
    card.querySelector('.project-image')?.style?.setProperty('filter', 'brightness(1)');
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
    } else {
      // Add blinking cursor effect after typing completes
      heroText.classList.add('typed');
    }
  };
  
  setTimeout(typeWriter, 500);
}

// ===== Dynamic Text for Projects Section =====
const projectsDynamicText = document.querySelector('.projects-dynamic-text');
if (projectsDynamicText) {
  const words = [
    "That Solve Problems", 
    "That Make Impact",
    "I'm Proud Of",
    "With Modern Tech",
    "That Push Boundaries",
    "With Clean Code",
    "That Inspire Me"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 150;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      projectsDynamicText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 80;
    } else {
      projectsDynamicText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start after hero text completes (approx 2.5s)
  setTimeout(typeEffect, 2500);
}

// ===== Progress Bar Animation =====
const animateProgressBars = () => {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const width = bar.getAttribute('data-width') || bar.style.width;
    bar.style.width = '0';
    bar.style.transition = 'width 0s';
    
    setTimeout(() => {
      bar.style.width = width;
      bar.style.transition = 'width 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)';
    }, 100);
  });
};

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

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
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.id = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Tooltip for Skills =====
document.querySelectorAll('.skill-item').forEach(skill => {
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  tooltip.textContent = skill.dataset.skill || skill.querySelector('span').textContent;
  skill.appendChild(tooltip);
  
  skill.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
    tooltip.style.transform = 'translateX(-50%) translateY(0)';
  });
  
  skill.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
    tooltip.style.transform = 'translateX(-50%) translateY(10px)';
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
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
  
  #scroll-to-top:hover {
    opacity: 1;
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 5px 20px rgba(140, 59, 255, 0.5);
  }
  
  .skill-tooltip {
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: #8c3bff;
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    white-space: nowrap;
    z-index: 10;
    font-weight: 500;
  }
  
  body.dark-mode .skill-tooltip {
    background: #b07aff;
    color: #fff;
  }
  
  .project-item {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
  }
  
  .progress-fill {
    transition: width 1.2s cubic-bezier(0.22, 0.61, 0.36, 1) !important;
  }
  
  .projects-dynamic-text {
    color: #8c3bff;
    font-weight: 600;
    margin-left: 8px;
    display: inline-block;
    min-width: 200px;
  }
  
  body.dark-mode .projects-dynamic-text {
    color: #b07aff;
  }
  
  h1.typed {
    position: relative;
  }
  
  h1.typed::after {
    content: '|';
    position: absolute;
    animation: blink 1s infinite;
    color: #8c3bff;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
document.head.appendChild(style);

// ===== Animated Background Particles =====
// ===== Enhanced Particle Animation =====
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = darkMode ? '0.08' : '0.15';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Particle class for better organization
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 3 + 1;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.colorAngle = Math.random() * 30 + 270; // Purple range
      this.wobble = Math.random() * 5;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      this.wobbleOffset = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Add slight wobble effect
      this.x += Math.sin(Date.now() * this.wobbleSpeed + this.wobbleOffset) * this.wobble;
      
      // Reset particles that go off screen
      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      // Create gradient for each particle
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size
      );
      gradient.addColorStop(0, `hsla(${this.colorAngle}, 80%, 70%, ${this.opacity})`);
      gradient.addColorStop(1, `hsla(${this.colorAngle}, 80%, 50%, ${this.opacity * 0.3})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = `hsla(${this.colorAngle}, 80%, 60%, ${this.opacity * 0.5})`;
    }
  }

  // Create particles
  const particles = [];
  const particleCount = Math.min(width * height / 5000, 300); // Density-based count

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  let lastTime = 0;
  const fps = 60;
  const frameDelay = 1000 / fps;

  function animate(currentTime) {
    if (!lastTime || currentTime - lastTime >= frameDelay) {
      lastTime = currentTime;
      
      // Clear with fade effect for motion blur
      ctx.fillStyle = darkMode ? 'rgba(10, 5, 20, 0.2)' : 'rgba(240, 240, 255, 0.2)';
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      ctx.shadowBlur = 0;
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
    }
    
    requestAnimationFrame(animate);
  }

  // Handle resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Adjust particle count based on new size
    const newCount = Math.min(width * height / 5000, 300);
    while (particles.length < newCount) {
      particles.push(new Particle());
    }
    particles.length = newCount;
  });

  // Start animation
  animate(0);
}

// Initialize enhanced particles
initParticles();
