// Initialization
var buttons = document.getElementsByTagName("button"),
    fDisplay = document.getElementsByClassName("calc-display-first")[0],
    sDisplay = document.getElementsByClassName("calc-display-second")[0],
    marker = 0;
    

// Add symbols to displays

function addToFirstDisplay(str) {
    fDisplay.innerHTML += str;
}
function addToSecondDisplay(str) {
    fDisplay.innerHTML += str;
}
// Clear both displays (AC) 
function firstDisplayClear() {
    fDisplay.innerHTML = '';
}
function secondDisplayClear() {
    sDisplay.innerHTML = '';
}
// Clear current display
function ceLastDelite(marker) {
    if (marker === 1) {
        sDisplay.innerHTML = "";
        return;
    }
    fDisplay.innerHTML = "";   
}


document.onclick = function(element) {
    var target = element.target;
    var btn = target.closest("button"),
        value = target.getAttribute("value");
    if(!btn) {
        return;
    }
    if (value === "ac") {
        firstDisplayClear();
        secondDisplayClear();
        return;
    } 
    switch(value) {
        case "ce": 
            ceLastDelite(marker);
            break;
        default :
            addToFirstDisplay(value);
            break;
    }
};
