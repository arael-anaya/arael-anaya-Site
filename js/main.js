function initHeader() {
    const btn = document.querySelector(".menu-button");
    const mobileNav = document.querySelector(".mobile-nav");

    if (btn && mobileNav) {
        btn.addEventListener("click", () => {
        const isOpen = mobileNav.style.display === "block";
        mobileNav.style.display = isOpen ? "none" : "block";
        btn.setAttribute("aria-expanded", String(!isOpen));
        });
    }
}

function initFooter() {
    const toggle = document.querySelector(".theme-toggle");
    const root = document.documentElement;

    if (!toggle) return;

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        root.setAttribute("data-theme", savedTheme);
    } else if (prefersDark) {
        root.setAttribute("data-theme", "dark");
    }

    toggle.addEventListener("click", () => {
        const isDark = root.getAttribute("data-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";
        root.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
}


fetch("components/header.html")
    .then(r => r.text())
    .then(html => {
        document.getElementById("site-header").innerHTML = html;
        initHeader();
    });

fetch("components/footer.html")
    .then(r => r.text())
    .then(html => {
        document.getElementById("site-footer").innerHTML = html;
        initFooter();
    });

let cardObserver;

function initCardFadeIn() {
    if (cardObserver) return;

    cardObserver = new IntersectionObserver(
        entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            cardObserver.unobserve(entry.target);
            }
        });
        },
        { threshold: 0.15 }
    );

    observeCards();
}

function observeCards() {
    const sections = document.querySelectorAll("main");

    sections.forEach(section => {
        const cards = section.querySelectorAll(".card:not(.is-visible)");

        cards.forEach((card, index) => {
        card.style.setProperty("--fade-delay", `${index * 80}ms`);
        cardObserver.observe(card);
        });
    });
}

window.addEventListener("load", initCardFadeIn);
window.observeCards = observeCards;

card.style.setProperty("--fade-delay", `${index * 50}ms`);


