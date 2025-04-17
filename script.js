// ===== Enhanced Dark Mode Toggle =====
const darkModeToggle = {
  init() {
    this.toggleBtn = document.getElementById('toggle-dark-mode');
    this.loadPreference();
    this.setupEventListeners();
  },

  loadPreference() {
    // Check local storage first, then system preference
    const storedPref = localStorage.getItem('darkMode');
    const systemPrefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedPref === null) {
      // No stored preference, use system preference
      this.setDarkMode(systemPrefDark);
    } else {
      // Use stored preference
      this.setDarkMode(storedPref === 'true');
    }
  },

  setupEventListeners() {
    this.toggleBtn.addEventListener('click', () => this.toggle());
    
    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('darkMode')) { // Only respond if no manual preference set
        this.setDarkMode(e.matches);
      }
    });
  },

  toggle() {
    const isDark = document.body.classList.toggle('dark-mode');
    this.updateUI(isDark);
    localStorage.setItem('darkMode', isDark);
  },

  setDarkMode(enable) {
    if (enable) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    this.updateUI(enable);
  },

  updateUI(isDark) {
    this.toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
    this.toggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    
    // Optional: Update other elements that need dark mode changes
    document.querySelectorAll('[data-dark-mode]').forEach(el => {
      el.style.display = isDark ? 'block' : 'none';
    });
  }
};

// ===== Particles.js for Background =====
function initializeParticles() {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 4,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        }
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}

// ===== Dynamic Text Change =====
function dynamicTextChange() {
  const textElement = document.getElementById('dynamic-text');
  const phrases = [
    "Tech Developer | Creating Innovative Solutions for Real-World Challenges",
    "Software Engineer | Solving Complex Problems with Code",
    "Web Developer | Building Interactive and User-Friendly Web Experiences"
  ];
  let currentIndex = 0;

  function changeText() {
    textElement.textContent = phrases[currentIndex];
    currentIndex = (currentIndex + 1) % phrases.length;
  }

  setInterval(changeText, 3000); // Change text every 3 seconds
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Dark Mode Toggle
  darkModeToggle.init();
  
  // Optional: Add smooth transition after load to prevent flash
  setTimeout(() => {
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, 100);

  // Initialize Particles.js
  initializeParticles();
  
  // Initialize Dynamic Text
  dynamicTextChange();
});
