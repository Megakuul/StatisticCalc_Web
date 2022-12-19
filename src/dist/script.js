//Chart.js Lib
import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
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
let valueListY = [];
let valueListX = [];
let currentActive = $$(active_class)[0];
//Chart------------------------------------------------------------------//
const chart = new Chart(mainChart, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
                label: "Values",
                data: [],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1,
                fill: true
            }]
    },
    options: {
        scales: {
            xAxes: [{
                    ticks: {
                        fontColor: 'rgba(255, 255, 255, 0.8)'
                    }
                }],
            yAxes: [{
                    ticks: {
                        fontColor: 'rgba(255, 255, 255, 0.8)'
                    }
                }],
        },
        legend: {
            labels: {
                fontColor: 'rgba(255, 255, 255, 0.8)',
            }
        }
    }
});
//Chart------------------------------------------------------------------//
initEventListeners();
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
        valueListY = [];
        rewrap();
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
            valueListY.push(value);
        }
        rewrap();
        return true;
    }
    else {
        return false;
    }
}
function removeValueFromList(value, count) {
    if (!isNaN(value)) {
        for (let i = 0; i < count; i++) {
            const index = valueListY.indexOf(value);
            if (index > -1) {
                valueListY.splice(index, 1);
            }
        }
        rewrap();
        return true;
    }
    else {
        return false;
    }
}
function rewrap() {
    setXValue();
    rewrapList();
    rewrapChart();
}
function rewrapList() {
    let list = $("valueList");
    list.innerHTML = "";
    for (let i = 0; i < valueListY.length; i++) {
        list.innerHTML += `<li class="${valueListY[i]}">${valueListY[i]}</li>`;
    }
}
function rewrapChart() {
    chart.data.labels = valueListX;
    chart.data.datasets[0].data = valueListY;
    chart.update();
}
function setXValue() {
    valueListX = [];
    for (let i = 0; i < valueListY.length; i++) {
        valueListX.push(i + 1);
    }
    console.log(valueListX.length);
}
//shortener for getElementBy -> anti boilerplate
function $(input) {
    return document.getElementById(input);
}
function $$(input) {
    return document.getElementsByClassName(input);
}
//shortener for getElementBy -> anti boilerplate
//# sourceMappingURL=script.js.map