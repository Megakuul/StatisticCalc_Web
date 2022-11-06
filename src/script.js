function getNavItems() {
}
function setActive(id) {
    var navbar = document.getElementsByClassName("active");
    for (var i = 0; i < navbar.length; i++) {
        navbar.item(i).classList.remove("active");
    }
    var item = document.getElementById(id);
    item.classList.add("active");
}
//# sourceMappingURL=script.js.map