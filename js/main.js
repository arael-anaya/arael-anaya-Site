const BASE = window.location.hostname.includes("github.io")
    ? `/${window.location.pathname.split("/")[1]}`
    : "";
window.__BASE__ = BASE;


const HEADER_HTML = `
    <div class="container header-row">
        <a class="brand" href="${BASE}/index.html">Arael A. Anaya</a>
        <button class="menu-button" aria-label="Open menu" aria-expanded="false">☰</button>
        <nav class="nav" aria-label="Primary navigation">
<<<<<<< Updated upstream
        <a href="${BASE}/index.html">Main</a>
        <a href="${BASE}/pages/projects.html">Projects</a>
        <a href="${BASE}/pages/research.html">Research</a>
        <a href="${BASE}/pages/about.html">About</a>
        <a href="${BASE}/pages/contact.html">Contact</a>
=======
        <a href="./index.html">Main</a>
        <a href="./pages/projects.html">Projects</a>
        <a href="./pages/research.html">Research</a>
        <a href="./pages/about.html">About</a>
        <a href="./pages/contact.html">Contact</a>
>>>>>>> Stashed changes
        </nav>
    </div>

    <nav class="mobile-nav" aria-label="Mobile navigation">
<<<<<<< Updated upstream
        <a href="${BASE}/index.html">Main</a>
        <a href="${BASE}/pages/projects.html">Projects</a>
        <a href="${BASE}/pages/research.html">Research</a>
        <a href="${BASE}/pages/about.html">About</a>
        <a href="${BASE}/pages/contact.html">Contact</a>
=======
        <a href="./index.html">Main</a>
        <a href="./pages/projects.html">Projects</a>
        <a href="./pages/research.html">Research</a>
        <a href="./pages/about.html">About</a>
        <a href="./pages/contact.html">Contact</a>

>>>>>>> Stashed changes
    </nav>
`;


    const FOOTER_HTML = `
    <div class="container footer-content">
        <button class="theme-toggle">Theme</button>
        <small>© <span id="year"></span> Arael Anaya</small>
    </div>
`;


function initHeader() {
    const btn = document.querySelector(".menu-button");
    const mobileNav = document.querySelector(".mobile-nav");
    const brand = document.querySelector(".brand");

    if (btn && mobileNav) {
        btn.addEventListener("click", () => {
        const isOpen = mobileNav.style.display === "block";
        mobileNav.style.display = isOpen ? "none" : "block";
        btn.setAttribute("aria-expanded", String(!isOpen));
        });
    }
    if (brand) {
        let clicks = 0;
        brand.addEventListener("click", e => {
        e.preventDefault();
        clicks++;
        if (clicks === 5) unlockFavorites();
        setTimeout(() => (clicks = 0), 2000);
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


const headerEl = document.getElementById("site-header");
    if (headerEl) {
        headerEl.innerHTML = HEADER_HTML;
        initHeader();
}

const footerEl = document.getElementById("site-footer");
    if (footerEl) {
        footerEl.innerHTML = FOOTER_HTML;
        initFooter();
}

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
    if (!cardObserver) return; 
    const sections = document.querySelectorAll("main");

    sections.forEach(section => {
        const cards = section.querySelectorAll(".card:not(.is-visible)");

        cards.forEach((card, index) => {
        card.style.setProperty("--fade-delay", `${index * 80}ms`);
        cardObserver.observe(card);
        });
    });
}

document.addEventListener("DOMContentLoaded", initCardFadeIn);

window.observeCards = observeCards;


import { renderLinks } from "./links.js";

if (document.getElementById("youtube-links")) {
    renderLinks("youtube-links", "YouTube Channel");
}

if (document.getElementById("contact-links")) {
    renderLinks("contact-links");
}




// Favorites appears only from the KONAMI code

const KONAMI = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
    "b","a"
    ];

    let konamiIndex = 0;

    document.addEventListener("keydown", e => {
    if (e.key === KONAMI[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI.length) {
        unlockFavorites();
        konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
    });


function unlockFavorites() {
    sessionStorage.setItem("favoritesUnlocked", "true");
    window.location.href = `${BASE}/pages/favorites.html`;
}

// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.requiresAuth === "favorites") {
        if (!sessionStorage.getItem("favoritesUnlocked")) {
        window.location.replace("./index.html");
        }
    }
});

const page = document.body.dataset.page;

async function initSectionHeader(section, container) {
    const { renderSectionHeader } = await import("./sectionHeader.js");
    renderSectionHeader(section, container);
}

switch (page) {
    case "home":
        // home-specific init
        break;
    case "projects":
        initSectionHeader("projects", "projects-header");
        // projects init
        break;
    case "research":
        initSectionHeader("research", "research-header");
        // research init
        break;
    
    case "about":
        initSectionHeader("about", "about-header");
        break;
        
    case "contact":
        initSectionHeader("contact", "contact-header");
        break;
    
        case "favorites":
    
        if (!sessionStorage.getItem("favoritesUnlocked")) {
            window.location.replace("${BASE}/index.html");
        }
    break;
}

if (window.location.hash) {
    requestAnimationFrame(() => {
        document
        .querySelector(window.location.hash)
        ?.scrollIntoView({ behavior: "smooth" });
    });
}

import { applySEO } from "./seo.js";
applySEO(page);

