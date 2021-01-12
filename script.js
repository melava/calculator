        /* Definition of variables*/
let operands;
let firstOperand;
let secondOperand;
let operation = '';
let result;

//display
const displayScreen = document.getElementById('display');

// function buttons
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');

// operator buttons
const divideOperator = document.getElementById('divide');
const multiplyOperator = document.getElementById('multiply');
const substractOperator = document.getElementById('substract');
const addOperator = document.getElementById('add');
const equal = document.getElementById('equal');

// numbers buttons
const numbers = document.querySelectorAll('#numbers > div');
const decimalButtons = document.getElementById('decimal');



            /* General functions */
// display numbers and operators
function display(){
    if (displayScreen.textContent === '' && this.textContent === '0' || displayScreen.textContent === '' && this.textContent === '.') {
        // if begin with 0 or decimal, don't display it
        return
    } else if (displayScreen.textContent.includes('.') && this.textContent === '.') {
        // if there is already a decimal, don't display more
        return
    } else if (displayScreen.textContent === 'ERROR') {
        clear();
        displayScreen.textContent += this.textContent;
    } else {
        displayScreen.textContent += this.textContent;
    }
}


// clear
function clear() {
    displayScreen.textContent = '';
    operation = '';
};


// delete
function del() {
    if (displayScreen.textContent[displayScreen.textContent.length - 1] === " ") {
        displayScreen.textContent = displayScreen.textContent.slice(0, -3);
        operation = '';
    } else if (displayScreen.textContent === 'ERROR') {
        clear();
    } else {
        displayScreen.textContent = displayScreen.textContent.slice(0, -1);
    }
}


        /* Math functions */
// operate
function operate() {
    if(!operation) {return}
    operands = displayScreen.textContent.split(` ${operation} `)
    firstOperand = Number(operands[0]);
    secondOperand = Number(operands[1]);
    
    if(operation === '/' && secondOperand == 0) { 
        displayScreen.textContent = 'ERROR';
    } else if(!secondOperand) {
        return
    } else {
        if (operation === '+') {
            result = firstOperand + secondOperand;
        } else if (operation === '-') {
            result = firstOperand - secondOperand;
        } else if (operation === '*') {
            result = firstOperand * secondOperand;
        } else if (operation === '/') {
            result = firstOperand / secondOperand;
        }
        displayScreen.textContent = result;
        operation = '';
        firstOperand = '';
        secondOperand = '';
    } 
}

// add
function add() {
    if (displayScreen.textContent == undefined || displayScreen.textContent === '' || displayScreen.textContent === 'ERROR') {
        return
    } else if(displayScreen.textContent.includes('/ 0')) {
        displayScreen.textContent = 'ERROR';
    } else if(displayScreen.textContent.includes('+' || '-' || '*' || '/') && displayScreen.textContent[displayScreen.textContent.length - 1] === " ") {
        return
    } else if(operation === '') {
        operation = '+';
        displayScreen.textContent += ' + ';
    } else {
        operate();
        operation = '+';
        displayScreen.textContent += ' + ';
    }
}


// substract
function substract() {
    if (displayScreen.textContent == undefined || displayScreen.textContent === '' || displayScreen.textContent === 'ERROR') {
        return
    } else if(displayScreen.textContent.includes('/ 0')) {
        displayScreen.textContent = 'ERROR';
    } else if(displayScreen.textContent.includes('+' || '-' || '*' || '/') && displayScreen.textContent[displayScreen.textContent.length - 1] === " ") {
        return
    } else if (operation === '') {
        operation = '-';
        displayScreen.textContent += ' - ';
    } else {
        operate();
        operation = '-';
        displayScreen.textContent += ' - ';
    }
}

// multiply
function multiply() {
    if (displayScreen.textContent == undefined || displayScreen.textContent === '' || displayScreen.textContent === 'ERROR') {
        return
    } else if(displayScreen.textContent.includes('/ 0')) {
        displayScreen.textContent = 'ERROR';
    } else if(displayScreen.textContent.includes('+' || '-' || '*' || '/') && displayScreen.textContent[displayScreen.textContent.length - 1] === " ") {
        return
    } else if (operation === '') {
        operation = '*';
        displayScreen.textContent += ' * ';
    } else {
        operate();
        operation = '*';
        displayScreen.textContent += ' * ';
    }
}

// divide
function divide() {
    if (displayScreen.textContent == undefined || displayScreen.textContent === '' || displayScreen.textContent === 'ERROR') {
        return
    } else if(displayScreen.textContent.includes('/ 0')) {
        displayScreen.textContent = 'ERROR';
    } else if(displayScreen.textContent.includes('+' || '-' || '*' || '/') && displayScreen.textContent[displayScreen.textContent.length - 1] === " ") {
        return
    } else if (operation === '') {
        operation = '/';
        displayScreen.textContent += ' / ';
    } else {
        operate();
        operation = '/';
        displayScreen.textContent += ' / ';
    }
}


        /* Event listeners */

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
numbers.forEach(number => {number.addEventListener('click', display)});
addOperator.addEventListener('click', add);
substractOperator.addEventListener('click', substract);
multiplyOperator.addEventListener('click', multiply);
divideOperator.addEventListener('click', divide);
equal.addEventListener('click', operate);