const clearButton = document.querySelector('.clear');
const percentButton = document.querySelector('.percent');
const deleteButton = document.querySelector('.delete');
const divideButton = document.querySelector('.divide');
const timesButton = document.querySelector('.times');
const minusButton = document.querySelector('.minus');
const plusButton = document.querySelector('.plus');
const leftBracketButton = document.querySelector('.left-bracket');
const rightBracketButton = document.querySelector('.right-bracket');
const dotButton = document.querySelector('.dot');
const actionButton = document.querySelector('.action');

const zeroButton = document.querySelector('.zero');
const oneButton = document.querySelector('.one');
const twoButton = document.querySelector('.two');
const threeButton = document.querySelector('.three');
const fourButton = document.querySelector('.four');
const fiveButton = document.querySelector('.five');
const sixButton = document.querySelector('.six');
const sevenButton = document.querySelector('.seven');
const eightButton = document.querySelector('.eight');
const nineButton = document.querySelector('.nine');

const mainExpression = document.querySelector('.main');

let expression = '';

const updateText = () => {
  mainExpression.innerText = expression;
};

const updateExpression = (input) => {
  expression = expression.concat(input);
  updateText();
};

const clearExpression = () => {
  expression = '';
  updateText();
};

const removeLastCharacter = () => {
  console.log(expression);
  expression = expression.toString().slice(0, -1);
  updateText();
};
zeroButton.addEventListener('click', () => {
  updateExpression('0');
});

oneButton.addEventListener('click', () => {
  updateExpression('1');
});

twoButton.addEventListener('click', () => {
  updateExpression('2');
});

threeButton.addEventListener('click', () => {
  updateExpression('3');
});

fourButton.addEventListener('click', () => {
  updateExpression('4');
});

fiveButton.addEventListener('click', () => {
  updateExpression('5');
});

sixButton.addEventListener('click', () => {
  updateExpression('6');
});

sevenButton.addEventListener('click', () => {
  updateExpression('7');
});

eightButton.addEventListener('click', () => {
  updateExpression('8');
});

nineButton.addEventListener('click', () => {
  updateExpression('9');
});

deleteButton.addEventListener('click', () => {
  removeLastCharacter();
});

clearButton.addEventListener('click', () => {
  clearExpression();
});

percentButton.addEventListener('click', () => {
  updateExpression('%');
});

divideButton.addEventListener('click', () => {
  updateExpression('/');
});

timesButton.addEventListener('click', () => {
  updateExpression('*');
});

minusButton.addEventListener('click', () => {
  updateExpression('-');
});

plusButton.addEventListener('click', () => {
  updateExpression('+');
});

leftBracketButton.addEventListener('click', () => {
  updateExpression('(');
});

rightBracketButton.addEventListener('click', () => {
  updateExpression(')');
});

dotButton.addEventListener('click', () => {
  updateExpression('.');
});

actionButton.addEventListener('click', () => {
  try {
    expression = eval(expression);
    console.log(expression);
    updateText();
  } catch (error) {
    updateText('error');
  }
});
