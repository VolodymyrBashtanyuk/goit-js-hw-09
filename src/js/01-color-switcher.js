const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

buttonStop.disabled = true;

buttonStart.addEventListener('click', onButtonStart);
buttonStop.addEventListener('click', onButtonStop);


const changeBackgroundColor = () => bodyColor.style.backgroundColor = getRandomHexColor();

let intervalId;

function onButtonStart() {
   intervalId = setInterval(changeBackgroundColor, 1000);
   buttonStart.disabled = true;
   buttonStop.disabled = false;
};
function onButtonStop() {
    clearInterval(intervalId);
    buttonStop.disabled = true;
    buttonStart.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
