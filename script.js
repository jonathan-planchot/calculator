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

const container = document.querySelector(".container");
const display = document.querySelector(".display");
console.log(container);

container.addEventListener("click", event => {

    if(event.target.classList.contains("clear")) {
        firstOperand = null;
        secondOperand = null;
        operator = null;
        result = null;
        display.textContent = 0;
    }

    if(event.target.classList.contains("digit") && operator === null) {
        if(firstOperand === null) {
            firstOperand = event.target.textContent;
        } else {
            firstOperand += event.target.textContent;
        }
        display.textContent = firstOperand;
    }

    if(event.target.classList.contains("digit") && operator !== null) {
        secondOperand = Number(event.target.textContent);
        display.textContent = secondOperand;
    }

    if(event.target.classList.contains("operator") && !event.target.classList.contains("equal")) {
        removeOperatorShine();
        
        if(result === null && operator !== null) {
            if(secondOperand === 0 && operator === "÷") {
                display.textContent = "Error, you can't divide by 0!";
            } else {
                result = operate(operator, firstOperand, secondOperand);
                if(result !== null && result.toString().length > 10) {
                    result = Number(result.toFixed(5));
                }

                display.textContent = result;
                firstOperand = result; 
                operator = event.target.textContent;
            }
        } else if(secondOperand !== null && operator === null) {
            operator = event.target.textContent;
            display.textContent = firstOperand;
        } else if(result !== null && operator !== null) {
            firstOperand = result; 
            operator = event.target.textContent;
        } else {
            operator = event.target.textContent;
        }

        event.target.classList.add("shining");
    }

    if(event.target.classList.contains("equal")) {
        removeOperatorShine();
        if(secondOperand === 0 && operator === "÷") return display.textContent = "Error, you can't divide by 0!";
        
        result = operate(operator, firstOperand, secondOperand);
        if(result !== null && result.toString().length > 10) {
            result = Number(result.toFixed(5));
        }

        display.textContent = result;
        firstOperand = result;
    }
    console.log(`The first operand is ${firstOperand}`);
    console.log(`The second operand is ${secondOperand}`);
    console.log(`The operator is ${operator}`);  
    console.log(`The result is ${result}`);    
});

function removeOperatorShine() {
    const operatorShining = document.querySelectorAll(".operator.shining");
    operatorShining.forEach(op => op.classList.remove("shining"));
}



