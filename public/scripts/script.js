function makeActive(link_id) {
    var sidenavList = document.getElementsByClassName("active");
    for (let item of sidenavList) {
        item.classList.remove("active");
    }
    
    var sidenavLink = document.getElementById(link_id);
    sidenavLink.classList.add("active");
 }

 