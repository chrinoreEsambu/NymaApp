document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  img.addEventListener("dragstart", function (e) {
    e.preventDefault(); // Empêche le drag and drop
  });
});
document.querySelectorAll(".form-section").forEach((section) => {
  section.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
});

// ================================FORMPART===========================
document.getElementById("show-login").addEventListener("click", function () {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "flex";
  document.getElementById("form-container").style.transform = "translateX(0)";
});

document.getElementById("show-register").addEventListener("click", function () {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "flex";
  document.getElementById("form-container").style.transform = "translateX(0)";
});

const eyes = document.getElementById("eyes");
const eyestwo = document.getElementById("eyestwo");

eyes.onclick = function () {
  const password = document.getElementById("login-password");
  if (password.type === "password") {
    password.type = "text";
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
  }
};

eyestwo.onclick = function () {
  const passwordtwo = document.getElementById("register-password");
  if (passwordtwo.type === "password") {
    passwordtwo.type = "text";
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
  } else {
    passwordtwo.type = "password";
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
  }
};
