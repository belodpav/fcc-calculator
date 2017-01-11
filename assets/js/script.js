// Initialization
var buttons = document.getElementsByTagName("button"),
    fDisplay = document.getElementsByClassName("calc-display-first")[0],
    sDisplay = document.getElementsByClassName("calc-display-second")[0],
    marker = 0,
    markerPointF = 0,
    markerPointS = 0,
    markerFirstItem = 0,
    markerDigits = 0,
    valueF = 0,
    valueS = 0;
    

// Add symbols to displays

function addToFirstDisplay(str) {
    fDisplay.innerHTML += str;
}
function addToSecondDisplay(str) {
    sDisplay.innerHTML += str;
}
// Clear both displays (AC) 
function firstDisplayClear() {
    fDisplay.innerHTML = '';
    
}
function secondDisplayClear() {
    sDisplay.innerHTML = '';
}

function addOperation(operator) {
    valueS = parseFloat(sDisplay.innerHTML);   
    switch (operator) {
            case "+":
                valueF +=valueS;
                if (markerFirstItem !== 0) {
                    secondDisplayClear();  
                    sDisplay.innerHTML = valueF.toString();      
                }
                
                markerFirstItem = 1;
                
                console.log(valueF,"  ",valueS);
                break;
    }
    
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
        valueF = 0;
        valueS = 0;
        markerFirstItem = 0;
        markerDigits = 0;
        return;
    } 

    switch(value) {
        case "ce": 
            ceLastDelite(marker);
            break;
        case "+": 
            if (markerDigits === 1) {
                addToFirstDisplay(sDisplay.innerHTML+"+");
                addOperation("+");
                markerDigits = 0;
                
            }
            
            break;   
        default :
            if (markerDigits === 0) {
                secondDisplayClear();
            }
            //addToFirstDisplay(sDisplay.innerHTML);
            addToSecondDisplay(value);
            markerDigits = 1;
            break;
    }
};
