import { renderEntries } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  // Accept either a page container (#research) or any featured containers ([data-research])
    const containers = document.querySelectorAll("#research, [data-research]");
    if (!containers.length) return;

    fetch(new URL("../components/jsons/pages/research.json", import.meta.url))
        .then(r => {
        if (!r.ok) throw new Error("Failed to load research.json");
        return r.json();
        })
        .then(entries => {
        containers.forEach(container => {
            const attr = container.dataset.research;
            // If data-research exists, filter; otherwise render all
            const ids = attr ? attr.split(/[\s,]+/) : null;
            const filtered = ids ? entries.filter(e => ids.includes(e.id)) : entries;

            renderEntries(filtered, container);
        });
        })
        .catch(err => {
        console.error(err);
        containers.forEach(c => {
            c.innerHTML = "<p>Failed to load research entries.</p>";
        });
        });
});
