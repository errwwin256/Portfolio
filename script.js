// PARTICLE BACKGROUND
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
function Particle(x, y, size, speedX, speedY) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speedX = speedX;
  this.speedY = speedY;
}
Particle.prototype.update = function () {
  this.x += this.speedX;
  this.y += this.speedY;
  if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
  if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
};
Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(186, 85, 211, 0.5)";
  ctx.fill();
};
function initParticles() {
  particles = [];
  let count = Math.floor(window.innerWidth / 15);
  for (let i = 0; i < count; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 0.5;
    let speedY = (Math.random() - 0.5) * 0.5;
    particles.push(new Particle(x, y, size, speedX, speedY));
  }
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
initParticles();
animateParticles();

// TYPEWRITER LOOP
const text = "Front-End Developer";
const speed = 100;
const pause = 1500;
let i = 0;
let isDeleting = false;
function typeLoop() {
  const element = document.querySelector(".typewriter");
  if (!isDeleting) {
    element.textContent = text.substring(0, i + 1);
    i++;
    if (i === text.length) {
      isDeleting = true;
      setTimeout(typeLoop, pause);
      return;
    }
  } else {
    element.textContent = text.substring(0, i - 1);
    i--;
    if (i === 0) {
      isDeleting = false;
    }
  }
  setTimeout(typeLoop, isDeleting ? speed / 2 : speed);
}
typeLoop();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//* Form alert
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;

  const data = new FormData(form);
  const action = form.action;

  const response = await fetch(action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    alert("✅ Message sent successfully!");
    form.reset();
  } else {
    alert("❌ Oops! There was a problem sending your message.");
  }
});
// Fade-in on scroll
const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};
const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("show");
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
});
