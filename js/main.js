const HEADER_HTML = `
    <div class="container header-row">
        <a class="brand" href="/index.html">Arael A. Anaya</a>
        <button class="menu-button" aria-label="Open menu" aria-expanded="false">☰</button>
        <nav class="nav" aria-label="Primary navigation">
        <a href="/index.html">Main</a>
        <a href="/pages/projects.html">Projects</a>
        <a href="/pages/research.html">Research</a>
        <a href="/pages/about.html">About</a>
        <a href="/pages/contact.html">Contact</a>
        </nav>
    </div>

    <nav class="mobile-nav" aria-label="Mobile navigation">
        <a href="/index.html">Main</a>
        <a href="/pages/projects.html">Projects</a>
        <a href="/pages/research.html">Research</a>
        <a href="/pages/about.html">About</a>
        <a href="/pages/contact.html">Contact</a>
    </nav>
    `;

    const FOOTER_HTML = `
    <div class="container footer-content">
        <button class="theme-toggle">Theme</button>
        <small>© <span id="year"></span> Arael Anaya</small>
    </div>
`;

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


