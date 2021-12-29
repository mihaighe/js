const dollarInput = document.querySelector('.dollar-input');
const quarterOutput = document.querySelector('.quarter-output');
const dimeOutput = document.querySelector('.dime-output');
const nickelOutput = document.querySelector('.nickel-output');
const pennyOutput = document.querySelector('.penny-output');
const errorMessage = document.querySelector('.error-message');

const convert = () => {
  let regex = /^\d{1,100}(?:\.\d{1,2})?$|^\.\d{1,2}$/;
  let dollars = dollarInput.value;

  let quarters = parseInt(dollars / 0.25);
  quarterOutput.textContent = quarters;

  let remainder = (dollars % 0.25).toFixed(2);

  let dimes = parseInt(remainder / 0.1);
  dimeOutput.textContent = dimes;

  remainder = (remainder % 0.1).toFixed(2);

  let nickles = parseInt(remainder / 0.05);
  nickelOutput.textContent = nickles;

  remainder = (remainder % 0.05).toFixed(2);

  let pennies = parseInt(remainder / 0.01);
  pennyOutput.textContent = pennies;

  errorMessage.classList.remove('error');
  errorMessage.textContent = '$ worth of coin';

  if (!regex.test(dollars)) {
    errorMessage.textContent =
      'Just a positive number with two decimals, please!';
    errorMessage.classList.add('error');
    quarterOutput.textContent = 0;
    dimeOutput.textContent = 0;
    nickelOutput.textContent = 0;
    pennyOutput.textContent = 0;
  } else {
    errorMessage.classList.remove('error');
    errorMessage.innerHTML = '&nbsp';
  }
};

dollarInput.addEventListener('input', convert);

//^\d{1,100}(?:\.\d{1,2})?$|^\.\d{1,2}$
