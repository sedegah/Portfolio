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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  darkModeToggle.init();
  
  // Optional: Add smooth transition after load to prevent flash
  setTimeout(() => {
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, 100);
});
