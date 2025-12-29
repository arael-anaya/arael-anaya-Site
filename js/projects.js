import { renderEntries } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  // Accept either a page container (#projects) or any featured containers ([data-project])
    const containers = document.querySelectorAll("#projects, [data-project]");
    if (!containers.length) return;

    fetch(new URL("../components/jsons/pages/projects.json", import.meta.url))
        .then(r => {
        if (!r.ok) throw new Error("Failed to load projects.json");
        return r.json();
        })
        .then(entries => {
        containers.forEach(container => {
            const attr = container.dataset.project;
            // If data-project exists, filter; otherwise render all
            const ids = attr ? attr.split(/[\s,]+/) : null;
            const filtered = ids ? entries.filter(e => ids.includes(e.id)) : entries;

            renderEntries(filtered, container);
        });
        })
        .catch(err => {
        console.error(err);
        containers.forEach(c => {
            c.innerHTML = "<p>Failed to load project entries.</p>";
        });
        });
});
