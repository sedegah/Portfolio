.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.skill-category {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.skill-category h3 {
  color: #8c3bff;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.skill-category p {
  color: #666;
  line-height: 1.6;
}

.education-quote {
  text-align: center;
  font-size: 1.4rem;
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  font-style: italic;
  border-left: 4px solid #8c3bff;
}

/* Dark Mode Styles */
body.dark-mode .skill-category {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.05);
}

body.dark-mode .skill-category p {
  color: #aaa;
}

@media (max-width: 768px) {
  .skills-container {
    grid-template-columns: 1fr;
  }
  
  .skill-category {
    padding: 1.5rem;
  }
  
  .education-quote {
    font-size: 1.1rem;
    padding: 1rem;
  }
}  // In animateOnScroll function, update the selector to:
const elements = document.querySelectorAll('.section, .skill-item, .project-item, .skill-category, .education-quote');

// Add hover effect for skill categories
document.querySelectorAll('.skill-category').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});
