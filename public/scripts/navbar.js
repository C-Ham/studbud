//DESCRIPTION: Handle implementation of regular and mobile navigation menu
//The mobile navigation menu only appears on media queries of w~<850px



const navBar = document.querySelector(".sidenav");
const navBarBkg = document.getElementById("mobile-nav--bkg");

//Handle toggle states for side navigation menu
function makeActive(link_id) {
    var sidenavList = document.getElementsByClassName("active");
    for (let item of sidenavList) {
        item.classList.remove("active");
    }
    
    var sidenavLink = document.getElementById(link_id);
    sidenavLink.classList.add("active");
 }

//Open mobile navigation menu, and display it over page content
 function openMobileNav() {
    navBar.style.display = "block";
    navBar.style.width = "75%";
    navBar.style.maxWidth = "350px";

    navBarBkg.style.display = "block";
 }

//Close mobile navigation menu
function closeMobileNav(e) {
    if (e.matches) {
        navBar.style.display = "none";
        navBar.style.minWidth = "auto";
        navBar.style.width = "170px !important";
        navBarBkg.style.display = "none";
    }
 }

//Close mobile navigation menu
function closeMobileNav() {
    navBar.style.display = "none";
    navBar.style.minWidth = "auto";
    navBar.style.width = "170px !important";
    navBarBkg.style.display = "none";
 }

//Close mobile nav menu on window resize, if open
const mobileQuery = window.matchMedia('(min-width: 850px)');
mobileQuery.addEventListener("change", () => { closeMobileNav(); });


 