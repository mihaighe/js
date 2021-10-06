const root = document.documentElement;

const redInput = document.querySelector('.red-input');
const greenInput = document.querySelector('.green-input');
const blueInput = document.querySelector('.blue-input');

const button = document.querySelector('.button');
const regex = /[0-9A-F]+[0-9A-F]/;
let colorIterator = 0;

const setColor = (color) => {
  colorIterator++;
  if (colorIterator > 7) {
    colorIterator = 1;
    root.style.setProperty(`--color-${colorIterator}`, color);
  } else {
    root.style.setProperty(`--color-${colorIterator}`, color);
  }
};

const isHex = (element) => {
  stringInput = element.value.toUpperCase();

  if (regex.test(stringInput)) {
    element.value = stringInput;
    element.style.setProperty('border', 'none');
    button.textContent = 'Enter your hex color';
    return true;
  } else {
    element.value = '';
    element.style.setProperty('border', '5px solid black');
    button.textContent = 'Invalid hex entry';
    return false;
  }
};

button.addEventListener('click', () => {
  isHex(redInput);
  isHex(greenInput);
  isHex(blueInput);

  if (isHex(redInput) && isHex(greenInput) && isHex(blueInput)) {
    setColor('#' + redInput.value + greenInput.value + blueInput.value);
  }
});
