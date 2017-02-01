// Initialization
var buttons = document.getElementsByTagName("button"),
    fDisplay = document.getElementsByClassName("calc-display-first")[0],
    sDisplay = document.getElementsByClassName("calc-display-second")[0],
    marker = 0,
    markerPoint = 0,
    markerFirstItem = 0,
    markerDigits = 0,
    markerEqual = 0,
    lastOperation = "",
    valueF = 0,
    valueS = 0;
    

// Add symbols to displays

function addToFirstDisplay(str) {
    fDisplay.textContent += str;
    if (fDisplay.textContent.length >= 20) {
        fDisplay.textContent = '>>' + fDisplay.textContent.slice(fDisplay.textContent.length - 18,fDisplay.textContent.length);
    }  
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
// Adding an operation to expressiton
function addOperation(operator) {
    valueS = parseFloat(sDisplay.textContent);
    if (markerFirstItem === 0) {
        valueF = valueS;
        markerFirstItem = 1;
        return;
    }
    var numStr = "";
    switch (operator) {
            case "+":
                valueF +=valueS;
                secondDisplayClear(); 
                numStr = valueF.toString();
                if (numStr.length > 16) {
                    sDisplay.textContent = valueF.toExponential(4);
                } else {
                  sDisplay.textContent = parseFloat(valueF.toFixed(4)) + 0;      
                }  
                markerFirstItem = 1;
                break;
            case "-":
                valueF -=valueS;
                secondDisplayClear();  
                numStr = valueF.toString();
                if (numStr.length > 16) {
                    sDisplay.textContent = valueF.toExponential(4);
                } else {
                  sDisplay.textContent = parseFloat(valueF.toFixed(4)) + 0;      
                }
                markerFirstItem = 1;
                break;
            case "*":
                valueF *=valueS;
                secondDisplayClear();  
                numStr = valueF.toString();
                if (numStr.length > 16) {
                    sDisplay.textContent = valueF.toExponential(4);
                } else {
                  sDisplay.textContent = parseFloat(valueF.toFixed(4)) + 0;       
                }
                   
                markerFirstItem = 1;
                break;
            case "/":
                if (valueS === "0") {
                    fDisplay.textContent = "";
                    sDisplay.textContent = "Infinity";
                    break;
                }
                valueF /=valueS;
                secondDisplayClear();  
                numStr = valueF.toString();
                if (numStr.indexOf("e")>=0 || parseInt(valueF).toString().length > 10) {
                    sDisplay.textContent = valueF.toExponential(4);
                } else {
                  sDisplay.textContent = parseFloat(valueF.toFixed(4)) + 0;     
                }

                markerFirstItem = 1;
                break;
    }
    
}
// Clear current display
function ceLastDelite(marker) {
    sDisplay.textContent = "";   
}
// buttons events 
document.onclick = function(element) {
    var target = element.target;
    var btn = target,
        value = btn.getAttribute("value");
    
    if(btn.tagName !== "BUTTON") {
        return;
    }
    if (value === "ac" || sDisplay.textContent === "Infinity") {
        firstDisplayClear();
        secondDisplayClear();
        valueF = 0;
        valueS = 0;
        markerFirstItem = 0;
        markerDigits = 0;
        markerPoint = 0;
        markerEqual = 0;
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
                markerEqual = 0;
            }
            break;
        case "+": 
            if (markerDigits === 1) {
                addToFirstDisplay(sDisplay.textContent+" + ");
                addOperation(lastOperation);
                lastOperation = "+"
                markerDigits = 0;
                markerPoint = 0;
                markerEqual = 0;
            }
            break;
        case "-": 
            if (markerDigits === 1) {
                addToFirstDisplay(sDisplay.textContent+" - ");
                addOperation(lastOperation);
                lastOperation = "-"
                markerDigits = 0;
                markerPoint = 0;
                markerEqual = 0;
            } else if (lastOperation === "") {
                addToSecondDisplay(value);
                markerDigits = 1;
            }
            break;
        case "*": 
            if (markerDigits === 1) {
                addToFirstDisplay(sDisplay.textContent+" * ");
                addOperation(lastOperation);
                lastOperation = "*"
                markerDigits = 0;
                markerPoint = 0;
                markerEqual = 0;
            }
            break;
        case "/": 
            if (markerDigits === 1) {
                addToFirstDisplay(sDisplay.textContent+" / ");
                addOperation(lastOperation);
                lastOperation = "/"
                markerDigits = 0;
                markerPoint = 0;
                markerEqual = 0;
            }
            break;
        case "=":
            if (markerDigits === 1 && lastOperation !== "") {
                addOperation(lastOperation);
                firstDisplayClear();
                lastOperation = ""
                markerEqual = 1;
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
            if (markerEqual === 1) {
                secondDisplayClear();
                markerEqual = 0;
                markerFirstItem = 0;
            }
            addToSecondDisplay(value);
            markerDigits = 1;
            break;
    }
};
