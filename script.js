        /* Definition of variables*/
// math var
let firstOperand = '';
let secondOperand = '';
let result = '';
let operation = '';

//html elements
const displayScreen = document.getElementById('display');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const operators = document.querySelectorAll('#operators > div');
const equal = document.getElementById('equal');
const numbers = document.querySelectorAll('#numbers > div');


            /* Functions */
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
    if (displayScreen.textContent.includes('ERROR')) {
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

//checking input function
function isPositiveNumber(e) { return e.target.textContent <= 9 && e.target.textContent > 0 ? true : false }
function isZero(e) { return e.target.textContent == 0 ? true : false }
function isDecimal(e) { return e.target.textContent === '.' ? true : false }
function isOperator(e) { return e.target.textContent === '+' || e.target.textContent === '-' || e.target.textContent === '*' || e.target.textContent === '/' ? true : false }
function isEqual(e) { return e.target.textContent === '=' ? true : false }

// main display function
function display(e) {
    if (displayScreen.textContent.includes('ERROR')) {
        clear();
    }
    if (!firstOperand && !secondOperand && !operation) {                /* when no math variable are set, only numbers are authorized */
        if (isPositiveNumber(e) || isZero(e)) {
            firstOperand = this.textContent;
            displayScreen.textContent = firstOperand;
        }
    } else if (firstOperand && !secondOperand && !operation) {         /* once firstOperand exist : here are all possible scenario*/
        if (firstOperand === '0' && (isPositiveNumber(e) || isZero(e))) {       /* if the first character of the first operand is a 0, remove it if following entry is again a number */
            firstOperand = this.textContent;
            displayScreen.textContent = firstOperand;
        } else if (isPositiveNumber(e) || isZero(e)) {                  /* while entries are numbers, adapt the first operand */
            if(result) {                                                /* if the shown operand is the result of a previous operation, reset the first operand*/
                firstOperand = '';
                result = '';
            }
            firstOperand += this.textContent;
            displayScreen.textContent = firstOperand;
        } else if (isDecimal(e) && !firstOperand.includes('.')) {       /* only accepts 1 decimal per operand */
            firstOperand += this.textContent;
            displayScreen.textContent = firstOperand;
        } else if (isOperator(e)) {                                     /* if next entry is an operator, set the operation var */
            operation = this.textContent;
            displayScreen.textContent = firstOperand + ' ' + operation;
        }
    } else if (firstOperand && !secondOperand && operation) {           /* one first operand and operator are set, begin to set up the second operand */
        if (isPositiveNumber(e) || isZero(e)) {
            secondOperand = this.textContent;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
        }
    } else if (firstOperand && secondOperand && operation) {            /* use same conditions for the second operand as in first operand definition */
        if (secondOperand === '0' && (isPositiveNumber(e) || isZero(e))) {
            secondOperand = this.textContent;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;;
        } else if (isPositiveNumber(e) || isZero(e)) {
            secondOperand += this.textContent;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
        } else if (isDecimal(e) && !secondOperand.includes('.')) {
            secondOperand += this.textContent;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
        } else if (isOperator(e)) {                                     /* if a new operator is entered, let's do the math and reset the var for the next calculus */
            result = operate(firstOperand, operation, secondOperand);
            if (result.includes('ERROR')) {
                operation = '';
                firstOperand = ''
                displayScreen.textContent = result;
            } else {
                operation = this.textContent;
                displayScreen.textContent = result + ' ' + operation;
                firstOperand = result;
            }
            secondOperand = '';
            result = ''
        } else if (isEqual(e)) {                                        /* only operate calculus if all 3 necessary variables are set */
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
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
        }
    }
    return result.toString()
}

        /* Event listeners & function calls */

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
numbers.forEach(number => {number.addEventListener('click', display)});
operators.forEach(operator => {operator.addEventListener('click', display)});
equal.addEventListener('click', display);