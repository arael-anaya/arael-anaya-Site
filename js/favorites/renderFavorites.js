export function renderFavoriteCard(item, container) {
    if (!item) return;

    const card = document.createElement("a");
    card.href = item.external_url || "#";
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "favorite-card";

    card.innerHTML = `
        <div class="favorite-image">
        ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ""}
        </div>

        <div class="favorite-text">
        ${item.featured ? `<span class="favorite-featured">Featured</span>` : ""}
        <h3>${item.title}</h3>
        ${item.subtitle ? `<p>${item.subtitle}</p>` : ""}
        ${item.meta ? `<small>${item.meta}</small>` : ""}
        ${item.source ? `<span class="favorite-source">${item.source}</span>` : ""}
        </div>
    `;

    container.appendChild(card);
}
