import { View } from '../../../Nataly';

import { sendValueToServer } from '../actionsCreator/sendValueToServer';

const formElement = document.getElementsByClassName('view-stub')[0];
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

class FormView extends View {
  constructor() {
    super(formElement);
    super.runListeners(listeners);
    this.fieldsFromStore = [];
    this.dataFromStore = {};
    this.connectToStore = this.connectToStore.bind(this);
    this.updateByStore = this.updateByStore.bind(this);
  }

  connectToStore(store, fieldsFromStore) {
    this.dataFromStore = store.data;
    store.addSubscriber(this.updateByStore);
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
    }, 200);
  }
}


export {
  FormView
}

