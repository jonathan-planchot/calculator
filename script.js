function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return Number(x) - Number(y);
}

function multiply(x, y) {
    return Number(x) * Number(y);
}

function divide(x, y) {
    return Number(x) / Number(y);
}

function operate(operator, x, y) {
    switch (operator) {
        case "+":
            return add(x, y);
            break;
        case "-":
            return subtract(x, y);
            break;
        case "x":
            return multiply(x, y);
            break;
        case "÷":
            return divide(x, y);
            break; 
    }  
}

let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;
let resultDisplayed = false;
let currentOperand = null;

const container = document.querySelector(".container");
const display = document.querySelector(".display");
const pointButton = document.querySelector(".box.point");
const backspaceButton = document.querySelector(".box.backspace");

container.addEventListener("click", event => {
    
    if(event.target.classList.contains("backspace")) {
        if(currentOperand === "first") {
            if(firstOperand.length > 1) {
                firstOperand = firstOperand.slice(0, -1);
            } else if(firstOperand.length === 1) {
                firstOperand = 0;
            }
        } else if(currentOperand === "second") {
            if(secondOperand.length > 1) {
                secondOperand = secondOperand.slice(0, -1);
            } else if(secondOperand.length === 1) {
                secondOperand = 0;
            }
        } 
        display.textContent = currentOperand === "first" ? firstOperand : secondOperand;
    }

    if(event.target.classList.contains("clear")) {
        firstOperand = null;
        secondOperand = null;
        operator = null;
        result = null;
        resultDisplayed = false;
        display.textContent = 0;
    }

    if(event.target.classList.contains("digit") && operator === null) {
        
        pointButton.disabled = false;
        currentOperand = "first";

        if(firstOperand === ".") {
            firstOperand = 0 + ".";
            display.textContent = firstOperand;
        } else if(firstOperand === null) {
            firstOperand = event.target.textContent;
        } else if(firstOperand === "0" && event.target.textContent === "0") {
            // ne rien faire
        } else if(firstOperand !== null) {
            if(firstOperand.toString().includes(".")) {
                pointButton.disabled = true;
                firstOperand += event.target.textContent;
            } else if(firstOperand === 0) {
                firstOperand = event.target.textContent;
            } else {
            firstOperand += event.target.textContent;
            }
        }
        display.textContent = firstOperand;
        resultDisplayed = false;
    }

    if(event.target.classList.contains("digit") && operator !== null) {

        pointButton.disabled = false;
        currentOperand = "second";
        
        if(secondOperand === ".") {
            secondOperand = 0 + ".";
            display.textContent = secondOperand;
        } else if(secondOperand === null) {
            secondOperand = event.target.textContent;
        } else if(secondOperand === "0" && event.target.textContent === "0") {
            // ne rien faire
        } else if(secondOperand !== null) {
            if(secondOperand.toString().includes(".")) {
                pointButton.disabled = true;
                secondOperand += event.target.textContent;
            } else if(secondOperand === 0) {
                secondOperand = event.target.textContent;
            } else {
            secondOperand += event.target.textContent;
            }
        }
        if(resultDisplayed === true) firstOperand = result;
        display.textContent = secondOperand;
        resultDisplayed = false;
    }

    if(event.target.classList.contains("operator") && !event.target.classList.contains("equal")) {
        removeOperatorShine();

        if(secondOperand === null) {

            operator = event.target.textContent;
            resultDisplayed = false;

        } else if(secondOperand !== null) {

            if(secondOperand === 0 && operator === "÷") {
                display.textContent = "Error, you can't divide by 0!";
            } else if(resultDisplayed === false) {
                result = operate(operator, firstOperand, secondOperand);
                if(result !== null && result.toString().length > 10) {
                    result = Number(result.toFixed(5));
                }
                display.textContent = result;
                operator = event.target.textContent;
                secondOperand = null;
                resultDisplayed = true;
            } else if(resultDisplayed === true) {
                display.textContent = result;
                firstOperand = result;
                result = operate(operator, firstOperand, secondOperand);
                if(result !== null && result.toString().length > 10) {
                    result = Number(result.toFixed(5));
                }
                operator = event.target.textContent;
                secondOperand = null;
                resultDisplayed = true; 
            }

        } 

        event.target.classList.add("shining");
    }

    if(event.target.classList.contains("equal")) {
        removeOperatorShine();

        if(operator === null || secondOperand === null) return;

        if(secondOperand === 0 && operator === "÷") return display.textContent = "Error, you can't divide by 0!";
        
        result = operate(operator, firstOperand, secondOperand);
        if(result !== null && result.toString().length > 10) {
            result = Number(result.toFixed(5));
        }

        display.textContent = result;
        firstOperand = result;
        result = null;
        secondOperand = null;
        operator = null;
    }
    console.log(`The first operand is ${firstOperand}`);
    console.log(`The second operand is ${secondOperand}`);
    console.log(`The operator is ${operator}`);  
    console.log(`The result is ${result}`);    
    console.log(currentOperand);
});

function removeOperatorShine() {
    const operatorShining = document.querySelectorAll(".operator.shining");
    operatorShining.forEach(op => op.classList.remove("shining"));
}



