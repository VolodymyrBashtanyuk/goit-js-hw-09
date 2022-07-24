import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const data = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const valueTime = document.querySelectorAll('.value');

startButton.addEventListener('click', onStartButton);
startButton.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
}

flatpickr(data, options);

let timer = 0;
let intervalId = null;

function onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notify.failure('Please choose a date in the future',
                {
                    timeout: 2000,
                });
        } else if (selectedDates[0] > options.defaultDate) {
            startButton.disabled = false;
            timer = selectedDates[0];
        };
};
function timeInterval(date) {
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const countdownTime  = date - currentTime;
        const time = convertMs(countdownTime);
        updateBodyTime(time);

        if (Math.floor(countdownTime / 1000) === 0) {
            clearInterval(intervalId);
        }
    }, 1000); 
};
function onStartButton() {
    startButton.disabled = true;
    timeInterval(timer); 
};
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
  return { days, hours, minutes, seconds };
};

function updateBodyTime({days, hours, minutes, seconds }) {
    valueTime[0].textContent = days; 
    valueTime[1].textContent = hours; 
    valueTime[2].textContent = minutes; 
    valueTime[3].textContent = seconds;      
}


