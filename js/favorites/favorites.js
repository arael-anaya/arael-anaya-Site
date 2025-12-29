import { fetchBook } from "../../components/api/googleBooks.js";
import { fetchSong } from "../../components/api/lastFm.js";
import { fetchMovie } from "../../components/api/tmdb.js";
import { renderFavoriteCard } from "./renderFavorites.js";

/* =========================
   CONFIG
========================= */

const CACHE_VERSION = "favorites-v2";

const renderedData = {
    books: [],
    songs: [],
    movies: []
};

const CATEGORY_CONFIG = {
    books: { fetch: fetchBook },
    songs: { fetch: fetchSong },
    movies: { fetch: fetchMovie }
};

const ttlMap = {
    books: 1000 * 60 * 60 * 24 * 30,
    songs: 1000 * 60 * 60 * 24 * 7,
    movies: 1000 * 60 * 60 * 24 * 30
};

const titleMap = {
    books: "Books",
    songs: "Music",
    movies: "Movies"
};

/* =========================
   URL PARAM HELPERS
========================= */

function getParam(name, fallback) {
    const v = new URLSearchParams(window.location.search).get(name);
    return v ?? fallback;
}

function setParams(params) {
    const url = new URL(window.location);
    Object.entries(params).forEach(([k, v]) => {
        if (v) url.searchParams.set(k, v);
        else url.searchParams.delete(k);
    });
    history.replaceState({}, "", url);
}

/* =========================
   CACHE HELPERS
========================= */

function getCacheKey(category) {
    return `${CACHE_VERSION}-favorites-${category}`;
}

function loadFromCache(category, ttlMs) {
    const raw = localStorage.getItem(getCacheKey(category));
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > ttlMs) return null;

    return parsed.data;
}

function saveToCache(category, data) {
    localStorage.setItem(
        getCacheKey(category),
        JSON.stringify({
            timestamp: Date.now(),
            data
        })
    );
}

/* =========================
   SORTING
========================= */

function sortItems(items, mode) {
    const copy = [...items];

    switch (mode) {
        case "rating-desc":
            return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

        case "alpha":
            return copy.sort((a, b) => a.title.localeCompare(b.title));

        case "alpha-rev":
            return copy.sort((a, b) => b.title.localeCompare(a.title));

        case "date-added":
            return copy.sort(
                (a, b) => new Date(b.dateAdded ?? 0) - new Date(a.dateAdded ?? 0)
            );

        case "date-released":
            return copy.sort(
                (a, b) => new Date(b.meta ?? 0) - new Date(a.meta ?? 0)
            );

        default: // featured
            return copy.sort(
                (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
            );
    }
}

/* =========================
   DATA LOAD
========================= */

async function loadFavoritesData() {
    const response = await fetch("../../components/jsons/data/favorites.json");
    if (!response.ok) {
        throw new Error("Failed to load favorites.json");
    }
    return response.json();
}

/* =========================
   MAIN INIT
========================= */

async function initFavorites() {
    const container = document.getElementById("favorites-container");
    if (!container) return;

    const data = await loadFavoritesData();

    function createCategorySection(title, category) {
        const section = document.createElement("section");
        section.className = "favorites-section";
        section.dataset.category = category;

        section.innerHTML = `
            <h2 class="favorites-heading">${title}</h2>
            <div class="favorites-grid" data-category="${category}"></div>
        `;
        return section;
    }

    /* ---------- RENDER CATEGORIES ---------- */
    for (const [category, items] of Object.entries(data)) {
        if (!items?.length) continue;

        const config = CATEGORY_CONFIG[category];
        if (!config) continue;

        const section = createCategorySection(
            titleMap[category] ?? category,
            category
        );
        const grid = section.querySelector(".favorites-grid");

        const cached = loadFromCache(category, ttlMap[category]);
        if (cached) {
            cached.forEach(item => renderFavoriteCard(item, grid));
            renderedData[category] = cached;
            container.appendChild(section);
            continue;
        }

        const sortedItems = [...items].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return (a.query ?? "").localeCompare(b.query ?? "");
        });

        const collected = [];

        for (const item of sortedItems) {
            try {
                const result = await config.fetch(item.query);
                if (!result) continue;

                const enriched = {
                    ...result,
                    featured: item.featured ?? false,
                    rating: item.rating ?? null,
                    dateAdded: item.dateAdded ?? null
                };

                renderFavoriteCard(enriched, grid);
                collected.push(enriched);
            } catch {
                if (item.fallback) {
                    const fallback = {
                        ...item.fallback,
                        featured: item.featured ?? false,
                        rating: item.rating ?? null,
                        dateAdded: item.dateAdded ?? null,
                        image: "",
                        external_url: "#",
                        source: "Manual"
                    };
                    renderFavoriteCard(fallback, grid);
                    collected.push(fallback);
                }
            }
        }

        saveToCache(category, collected);
        renderedData[category] = collected;
        container.appendChild(section);
    }

    /* ---------- SORT CONTROL ---------- */
    const sortSelect = document.getElementById("favorites-sort");
    if (sortSelect) {
        sortSelect.addEventListener("change", e => {
            const mode = e.target.value;
            setParams({ sort: mode });

            document.querySelectorAll(".favorites-grid").forEach(grid => {
                const category = grid.dataset.category;
                const sorted = sortItems(renderedData[category], mode);

                grid.innerHTML = "";
                sorted.forEach(item => renderFavoriteCard(item, grid));
            });
        });
    }

    /* ---------- FILTER CONTROL ---------- */
    const filterButtons = document.querySelectorAll(".favorites-filters button");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            setParams({ filter });

            filterButtons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");

            document.querySelectorAll(".favorites-section").forEach(section => {
                const category = section.dataset.category;
                section.style.display =
                    filter === "all" || category === filter ? "" : "none";
            });
        });
    });

    /* ---------- INITIAL STATE FROM URL ---------- */
    const initialFilter = getParam("filter", "all");
    const initialSort = getParam("sort", "featured");

    document
        .querySelector(`.favorites-filters button[data-filter="${initialFilter}"]`)
        ?.click();

    if (sortSelect) {
        sortSelect.value = initialSort;
        sortSelect.dispatchEvent(new Event("change"));
    }
}

/* ========================= */

initFavorites();
