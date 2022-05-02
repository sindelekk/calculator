let firstNum = "";
let secondNum = "";
let operation = null;
let displayReset = false;

const numButtons = document.querySelectorAll("[data-number]")
const operatorButtons = document.querySelectorAll("[data-operator]")
const equalsOperator = document.getElementById("equal-operator")
const decimal = document.getElementById("decimal")
const clear = document.getElementById("clear")
const deleteNum = document.getElementById("delete")
const percent = document.getElementById("percent")
const display = document.getElementById("display")

//EventListeners
numButtons.forEach((button) => 
    button.addEventListener("click", () => appendNumber(button.textContent))
)
operatorButtons.forEach((button) =>
    button.addEventListener("click", () => setOperation(button.textContent))
)
equalsOperator.addEventListener("click", calculate);
decimal.addEventListener("click", appendPoint);
clear.addEventListener("click", clearDisplay);
deleteNum.addEventListener("click", deleteNumber);
percent.addEventListener("click", percentage);

//Functions
function resetDisplay() {
    display.textContent = "";
    displayReset = false;
}
function appendNumber(number) {
    if (display.textContent === "0" || displayReset)
        resetDisplay();
    display.textContent += number;
}
function setOperation(operator) {
    if (operation !== null) calculate();
    firstNum = display.textContent
    operation = operator
    displayReset = true;
}
function calculate() {
    if (firstNum === "") return;
    secondNum = display.textContent
    display.textContent = roundResult(operate(operation, firstNum, secondNum));
    operation = null
    displayReset = true;
}
function appendPoint() {
    if (display.textContent === "")
        display.textContent = "0";
    if (display.textContent.includes(".")) return
    display.textContent += ".";
}
function clearDisplay() {
    display.textContent = "0";
    firstNum = ""
    secondNum = ""
    operation = null
}
function deleteNumber() {
    display.textContent = display.textContent.toString().slice(0,-1);
    if (display.textContent === "")
        display.textContent = "0";
}
function percentage() {
    display.textContent = display.textContent / 100;
}
function roundResult(number) {
    return Math.round((number + Number.EPSILON) * 1000) / 1000;
}

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)

    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            if (b === 0) {
                return display.textContent = "NaN";
            }
            else return divide(a, b);
        default:
            return null;
    }
}