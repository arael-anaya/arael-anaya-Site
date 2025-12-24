fetch("components/projects.json")
    .then(res => res.json())
    .then(projects => {

        document
        .querySelectorAll("#projects, [data-project]")
        .forEach(container => {

            const projectAttr = container.dataset.project;

            const requestedIds = projectAttr
            ? projectAttr
                .split(/[\s,]+/)
                .map(id => id.trim())
                .filter(Boolean)
            : null;

            const filtered = requestedIds
            ? projects.filter(p => requestedIds.includes(p.id))
            : projects;

            filtered.forEach(p => {
            const section = document.createElement("section");
            section.className = "card project-block";

            section.innerHTML = `
                <h2>${p.title}</h2>
                <p class="project-meta">${p.meta}</p>
                <p class="project-summary">${p.summary}</p>

                ${p.report ? `
                <div class="project-actions">
                    <button
                    class="chip"
                    data-report="${p.report.pdf}"
                    data-title="${p.report.title}"
                    >
                    Project Report
                    </button>
                </div>
                ` : ""}

                ${p.videos ? `
                <h3>Demonstration Videos</h3>
                <div class="video-scroll">
                    ${p.videos.map(v => `
                    <div class="video">
                        <iframe
                        src="https://www.youtube.com/embed/${v}"
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
    });
