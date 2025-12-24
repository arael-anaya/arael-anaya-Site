// Open modal
document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = document.getElementById(btn.dataset.modal);
        modal?.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

// Close via button
document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".modal-overlay")?.classList.remove("active");
        document.body.style.overflow = "";
    });
});

// Close via backdrop
document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", () => {
        backdrop.parentElement.classList.remove("active");
        document.body.style.overflow = "";
    });
});

// Close via ESC
document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => {
        m.classList.remove("active");
    });
    document.body.style.overflow = "";
    }
});



