window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.switchAuthTab = switchAuthTab;

let currSlide = 0;
  const totalSlides = 8;

  function goToSlide(n) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.getElementById('slide-' + n).classList.add('active');
    currSlide = n;

    // Sincronizar el menú superior activo
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (n === 0) document.querySelectorAll('.nav-inicio').forEach(a => a.classList.add('active'));
    if (n >= 2 && n <= 4) document.querySelectorAll('.nav-simulador').forEach(a => a.classList.add('active'));
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

  // ─── Lógica de Configuración de Usuario ───
  const userModal = document.getElementById('userSettingsModal');

  window.openUserSettings = function() {
    userModal.showModal();
  };

  window.closeUserSettings = function() {
    userModal.close();
  };

  window.handleAvatarChange = function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('userAvatarPreview').src = e.target.result;
        // También actualizar los avatares en la app (opcional para el prototipo)
        document.querySelectorAll('.avatar').forEach(av => {
          av.style.backgroundImage = `url(${e.target.result})`;
          av.style.backgroundSize = 'cover';
          av.innerText = '';
        });
      };
      reader.readAsDataURL(file);
    }
  };

  window.saveUserSettings = function(event) {
    event.preventDefault();
    const newName = document.getElementById('editName').value;
    const newEmail = document.getElementById('editEmail').value;
    const newPass = document.getElementById('editPass').value;
    const confirmPass = document.getElementById('confirmPass').value;

    // Validación de contraseñas
    if (newPass || confirmPass) {
      if (newPass !== confirmPass) {
        alert('Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.');
        return;
      }
      if (newPass.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
      }
    }

    // Actualizar UI
    document.getElementById('userNameDisplay').innerText = newName;
    document.querySelectorAll('.avatar').forEach(av => {
        if (!av.style.backgroundImage) av.innerText = newName.charAt(0).toUpperCase();
    });

    let message = `¡Cambios guardados con éxito!\nNombre: ${newName}\nCorreo: ${newEmail}`;
    if (newPass) message += `\nContraseña actualizada correctamente.`;
    
    alert(message);

    // Limpiar campos de contraseña
    document.getElementById('editPass').value = '';
    document.getElementById('confirmPass').value = '';

    closeUserSettings();
  };

  // Cerrar al hacer clic fuera del modal
  userModal.onclick = (e) => {
    if (e.target === userModal) closeUserSettings();
  };

  // Inicializar en Landing
  goToSlide(0);

