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
      icon.style.transform = 'scale(1.2) rotate(10deg)';
      icon.style.color = '#8c3bff';
    }
  });
  
  item.addEventListener('mouseleave', () => {
    const icon = item.querySelector('i, .custom-skill-icon');
    if (icon) {
      icon.style.transform = '';
      icon.style.color = '';
    }
  });
});

// ===== Project Card Tilt Effect =====
document.querySelectorAll('.project-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const x = e.clientX - card.getBoundingClientRect().left;
    const y = e.clientY - card.getBoundingClientRect().top;
    const centerX = card.offsetWidth / 2;
    const centerY = card.offsetHeight / 2;
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
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
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
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
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  }
`;
document.head.appendChild(style); 
// 1. ANIMATED BACKGROUND PARTICLES
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.3';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = window.innerWidth / 5;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#8c3bff';
    
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
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

// 2. INTERACTIVE SKILL BUBBLES
function enhanceSkills() {
  const skillsContainer = document.querySelector('.skills-grid');
  if (!skillsContainer) return;
  
  skillsContainer.addEventListener('mousemove', (e) => {
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach(skill => {
      const rect = skill.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      skill.style.setProperty('--mouse-x', `${x}px`);
      skill.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 3. DYNAMIC THEME COLOR BASED ON TIME
function updateThemeColor() {
  const hour = new Date().getHours();
  const root = document.documentElement;
  
  if (hour >= 6 && hour < 18) {
    root.style.setProperty('--primary-color', '#8c3bff'); // Day color
  } else {
    root.style.setProperty('--primary-color', '#6a1b9a'); // Night color
  }
}

// 4. SCROLL-BASED ANIMATIONS
function scrollAnimations() {
  const scrollElements = document.querySelectorAll('[data-scroll]');
  
  const elementInView = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) / 1.5
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('scrolled');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
      if (elementInView(el)) {
        displayScrollElement(el);
      }
    });
  };
  
  window.addEventListener('scroll', handleScrollAnimation);
  handleScrollAnimation();
}

// 5. INTERACTIVE CONSOLE LOGO
function consoleLogo() {
  const logo = document.querySelector('.logo');
  if (!logo) return;
  
  logo.addEventListener('click', () => {
    console.log('%c👋 Hello fellow developer!', 'font-size: 20px; color: #8c3bff;');
    console.log('%cCheck out my code on GitHub!', 'font-size: 16px; color: #333;');
  });
}

// 6. REAL-TIME TYPING EFFECT FOR PROJECTS
function typingEffects() {
  const projects = document.querySelectorAll('.project-item h3');
  projects.forEach(project => {
    const originalText = project.textContent;
    project.textContent = '';
    
    let i = 0;
    const type = () => {
      if (i < originalText.length) {
        project.textContent += originalText.charAt(i);
        i++;
        setTimeout(type, Math.random() * 50 + 30);
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        type();
        observer.disconnect();
      }
    });
    
    observer.observe(project);
  });
}

// 7. ANALYTICS FOR INTERACTION TRACKING
function setupAnalytics() {
  const track = (eventName) => {
    console.log(`Tracked: ${eventName}`);
    // Replace with actual analytics code (Google Analytics, etc.)
  };

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      track(`Link Click: ${link.textContent}`);
    });
  });
  
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      track(`Button Click: ${btn.textContent}`);
    });
  });
}

// 8. DYNAMIC CONTENT LOADING
function loadDynamicContent() {
  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.textContent = 'Load More Projects';
  loadMoreBtn.className = 'load-more';
  
  const projectsContainer = document.querySelector('.project-grid');
  if (projectsContainer) {
    projectsContainer.after(loadMoreBtn);
    
    loadMoreBtn.addEventListener('click', async () => {
      loadMoreBtn.textContent = 'Loading...';
      // Simulate API call
      setTimeout(() => {
        const newProject = document.createElement('div');
        newProject.className = 'project-item';
        newProject.innerHTML = `
          <h3>New Project</h3>
          <p>Dynamically loaded project content</p>
        `;
        projectsContainer.appendChild(newProject);
        loadMoreBtn.textContent = 'Load More Projects';
      }, 1000);
    });
  }
}

// 9. CURSOR EFFECTS
function customCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

// 10. VOICE COMMAND SUPPORT
function voiceCommands() {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      if (transcript.includes('dark mode')) {
        document.body.classList.add('dark-mode');
      } else if (transcript.includes('light mode')) {
        document.body.classList.remove('dark-mode');
      }
    };
    
    document.addEventListener('click', () => {
      recognition.start();
      console.log('Voice commands activated. Try saying "dark mode" or "light mode"');
    });
  }
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  enhanceSkills();
  updateThemeColor();
  scrollAnimations();
  consoleLogo();
  typingEffects();
  setupAnalytics();
  loadDynamicContent();
  customCursor();
  voiceCommands();
  
  // Add CSS for new elements
  const style = document.createElement('style');
  style.textContent = `
    .custom-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(140, 59, 255, 0.5);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease;
    }
    
    .cursor-hover {
      transform: translate(-50%, -50%) scale(1.5);
      background: rgba(140, 59, 255, 0.8);
    }
    
    .skill-item {
      position: relative;
      overflow: hidden;
    }
    
    .skill-item::before {
      content: '';
      position: absolute;
      top: var(--mouse-y, 0);
      left: var(--mouse-x, 0);
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, rgba(140,59,255,0.1) 0%, rgba(140,59,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .skill-item:hover::before {
      opacity: 1;
    }
    
    [data-scroll] {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-scroll].scrolled {
      opacity: 1;
      transform: translateY(0);
    }
    
    .load-more {
      display: block;
      margin: 2rem auto;
      padding: 0.8rem 1.5rem;
      background: #8c3bff;
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .load-more:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(140, 59, 255, 0.4);
    }
  `;
  document.head.appendChild(style);
});
