/* ============ JavaScript para página de información (Sobre nosotros) ============ */

document.addEventListener('DOMContentLoaded', function() {
  
  // Animación de entrada para las secciones
  const infoSections = document.querySelectorAll('.info-section, .extra-section');
  
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

  infoSections.forEach(section => {
    observer.observe(section);
  });

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Efecto hover mejorado en los enlaces de lista
  const infoLinks = document.querySelectorAll('.info-list a');
  
  infoLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });

  // Destacar la sección actual en el scroll
  const extraSections = document.querySelectorAll('.extra-section');
  const navLinks = document.querySelectorAll('.info-list a[href^="#"]');
  
  function highlightCurrentSection() {
    let current = '';
    
    extraSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightCurrentSection);
  highlightCurrentSection(); // Llamada inicial

  // Efecto parallax suave en el hero
  const hero = document.querySelector('.info-hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // Contador animado para features (opcional, si queremos añadir números)
  const featureItems = document.querySelectorAll('.feature-item');
  
  featureItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

});


