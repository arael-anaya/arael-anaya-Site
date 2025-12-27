// js/render.js
export function renderEntries(entries, container) {
    entries.forEach(e => {
        const section = document.createElement("section");
        section.className = "card content-block";

        section.innerHTML = `
        <div class="content-header">
            <div class="content-text">
            <h2>${e.title}</h2>
            ${e.meta ? `<p class="content-meta">${e.meta}</p>` : ""}
            </div>

            ${e.logo ? `
            <div class="content-logo">
                <img src="${e.logo}" alt="${e.title} logo">
            </div>
            ` : ""}
        </div>

        ${e.summary ? `<p class="content-summary">${e.summary}</p>` : ""}

        ${e.bullets ? `
            <ul class="content-bullets">
            ${e.bullets.map(b => `<li>${b}</li>`).join("")}
            </ul>
        ` : ""}

        ${e.report ? `
            <div class="content-actions">
            <button class="chip"
                data-report="${e.report.pdf}"
                data-title="${e.report.title}">
                Project Report
            </button>
            </div>
        ` : ""}

        ${e.videos ? `
            <h3>Related Media</h3>
            <div class="video-scroll">
            ${e.videos.map(v => `
                <div class="video">
                <iframe
                    src="https://www.youtube.com/embed/${v}"
                    loading="lazy"
                    allowfullscreen>
                </iframe>
                </div>
            `).join("")}
            </div>
        ` : ""}

        ${e.links ? `
            <div class="links-row">
            ${e.links.map(l => `
                <a class="chip" href="${l.url}" target="_blank" rel="noopener">
                ${l.label}
                </a>
            `).join("")}
            </div>
        ` : ""}
        `;

        container.appendChild(section);
    });
}
