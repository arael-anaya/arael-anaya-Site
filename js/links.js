export function renderLinks(containerId, filterLabel = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(new URL("../components/links.json", import.meta.url))

        .then(r => r.json())
        .then(links => {
            let filtered = filterLabel
                ? links.filter(l => l.label === filterLabel)
                : links;

            // Explicit desired order
            const ORDER = [
                "GitHub",
                "LinkedIn",
                "Google Scholar",
                "YouTube",
                "YouTube Channel"
            ];

            filtered.sort(
                (a, b) => ORDER.indexOf(a.label) - ORDER.indexOf(b.label)
            );

            container.innerHTML = filtered.map(l => `
                <a class="action-btn action-link"
                    href="${l.url}"
                    target="_blank"
                    rel="noopener">
                    ${l.label}
                </a>
            `).join("");
        });
}
