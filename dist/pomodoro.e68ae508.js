const collapseButton = document.getElementById("collapse-btn");
function collapseToggle() {
    if (collapseButton.parentElement.classList.contains("collapsed")) {
        collapseButton.parentElement.classList.remove("collapsed");
        collapseButton.innerHTML = "&#8250;";
    } else {
        collapseButton.parentElement.classList.add("collapsed");
        collapseButton.innerHTML = "&#8249;";
    }
}

//# sourceMappingURL=pomodoro.e68ae508.js.map
