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
  
  // Update progress bars for dark mode
  document.querySelectorAll('.progress-container').forEach(container => {
    container.style.background = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)';
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

// ===== Fixed Programming Languages Progress Chart =====
const animateProgressBars = () => {
  document.querySelectorAll('.progress-container').forEach(container => {
    const skillName = container.dataset.skill;
    const targetWidth = container.dataset.percent;
    const fill = container.querySelector('.progress-fill');
    
    // Set initial state
    fill.style.width = '0';
    fill.style.transition = 'none';
    
    // Animate to target width
    setTimeout(() => {
      fill.style.width = targetWidth + '%';
      fill.style.transition = 'width 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
      
      // Add percentage text
      const percentText = document.createElement('span');
      percentText.className = 'progress-percent';
      percentText.textContent = targetWidth + '%';
      container.appendChild(percentText);
      
      // Animate percentage text
      setTimeout(() => {
        percentText.style.opacity = '1';
        percentText.style.transform = 'translateX(0)';
      }, 1500);
    }, 100);
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

// ===== Giant Particle Animation =====
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = darkMode ? '0.15' : '0.2';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Giant Particle class
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
      this.size = Math.random() * 25 + 15; // 15-40px size range
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -50;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.speedY = Math.random() * 1 + 0.5;
      this.size = Math.random() * 25 + 15; // 15-40px
      this.opacity = Math.random() * 0.5 + 0.3;
      this.colorAngle = Math.random() * 40 + 260; // Purple range
      this.wobble = Math.random() * 15;
      this.wobbleSpeed = Math.random() * 0.008 + 0.002;
      this.wobbleOffset = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.008 + 0.002;
      this.baseSize = this.size;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.01 - 0.005;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      
      // Wobble and pulse effects
      this.x += Math.sin(Date.now() * this.wobbleSpeed + this.wobbleOffset) * this.wobble;
      this.size = this.baseSize + Math.sin(Date.now() * this.pulseSpeed) * (this.baseSize * 0.2);
      
      // Reset if off-screen
      if (this.y > height + 100 || this.x < -100 || this.x > width + 100) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      // Create gradient
      const gradient = ctx.createRadialGradient(
        0, 0, this.size * 0.2,
        0, 0, this.size
      );
      gradient.addColorStop(0, `hsla(${this.colorAngle}, 90%, 80%, ${this.opacity})`);
      gradient.addColorStop(0.7, `hsla(${this.colorAngle}, 85%, 65%, ${this.opacity * 0.7})`);
      gradient.addColorStop(1, `hsla(${this.colorAngle}, 80%, 50%, 0)`);
      
      // Draw particle with glow
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = `hsla(${this.colorAngle}, 80%, 60%, ${this.opacity * 0.4})`;
      ctx.fill();
      
      // Optional: Add subtle noise texture
      if (this.size > 25) {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * this.size * 0.8;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * dist, Math.sin(angle) * dist);
        }
        ctx.strokeStyle = `hsla(${this.colorAngle}, 50%, 90%, ${this.opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      ctx.restore();
    }
  }

  // Create giant particles (fewer in number)
  const particles = [];
  const particleCount = Math.min(width * height / 20000, 80);

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  function animate() {
    // Clear with fade
    ctx.fillStyle = darkMode ? 'rgba(10, 5, 20, 0.4)' : 'rgba(240, 240, 255, 0.4)';
    ctx.fillRect(0, 0, width, height);
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }

  // Handle resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Adjust particle count
    const newCount = Math.min(width * height / 20000, 80);
    while (particles.length < newCount) {
      particles.push(new Particle());
    }
    particles.length = newCount;
  });

  // Start animation
  animate();
}

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
  
  .progress-container {
    position: relative;
    width: 100%;
    height: 20px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 15px 0;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(90deg, #8c3bff, #b07aff);
    width: 0;
    position: relative;
    transition: width 1.5s cubic-bezier(0.22, 0.61, 0.36, 1) !important;
  }
  
  .progress-percent {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) translateX(10px);
    font-size: 0.8rem;
    color: #333;
    opacity: 0;
    transition: all 0.5s ease 1.5s;
  }
  
  body.dark-mode .progress-container {
    background: rgba(255, 255, 255, 0.05);
  }
  
  body.dark-mode .progress-percent {
    color: #fff;
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

// Initialize particles
initParticles();


// Select all progress bars
const progressBars = document.querySelectorAll('.progress-fill');

// Define the progress percentage for each skill
const progressData = {
  java: 70,
  python: 85,
  htmlcss: 90,
  php: 75,
  sql: 80,
  cpp: 60,
  csharp: 65
};

// Function to update progress bars
function updateProgressBars() {
  progressBars.forEach((bar) => {
    const className = bar.parentElement.classList[1]; // Get the class from the parent element (e.g., 'progress-java')
    const skill = className.replace('progress-', ''); // Remove 'progress-' to match the keys in progressData
    const width = progressData[skill]; // Get the width from the data object

    if (width) {
      bar.style.width = `${width}%`; // Set the width of the progress bar
    }
  });
}

// Trigger the progress bar update when the section is in view
window.addEventListener('scroll', () => {
  const section = document.getElementById('programming-languages');
  const sectionPosition = section.getBoundingClientRect();
  
  if (sectionPosition.top <= window.innerHeight && sectionPosition.bottom >= 0) {
    updateProgressBars();
  }
});


initParticles();

// ===== Dynamic Copyright Year =====
const yearElement = document.getElementById('copyright-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
