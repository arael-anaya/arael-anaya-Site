export function renderSectionHeader(sectionId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch("/components/jsons/sectionHeader.json")
        .then(r => r.json())
        .then(sections => {
        const s = sections[sectionId];
        if (!s) return;

        container.innerHTML = `
            <header class="section-header" id="${sectionId}">
                <h1 class="section-header-title">${s.title}</h1>

                <div class="section-header-row">
                ${s.lead ? `<p class="section-header-lead">${s.lead}</p>` : ""}

                </div>
            </header>
            `;

        });
}
