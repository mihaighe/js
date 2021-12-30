calculate = () => {
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
