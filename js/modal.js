const modal = document.getElementById("project-modal");
const frame = document.getElementById("modal-frame");
const title = document.getElementById("modal-title");

document.addEventListener("click", e => {
    const openBtn = e.target.closest("[data-report]");
    const closeBtn = e.target.closest(".modal-close");

    // OPEN → lazy load PDF
    if (openBtn) {
        frame.src = openBtn.dataset.report;
        title.textContent = openBtn.dataset.title;
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // optional but recommended
        return;
    }

    // CLOSE → unload PDF
    if (closeBtn || e.target === modal) {
        closeModal();
    }
    });

    // ESC key support
    document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
    });

    function closeModal() {
    modal.classList.remove("active");
    frame.src = "";                 // unload PDF (lazy loading)
    document.body.style.overflow = ""; // restore scroll
}
