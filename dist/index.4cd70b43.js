const addtaskModal = document.getElementById("modal");
function makeActive(link_id) {
    var sidenavList = document.getElementsByClassName("active");
    for (let item of sidenavList)item.classList.remove("active");
    var sidenavLink = document.getElementById(link_id);
    sidenavLink.classList.add("active");
}
function closeModal() {
    addtaskModal.style.display = "none";
}
function openModal() {
    addtaskModal.style.display = "block";
}

//# sourceMappingURL=index.4cd70b43.js.map
