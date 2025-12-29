let newsItems = [];
let newestFirst = true;

const container = document.getElementById("news");
const toggleBtn = document.querySelector(".news-sort-toggle");

function parseDate(dateStr) {
    // Expects formats like "Dec 2025"
    const [month, year] = dateStr.split(" ");
    return new Date(`${month} 1, ${year}`);
}

function renderNews() {
    const sorted = [...newsItems].sort((a, b) => {
        const da = parseDate(a.date);
        const db = parseDate(b.date);
        return newestFirst ? db - da : da - db;
    });

    container.innerHTML = `
        <ul class="news-list">
        ${sorted.map(item => `
            <li>
            <span class="news-date">${item.date}:</span>
            ${item.text}
            </li>
        `).join("")}
        </ul>
    `;
}

fetch("/components/jsons/news.json")
    .then(r => r.json())
    .then(items => {
        newsItems = items;
        renderNews();
    });

    if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        newestFirst = !newestFirst;
        toggleBtn.textContent = newestFirst
        ? "Newest first ↓"
        : "Oldest first ↑";
        toggleBtn.setAttribute("aria-expanded", String(!newestFirst));
        renderNews();
    });
}

const scrollMask = document.querySelector(".news-scroll-mask");
const newsList = scrollMask?.querySelector(".news-list");

let scrollTimeout;

if (newsList && scrollMask) {
    newsList.addEventListener("scroll", () => {
        scrollMask.classList.add("is-scrolling");

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
        scrollMask.classList.remove("is-scrolling");
        }, 150);
    });
    }

