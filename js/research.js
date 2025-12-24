document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll("#research, [data-research]");
    if (!containers.length) return;

    fetch("components/research.json")
        .then(res => {
        if (!res.ok) throw new Error("Failed to load research.json");
        return res.json();
        })
        .then(entries => {
        containers.forEach(container => {
            const attr = container.dataset.research;

            const requestedIds = attr
            ? attr.split(/[\s,]+/).map(id => id.trim())
            : null;

            const filtered = requestedIds
            ? entries.filter(e => requestedIds.includes(e.id))
            : entries;

            filtered.forEach(r => {
            const section = document.createElement("section");
            section.className = "card research-block";

            section.innerHTML = `
                <div class="research-header">
                    <div class="research-header-text">
                    <h2>${r.title}</h2>
                    <p class="research-meta">${r.meta}</p>
                    </div>

                    ${r.logo ? `
                    <div class="research-logo">
                        <img src="${r.logo}" alt="${r.title} logo">
                    </div>
                    ` : ""}
                </div>

                <p class="research-summary">${r.summary}</p>

                ${r.videos ? `
                    <h3>Related Media</h3>
                    <div class="video-scroll">
                    ${r.videos.map(v => `
                        <div class="video">
                        <iframe
                            src="https://www.youtube.com/embed/${v}"
                            loading="lazy"
                            allowfullscreen
                        ></iframe>
                        </div>
                    `).join("")}
                    </div>
                ` : ""}

                ${r.links ? `
                    <div class="links-row">
                    ${r.links.map(l => `
                        <a class="chip" href="${l.url}" target="_blank" rel="noopener">
                        ${l.label}
                        </a>
                    `).join("")}
                    </div>
                ` : ""}
                `;

            container.appendChild(section);
            });
        });
        })
        .catch(err => {
        console.error(err);
        containers.forEach(c => {
            c.innerHTML = "<p>Failed to load research entries.</p>";
        });
        });
});
