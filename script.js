// max 40 character in display screen (max 17 character per operand)

        /* Definition of variables*/
// math var
let firstOperand = '';
let secondOperand = '';
let result = '';
let operation = '';

let content;

//html elements
const displayScreen = document.getElementById('display');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const operators = document.querySelectorAll('#operators > div');
const equal = document.getElementById('equal');
const numbers = document.querySelectorAll('#numbers > div');


            /* Functions */
//checking if user hit the keyboard or click the calculator's buttons and return the value that must be used in other functions
function keyOrClick(e) {
    if(e.key === undefined) {
        content = e.target.textContent;
    } else {
        if(e.key === 'Enter') {
            content = '=';
        } else {
            content = e.key;
        }
    }

    if (content === 'c' || content === 'C') {
        clear();
    } else if (content === 'DEL' || content === 'Backspace') {
        del()
    } else {
        display(content);
    }
}
            
//checking input function
function isNumber(num) { return num <= 9 && num >= 0 ? true : false }
function isDecimal(dec) { return dec === '.' ? true : false }
function isOperator(op) { return op === '+' || op === '-' || op === '*' || op === '/' ? true : false }
function isEqual(op) { return op === '=' ? true : false }

// main display function
function display(entry) {
    if (displayScreen.textContent.includes('ERROR')) {
        clear();
    }
    if (!firstOperand && !secondOperand && !operation) {                /* when no math variable are set, only numbers are authorized */
        if (isNumber(entry)) {
            firstOperand = entry;
            displayScreen.textContent = firstOperand;
        }
    } else if (firstOperand && !secondOperand && !operation) {          /* once firstOperand exist : here are all possible scenario*/
        if (firstOperand === '0' && isNumber(entry)) {                  /* if the first character of the first operand is a 0, remove it if following entry is again a number */
            firstOperand = entry;
            displayScreen.textContent = firstOperand;
        } else if (isNumber(entry)) {                                   /* while entries are numbers, adapt the first operand */
            if(result) {                                                /* if the shown operand is the result of a previous operation, reset the first operand*/
                firstOperand = '';
                result = '';
            }
            firstOperand += entry;
            displayScreen.textContent = firstOperand;
        } else if (isDecimal(entry) && !firstOperand.includes('.')) {  /* only accepts 1 decimal per operand */
            firstOperand += entry;
            displayScreen.textContent = firstOperand;
        } else if (isOperator(entry)) {                                /* if next entry is an operator, set the operation var */
            operation = entry;
            displayScreen.textContent = firstOperand + ' ' + operation;
        }
    } else if (firstOperand && !secondOperand && operation) {           /* one first operand and operator are set, begin to set up the second operand */
        if (isNumber(entry)) {
            secondOperand = entry;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
        }
    } else if (firstOperand && secondOperand && operation) {            /* use same conditions for the second operand as in first operand definition */
        if (secondOperand === '0' && (isNumber(entry))) {
            secondOperand = entry;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;;
        } else if (isNumber(entry)) {
            secondOperand += entry;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
        } else if (isDecimal(entry) && !secondOperand.includes('.')) {
            secondOperand += entry;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
        } else if (isOperator(entry)) {                                /* if a new operator is entered, let's do the math and reset the var for the next calculus */
            result = operate(firstOperand, operation, secondOperand);
            if (result.includes('ERROR')) {
                operation = '';
                firstOperand = ''
                displayScreen.textContent = result;
            } else {
                operation = entry;
                displayScreen.textContent = result + ' ' + operation;
                firstOperand = result;
            }
            secondOperand = '';
            result = ''
        } else if (isEqual(entry)) {                                   /* only operate calculus if all 3 necessary variables are set */
            result = operate(firstOperand, operation, secondOperand);
            displayScreen.textContent = result;
            firstOperand = result;
            operation = '';
            secondOperand = '';
        }
    } 
}

function operate(firstOperand, operation, secondOperand) {
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);
    if(secondOperand === 0 && operation === '/') {
        result = 'ERROR: we can\'t divide per 0';
    } else {
        switch (operation) {
            case '+':
                result = Math.round((firstOperand + secondOperand) * 1000000) / 1000000;
                break;
            case '-':
                result = Math.round((firstOperand - secondOperand) * 1000000) / 1000000;
                break;
            case '*':
                result = Math.round((firstOperand * secondOperand) * 1000000) / 1000000;
                break;
            case '/':
                result = Math.round((firstOperand / secondOperand) * 1000000) / 1000000;
                break;
        }
    }
    return result.toString()
}

// clear
function clear() {
    displayScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    operation = '';
    result = '';
};

//delete
function del() {
    if (displayScreen.textContent.includes('ERROR') || result) {
        clear();
    } else if(secondOperand) {
        secondOperand = secondOperand.slice(0, -1);
        displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
    } else if (operation) {
        operation = '';
        displayScreen.textContent = firstOperand;
    } else if (firstOperand) {
        firstOperand = firstOperand.slice(0, -1);
        displayScreen.textContent = firstOperand;
    }
}

        /* Event listeners & function calls */
//clicks
clearButton.addEventListener('click', keyOrClick);
deleteButton.addEventListener('click', keyOrClick);
numbers.forEach(number => {number.addEventListener('click', keyOrClick)});
operators.forEach(operator => {operator.addEventListener('click', keyOrClick)});
equal.addEventListener('click', keyOrClick);

//keyboard
document.addEventListener('keydown', keyOrClick);