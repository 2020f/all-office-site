/* ===== Mobile Nav Toggle ===== */
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* ===== Mega Menu (click for mobile) ===== */
document.querySelectorAll('.has-mega > .nav__link').forEach(btn => {
  const id = btn.dataset.mega;
  const panel = document.getElementById(`mega-${id}`);
  btn.addEventListener('click', (e) => {
    // Only act like toggle in mobile
    if (window.matchMedia('(max-width: 980px)').matches) {
      e.preventDefault();
      panel.style.display = panel.style.display === 'grid' ? 'none' : 'grid';
    }
  });
});

/* ===== Simple Slider (autoplay + dots + controls + info panel) ===== */
const slider = document.querySelector('.slider');
if (slider) {
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsWrap = document.querySelector('.slider__dots');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const interval = parseInt(slider.dataset.interval || '3500', 10);
  let idx = 0;
  let timer;

  // ---- Panel de info (derecha) ----
  const info = document.querySelector('.slider__info');
  const infoTitle = info?.querySelector('.slider__title');
  const infoDesc  = info?.querySelector('.slider__desc');
  const infoBtn   = info?.querySelector('.slider__btn');

  function updateInfo(fromIndex = idx){
    if (!info) return; // si no existe el panel, no hacemos nada
    const s = slides[fromIndex];
    infoTitle.textContent = s.dataset.title || s.querySelector('.slide__caption')?.textContent || '';
    infoDesc.textContent  = s.dataset.desc || '';
    infoBtn.textContent   = s.dataset.cta || 'Ver más';
    infoBtn.href          = s.dataset.link || '#';
  }

  // Create dots
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Ir al slide ${i+1}`);
      b.addEventListener('click', () => go(i));
      dotsWrap.appendChild(b);
    });
  }

  function syncUI(){
    slides.forEach((s,i)=> s.classList.toggle('is-active', i===idx));
    dotsWrap?.querySelectorAll('button').forEach((d,i)=> d.classList.toggle('is-active', i===idx));
    updateInfo(idx);
  }

  function go(i){
    idx = (i + slides.length) % slides.length;
    syncUI();
  }

  function start(){
    if (slider.dataset.autoplay !== 'true') return;
    stop();
    timer = setInterval(()=> go(idx+1), interval);
  }

  function stop(){ if (timer) clearInterval(timer); }

  prev?.addEventListener('click', ()=>{ go(idx-1); start(); });
  next?.addEventListener('click', ()=>{ go(idx+1); start(); });

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);

  // init
  syncUI();
  start();
}

/* ===== Carrusel vertical en columnas (col1 up, col2 down) ===== */
(function initVerticalColumns(){
  const sliders = document.querySelectorAll('.vslider');
  if (!sliders.length) return;

  sliders.forEach((wrap, i) => {
    const track = wrap.querySelector('.vslider__track');
    if (!track) return;

    // 1) Duplicar los hijos para loop continuo
    const items = Array.from(track.children);
    if (items.length === 0) return;
    items.forEach(n => track.appendChild(n.cloneNode(true)));

    // 2) Dirección y velocidad
    const dir = (wrap.dataset.dir || (i % 2 ? 'down' : 'up')).toLowerCase();
    const speed = Math.max(8, parseInt(wrap.dataset.speed || '18', 10)); // segundos por ciclo

    // 3) Keyframes únicos por slider
    const name = `vscroll_${Math.random().toString(36).slice(2)}`;
    // desplazamos solo el 100% porque duplicamos: media pista real
    const from = dir === 'down' ? 'translateY(-100%)' : 'translateY(0)';
    const to   = dir === 'down' ? 'translateY(0)'      : 'translateY(-100%)';

    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${name} { from { transform: ${from}; } to { transform: ${to}; } }
    `;
    document.head.appendChild(style);

    // 4) Aplicar animación
    track.style.animation = `${name} ${speed}s linear infinite`;

    // 5) Mejor rendimiento: pausar si no está en viewport
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        track.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0.01 });
    io.observe(wrap);
  });
})();


