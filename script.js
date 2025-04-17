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
      ctx.shadowColor = `hsla(${this.colorAngle}, 80%, 60%, ${this.opacity * 0.5})`;
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

// Add CSS for progress bars
const progressStyle = document.createElement('style');
progressStyle.textContent = `
  .progress-container {
    position: relative;
    width: 100%;
    height: 20px;
    background: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
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
  }
  
  .progress-percent {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%) translateX(10px);
    font-size: 0.8rem;
    color: ${darkMode ? '#fff' : '#333'};
    opacity: 0;
    transition: all 0.5s ease 1.5s;
  }
  
  body.dark-mode .progress-container {
    background: rgba(255, 255, 255, 0.05);
  }
`;
document.head.appendChild(progressStyle);

// Initialize both features
initParticles();
