// ===== Enhanced Dark Mode Toggle =====
const darkModeToggle = {
  init() {
    this.toggleBtn = document.getElementById('toggle-dark-mode');
    this.loadPreference();
    this.setupEventListeners();
  },

  loadPreference() {
    const storedPref = localStorage.getItem('darkMode');
    const systemPrefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDarkMode(storedPref === null ? systemPrefDark : storedPref === 'true');
  },

  setupEventListeners() {
    this.toggleBtn.addEventListener('click', () => this.toggle());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('darkMode')) this.setDarkMode(e.matches);
    });
  },

  toggle() {
    const isDark = document.body.classList.toggle('dark-mode');
    this.updateUI(isDark);
    localStorage.setItem('darkMode', isDark);
    particles.updateDarkMode(isDark);
  },

  setDarkMode(enable) {
    document.body.classList.toggle('dark-mode', enable);
    this.updateUI(enable);
  },

  updateUI(isDark) {
    this.toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
    this.toggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
};

// ===== Particle Background =====
const particles = {
  canvas: null,
  ctx: null,
  particles: [],
  pixelRatio: window.devicePixelRatio || 1,
  particleSize: 0.3, // cm
  darkMode: false,

  init() {
    this.createCanvas();
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  },

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.opacity = '0.15';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  },

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Convert 0.3cm to pixels (1cm ≈ 37.8px)
    const sizeInPx = this.particleSize * 37.8 * this.pixelRatio;
    
    this.canvas.width = width * this.pixelRatio;
    this.canvas.height = height * this.pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    
    // Adjust particle count based on screen size
    this.particleCount = Math.min(width * height / 5000, 150);
    
    // Recreate particles with new size
    this.createParticles(sizeInPx);
  },

  createParticles(sizeInPx = this.particleSize * 37.8 * this.pixelRatio) {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: sizeInPx,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: `hsla(${Math.random() * 60 + 270}, 80%, 60%, ${Math.random() * 0.3 + 0.1})`
      });
    }
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Bounce off edges
      if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
      
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  },

  updateDarkMode(isDark) {
    this.darkMode = isDark;
    this.canvas.style.opacity = isDark ? '0.08' : '0.15';
  }
};

// ===== Dynamic Heading Animation =====
const headingAnimator = {
  init() {
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      if (!heading.classList.contains('no-animate')) {
        this.animateHeading(heading);
      }
    });
  },

  animateHeading(heading) {
    const originalText = heading.textContent;
    heading.textContent = '';
    heading.style.overflow = 'hidden';
    
    for (let i = 0; i < originalText.length; i++) {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = originalText[i];
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(1em)';
      span.style.opacity = '0';
      span.style.transition = `transform 0.5s cubic-bezier(0.5, 0, 0.5, 1) ${i * 0.05}s, opacity 0.5s ease ${i * 0.05}s`;
      heading.appendChild(span);
    }
    
    // Trigger animation
    setTimeout(() => {
      heading.querySelectorAll('.char').forEach(char => {
        char.style.transform = 'translateY(0)';
        char.style.opacity = '1';
      });
    }, 100);
  }
};

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  darkModeToggle.init();
  particles.init();
  headingAnimator.init();
  
  // Add smooth transitions after load
  setTimeout(() => {
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  }, 100);
});

// ===== Add Styles =====
const style = document.createElement('style');
style.textContent = `
  /* Dark Mode Toggle */
  #toggle-dark-mode {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }
  
  #toggle-dark-mode:hover {
    transform: scale(1.1);
  }
  
  /* Particle Background */
  canvas {
    pointer-events: none;
  }
  
  /* Heading Animations */
  h1, h2, h3, h4, h5, h6:not(.no-animate) {
    display: inline-block;
  }
  
  .char {
    will-change: transform, opacity;
  }
  
  /* Smooth transitions */
  body, [data-dark-mode] {
    transition: background-color 0.5s ease, color 0.5s ease;
  }
`;
document.head.appendChild(style);
