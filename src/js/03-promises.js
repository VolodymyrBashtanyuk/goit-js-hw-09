import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import 'notiflix/dist/notiflix-3.2.5.min.css';


const promiseForm = document.querySelector('.form');
const inputfirstDelay = document.querySelector('[name = "delay"]');
const inputStepDelay = document.querySelector('[name = "step"]');
const inputAmount = document.querySelector('[name = "amount"]');

promiseForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(inputfirstDelay.value);
  const stepDelay = Number(inputStepDelay.value);
  const amount = Number(inputAmount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay )
      .then(({ position, delay }) => Notify.success(`Fulfilled promise ${position} in ${delay}ms`))
      .catch(({ position, delay }) => Notify.failure(`Rejected promise ${position} in ${delay}ms`))
    delay  += stepDelay;
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
     setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay} );
      } else {
        reject({position, delay});
      }
    }, delay);
  })
};