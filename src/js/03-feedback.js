import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(inputMessage, 500));
const formRecord = {};

function inputMessage(event) {
  formRecord[event.target.name] = event.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formRecord));
}

getData();

function getData() {
  const getTextData = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (getTextData) {
    form.email.value = !!getTextData.email ? getTextData.email : '';
    form.message.value = !!getTextData.message ? getTextData.message : '';
  }
}

form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  const data = {
    email: email.value,
    message: message.value,
  };
  console.log(data);
  event.currentTarget.reset();
  localStorage.clear();
}
