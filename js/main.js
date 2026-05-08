let currSlide = 0;
const totalSlides = 6;

function goToSlide(n) {
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  document.getElementById('slide-' + n).classList.add('active');
  currSlide = n;

  // Sincronizar el menú superior activo
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if (n === 0) document.querySelectorAll('.nav-inicio').forEach(a => a.classList.add('active'));
  if (n >= 2 && n <= 4) document.querySelectorAll('.nav-simulador').forEach(a => a.classList.add('active'));
  if (n === 5) document.querySelectorAll('.nav-proyectos').forEach(a => a.classList.add('active'));

  const labels = ["Inicio", "Auth", "Mapa de México", "Tipo de Edificio", "Resultados", "Mis Proyectos"];
  document.getElementById('curr-slide').innerHTML = `<b>${n + 1}</b> (${labels[n]})`;
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

// Inicializar en Landing
goToSlide(0);
