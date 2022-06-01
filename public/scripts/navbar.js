
const navBar = document.querySelector(".sidenav");
const navBarBkg = document.getElementById("mobile-nav--bkg");

function makeActive(link_id) {
    var sidenavList = document.getElementsByClassName("active");
    for (let item of sidenavList) {
        item.classList.remove("active");
    }
    
    var sidenavLink = document.getElementById(link_id);
    sidenavLink.classList.add("active");
 }

 function openMobileNav() {
    navBar.style.display = "block";
    navBar.style.width = "75%";
    navBar.style.maxWidth = "350px";

    navBarBkg.style.display = "block";
 }

function closeMobileNav(e) {
    if (e.matches) {
        navBar.style.display = "none";
        navBar.style.minWidth = "auto";
        navBar.style.width = "170px !important";
        navBarBkg.style.display = "none";
    }
 }

function closeMobileNav() {
    navBar.style.display = "none";
    navBar.style.minWidth = "auto";
    navBar.style.width = "170px !important";
    navBarBkg.style.display = "none";
 }

//Close mobile nav menu on window resize, if open
const mobileQuery = window.matchMedia('(min-width: 850px)');
mobileQuery.addEventListener("change", () => { closeMobileNav(); });


 