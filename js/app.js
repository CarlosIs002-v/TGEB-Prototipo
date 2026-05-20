window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.switchAuthTab = switchAuthTab;

let currSlide = 0;
const totalSlides = 12;

function goToSlide(n) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.getElementById('slide-' + n).classList.add('active');
    currSlide = n;

    // Sincronizar el men superior activo
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (n === 0) document.querySelectorAll('.nav-inicio').forEach(a => a.classList.add('active'));
    if (n === 8 || (n >= 2 && n <= 4)) document.querySelectorAll('.nav-simulador').forEach(a => a.classList.add('active'));
    if (n === 5) document.querySelectorAll('.nav-proyectos').forEach(a => a.classList.add('active'));
    if (n === 6) document.querySelectorAll('.nav-ayuda').forEach(a => a.classList.add('active'));
    if (n === 7) document.querySelectorAll('.nav-biblioteca').forEach(a => a.classList.add('active'));
    if (n === 10 || n === 11) document.querySelectorAll('.nav-tecnicos').forEach(a => a.classList.add('active'));
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

window.toggleFaq = function (btn) {
    const item = btn.parentElement;
    item.classList.toggle('active');
};

// ─── Lógica de Configuración de Usuario ───
const userModal = document.getElementById('userSettingsModal');

window.openUserSettings = function () {
    userModal.showModal();
};

window.closeUserSettings = function () {
    userModal.close();
};

window.openStrategyModal = function (title, icon, desc, benStr, varStr, impact) {
    document.getElementById('smTitle').innerText = title;
    document.getElementById('smIcon').innerText = icon;
    document.getElementById('smDesc').innerText = desc;

    const benList = document.getElementById('smBen');
    benList.innerHTML = '';
    benStr.split(',').forEach(item => {
        let li = document.createElement('li');
        li.innerText = item.trim();
        benList.appendChild(li);
    });

    const varList = document.getElementById('smVar');
    varList.innerHTML = '';
    varStr.split(',').forEach(item => {
        let li = document.createElement('li');
        li.innerText = item.trim();
        varList.appendChild(li);
    });

    document.getElementById('smImp').innerHTML = impact + ' <small style="font-size:12px; font-weight:normal; color:var(--ink-muted);">ahorro energético</small>';

    document.getElementById('strategyModal').showModal();
};

window.closeStrategyModal = function () {
    document.getElementById('strategyModal').close();
};

window.handleAvatarChange = function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
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

window.saveUserSettings = function (event) {
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


    if (newPass) message += `\nContraseña actualizada correctamente.`;



    // Limpiar campos de contraseña
    document.getElementById('editPass').value = '';
    document.getElementById('confirmPass').value = '';

    closeUserSettings();
};

// Cerrar al hacer clic fuera del modal
userModal.onclick = (e) => {
    if (e.target === userModal) closeUserSettings();
};

document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'strategyModal') {
        closeStrategyModal();
    }
});

// ─── Inyección dinámica de estilos para Scroll ───
const scrollStyles = document.createElement('style');
scrollStyles.innerHTML = `
    body { overflow: hidden; margin: 0; }
    .slide { height: 100vh; overflow-y: auto; overflow-x: hidden; }
    dialog:not(.side-panel) { max-height: 85vh; overflow-y: auto; }
`;
document.head.appendChild(scrollStyles);

// Inicializar en Landing
goToSlide(0);
