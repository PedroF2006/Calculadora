// Seleciona o elemento da tela onde o resultado será exibido
const result = document.querySelector(".result");

// Seleciona todos os botões dentro do elemento com a classe "buttons"
const buttons = document.querySelectorAll(".buttons button");

// Inicializa variáveis para armazenar o número atual, o primeiro operando, o operador e um sinalizador de reinício
let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

/**
 * Atualiza o resultado exibido na tela.
 * @param {boolean} originClear - Indica se a tela deve ser limpa.
 */
function updateResult(originClear = false) {
  result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

/**
 * Adiciona um dígito ao número atual.
 * @param {string} digit - O dígito a ser adicionado.
 */
function addDigit(digit) {
  if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

  if (restart) {
    currentNumber = digit;
    restart = false;
  } else {
    currentNumber += digit;
  }

  updateResult();
}

/**
 * Define o operador para a operação matemática.
 * @param {string} newOperator - O operador selecionado.
 */
function setOperator(newOperator) {
  if (currentNumber) {
    calculate();

    firstOperand = parseFloat(currentNumber.replace(",", "."));
    currentNumber = "";
  }

  operator = newOperator;
}

/**
 * Calcula o resultado da operação matemática.
 */
function calculate() {
  if (operator === null || firstOperand === null) return;
  let secondOperand = parseFloat(currentNumber.replace(",", "."));
  let resultValue;

  switch (operator) {
    case "+":
      resultValue = firstOperand + secondOperand;
      break;
    case "-":
      resultValue = firstOperand - secondOperand;
      break;
    case "×":
      resultValue = firstOperand * secondOperand;
      break;
    case "÷":
      resultValue = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  if (resultValue.toString().split(".")[1]?.length > 5) {
    currentNumber = parseFloat(resultValue.toFixed(5)).toString();
  } else {
    currentNumber = resultValue.toString();
  }

  operator = null;
  firstOperand = null;
  restart = true;
  updateResult();
}

/**
 * Limpa a calculadora, reiniciando todas as variáveis.
 */
function clearCalculator() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  updateResult(true);
}

/**
 * Define o valor percentual do número atual.
 */
function setPercentage() {
  let result = parseFloat(currentNumber) / 100;

  if (["+", "-"].includes(operator)) {
    result = result * (firstOperand || 1);
  }

  if (result.toString().split(".")[1]?.length > 5) {
    result = result.toFixed(5).toString();
  }

  currentNumber = result.toString();
  updateResult();
}

// Adiciona um ouvinte de eventos de clique a cada botão
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (/^[0-9,]+$/.test(buttonText)) {
      addDigit(buttonText);
    } else if (["+", "-", "×", "÷"].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "C") {
      clearCalculator();
    } else if (buttonText === "±") {
      currentNumber = (
        parseFloat(currentNumber || firstOperand) * -1
      ).toString();
      updateResult();
    } else if (buttonText === "%") {
      setPercentage();
    }
  });
});
