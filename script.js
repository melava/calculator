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
// listening to clicks and display
numbers.forEach(number => {
    number.addEventListener('click', function(){
        if (displayScreen.textContent === '' && this.textContent === '0' || displayScreen.textContent === '' && this.textContent === ',') {
            return
        } else if (displayScreen.textContent.includes(',') && this.textContent === ',') {
            return
        } else {
            displayScreen.textContent += this.textContent;
        }
    })
});

// clear
function clear() {
    displayScreen.textContent = '';
    operation = '';
};
clearButton.addEventListener('click', clear);

// delete
function del() {
    if (displayScreen.textContent[displayScreen.textContent.length - 1] === " ") {
        displayScreen.textContent = displayScreen.textContent.slice(0, -3);
        operation = '';
    } else {
        displayScreen.textContent = displayScreen.textContent.slice(0, -1);
    }
}
deleteButton.addEventListener('click', del);

        /* Math functions */
// operate
function operate() {
    if(!operation) {return}
    operands = displayScreen.textContent.split(` ${operation} `)
    if(!operands[1]) {
        return
    } else {
        firstOperand = Number(operands[0]);
        secondOperand = Number(operands[1]);
        if (operation === '+') {
            result = firstOperand + secondOperand;
        } else if (operation === '-') {
            result = firstOperand - secondOperand;
        } else if (operation === '*') {
            result = firstOperand * secondOperand;
        } else if (operation === '/') {
            if (secondOperand === 0) {
                result = 'ERROR';
            } else {
                result = firstOperand / secondOperand;
            }
        }
        displayScreen.textContent = result;
        operation = '';
        firstOperand = '';
        secondOperand = '';
    } 
}

equal.addEventListener('click', operate);


// add
addOperator.addEventListener('click', function() {
    if (operation === '') {
        operation = '+';
        displayScreen.textContent += ' + ';
    } else {
        operate();
        operation = '+';
        displayScreen.textContent += ' + ';
    }
});

// substract
substractOperator.addEventListener('click', function() {
    if (operation === '') {
        operation = '-';
        displayScreen.textContent += ' - ';
    } else {
        operate();
        operation = '-';
        displayScreen.textContent += ' - ';
    }
})

// multiply
multiplyOperator.addEventListener('click', function() {
    if (operation === '') {
        operation = '*';
        displayScreen.textContent += ' * ';
    } else {
        operate();
        operation = '*';
        displayScreen.textContent += ' * ';
    }
})

// divide
divideOperator.addEventListener('click', function() {
    if (operation === '') {
        operation = '/';
        displayScreen.textContent += ' / ';
    } else {
        operate();
        operation = '/';
        displayScreen.textContent += ' / ';
    }
})

