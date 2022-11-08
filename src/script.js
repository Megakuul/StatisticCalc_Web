import * as DialogBox from "./extern/DialogBox.js";
const body_id = "body";
const add_class = "addvalue";
const remove_class = "removevalue";
const navbar_class = "navbar";
const navitem_class = "navitem";
const active_class = "active";
let valueList;
let currentActive = document.getElementsByClassName(active_class)[0];
let removeItemBox = "<p>Hallloooo Welt</p>";
//Onload create the Dialog
DialogBox.createDialog("body", removeItemBox);
initEventListeners();
function initEventListeners() {
    //Init Navitems
    let navbar = document.getElementsByClassName(navitem_class);
    for (let i = 0; i < navbar.length; i++) {
        navbar.item(i).addEventListener("click", setActive(navbar.item(i)));
    }
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