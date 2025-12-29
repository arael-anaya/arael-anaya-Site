import { fetchBook } from "../../components/api/googleBooks.js";
// import { fetchSong } from "../../components/api/spotify.js";
import { fetchSong } from "../../components/api/lastFm.js";

import { fetchMovie } from "../../components/api/tmdb.js";
import { renderMovieCard, renderBookCard, renderSongCard } from "./renderFavorites.js";




const CATEGORY_CONFIG = {
    books: {
        fetch: fetchBook,
        render: renderBookCard
    },
    songs: {
        fetch: fetchSong,
        render: renderSongCard
    },
    movies: {
        fetch: fetchMovie,
        render: renderMovieCard
    }
};


async function initFavorites() {
    const container = document.getElementById("favorites-container");
    if (!container) return;

    const data = await loadFavoritesData();

    for (const [category, items] of Object.entries(data)) {
        if (!items.length) continue;

        const config = CATEGORY_CONFIG[category];
        if (!config) continue;

        for (const item of items) {
            try {
                const result = await config.fetch(item.query);
                if (result) {
                    config.render(result, container);
                } else {
                    throw new Error("Empty API result");
                }
            } catch (err) {
                if (item.fallback) {
                    config.render({
                        ...item.fallback,
                        image: "",
                        external_url: "#",
                        source: "Manual"
                    }, container);
                } else {
                    console.warn(`Failed to load ${category}:`, item.query, err);
                }
            }
        }
    }
}

async function loadFavoritesData() {
    const response = await fetch("../../components/jsons/data/favorites.json");
    if (!response.ok) {
        throw new Error("Failed to load favorites.json");
    }
    return response.json();
}

initFavorites();
