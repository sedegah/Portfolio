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
