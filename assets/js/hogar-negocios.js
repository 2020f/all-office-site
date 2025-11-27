/* ============ JavaScript específico - Hogar y negocios pequeños ============ */

document.addEventListener('DOMContentLoaded', function() {
  
  // Animación de entrada para las tarjetas
  const cards = document.querySelectorAll('.category-card');
  
  // Intersection Observer para animar cuando las tarjetas entran en vista
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    observer.observe(card);
  });

  // Efecto parallax suave en el banner
  const hero = document.querySelector('.category-hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroBg = hero.querySelector('.category-hero__bg');
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // Efecto hover mejorado en tarjetas
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

});


