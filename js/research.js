fetch("components/research.json")
    .then(res => {
        if (!res.ok) throw new Error("Failed to load research.json");
        return res.json();
    })
    .then(research => {

        document
        .querySelectorAll("#research, [data-research]")
        .forEach(container => {

            const researchAttr = container.dataset.research;

            const requestedIds = researchAttr
            ? researchAttr
                .split(/[\s,]+/)
                .map(id => id.trim())
                .filter(Boolean)
            : null;

            const filtered = requestedIds
            ? research.filter(r => requestedIds.includes(r.id))
            : research;

            filtered.forEach(r => {
            const section = document.createElement("section");
            section.className = "card research-block";

            section.innerHTML = `
                <div class="research-row">
                <div class="research-text">
                    <h2>${r.title}</h2>
                    <p class="research-meta">${r.meta}</p>
                    <p class="research-summary">${r.summary}</p>
                </div>

                ${r.logo ? `
                    <div class="research-logo">
                    <img src="${r.logo}" alt="${r.title} logo">
                    </div>
                ` : ""}
                </div>

                ${r.links ? `
                <div class="links-row">
                    ${r.links.map(l => `
                    <a
                        class="chip"
                        href="${l.url}"
                        target="_blank"
                        rel="noopener"
                    >
                        ${l.label}
                    </a>
                    `).join("")}
                </div>
                ` : ""}

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
            `;

            container.appendChild(section);
            });
        });
    })
    .catch(err => {
        console.error(err);
        document
        .querySelectorAll("#research, [data-research]")
        .forEach(c => {
            c.innerHTML = "<p>Failed to load research entries.</p>";
        });
    });
