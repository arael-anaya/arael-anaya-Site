import { renderEntries } from "./render.js";

const containers = document.querySelectorAll("#projects, [data-project]");

fetch("/components/jsons/projects.json")
    .then(r => {
    if (!r.ok) throw new Error("Failed to load projects.json");
    return r.json();
    })
    .then(entries => {
        
        containers.forEach(container => {
            const attr = container.dataset.project;
            const ids = attr
            ? attr.split(/[\s,]+/)
            : null;

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
