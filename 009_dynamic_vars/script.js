const root = document.documentElement;
const userInput = document.querySelector('.user-name');
const passwordInput = document.querySelector('.password');
const cancelButton = document.querySelector('.cancel');
const message = document.querySelector('.message');
const form = document.querySelector('.form-container');

const loginUser = () => {
  let user = userInput.value;
  let password = passwordInput.value;
  let regex = /\s/;

  if (regex.test(user) || regex.test(password)) {
    message.textContent = 'Make sure you do not use any spaces!';
    root.style.setProperty('--message-color', '#dd8f00');
  } else if (user == 'mihai.md16@gmail.com' && password == 'mystrongpass') {
    message.textContent = 'Login completed!';
    root.style.setProperty('--message-color', 'black');
  } else {
    message.textContent = 'Invalid credentials!';
    root.style.setProperty('--message-color', 'red');
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  loginUser();
});

cancelButton.addEventListener('click', (event) => {
  event.preventDefault();
  userInput.value = '';
  passwordInput.value = '';
  message.textContent = '';
});

const calculate = () => {
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const currentRatio = viewportHeight / viewportWidth;
  let radians = Math.atan(currentRatio);
  let degrees = radians * (180 / Math.PI);
  let position = degrees * -1 + 180;

  document.querySelector(
    '.custom-shape-divider'
  ).style.transform = `rotate(${position}deg)`;

  document.querySelector('.custom-shape-divider').style.width = `${
    currentRatio * 250
  }% `;
};

window.addEventListener('load', calculate);
window.addEventListener('resize', calculate);
