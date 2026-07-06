document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("welcome-modal");
    const closeButton = document.getElementById("welcome-close");

    modal.hidden = false;

    closeButton.addEventListener("click", () => {
        modal.hidden = true;
    });
});