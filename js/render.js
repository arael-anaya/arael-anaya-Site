// js/render.js
export function renderEntries(entries, container) {
    entries.forEach(e => {
        const hasMedia =
            e.report ||
            (Array.isArray(e.videos) && e.videos.length > 0) ||
            (Array.isArray(e.links) && e.links.length > 0);
        const section = document.createElement("section");
        section.className = "card content-block";

        section.innerHTML = `

            <section class = "content-card">

                <header class="content-header">
                    <div class="content-header-text">
                        <h2>${e.title}</h2>
                        ${e.meta ? 
                            `<p 
                                class="content-meta">${e.meta}
                            </p>` : ""}
                        ${e.lead ? `<p class = "content-lead">${e.lead}</p>` : ""}
                    </div>

                    

                    ${e.logo ? `
                        <div class="content-logo">
                            <img src="${e.logo}" alt="${e.title} logo">
                        </div>
                    ` : ""}
                </header>    

                <div class = "content-body">
                
                    ${e.summary ? `
                        <button class="content-toggle" aria-expanded="false">
                            Show more
                        </button>
                        
                        <div class="content-summary-wrapper">
                            <p class="content-summary">${e.summary}</p>
                        </div>

                    ` : ""}
                    
                    
                    ${e.bullets ? `
                        <ul class="content-bullets">
                        ${e.bullets.map(b => `<li>${b}</li>`).join("")}
                        </ul>
                    ` : ""}
                </div>
                
                
                ${hasMedia ? `
                <div class="content-divider"></div>
                
                <section class = "content-media">
                
                    <h3>Related Media</h3>

                    ${e.report ? `
                        <div class="content-actions">
                        <button class="chip"
                            data-report="${e.report.pdf}"
                            data-title="${e.report.title}">
                            Project Report
                        </button>
                        </div>
                    ` : ""}

                    ${e.videos ? `
                    <div class="video-scroll">
                        ${e.videos.map(v => {
                        const videoId = typeof v === "string" ? v : v.id;
                        const caption = typeof v === "string" ? "" : (v.caption || "");

                        return `
                            <figure class="video">
                            <iframe
                                src="https://www.youtube.com/embed/${videoId}"
                                loading="lazy"
                                allowfullscreen>
                            </iframe>
                            ${caption ? `<figcaption class="video-caption">${caption}</figcaption>` : ""}
                            </figure>
                        `;
                        }).join("")}
                    </div>
                    ` : ""}

                    ${e.links ? `
                        <footer class="content-links">
                        ${e.links.map(l => `
                            <a class="chip" href="${l.url}" target="_blank" rel="noopener">
                            ${l.label}
                            </a>
                        `).join("")}
                        </footer>
                    ` : ""}
                </section>
                `:""}
            
            </section>

        `;

        container.appendChild(section);
    });
}

document.addEventListener("click", e => {
  const btn = e.target.closest(".content-toggle");
  if (!btn) return;

  const body = btn.closest(".content-body");
  const expanded = body.classList.toggle("expanded");

  btn.textContent = expanded ? "Show less" : "Show more";
  btn.setAttribute("aria-expanded", expanded);
});
