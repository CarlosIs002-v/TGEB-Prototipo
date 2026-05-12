window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.switchAuthTab = switchAuthTab;

let currSlide = 0;
  const totalSlides = 9;

  function goToSlide(n) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.getElementById('slide-' + n).classList.add('active');
    currSlide = n;

    // Sincronizar el menú superior activo
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (n === 0) document.querySelectorAll('.nav-inicio').forEach(a => a.classList.add('active'));
    if (n === 8 || (n >= 2 && n <= 4)) document.querySelectorAll('.nav-simulador').forEach(a => a.classList.add('active'));
    if (n === 5) document.querySelectorAll('.nav-proyectos').forEach(a => a.classList.add('active'));
    if (n === 6) document.querySelectorAll('.nav-ayuda').forEach(a => a.classList.add('active'));
    if (n === 7) document.querySelectorAll('.nav-biblioteca').forEach(a => a.classList.add('active'));
  }

  function nextSlide() {
    let next = currSlide + 1;
    if (next >= totalSlides) next = 0;
    goToSlide(next);
  }

  function prevSlide() {
    let prev = currSlide - 1;
    if (prev < 0) prev = totalSlides - 1;
    goToSlide(prev);
  }

  function switchAuthTab(mode) {
    document.getElementById('tab-login').classList.toggle('active', mode === 'login');
    document.getElementById('tab-register').classList.toggle('active', mode === 'register');
    document.getElementById('view-login').style.display = mode === 'login' ? 'block' : 'none';
    document.getElementById('view-register').style.display = mode === 'register' ? 'block' : 'none';
  }

  window.toggleFaq = function(btn) {
    const item = btn.parentElement;
    item.classList.toggle('active');
  };

  // Inicializar en Landing
  goToSlide(0);
