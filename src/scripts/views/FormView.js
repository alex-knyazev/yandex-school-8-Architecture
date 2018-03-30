import { View } from '../../Nataly';

import { sendValueToServer } from '../actions';

class FormView extends View {
  constructor(DOMElement) {
    super(DOMElement);
    this.runListeners(listeners);
    this.updateByStore = this.updateByStore.bind(this);
  }

  updateByStore(newData) {
    this.dataFromStore =  { ...this.dataFromStore, newData };
    this.updateView(newData);
  }

  updateView(newData) {
    const { answerByServer } = newData;
    formAnswerElement.innerText = '...';
    setTimeout(()=> {
      formAnswerElement.innerText = answerByServer;
    }, 200)
  }
}

const formButtonElement = document.getElementsByClassName('view-stub__apply')[0];
const formInputElement = document.getElementsByClassName('view-stub__input')[0];
const formAnswerElement = document.getElementsByClassName('view-stub__label')[0];

const listeners = [
  () => {
    formButtonElement.addEventListener('click', () => {
      sendValueToServer(formInputElement.value);
    });
  }
]

export {
  FormView
}

