fetch("components/projects.json")
    .then(res => res.json())
    .then(projects => {
        // Targets:
        // - projects.html: <section id="projects"></section>
        // - index.html: <section data-project-id="megn-301"></section>
        const targets = document.querySelectorAll("#projects, [data-project-id]");

        if (!targets.length) return;

        targets.forEach(container => {
        const onlyId = container.dataset.projectId;

        const filtered = onlyId
            ? projects.filter(p => p.id === onlyId)
            : projects;

        filtered.forEach(p => {
            const section = document.createElement("section");
            section.className = "card project-block";

            section.innerHTML = `
            <h2>${p.title}</h2>
            <p class="project-meta">${p.meta}</p>
            <p class="project-summary">${p.summary}</p>

            ${p.bullets ? `
                <ul class="bullets">
                ${p.bullets.map(b => `<li>${b}</li>`).join("")}
                </ul>
            ` : ""}

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
