// ===== Enhanced Particle Animation with Larger Particles =====
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = darkMode ? '0.1' : '0.2'; // Slightly more visible
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Particle class with larger size range
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
      this.size = Math.random() * 8 + 3; // Larger base size (3-11px)
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 + 1; // Slower movement for larger particles
      this.size = Math.random() * 8 + 3; // Size range: 3-11px
      this.opacity = Math.random() * 0.7 + 0.2; // More opaque
      this.colorAngle = Math.random() * 40 + 260; // Wider purple range (260-300)
      this.wobble = Math.random() * 8; // More pronounced wobble
      this.wobbleSpeed = Math.random() * 0.01 + 0.005; // Slower wobble
      this.wobbleOffset = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.01 + 0.005; // New: pulsating effect
      this.baseSize = this.size; // Store original size for pulsing
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Wobble effect
      this.x += Math.sin(Date.now() * this.wobbleSpeed + this.wobbleOffset) * this.wobble;
      
      // Pulsing effect - makes particles breathe
      this.size = this.baseSize + Math.sin(Date.now() * this.pulseSpeed) * (this.baseSize * 0.3);
      
      // Reset particles that go off screen
      if (this.y > height + 50 || this.x < -50 || this.x > width + 50) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      
      // Enhanced gradient with more contrast
      const gradient = ctx.createRadialGradient(
        this.x, this.y, this.size * 0.3,
        this.x, this.y, this.size
      );
      gradient.addColorStop(0, `hsla(${this.colorAngle}, 90%, 80%, ${this.opacity})`);
      gradient.addColorStop(0.7, `hsla(${this.colorAngle}, 85%, 65%, ${this.opacity * 0.7})`);
      gradient.addColorStop(1, `hsla(${this.colorAngle}, 80%, 50%, ${this.opacity * 0.2})`);
      
      ctx.fillStyle = gradient;
      
      // Glow effect scaled with size
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = `hsla(${this.colorAngle}, 80%, 60%, ${this.opacity * 0.4})`;
      ctx.fill();
      
      // Reset shadow to prevent affecting other particles
      ctx.shadowBlur = 0;
    }
  }

  // Create particles - slightly fewer due to larger size
  const particles = [];
  const particleCount = Math.min(width * height / 7000, 250); // Reduced density

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation loop with optimized rendering
  function animate() {
    // Clear with fade effect (darker for better contrast)
    ctx.fillStyle = darkMode ? 'rgba(10, 5, 20, 0.3)' : 'rgba(240, 240, 255, 0.3)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw all particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }

  // Handle resize
  window.addEventListener('resize', debounce(() => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Adjust particle count while maintaining visual density
    const newCount = Math.min(width * height / 7000, 250);
    while (particles.length < newCount) {
      particles.push(new Particle());
    }
    particles.length = newCount;
  }, 200));

  // Start animation
  animate();
}

// Debounce function for resize events
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Initialize larger particles
initParticles();
