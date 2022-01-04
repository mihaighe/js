const binaryInput = document.querySelector('.binary-input');
const decimalInput = document.querySelector('.decimal-input');
const errorMessage = document.querySelector('.error');

const convert = () => {
  let binaryString = binaryInput.value;
  let lastCharacter = binaryString.slice(-1);

  // If input is empty, clear interface and stop execution
  if (lastCharacter == '') {
    errorMessage.innerText = 'Enter a base 2 number';
    decimalInput.value = '';
    return;
  }

  // If last string character is not 0 or 1, remove it from the input value and show error
  if (lastCharacter.includes('1') || lastCharacter.includes('0')) {
    decimalInput.value = parseInt(binaryString, 2);
    errorMessage.innerText = 'Enter a base 2 number';
  } else {
    errorMessage.innerText = `"${lastCharacter}" is not a valid input`;
    binaryInput.value = binaryString.slice(0, -1);
  }
};

binaryInput.addEventListener('input', convert);
