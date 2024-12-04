let display = document.getElementById("display");
let expressionDisplay = document.getElementById("expression");
let expression = "";
let lastResult = "";

function appendNumber(num) {
  expression += num;
  expressionDisplay.value = expression;
}

function appendOperator(operator) {
  expression += operator;
  expressionDisplay.value = expression;
}

function clearDisplay() {
  expression = "";
  lastResult = "";
  display.value = "";
  expressionDisplay.value = "";
}

function calculate(operation) {
  switch (operation) {
    case "sin":
      expression += "sin(";
      break;
    case "cos":
      expression += "cos(";
      break;
    case "tan":
      expression += "tan(";
      break;
    case "sqrt":
      expression += "sqrt(";
      break;
    case "pow":
      expression += "^2";
      break;
    case "log":
      expression += "log(";
      break;
    case "exp":
      expression += "exp(";
      break;
  }
  expressionDisplay.value = expression;
}

function calculateResult() {
  try {
    // Replace mathematical functions with JavaScript Math equivalents
    let evalExpression = expression
      .replace(/sin\(/g, "Math.sin(Math.PI/180*")
      .replace(/cos\(/g, "Math.cos(Math.PI/180*")
      .replace(/tan\(/g, "Math.tan(Math.PI/180*")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/exp\(/g, "Math.exp(")
      .replace(/\^2/g, "**2");

    // Add missing closing parentheses
    let openParens = (evalExpression.match(/\(/g) || []).length;
    let closeParens = (evalExpression.match(/\)/g) || []).length;
    evalExpression += ")".repeat(openParens - closeParens);

    let result = eval(evalExpression);

    // Handle special cases
    if (!isFinite(result)) {
      throw new Error("Invalid calculation");
    }

    // Format the result
    result = parseFloat(result.toFixed(8));
    display.value = result;
    lastResult = result;
  } catch (error) {
    display.value = "Error";
  }
  // Keep the expression visible
  expressionDisplay.value = expression;
}

function backspace() {
  expression = expression.slice(0, -1);
  expressionDisplay.value = expression;
  // Clear result when editing expression
  display.value = "";
}

function addParenthesis(paren) {
  expression += paren;
  expressionDisplay.value = expression;
}
