function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    if(operator === '+'){
        return add(num1, num2);
    }

    else if(operator === '-'){
        return subtract(num1, num2);
    }

    else if(operator === '*'){
        return multiply(num1, num2);
    }

    else if (operator === '/'){
        if(num2 === 0) {
            setDisplay("You can't divide by zero!");
            return ("Error");
        }
        else return divide(num1, num2);
    }
}

function setDisplay(string) {
    const display = document.querySelector('.display');
    display.textContent = string;
    console.log(string);

}

function clearCalculator() {
    displayValue = "";
    num1 = 0;
    num2 = 0;
    operator = '';
    firstNumHasValue = false;
}

function display() {
    const numbers = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.operator');
    const equals = document.querySelector('.equals');
    const clear = document.querySelector('.clear');
    const decimal = document.querySelector('.decimal');

    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            displayValue += number.value;
            setDisplay(displayValue);
        })
    })

    operators.forEach((o) => {
        o.addEventListener('click', () => {
            if(!firstNumHasValue){
                num1 = Number(displayValue);
                firstNumHasValue = true;
                operator = o.value;
                displayValue = "";
            }

            else {
                //display value resets when an operation is completed, so if an operator is hit twice in a row, it won't clear
                if(displayValue != "") {
                    num2 = Number(displayValue);
                    displayValue = operate(num1, num2, operator);
                    if(displayValue != "Error") {
                        operator = o.value;
                        setDisplay(displayValue);
                        num1 = displayValue;
                        firstNumHasValue = true;
                        displayValue = "";
                    }
                    else {
                        clearCalculator();
                    }
                }
                else {
                    operator = o.value;
                }
            }
        })
    })

    equals.addEventListener('click', () => {
        num2 = Number(displayValue);
        displayValue = operate(num1, num2, operator);
        if(displayValue != "Error") {
            setDisplay(displayValue);
            num1 = displayValue;
            firstNumHasValue = true;
            displayValue = "";
        }
        else {
            clearCalculator();
        }
    })

    clear.addEventListener('click', () => {
        clearCalculator();
        setDisplay(displayValue);
    })

    decimal.addEventListener('click', () => {
        if(!displayValue.includes('.')){
            displayValue += decimal.value;
            setDisplay(displayValue);
        }
    })


}

let displayValue = ""
let num1 = 0;
let num2 = 0;
let operator = '';
let firstNumHasValue = false;

display();

/* Number is entered: store its value when operator is clicked
Operator is entered: store its value, clear display for second value
Second number is entered: store its value when operator or equals it hit. 
If Equals is entered: operate with the three variables. First number equals the result.
If another operator is entered instead of equals: Operate: store result in first number, store new operator value, wait for num 2 

*/

