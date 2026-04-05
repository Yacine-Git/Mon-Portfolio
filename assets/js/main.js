// ====== helpers ======
const $ = (q, p = document) => p.querySelector(q);
const $$ = (q, p = document) => [...p.querySelectorAll(q)];

// ====== mobile menu ======
const burger = $("#burger");
const links = $("#navLinks");
if (burger && links) {
  burger.addEventListener("click", () => links.classList.toggle("open"));
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
}

// ====== active link (based on current page) ======
const current = location.pathname.split("/").pop() || "index.html";
$$(".nav-links a").forEach(a => {
  const href = a.getAttribute("href");
  if (href === current) a.classList.add("active");
});

// ====== scroll progress ======
const progress = $("#progress");
function updateProgress(){
  if(!progress) return;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  progress.style.width = `${pct}%`;
}
window.addEventListener("scroll", updateProgress);
updateProgress();

// ====== reveal on scroll ======
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => io.observe(el));

// ====== contact form (mailto fallback) ======
const form = $("#contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    const subject = encodeURIComponent(`Contact Portfolio - ${name}`);
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    // Remplace par ton email
    const to = "yacine.allab57@gmail.com";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

// ====== lightbox gallery ======
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".g-item").forEach(item => {
  item.addEventListener("click", () => {
    const src = item.getAttribute("data-full");
    if (!src) return;
    lightboxImg.src = src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  if (lightboxImg) lightboxImg.src = "";
}

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
