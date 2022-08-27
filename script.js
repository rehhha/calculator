function createButtons() {
  const calculator = document.getElementById('calculator');

  const grid = document.createElement('div');
  grid.classList.add('grid');
  grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
  grid.style.gridTemplateRows = 'repeat(5, 1fr)';

  let gridText = ['AC', '<--', '+/-', '/', 
  '7', '8', '9', '*', 
  '4', '5', '6', '-', 
  '1', '2', '3', '+',
  '0', '.', '=']
  for(i = 0; i < 19; i++) {
    const btn = document.createElement('div');
    btn.classList.add('grid-button');
    btn.textContent = gridText[i];
    if(gridText[i] === '0'){
      btn.setAttribute('id', 'zero');
    } 

    /*if(gridText[i] === '0' || gridText[i] === '1' || gridText[i] === '2' || gridText[i] === '3' ||
    gridText[i] === '4' || gridText[i] === '5' || gridText[i] === '6' || gridText[i] === '7' || 
    gridText[i] === '8' || gridText[i] === '9')*/
    if(between(parseInt(gridText[i]), 0, 9)) {
      btn.style.borderColor = '#032d63';
    } else if (gridText[i] === '/' || gridText[i] === '*' || gridText[i] === '-' || gridText[i] === '+' ||
    gridText[i] === '='){
      btn.style.borderColor = '#c32a0b';
    }
    grid.appendChild(btn);
  }

  calculator.appendChild(grid);
}

function getInput() {
  const inputs = document.querySelectorAll('.grid-button');
  const results = document.getElementById('results');
  let operand = '';
  let previousOperand = '';
  let firstNumber = 0, secondNumber = NaN;
  let deleteInput = true;

  inputs.forEach((input) => {
    input.addEventListener('click', () => {
      if(between(parseInt(input.textContent), 0, 9)){
        if(deleteInput) {
          writeResult('');
        }
        if(results.textContent.length < 13) {
          writeInput(input.textContent);
          deleteInput = false;
        }
      } else if(input.textContent === 'AC'){
        writeResult('');
        operand = '';
        previousOperand = '';
      } else if(input.textContent === '+') {
        if(operand === ''){
          operand = '+';
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          
          deleteInput = true;
        } else {
          previousOperand = operand;
          operand = '+';
          firstNumber = secondNumber;
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          writeResult(operate(firstNumber, secondNumber, previousOperand));
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          deleteInput = true;
        }
      } else if(input.textContent === '-') {
        if(operand === ''){
          operand = '-';
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          deleteInput = true;
        } else {
          previousOperand = operand;
          operand = '-';
          firstNumber = secondNumber;
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          writeResult(operate(firstNumber, secondNumber, previousOperand));
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          deleteInput = true;
        }
      } else if(input.textContent === '*') {
        if(operand === ''){
          operand = '*';
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          deleteInput = true;
        } else {
          previousOperand = operand;
          operand = '*';
          firstNumber = secondNumber;
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          writeResult(operate(firstNumber, secondNumber, previousOperand));
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          deleteInput = true;
        }
      } else if(input.textContent === '/') {
        if(operand === ''){
          operand = '/';
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          deleteInput = true;
        } else {
          previousOperand = operand;
          operand = '/';
          firstNumber = secondNumber;
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          writeResult(operate(firstNumber, secondNumber, previousOperand));
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          deleteInput = true;
        }
      } else if(input.textContent === '=') {
        if(operand != ''){
          previousOperand = operand;
          operand = '';
          firstNumber = secondNumber;
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          writeResult(operate(firstNumber, secondNumber, previousOperand));
          if(checkForDot){
            secondNumber = parseFloat(results.textContent);
          } else {
            secondNumber = parseInt(results.textContent);
          }
          deleteInput = true;
        } 
      } else if(input.textContent === '<--') {
        deleteLastDigit();
      } else if(input.textContent === '+/-') {
        changePrefix();
      } else if(input.textContent === '.') {
        if(!checkForDot()) {
          writeInput('.');
        }
      }
    });
  });
}

function writeInput(a) {
  const results = document.getElementById('results');

  results.textContent += a;
}

function writeResult(result) {
  const results = document.getElementById('results');

  results.textContent = result;
}

function between(x, min, max) {
  return x >= min && x <= max;
}

function deleteLastDigit() {
  const results = document.getElementById('results');

  results.textContent = results.textContent.slice(0, results.textContent.length - 1);
}

function changePrefix() {
  const results = document.getElementById('results');

  if(results.textContent.substring(0, 1) != '-') {
    let prefix = '-';

    results.textContent = prefix.concat(results.textContent);
  } else {
    results.textContent = results.textContent.slice(1, results.textContent.length);
  }
}

function checkForDot() {
  const results = document.getElementById('results');

  for(let i = 0; i < results.textContent.length; i++) {
    if(results.textContent.substring(i, i + 1) === '.') {
      return true;
    }
  }

  return false;
}

function checkIfFloat (number) {
  for(let i = 0; i < number.length; i++) {
    if(number.substring(i, i + 1) === '.') {
      return true;
    }
  }

  return false;
}

function operate(firstNumber, secondNumber, operand) {


  if(operand === '/') {
    if(secondNumber === 0) {
      return 'n1ce0ne';
    }
    let result = firstNumber / secondNumber;
    if(Math.trunc(result) === result) {
      return result;
    } else {
      return Math.round(result * 100) / 100;
    }
  } else if(operand === '+') {
    let result = firstNumber + secondNumber;
    if(Math.trunc(result) === result) {
      return result;
    } else {
      return Math.round(result * 100) / 100;
    }
  } else if(operand === '-') {
    let result = firstNumber - secondNumber;
    if(Math.trunc(result) === result) {
      return result;
    } else {
      return Math.round(result * 100) / 100;
    }
  } else if(operand === '*') {
    let result = firstNumber * secondNumber;
    if(Math.trunc(result) === result) {
      return result;
    } else {
      return Math.round(result * 100) / 100;
    }
  }
  
  /*else if(operand === '+') {
    console.log(typeof(firstNumber))
    if(checkIfFloat(firstNumber) || checkIfFloat(secondNumber)) {
      result = parseFloat(firstNumber) + parseFloat(secondNumber);
    } else {
      result = parseInt(firstNumber) + parseInt(secondNumber);
    }
    return result;
  } else if(operand === '-') {
    if(checkIfFloat(firstNumber) || checkIfFloat(secondNumber)) {
      result = parseFloat(firstNumber) - parseFloat(secondNumber);
    } else {
      result = parseInt(firstNumber) - parseInt(secondNumber);
    }
    return result;
  } else if(operand === '*') {
    if(checkIfFloat(firstNumber) || checkIfFloat(secondNumber)) {
      result = parseFloat(firstNumber) * parseFloat(secondNumber);
    } else {
      result = parseInt(firstNumber) * parseInt(secondNumber);
    }
    return result;
  }*/
}



createButtons();
getInput();