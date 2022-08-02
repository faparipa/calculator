const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// Calculate first and secend values depending on operator
const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

    "=": (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
    // console.log(number);
    // If current display value is 0, replace it, if not add number
    // const displayValue = calculatorDisplay.textContent;
    // calculatorDisplay.textContent =
    //     displayValue === "0" ? number : displayValue + number;
    // replace current value if first valur is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent =
            displayValue === "0" ? number : displayValue + number;
    }
}
//console.log(inputBtns);

function addDecimal() {
    // if operator pressed, dont add decimal
    if (awaitingNextValue) return;
    //If no decimal, add one
    if (!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//Use operator
function useOperator(operator) {
    const currenValue = Number(calculatorDisplay.textContent);
    //Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currenValue;
    } else {
        //console.log("currentValue", currenValue);
        //console.log(firstValue, operatorValue, currenValue);
        const calculation = calculate[operatorValue](firstValue, currenValue);
        //console.log("calculation", calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //ready for the next value, store operataor
    awaitingNextValue = true;
    operatorValue = operator;
    //console.log("firstValue", firstValue);
    //console.log("operator", operator);
}

//Reset all vsllue display

function resetAll() {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
    calculatorDisplay.textContent = "0";
}

//Add Event Listener for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () =>
            sendNumberValue(inputBtn.value)
        );
    } else if (inputBtn.classList.contains("operator")) {
        inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains("decimal")) {
        inputBtn.addEventListener("click", () => addDecimal());
        //need () if it us a callback function
    }
});

//Event Listener
clearBtn.addEventListener("click", resetAll);
