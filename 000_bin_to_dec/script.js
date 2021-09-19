input = document.querySelector('.binary-input');
error = document.querySelector('.error');
decimalInput = document.querySelector('.dec-input');

binaryString = '';
pastLength = 0;

decimalConvert = (binaryString) => {
  if (binaryString != '') {
    decimalString = parseInt(binaryString, 2);
    decimalInput.value = decimalString;
  } else {
    decimalInput.value = '';
  }
};

validate = (string) => {
  if (string.length > pastLength) {
    character = string.slice(-1);

    character.includes('1') || character.includes('0')
      ? ((binaryString = binaryString + character),
        (error.innerText = 'Enter a base 2 number'))
      : (error.innerText = `"${character}" is not a valid input`);

    input.value = binaryString;
    pastLength = binaryString.length;
  } else {
    error.innerText = 'Enter a base 2 number';
    binaryString = string;
    input.value = string;
    pastLength = string.length;
  }
  decimalConvert(binaryString);
};

readInput = () => {
  string = input.value;
  validate(string);
};

input.addEventListener('input', readInput);
