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
const valueListCookie = "valueList";
let valueListY = JSON.parse(getCookie(valueListCookie)) || [];
function changeValueList(newValue) {
    setCookie(valueListCookie, JSON.stringify(newValue));
    valueListY = JSON.parse(getCookie(valueListCookie)) || [];
}
let valueListX = [];
let currentActive = $$(active_class)[0];
//Chart------------------------------------------------------------------//
const chart = new Chart(mainChart, {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Values",
                data: [],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1,
                fill: true
            },
            {
                label: "Median (η)",
                data: [],
                borderColor: 'red',
                borderWidth: 1,
                pointRadius: 1,
                fill: true
            },
            {
                label: "Arithmetic Mean (μ)",
                data: [],
                borderColor: 'green',
                borderWidth: 1,
                pointRadius: 1,
                fill: true
            },
            {
                label: "Standard Deviation (σ) population",
                data: [],
                borderColor: 'rgb(0, 0, 102)',
                borderWidth: 1,
                pointRadius: 1,
                fill: true
            },
            {
                label: "Standard Deviation (σ) sample",
                data: [],
                borderColor: 'rgb(0, 0, 255)',
                borderWidth: 1,
                pointRadius: 1,
                fill: true
            },
        ]
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
//Load Chart from cookie
rewrap();
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
        changeValueList([]);
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
        let tempList = valueListY;
        for (let i = 0; i < count; i++) {
            tempList.push(value);
        }
        changeValueList(tempList);
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
            let tempList = valueListY;
            const index = tempList.indexOf(value);
            if (index > -1) {
                tempList.splice(index, 1);
            }
            changeValueList(tempList);
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
    rewrapList(valueListY);
    rewrapChart();
}
function rewrapList(list) {
    //Create copy of the Object, without this the list Object would be sorted in the global scope.
    let liste = [...list];
    liste.sort((a, b) => a - b);
    let valueList = $("valueList");
    valueList.innerHTML = "";
    for (let i = 0; i < liste.length; i++) {
        valueList.innerHTML += `<li class="${liste[i]}">${liste[i]}</li>`;
    }
}
function rewrapChart() {
    chart.data.labels = valueListX;
    chart.data.datasets[0].data = valueListY;
    chart.data.datasets[1].data = getMedian(valueListY, valueListX.length);
    chart.data.datasets[2].data = getArithmeticMean(valueListY, valueListX.length);
    chart.data.datasets[3].data = getStandardDeviation(valueListY, valueListX.length, false);
    chart.data.datasets[4].data = getStandardDeviation(valueListY, valueListX.length, true);
    chart.update();
}
function setXValue() {
    valueListX = [];
    for (let i = 0; i < valueListY.length; i++) {
        valueListX.push(i + 1);
    }
}
//Mathematical functions
function getMedian(list, count) {
    //Create duplicate of list, without this we would sort the original list
    let liste = [...list];
    liste.sort((a, b) => a - b);
    let tempVal = 0;
    //check if number is odd with the modulo operator
    if (liste.length % 2) {
        //ungerade
        let num = Math.floor(liste.length / 2);
        tempVal = liste[num];
    }
    else {
        let num1 = Math.floor(liste.length / 2);
        let num2 = num1 - 1;
        tempVal = (Number(liste[num1]) + Number(liste[num2])) / 2;
    }
    //Create a temp list who has the lenght of the charts X-Value (so that it sizes correctly)
    let tempList = [];
    for (let i = 0; i < count; i++) {
        tempList.push(tempVal);
    }
    return tempList;
}
function getArithmeticMean(list, count) {
    let tempVal = 0;
    for (let i = 0; i < list.length; i++) {
        tempVal += Number(list[i]);
    }
    //Create a temp list who has the lenght of the charts X-Value (so that it sizes correctly)
    let tempList = [];
    for (let i = 0; i < count; i++) {
        tempList.push(tempVal / list.length);
    }
    return tempList;
}
function getStandardDeviation(list, count, sample) {
    let tempVal = 0;
    let tempNum = 0;
    const average = getArithmeticMean(list, 1)[0];
    for (let i = 0; i < list.length; i++) {
        tempNum += Number(Math.pow(list[i] - average, 2));
    }
    if (sample)
        tempVal = Math.sqrt(tempNum / (list.length - 1));
    else
        tempVal = Math.sqrt(tempNum / list.length);
    //Create a temp list who has the lenght of the charts X-Value (so that it sizes correctly)
    let tempList = [];
    for (let i = 0; i < count; i++) {
        tempList.push(tempVal);
    }
    return tempList;
}
//Mathematical functions
//shortener for getElementBy -> anti boilerplate
function $(input) {
    return document.getElementById(input);
}
function $$(input) {
    return document.getElementsByClassName(input);
}
//shortener for getElementBy -> anti boilerplate
//Cookie functions
function setCookie(name, value) {
    document.cookie = name + "=" + value + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
//Cookie functions
