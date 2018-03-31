const formElement = document.getElementsByClassName('view-stub')[0];
const formButtonElement = document.getElementsByClassName('view-stub__apply')[0];
const formInputElement = document.getElementsByClassName('view-stub__input')[0];
const formAnswerElement = document.getElementsByClassName('view-stub__label')[0];

const events = {
  handleSendToServer: (handler) => {
    formButtonElement.addEventListener('click', () => {
      handler(formInputElement.value);
    });
  }
}

class FormView {
  constructor(data) {
    this.events = events;
  }

  updateView(data) {
    formAnswerElement.innerText = data;
  }
}


export {
  FormView
}

