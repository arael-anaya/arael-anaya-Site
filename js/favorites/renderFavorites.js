export function renderBookCard(book, container) {
    if (!book) return;

    const card = document.createElement("a");
    card.href = book.external_url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "favorite-card";

    card.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.subtitle}</p>
        <small>${book.meta}</small>
    `;

    container.appendChild(card);
}

export function renderSongCard(song, container) {
    if (!song) return;

    const card = document.createElement("a");
    card.href = song.external_url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "favorite-card";

    card.innerHTML = `
        <img src="${song.image}" alt="${song.title}">
        <h3>${song.title}</h3>
        <p>${song.subtitle}</p>
        <small>${song.meta}</small>
    `;

    container.appendChild(card);
}

export function renderMovieCard(movie, container) {
    if (!movie) return;

    const card = document.createElement("a");
    card.href = movie.external_url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "favorite-card";

    card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.subtitle}</p>
        <small>${movie.meta}</small>
    `;

    container.appendChild(card);
}



