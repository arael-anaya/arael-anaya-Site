import { renderEntries } from "./render.js";

// Find all valid project containers
const containers = document.querySelectorAll("#projects, [data-project]");

// If no containers exist on this page, do nothing safely
if (!containers.length) {
    console.warn("No project containers found on this page.");
    } else {
    fetch("/components/jsons/pages/projects.json")
        .then(r => {
        if (!r.ok) throw new Error("Failed to load projects.json");
        return r.json();
        })
        .then(entries => {
        containers.forEach(container => {
            const attr = container.dataset.project;

            // If data-project exists, render only those IDs
            const ids = attr ? attr.split(/[\s,]+/) : null;

            const filtered = ids
            ? entries.filter(e => ids.includes(e.id))
            : entries;

            renderEntries(filtered, container);
        });
        })
        .catch(err => {
        console.error(err);
        containers.forEach(c => {
            c.innerHTML = "<p>Failed to load projects entries.</p>";
        });
        });
}
