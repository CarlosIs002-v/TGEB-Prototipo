window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.switchAuthTab = switchAuthTab;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.mockLogin = mockLogin;
window.mockLogout = mockLogout;
window.mockRegister = mockRegister;
let currSlide = 0;
const totalSlides = 14;
function goToSlide(n) {
  const isAuth = sessionStorage.getItem("tgeb_auth") === "true";
  if (!isAuth && n !== 1) {
    n = 1;
  }
  document
    .querySelectorAll(".slide")
    .forEach((s) => s.classList.remove("active"));
  const targetSlide = document.getElementById("slide-" + n);
  if (targetSlide) {
    targetSlide.classList.add("active");
  }
  currSlide = n;
  document
    .querySelectorAll(".nav-links a")
    .forEach((a) => a.classList.remove("active"));
  if (n === 0)
    document
      .querySelectorAll(".nav-inicio")
      .forEach((a) => a.classList.add("active"));
  if (n === 8 || (n >= 2 && n <= 4))
    document
      .querySelectorAll(".nav-simulador")
      .forEach((a) => a.classList.add("active"));
  if (n === 5)
    document
      .querySelectorAll(".nav-proyectos")
      .forEach((a) => a.classList.add("active"));
  if (n === 6)
    document
      .querySelectorAll(".nav-ayuda")
      .forEach((a) => a.classList.add("active"));
  if (n === 7)
    document
      .querySelectorAll(".nav-biblioteca")
      .forEach((a) => a.classList.add("active"));
  if (n === 10 || n === 11)
    document
      .querySelectorAll(".nav-tecnicos")
      .forEach((a) => a.classList.add("active"));
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
  document
    .getElementById("tab-login")
    .classList.toggle("active", mode === "login");
  document
    .getElementById("tab-register")
    .classList.toggle("active", mode === "register");
  document.getElementById("view-login").style.display =
    mode === "login" ? "block" : "none";
  document.getElementById("view-register").style.display =
    mode === "register" ? "block" : "none";
}
function handleLogin() {
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const errorDiv = document.getElementById("login-error");
  if (errorDiv) errorDiv.style.display = "none";
  if (emailInput && passwordInput) {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    if (!email || !password) {
      if (errorDiv) {
        errorDiv.textContent = "Por favor, completa todos los campos.";
        errorDiv.style.display = "block";
      }
      return;
    }
    const success = window.mockLogin(email, password);
    if (!success && errorDiv) {
      errorDiv.textContent =
        "Credenciales incorrectas. Verifica tu correo y contraseña e inténtalo de nuevo.";
      errorDiv.style.display = "block";
    }
  }
}
function handleRegister() {
  const nameInput = document.getElementById("register-name");
  const emailInput = document.getElementById("register-email");
  const passwordInput = document.getElementById("register-password");
  const errorDiv = document.getElementById("register-error");
  if (errorDiv) errorDiv.style.display = "none";
  const name = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";
  if (!name || !email || !password) {
    if (errorDiv) {
      errorDiv.textContent = "Por favor, completa todos los campos.";
      errorDiv.style.display = "block";
    }
    return;
  }
  window.mockRegister(name, email, password);
}
function mockLogin(email, password) {
  if (email === "osvaldo@jasoenergy.com" && password === "OsvaldoSolorio") {
    sessionStorage.setItem("tgeb_auth", "true");
    sessionStorage.setItem("tgeb_user_name", "Osvaldo Solorio");
    sessionStorage.setItem("tgeb_user_email", email);
    updateAuthUI();
    goToSlide(0);
    return true;
  } else if (email === "admin@tgeb.com" && password === "admin123") {
    sessionStorage.setItem("tgeb_auth", "true");
    sessionStorage.setItem("tgeb_user_name", "Administrador");
    sessionStorage.setItem("tgeb_user_email", email);
    updateAuthUI();
    goToSlide(13);
    return true;
  } else {
    return false;
  }
}
function mockRegister(name, email, password) {
  sessionStorage.setItem("tgeb_auth", "true");
  sessionStorage.setItem("tgeb_user_name", name || "Osvaldo Solorio");
  sessionStorage.setItem("tgeb_user_email", email || "osvaldo@jasoenergy.com");
  updateAuthUI();
  goToSlide(0);
}
function mockLogout() {
  sessionStorage.removeItem("tgeb_auth");
  sessionStorage.removeItem("tgeb_user_name");
  sessionStorage.removeItem("tgeb_user_email");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  if (emailInput) emailInput.value = "";
  if (passwordInput) passwordInput.value = "";
  updateAuthUI();
  goToSlide(1);
}
function updateAuthUI() {
  const isAuth = sessionStorage.getItem("tgeb_auth") === "true";
  const name = sessionStorage.getItem("tgeb_user_name") || "Osvaldo Solorio";
  const initial = name.charAt(0).toUpperCase();
  const loginHeader = document.querySelector("#slide-1 .app-header");
  if (loginHeader) {
    loginHeader.style.display = "none";
  }
  document.querySelectorAll(".avatar").forEach((av) => {
    if (!av.style.backgroundImage) {
      av.innerText = initial;
    }
  });
  const authContainer = document.getElementById("auth-header-container");
  if (authContainer) {
    if (isAuth) {
      authContainer.innerHTML = `
                <div class="user-controls" style="display: flex; gap: 1rem; align-items: center;">
                    <div class="avatar" onclick="openUserSettings()" style="cursor: pointer; width: 40px; height: 40px; border-radius: 12px; background-color: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1rem; box-shadow: 0 4px 12px rgba(6, 78, 59, 0.15);">${initial}</div>
                    <button class="btn-outline" onclick="mockLogout()" style="padding: 10px 20px; border-radius: 12px; cursor: pointer; font-size: 14px; font-weight: 700; background: transparent; border: 1.5px solid var(--primary); color: var(--primary);">Salir</button>
                </div>
            `;
    } else {
      authContainer.innerHTML = `
                <a onclick="switchAuthTab('login'); goToSlide(1);" class="nav__link" style="cursor: pointer; font-weight: 600;">Entrar</a>
                <a onclick="switchAuthTab('register'); goToSlide(1);" class="nav__cta" style="cursor: pointer;">Registrarse</a>
            `;
    }
  }
  const userNameDisplay = document.getElementById("userNameDisplay");
  if (userNameDisplay) {
    userNameDisplay.innerText = name;
  }
  const editNameInput = document.getElementById("editName");
  if (editNameInput) {
    editNameInput.value = name;
  }
  const editEmailInput = document.getElementById("editEmail");
  if (editEmailInput) {
    editEmailInput.value =
      sessionStorage.getItem("tgeb_user_email") || "osvaldo@jasoenergy.com";
  }
}
window.toggleFaq = function (btn) {
  const item = btn.parentElement;
  item.classList.toggle("active");
};
const userModal = document.getElementById("userSettingsModal");
window.openUserSettings = function () {
  userModal.showModal();
};
window.closeUserSettings = function () {
  userModal.close();
};
window.openStrategyModal = function (
  title,
  icon,
  desc,
  benStr,
  varStr,
  impact,
) {
  document.getElementById("smTitle").innerText = title;
  document.getElementById("smIcon").innerText = icon;
  document.getElementById("smDesc").innerText = desc;
  const benList = document.getElementById("smBen");
  benList.innerHTML = "";
  benStr.split(",").forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item.trim();
    benList.appendChild(li);
  });
  const varList = document.getElementById("smVar");
  varList.innerHTML = "";
  varStr.split(",").forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item.trim();
    varList.appendChild(li);
  });
  document.getElementById("smImp").innerHTML =
    impact +
    ' <small style="font-size:12px; font-weight:normal; color:var(--ink-muted);">ahorro energético</small>';
  document.getElementById("strategyModal").showModal();
};
window.closeStrategyModal = function () {
  document.getElementById("strategyModal").close();
};
window.handleAvatarChange = function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("userAvatarPreview").src = e.target.result;
      document.querySelectorAll(".avatar").forEach((av) => {
        av.style.backgroundImage = `url(${e.target.result})`;
        av.style.backgroundSize = "cover";
        av.innerText = "";
      });
    };
    reader.readAsDataURL(file);
  }
};
window.saveUserSettings = function (event) {
  event.preventDefault();
  const newName = document.getElementById("editName").value;
  const newEmail = document.getElementById("editEmail").value;
  const newPass = document.getElementById("editPass").value;
  const confirmPass = document.getElementById("confirmPass").value;
  if (newPass || confirmPass) {
    if (newPass !== confirmPass) {
      alert(
        "Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.",
      );
      return;
    }
    if (newPass.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
  }
  sessionStorage.setItem("tgeb_user_name", newName);
  sessionStorage.setItem("tgeb_user_email", newEmail);
  updateAuthUI();
  let message = "Perfil actualizado correctamente.";
  if (newPass) message += `\nContraseña actualizada correctamente.`;
  alert(message);
  document.getElementById("editPass").value = "";
  document.getElementById("confirmPass").value = "";
  closeUserSettings();
};
if (userModal) {
  userModal.onclick = (e) => {
    if (e.target === userModal) closeUserSettings();
  };
}
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "strategyModal") {
    closeStrategyModal();
  }
});
const scrollStyles = document.createElement("style");
scrollStyles.innerHTML = `
    body { overflow: hidden; margin: 0; }
    .slide { height: 100vh; overflow-y: auto; overflow-x: hidden; }
    dialog:not(.side-panel) { max-height: 85vh; overflow-y: auto; }
`;
document.head.appendChild(scrollStyles);
updateAuthUI();
const isAuthInit = sessionStorage.getItem("tgeb_auth") === "true";
goToSlide(isAuthInit ? 0 : 1);
