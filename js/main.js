const btn = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

if (btn && mobileNav) {
    btn.addEventListener("click", () => {
    const isOpen = mobileNav.style.display === "block";
    mobileNav.style.display = isOpen ? "none" : "block";
    btn.setAttribute("aria-expanded", String(!isOpen));
    });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());


//dark Mode Toggle
(function () {
    const toggle = document.querySelector(".theme-toggle");
    const root = document.documentElement;

  // Load saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        root.setAttribute("data-theme", savedTheme);
    } else if (prefersDark) {
        root.setAttribute("data-theme", "dark");
    }

  // Toggle on click
    toggle?.addEventListener("click", () => {
        const isDark = root.getAttribute("data-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";

        root.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
})();

// Open modal
document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = document.getElementById(btn.dataset.modal);
        modal?.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

// Close via button
document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".modal-overlay")?.classList.remove("active");
        document.body.style.overflow = "";
    });
});

// Close via backdrop
document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", () => {
        backdrop.parentElement.classList.remove("active");
        document.body.style.overflow = "";
    });
});

// Close via ESC
document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => {
        m.classList.remove("active");
    });
    document.body.style.overflow = "";
    }
});



