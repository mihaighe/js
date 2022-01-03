const upButton = document.querySelectorAll('.fa-arrow-up');

let x = [1, 1, 1, 1];
let y = [1, 1, 1, 1];

document.querySelectorAll('.fa-arrow-up').forEach((item) => {
  item.addEventListener('click', (event) => {
    let selectedImage = item.parentElement.previousElementSibling;
    let id = selectedImage.classList[1].slice(-1);
    selectedImage.style.transform = `scale(${x[id]}, ${-y[id]})`;
    y[id] = -y[id];
  });
});

document.querySelectorAll('.fa-arrow-down').forEach((item) => {
  item.addEventListener('click', (event) => {
    let selectedImage = item.parentElement.previousElementSibling;
    let id = selectedImage.classList[1].slice(-1);
    selectedImage.style.transform = `scale(${x[id]}, ${-y[id]})`;
    y[id] = -y[id];
  });
});

document.querySelectorAll('.fa-arrow-left').forEach((item) => {
  item.addEventListener('click', (event) => {
    let selectedImage = item.parentElement.previousElementSibling;
    let id = selectedImage.classList[1].slice(-1);
    selectedImage.style.transform = `scale(${-x[id]}, ${y[id]})`;
    x[id] = -x[id];
  });
});

document.querySelectorAll('.fa-arrow-right').forEach((item) => {
  item.addEventListener('click', (event) => {
    let selectedImage = item.parentElement.previousElementSibling;
    let id = selectedImage.classList[1].slice(-1);
    selectedImage.style.transform = `scale(${-x[id]}, ${y[id]})`;
    x[id] = -x[id];
  });
});
