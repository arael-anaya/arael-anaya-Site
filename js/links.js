export function renderLinks(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch("/components/jsons/links.json")
        .then(r => r.json())
        .then(links => {
        container.innerHTML = links.map(l => `
            <a class="action-btn action-link"
            href="${l.url}"
            target="_blank"
            rel="noopener">
            ${l.label}
            </a>
        `).join("");
        });
}
