const topSlider = document.getElementById('top');
const bottomSlider = document.getElementById('bottom');
const leftSlider = document.getElementById('left');
const rightSlider = document.getElementById('right');

const image = document.getElementById('image');
const borderText = document.getElementById('border-text');

const updateText = () => {
  borderText.innerText = getComputedStyle(image).borderRadius;
};

const updateBorder = (cssVariable, value) => {
  image.style.setProperty(cssVariable, value);
};

topSlider.oninput = () => {
  updateBorder('--top-border', topSlider.value);
  updateText();
};

bottomSlider.oninput = () => {
  updateBorder('--bottom-border', bottomSlider.value);
  updateText();
};

leftSlider.oninput = () => {
  updateBorder('--left-border', leftSlider.value);
  updateText();
};

rightSlider.oninput = () => {
  updateBorder('--right-border', rightSlider.value);
  updateText();
};
