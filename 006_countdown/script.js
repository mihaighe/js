const appContainer = document.querySelector('.app-container');
const modalButton = document.querySelector('.add-countdown');
const addCountdownButton = document.querySelector('.fa-check-circle');
const closeModalButton = document.querySelector('.fa-times-circle');
const modal = document.querySelector('.modal');
const dateInput = document.querySelector('.date');
const messageInput = document.querySelector('.message');
const timeInput = document.querySelector('.time');
let countdownNumber = 0;

let tomorrow = new Date();
let myArray = [];
tomorrow.setDate(tomorrow.getDate() + 1);
formattedTomorrow = tomorrow.toISOString().slice(0, 10);
dateInput.setAttribute('min', formattedTomorrow);
dateInput.value = formattedTomorrow;
modalButton.classList.add('show');

const formatValue = (value) => {
  return value < 10 ? `0${value}` : value;
};

const setTime = (deadline, id) => {
  console.log(id);
  let today = new Date();
  let time = Math.abs(deadline - today) / 1000;

  let days = Math.floor(time / 86400);
  time -= days * 86400;

  let hours = Math.floor(time / 3600) % 24;
  time -= hours * 3600;

  let minutes = Math.floor(time / 60) % 60;
  time -= minutes * 60;

  let seconds = Math.floor(time % 60);

  document.querySelector(`.clock-${id}`).innerHTML = `${formatValue(
    hours
  )}:${formatValue(minutes)}:${formatValue(seconds)}`;
  document.querySelector(`.calendar-${id}`).innerHTML = `${days} </br> Days`;

  // document.querySelector(`.clock-${id}`).innerHTML =

  // document.querySelector(`.calendar-${id}`).innerHTML =
};

const getCountdownHTML = (id) => {
  return `<div class="objects">
  <div class="clock">
    <div class="clock-body"></div>
    <div class="background-text">88:88:88</div>  
    <div class="background-text clock-time clock-${id}"></div>
  </div>
  <div class="calendar">
    <div class="circles">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
    <div class="red-paper"></div>
    <div class="white-paper">
      <div class="calendar-text calendar-${id}">
      </div>
    </div>
  </div>
  <div class="plant">
    <div class="pot pot-left"></div>
    <div class="pot pot-right"></div>
    <div class="tulpin"></div>
    <div class="leaf-left"></div>
    <div class="leaf-right"></div>
  </div>
</div>
<div class="shelf">
  <div class="wood">${messageInput.value}</div>
  <div class="wood-support wood-support-left"></div>
  <div class="wood-support wood-support-right"></div>
</div>
<i class="fas fa-times id-${id}"></i>`;
};

const modalButtonVisibility = () => {
  if (countdownNumber < 3) {
    modalButton.classList.add('show');
  }
};

const addCountdown = () => {
  let id = Math.random().toString().slice(2, -1);

  let countdown = document.createElement('div');

  countdown.classList.add('countdown-container');

  countdown.innerHTML = getCountdownHTML(id);

  appContainer.appendChild(countdown);

  let deadline = new Date(`${dateInput.value}T${timeInput.value}`);

  eval('interval_' + id + ' = setInterval( setTime, 1000, deadline, id )');

  // removeButtonCollection = document.getElementsByClassName('fa-times');
  // removeButtonCollection[countdownNumber].classList.add(`${countdownNumber}`);

  document.querySelector(`.id-${id}`).addEventListener('click', (event) => {
    countdownNumber--;
    clearInterval(window[`interval_${id}`]);
    event.target.parentElement.remove();
    modalButtonVisibility();
  });

  // document
  //   .querySelector(`.remove-${countdownNumber}`)
  //   .addEventListener('click', (event) => {
  //     countdownNumber--;
  //     clearInterval(myArray[countdownNumber]);
  //     event.target.parentElement.remove();
  //     modalButtonVisibility();
  //   });

  countdownNumber++;
  modalButtonVisibility();
  modal.classList.remove('show');
};

modalButton.addEventListener('click', () => {
  modal.classList.add('show');
  modalButton.classList.remove('show');
});

closeModalButton.addEventListener('click', () => {
  modal.classList.remove('show');
  modalButton.classList.add('show');
});

addCountdownButton.addEventListener('click', addCountdown);
