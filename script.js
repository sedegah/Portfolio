// script.js

// Dark Mode Toggle
const darkModeToggle = document.getElementById('toggle-dark-mode');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved user preference or use system preference
let darkMode = localStorage.getItem('darkMode') === 'true' || 
               (localStorage.getItem('darkMode') === null && prefersDarkScheme.matches);

// Apply initial mode
updateDarkMode();

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  updateDarkMode();
});

function updateDarkMode() {
  document.body.classList.toggle('dark-mode', darkMode);
  darkModeToggle.textContent = darkMode ? '☀️' : '🌙';
  darkModeToggle.setAttribute('aria-label', darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update URL without page jump
      history.pushState(null, null, targetId);
    }
  });
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.progress-fill');
const observerOptions = {
  threshold: 0.5
};

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
    }
  });
}, observerOptions);

progressBars.forEach(bar => {
  progressObserver.observe(bar);
});

// Add hover effect to project items
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-5px)';
    item.style.boxShadow = '0 10px 25px rgba(140, 59, 255, 0.3)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
    item.style.boxShadow = '';
  });
});

// Form submission handling (if you add a contact form later)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would add your form submission logic
    console.log('Form submitted!');
    // Example: Send data to a server or email service
  });
}

// Dynamic year update for footer (if you add one)
const yearElement = document.getElementById('current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Scroll to top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.id = 'scroll-to-top';
scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.style.opacity = '1';
    scrollToTopButton.style.visibility = 'visible';
  } else {
    scrollToTopButton.style.opacity = '0';
    scrollToTopButton.style.visibility = 'hidden';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Tooltip for skills (enhanced)
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(skill => {
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

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add this CSS for new elements (you can add to your style.css)
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
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(140, 59, 255, 0.3);
    z-index: 99;
  }
  
  #scroll-to-top:hover {
    background: #7a2be8;
    transform: translateY(-3px);
  }
  
  .skill-tooltip {
    position: absolute;
    bottom: -30px;
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
  
  .nav-links a.active {
    color: #8c3bff !important;
    font-weight: bold;
  }
`;
document.head.appendChild(style);
