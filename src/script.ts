//Chart.js Lib
import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";

//Make that Typescript compiler shut the fuck up
declare var Chart: any;

const addBx         = <HTMLDivElement>$("addBx");
const removeBx      = <HTMLDivElement>$("removeBx");
const addValBx      = <HTMLInputElement>$("addValBx");
const remValBx      = <HTMLInputElement>$("remValBx");
const addSlider     = <HTMLInputElement>$("addSlider");
const remSlider     = <HTMLInputElement>$("remSlider");
const addCountLbl   = <HTMLParagraphElement>$("addCountr");
const remCountLbl   = <HTMLParagraphElement>$("remCountr");
const addConfBtn    = <HTMLButtonElement>$("addConfBtn");
const remConfBtn    = <HTMLButtonElement>$("remConfBtn");
const mainChart     = <HTMLCanvasElement>$("mainChart");
const clearListBtn  = $("clearListBtn");
 
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
                    label: "Median",
                    data: [],
                    borderColor: 'red',
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: true
                },
                {
                    label: "Arithmetic Mean (μ)",
                    data: [],
                    borderColor: 'green',
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: true
                },
                {
                    label: "Standard Deviation (σ)",
                    data: [],
                    borderColor: 'blue',
                    borderWidth: 1,
                    pointRadius: 0,
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

    window.addEventListener("click", function(event) {
        if (event.target == addBx) {
            addBx.style.display = "none";
        }
        if (event.target == removeBx) {
            removeBx.style.display = "none";
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            addBx.style.display = "none";
            resetDialog(addSlider, addValBx, addCountLbl);
            removeBx.style.display = "none";
            resetDialog(remSlider, remValBx, remCountLbl);
            return;
        }
    });

    addSlider.addEventListener("input", updateSliderLabel(addCountLbl, addSlider));

    addConfBtn.addEventListener("click", function() {
        if (!addValueToList(addValBx.value, addSlider.value))
            return;
        resetDialog(addSlider, addValBx, addCountLbl);
    });

    remSlider.addEventListener("input", updateSliderLabel(remCountLbl, remSlider));

    remConfBtn.addEventListener("click", function() {
        if (!removeValueFromList(remValBx.value, remSlider.value))
            return;
        resetDialog(remSlider, remValBx, remCountLbl);
    });

    clearListBtn.addEventListener("click", function() {
        changeValueList([]);
        rewrap();
    });
}


function showDialog(element: HTMLDivElement) {
    return function() {
        element.style.display = "block";
    }
}

function hideDialog(element: HTMLDivElement) {
    return function() {
        element.style.display = "none";
    }
}

function setActive(element: Element) {
    return function() {
        let navbar = $$(active_class);
        for (let i = 0; i < navbar.length; i++) {
            navbar.item(i).classList.remove(active_class);
        }
        element.classList.add(active_class);
        currentActive = element;
    }
}

function updateSliderLabel(sliderLabel: Element, slider: HTMLInputElement) {
    return function() {
        sliderLabel.innerHTML = `
            Count: ${slider.value}
        `;
    }
}

function resetDialog(slider: HTMLInputElement, valBx: HTMLInputElement, countr: Element) {
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
    } else {
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
            changeValueList(tempList)
        }
        rewrap();
        return true;
    } else {
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
    chart.data.datasets[1].data = getMedian(valueListY, valueListX.length);
    chart.data.datasets[2].data = getArithmeticMean(valueListY, valueListX.length);
    chart.data.datasets[3].data = getStandardDeviation(valueListY, valueListX.length);

    chart.update();
}

function setXValue() {
    valueListX = [];
    for (let i = 0; i < valueListY.length; i++) {
        valueListX.push(i+1);
    }
}

//Mathematical functions

function getMedian(list, count) {
    let liste = [];
    for (let i = 0; i < count; i++) {
        liste.push(50);
    }

    return liste;
}

function getArithmeticMean(list, count) {
    let tempVal: number = 0;
    for (let i = 0; i < list.length; i++) {
        tempVal = tempVal + Number(list[i]);
    }
    //Create a temp list who has the lenght of the charts X-Value (so that it sizes correctly)
    let liste = [];
    for (let i = 0; i < count; i++) {
        liste.push(tempVal / list.length);
    }
    return liste;
}

function getStandardDeviation(list, count) {
    let liste = [];
    for (let i = 0; i < count; i++) {
        liste.push(70);
    }

    return liste;
}
//Mathematical functions

//shortener for getElementBy -> anti boilerplate
function $(input: string) {
    return document.getElementById(input);
}

function $$(input: string) {
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
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

//Cookie functions