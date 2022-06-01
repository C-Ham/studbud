const navBar = document.querySelector(".sidenav");
const navBarBkg = document.getElementById("mobile-nav--bkg");
function makeActive(link_id) {
    var sidenavList = document.getElementsByClassName("active");
    for (let item of sidenavList)item.classList.remove("active");
    var sidenavLink = document.getElementById(link_id);
    sidenavLink.classList.add("active");
}
function openMobileNav() {
    navBar.style.display = "block";
    navBar.style.width = "75%";
    navBar.style.maxWidth = "350px";
    navBarBkg.style.display = "block";
}
function closeMobileNav() {
    navBar.style.display = "none";
    navBarBkg.style.display = "none";
}

//# sourceMappingURL=index.4cd70b43.js.map
