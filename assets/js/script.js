// Initialization
var buttons = document.getElementsByTagName("button"),
    fDisplay = document.getElementsByClassName("calc-display-first")[0],
    sDisplay = document.getElementsByClassName("calc-display-second")[0],
    marker = 0,
    markerPointF = 0,
    markerPointS = 0,
    markerPoint = 0,
    markerFirstItem = 0,
    markerDigits = 0,
    lastOperation = "",
    valueF = 0,
    valueS = 0;
    

// Add symbols to displays

function addToFirstDisplay(str) {
    if (fDisplay.textContent.length + str.length >= 20 ) {
        
        return;
    }
    fDisplay.textContent += str;
}
function addToSecondDisplay(str) {
    if (sDisplay.textContent.length + 1 >= 16) {
        return;
    }
    sDisplay.textContent += str;
}
// Clear both displays (AC) 
function firstDisplayClear() {
    fDisplay.textContent = '';
    
}
function secondDisplayClear() {
    sDisplay.textContent = '';
}

function addOperation(operator) {
    valueS = parseFloat(sDisplay.textContent);
    if (markerFirstItem === 0) {
        valueF = valueS;
        markerFirstItem = 1;
        console.log(valueF,"  ",valueS);
        return;
    }
    switch (operator) {
            case "+":
                valueF +=valueS;
                secondDisplayClear();  
                sDisplay.textContent = valueF.toString();      
                markerFirstItem = 1;
                console.log(valueF,"  ",valueS);
                break;
            case "-":
                valueF -=valueS;
                secondDisplayClear();  
                sDisplay.textContent = valueF.toString();
                markerFirstItem = 1;
                
                console.log(valueF,"  ",valueS);
                break;
            case "*":
                valueF *=valueS;
                secondDisplayClear();  
                sDisplay.textContent = valueF.toString();
                markerFirstItem = 1;
                
                console.log(valueF,"  ",valueS);
                break;
            case "/":
                if (valueS === "0") {
                    fDisplay.textContent = "";
                    sDisplay.textContent = "Infinity";
                    break;
                }
                valueF /=valueS;
                secondDisplayClear();  
                sDisplay.textContent = valueF.toString();
                markerFirstItem = 1;
                
                console.log(valueF,"  ",valueS);
                break;
    }
    
}
// Clear current display
function ceLastDelite(marker) {
    sDisplay.textContent = "";   
}


document.onclick = function(element) {
    var target = element.target;
    var btn = target,
        value = btn.getAttribute("value");
    
    if(btn.tagName !== "BUTTON") {
        return;
    }
    console.log(sDisplay.textContent);
    if (value === "ac" || sDisplay.textContent === "Infinity") {
        firstDisplayClear();
        secondDisplayClear();
        valueF = 0;
        valueS = 0;
        markerFirstItem = 0;
        markerDigits = 0;
        markerPoint = 0;
        if (value === "ac") {
            return;
        }
    } 

    switch(value) {
        case "ce": 
            ceLastDelite(marker);
            if (lastOperation === "") {
                firstDisplayClear();
                secondDisplayClear();
            }
            break;
        case "+": 
            if (markerDigits === 1) {
                addToFirstDisplay(sDisplay.textContent+"+");
                addOperation(lastOperation);
                lastOperation = "+"
                markerDigits = 0;
                markerPoint = 0;
            }
            break;
        case "-": 
            if (markerDigits === 1) {
                addToFirstDisplay(sDisplay.textContent+"-");
                addOperation(lastOperation);
                lastOperation = "-"
                markerDigits = 0;
                markerPoint = 0;
            } else if (lastOperation === "") {
                addToSecondDisplay(value);
                markerDigits = 1;
            }
            break;
        case "*": 
            if (markerDigits === 1) {
                addToFirstDisplay(sDisplay.textContent+"*");
                addOperation(lastOperation);
                lastOperation = "*"
                markerDigits = 0;
                markerPoint = 0;
            }
            break;
        case "/": 
            if (markerDigits === 1) {
                addToFirstDisplay(sDisplay.textContent+"/");
                addOperation(lastOperation);
                lastOperation = "/"
                markerDigits = 0;
                markerPoint = 0;
            }
            break;
        case "=":
            if (markerDigits === 1 && lastOperation !== "") {
                addToFirstDisplay(sDisplay.textContent+"=");
                addOperation(lastOperation);
                lastOperation = ""
                markerDigits = 1;
                markerPoint = 0;
            }
            break;
        case ".":
            if (markerPoint === 0 && markerDigits === 1) {
               addToSecondDisplay(value); 
               markerPoint = 1;
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
