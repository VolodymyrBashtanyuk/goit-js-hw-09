import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import 'notiflix/dist/notiflix-3.2.5.min.css';


const promiseForm = document.querySelector('.form');

promiseForm.addEventListener('input', onFormInput);
promiseForm.addEventListener('submit', onFormSubmit);

let inputValue = {};

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(inputValue.delay);
  const stepDelay = Number(inputValue.step);
  const amount = Number(inputValue.amount);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay )
      .then(({ i, delay }) => Notify.success(`Fulfilled promise ${i} in ${delay}ms`))
      .catch(({ i, delay }) => Notify.failure(`Rejected promise ${i} in ${delay}ms`))
    delay  += stepDelay;
  }
};

function onFormInput(event) {
  const  {name, value} = event.target;
  inputValue[name] = value;
}

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