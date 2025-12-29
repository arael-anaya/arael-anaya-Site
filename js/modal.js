const modal = document.getElementById("project-modal");
const frame = document.getElementById("modal-frame");
const title = document.getElementById("modal-title");

document.addEventListener("click", e => {
    const openBtn = e.target.closest("[data-report]");
    const closeBtn = e.target.closest(".modal-close");

    // OPEN → lazy load PDF
    if (openBtn) {
        lastFocusedElement = document.activeElement;

        frame.src = openBtn.dataset.report;
        title.textContent = openBtn.dataset.title;
        modal.classList.add("active");

        trapFocus(modal.querySelector(".modal"));
        document.body.style.overflow = "hidden";

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
    frame.src = "";
    document.body.style.overflow = "";

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

let lastFocusedElement = null;

function getFocusableElements(container) {
    return container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'
    );
}

function trapFocus(modal) {
    const focusable = getFocusableElements(modal);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    modal.addEventListener("keydown", e => {
        if (e.key !== "Tab") return;

        if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
        }
    });

    first.focus();
}

