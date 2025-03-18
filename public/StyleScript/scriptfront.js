window.addEventListener("scroll", function () {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 0) {
    navbar.style.backdropFilter = "blur(10px)";
    // navbar.style.borderBottom = "none";
    navbar.style.borderBottom = "2px solid #fff";
    navbar.style.borderTop = "none";
  } else {
    navbar.style.backdropFilter = "none";
    navbar.style.borderBottom = "2px solid #fff";
    navbar.style.borderTop = "2px solid #fff";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "/assets/img/favinyma1112.jpg",
    "/assets/img/ar.png",
    "/assets/img/ar1.png",
    "/assets/img/ar2.png",
    "/assets/img/ar3.png",
    "/assets/img/ar4.png",
    "/assets/img/logo.jpg",
  ];

  const imageDisplay = document.getElementById("image-display");
  const imageEnblur = document.getElementById("image-enblur");
  const rightButton = document.getElementById("rightcircle");
  const leftButton = document.getElementById("leftcircle");
  let currentIndex = 0;

  function preloadNextImage() {
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImage = new Image();
    nextImage.src = images[nextIndex];
    nextImage.onload = function () {
      imageEnblur.src = images[nextIndex];
    };
  }
  imageDisplay.src = images[currentIndex];
  preloadNextImage();

  rightButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    imageDisplay.classList.add("blur");

    setTimeout(function () {
      imageDisplay.src = images[currentIndex];
      imageDisplay.classList.remove("blur");
      preloadNextImage();
    }, 500);
  });

  leftButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    imageDisplay.classList.add("blur");

    setTimeout(function () {
      imageDisplay.src = images[currentIndex];
      imageDisplay.classList.remove("blur");
      preloadNextImage();
    }, 500);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item");

  const observerOptions = {
    threshold: 0.2, // Déclenche l'animation lorsque 10% de l'élément est visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)"; // Remet à la position initiale
        observer.unobserve(entry.target); // Stoppe l'observation une fois visible
      }
    });
  }, observerOptions);

  items.forEach((item) => {
    observer.observe(item);
  });
});

// protege et block mes image
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
});
document.querySelectorAll(".sectone").forEach((section) => {
  section.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
});

// Fonction pour ajouter l'animation au scroll
function animateOnScroll() {
  const thirdSection = document.querySelector(".third-section");
  const sectionPosition = thirdSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (sectionPosition < screenPosition) {
    thirdSection.classList.add("animate");
  }
}

// Écouteur de scroll
window.addEventListener("scroll", animateOnScroll);
