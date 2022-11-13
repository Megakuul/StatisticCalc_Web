const addBx_id = "addBx";
const removeBx_id = "removeBx";
const add_class = "addvalue";
const remove_class = "removevalue";
const navbar_class = "navbar";
const navitem_class = "navitem";
const active_class = "active";
let valueList;
let currentActive = document.getElementsByClassName(active_class)[0];
initEventListeners();
function initEventListeners() {
    //Init Navitems
    let navbar = document.getElementsByClassName(navitem_class);
    for (let i = 0; i < navbar.length; i++) {
        navbar.item(i).addEventListener("click", setActive(navbar.item(i)));
    }
    let addValueElements = document.getElementsByClassName(add_class);
    for (let i = 0; i < addValueElements.length; i++) {
        addValueElements.item(i).addEventListener("click", showDialog(addBx_id));
    }
    let removeValueElements = document.getElementsByClassName(remove_class);
    for (let i = 0; i < addValueElements.length; i++) {
        removeValueElements.item(i).addEventListener("click", showDialog(removeBx_id));
    }
    window.addEventListener("click", function (event) {
        if (event.target == document.getElementById(addBx_id))
            document.getElementById(addBx_id).style.display = "none";
    });
    window.addEventListener("click", function (event) {
        if (event.target == document.getElementById(removeBx_id))
            document.getElementById(removeBx_id).style.display = "none";
    });
}
function showDialog(id) {
    return function () {
        document.getElementById(id).style.display = "block";
    };
}
function hideDialog(id) {
    return function () {
        document.getElementById(id).style.display = "none";
    };
}
function setActive(element) {
    return function () {
        let navbar = document.getElementsByClassName(active_class);
        for (let i = 0; i < navbar.length; i++) {
            navbar.item(i).classList.remove(active_class);
        }
        element.classList.add(active_class);
    };
}
//# sourceMappingURL=script.js.map