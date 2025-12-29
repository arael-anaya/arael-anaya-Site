// js/render.js

// ---- BASE-AWARE ASSET RESOLUTION ----
const BASE = window.__BASE__ || "";

function resolveAssetPath(path) {
    if (!path) return "";
    if (path.startsWith("http")) return path;          // external
    if (path.startsWith("/")) return `${BASE}${path}`; // root-relative
    return `${BASE}/${path.replace(/^\.?\//, "")}`;    // relative
}

// -----------------------------------

export function renderEntries(entries, container) {
    entries.forEach(e => {
        const needsToggle = e.summary && e.summary.length > 100;

        const primaryLink =
            Array.isArray(e.links) && e.links.length > 0 ? e.links[0] : null;
        const secondaryLinks =
            Array.isArray(e.links) && e.links.length > 1 ? e.links.slice(1) : [];

        const hasMedia =
            e.report ||
            (Array.isArray(e.videos) && e.videos.length > 0) ||
            (Array.isArray(secondaryLinks) && secondaryLinks.length > 0);

        const section = document.createElement("section");
        section.id = e.id;
        section.className = "card content-block";

        section.innerHTML = `
            <section class="content-card">
                <header class="content-header">
                    <div class="content-header-text">
                        <h2>
                            ${primaryLink ? `
                                <a
                                    class="content-title-link"
                                    href="${primaryLink.url}"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    ${e.title}
                                </a>
                            ` : e.title}
                        </h2>

                        ${(e.type || e.meta) ? `
                            <div class="content-meta-row">
                                ${e.type ? `
                                    <span class="content-badge content-badge-${e.type}">
                                        ${e.type}
                                    </span>
                                ` : ""}

                                ${e.meta ? `
                                    <p class="content-meta">${e.meta}</p>
                                ` : ""}
                            </div>
                        ` : ""}

                        ${e.lead ? `<p class="content-lead">${e.lead}</p>` : ""}
                    </div>

                    ${e.logo ? `
                        <div class="content-logo">
                            ${primaryLink ? `
                                <a
                                    href="${primaryLink.url}"
                                    target="_blank"
                                    rel="noopener"
                                    aria-label="Visit ${e.title}"
                                >
                                    <img
                                        src="${resolveAssetPath(e.logo)}"
                                        alt="${e.title} logo"
                                        loading="lazy"
                                    >
                                </a>
                            ` : `
                                <img
                                    src="${resolveAssetPath(e.logo)}"
                                    alt="${e.title} logo"
                                    loading="lazy"
                                >
                            `}
                        </div>
                    ` : ""}
                </header>

                ${e.summary ? `
                    <div class="content-body">
                        ${needsToggle ? `
                            <button class="content-toggle" aria-expanded="false">
                                Show more ↓
                            </button>
                        ` : ""}

                        <div class="content-summary-wrapper ${needsToggle ? "" : "expanded"}">
                            <p class="content-summary">${e.summary}</p>
                        </div>
                    </div>
                ` : ""}

                ${e.bullets ? `
                    <ul class="content-bullets">
                        ${e.bullets.map(b => `<li>${b}</li>`).join("")}
                    </ul>
                ` : ""}

                ${hasMedia ? `
                    <div class="content-divider"></div>

                    <section class="content-media">
                        <h3>Related Media</h3>

                        ${secondaryLinks.length ? `
                            <footer class="content-links">
                                ${secondaryLinks.map(l => `
                                    <a
                                        class="action-btn action-link"
                                        href="${l.url}"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        ${l.label}
                                    </a>
                                `).join("")}
                            </footer>
                        ` : ""}

                        ${e.report ? `
                            <div class="content-actions">
                                <button
                                    class="action-btn action-pdf"
                                    data-report="${resolveAssetPath(e.report.pdf)}"
                                    data-title="${e.report.title}"
                                >
                                    ${e.report.title} · PDF
                                </button>
                            </div>
                        ` : ""}

                        ${e.videos ? `
                            <div class="video-scroll">
                                ${e.videos.map(v => {
                                    const videoId = typeof v === "string" ? v : v.id;
                                    const caption = typeof v === "string" ? "" : (v.caption || "");
                                    return `
                                        <figure class="video">
                                            <iframe
                                                src="https://www.youtube.com/embed/${videoId}"
                                                loading="lazy"
                                                referrerpolicy="strict-origin-when-cross-origin"
                                                title="YouTube video"
                                                allowfullscreen>
                                            </iframe>
                                            ${caption ? `<figcaption class="video-caption">${caption}</figcaption>` : ""}
                                        </figure>
                                    `;
                                }).join("")}
                            </div>
                        ` : ""}
                    </section>
                ` : ""}
            </section>
        `;

        container.appendChild(section);
        if (window.observeCards) window.observeCards();
    });
}

// Show More Button Logic
document.addEventListener("click", e => {
    const btn = e.target.closest(".content-toggle");
    if (!btn) return;

    const body = btn.closest(".content-body");
    const expanded = body.classList.toggle("expanded");

    btn.textContent = expanded ? "Show less ↑" : "Show more ↓";
    btn.setAttribute("aria-expanded", expanded.toString());
});

// Deep link loading
window.addEventListener("load", () => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("deep-link-highlight");

    setTimeout(() => {
        target.classList.remove("deep-link-highlight");
    }, 1800);
});
