import * as Chart from 'chart.js';
const addBx = $("addBx");
const removeBx = $("removeBx");
const addValBx = $("addValBx");
const remValBx = $("remValBx");
const addSlider = $("addSlider");
const remSlider = $("remSlider");
const addCountLbl = $("addCountr");
const remCountLbl = $("remCountr");
const addConfBtn = $("addConfBtn");
const remConfBtn = $("remConfBtn");
const mainChart = $("mainChart");
const clearListBtn = $("clearListBtn");
const add_class = "addvalue";
const remove_class = "removevalue";
const navbar_class = "navbar";
const navitem_class = "navitem";
const active_class = "active";
let valueList = [];
let currentActive = $$(active_class)[0];
initEventListeners();
//shortener for getElementBy -> anti boilerplate
function $(input) {
    return document.getElementById(input);
}
function $$(input) {
    return document.getElementsByClassName(input);
}
//shortener for getElementBy -> anti boilerplate
function initEventListeners() {
    //Init Navitems
    let navbar = $$(navitem_class);
    for (let i = 0; i < navbar.length; i++) {
        navbar.item(i).addEventListener("click", setActive(navbar.item(i)));
    }
    let addValueElements = $$(add_class);
    for (let i = 0; i < addValueElements.length; i++) {
        addValueElements.item(i).addEventListener("click", showDialog(addBx));
    }
    let removeValueElements = $$(remove_class);
    for (let i = 0; i < addValueElements.length; i++) {
        removeValueElements.item(i).addEventListener("click", showDialog(removeBx));
    }
    window.addEventListener("click", function (event) {
        if (event.target == addBx) {
            addBx.style.display = "none";
        }
        if (event.target == removeBx) {
            removeBx.style.display = "none";
        }
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            addBx.style.display = "none";
            resetDialog(addSlider, addValBx, addCountLbl);
            removeBx.style.display = "none";
            resetDialog(remSlider, remValBx, remCountLbl);
            return;
        }
    });
    addSlider.addEventListener("input", updateSliderLabel(addCountLbl, addSlider));
    addConfBtn.addEventListener("click", function () {
        if (!addValueToList(addValBx.value, addSlider.value))
            return;
        resetDialog(addSlider, addValBx, addCountLbl);
    });
    remSlider.addEventListener("input", updateSliderLabel(remCountLbl, remSlider));
    remConfBtn.addEventListener("click", function () {
        if (!removeValueFromList(remValBx.value, remSlider.value))
            return;
        resetDialog(remSlider, remValBx, remCountLbl);
    });
    clearListBtn.addEventListener("click", function () {
        valueList = [];
        rewrapList();
    });
}
function showDialog(element) {
    return function () {
        element.style.display = "block";
    };
}
function hideDialog(element) {
    return function () {
        element.style.display = "none";
    };
}
function setActive(element) {
    return function () {
        let navbar = $$(active_class);
        for (let i = 0; i < navbar.length; i++) {
            navbar.item(i).classList.remove(active_class);
        }
        element.classList.add(active_class);
        currentActive = element;
    };
}
function updateSliderLabel(sliderLabel, slider) {
    return function () {
        sliderLabel.innerHTML = `
            Count: ${slider.value}
        `;
    };
}
function resetDialog(slider, valBx, countr) {
    slider.value = "1";
    valBx.value = "";
    countr.innerHTML = `Count: 1`;
}
function addValueToList(value, count) {
    if (!isNaN(value) && value != "") {
        for (let i = 0; i < count; i++) {
            valueList.push(value);
        }
        rewrapList();
        return true;
    }
    else {
        return false;
    }
}
function removeValueFromList(value, count) {
    if (!isNaN(value)) {
        for (let i = 0; i < count; i++) {
            const index = valueList.indexOf(value);
            if (index > -1) {
                valueList.splice(index, 1);
            }
        }
        rewrapList();
        return true;
    }
    else {
        return false;
    }
}
function rewrapList() {
    let list = $("valueList");
    list.innerHTML = "";
    for (let i = 0; i < valueList.length; i++) {
        list.innerHTML += `<li class="${valueList[i]}">${valueList[i]}</li>`;
    }
}
function createChart() {
    return new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                    data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
                    borderColor: "red",
                    fill: false
                }, {
                    data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
                    borderColor: "green",
                    fill: false
                }, {
                    data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
                    borderColor: "blue",
                    fill: false
                }]
        },
        options: {
            legend: { display: false }
        }
    });
}
//# sourceMappingURL=script.js.map