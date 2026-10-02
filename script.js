function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    switch (operator) {
        case 0:
            return add(x, y);
            break;
        case 1:
            return subtract(x, y);
            break;
        case 2:
            return multiply(x, y);
            break;
        case 3:
            return divide(x, y);
            break; 
    }  
}