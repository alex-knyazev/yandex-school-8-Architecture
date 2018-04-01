const formElement = document.getElementsByClassName('view-stub')[0];
const formButtonElement = document.getElementsByClassName('view-stub__apply')[0];
const formInputElement = document.getElementsByClassName('view-stub__input')[0];
const formAnswerElement = document.getElementsByClassName('view-stub__label')[0];

const events = {
  handleSendToServer: (handler) => {
    formButtonElement.addEventListener('click', () => {
      handler(formInputElement.value);
    });
  },
};

class FormView {
  constructor() {
    this.elements = {
      formElement,
      formButtonElement,
      formInputElement,
      formAnswerElement,
    };
    this.events = events;
  }

  /**
   * Изменение DOM
   * @param {string} data 
   */
  updateView(data) {
    this.elements.formAnswerElement.innerText = data;
  }
}


export default FormView;

