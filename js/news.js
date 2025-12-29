let newsItems = [];
let newestFirst = true;

const container = document.getElementById("news-list");
const toggleBtn = document.querySelector(".news-sort-toggle");
const scrollMask = document.querySelector(".news-scroll-mask");

let scrollTimeout;

function parseDate(dateStr) {
    const [month, year] = dateStr.split(" ");
    return new Date(`${month} 1, ${year}`);
}

function attachScrollMask() {
    const newsList = scrollMask?.querySelector(".news-list");
    if (!newsList || !scrollMask) return;

    newsList.addEventListener("scroll", () => {
        scrollMask.classList.add("is-scrolling");

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
        scrollMask.classList.remove("is-scrolling");
        }, 150);
    });
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

    attachScrollMask(); // 👈 THIS is the missing piece
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
