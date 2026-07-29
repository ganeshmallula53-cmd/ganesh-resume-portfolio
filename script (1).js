const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

const animationStylesheet = document.createElement("link");
animationStylesheet.rel = "stylesheet";
animationStylesheet.href = "line-animation.css";
document.head.appendChild(animationStylesheet);

if (localStorage.getItem("portfolioTheme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const dark = document.body.classList.contains("dark");
  themeToggle.textContent = dark ? "☀" : "☾";
  localStorage.setItem("portfolioTheme", dark ? "dark" : "light");
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.textContent = navLinks.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    projects.forEach(project => {
      const visible =
        category === "all" || project.dataset.category === category;

      project.style.display = visible ? "" : "none";
    });
  });
});

const animatedElements = [
  [".trusted", "reveal"],
  ["#about .section-label", "reveal"],
  ["#about .about-grid", "reveal"],
  ["#experience .section-label", "reveal"],
  ["#experience .about-grid", "reveal"],
  ["#projects .section-heading", "reveal"],
  ["#skills .section-label", "reveal"],
  [".contact-content", "reveal"],
  [".footer", "reveal"]
];

animatedElements.forEach(([selector, className]) => {
  document.querySelectorAll(selector).forEach(element => {
    element.classList.add(className);
  });
});

document.querySelectorAll(".project-card").forEach((card, index) => {
  card.classList.add("reveal", `reveal-delay-${(index % 3) + 1}`);
});

document.querySelectorAll(".skill-item").forEach((skill, index) => {
  skill.classList.add("reveal", `reveal-delay-${(index % 3) + 1}`);
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("show"));
}