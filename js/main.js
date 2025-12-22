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
