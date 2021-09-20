const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');
const root = document.documentElement;

stopButton.addEventListener('click', () => {
  root.style.setProperty('--play-state', 'paused');
});
playButton.addEventListener('click', () => {
  root.style.setProperty('--play-state', 'running');
});
