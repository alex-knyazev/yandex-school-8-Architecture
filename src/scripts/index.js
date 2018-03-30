import { Store } from '../Nataly';

import { dispatcher } from './basicDispatcher';
import { logger } from './basicLogger';

import { SEND_VALUE_TO_SERVER } from './actions';
import { Store } from '../Nataly';
import { FormView } from './views/FormView';

// данные для хранения в хранилище
const formStoreData = {
  answerByServer: 'Ответа от сервера еще не было',
};
// функция, которая будет вызываться при любом action
function updateStoreByActions(action) {
  switch (action.type) {
    case SEND_VALUE_TO_SERVER:
      return { ...this.data, answerByServer: action.payload };
    default:
      return null;
  }
};

// создаем хранилище
const formStore = new Store(formStoreData, updateStoreByActions);
logger.lookForFunctions(formStore)

// регистрируем store у диспетчера
dispatcher.registerStore(formStore);


const formElement = document.getElementsByClassName('view-stub')[0];

// создаем view для формы
const formView = new FormView(formElement);
logger.lookForFunctions(formView)
//подписываемся во view на определенные поля из store
formView.connectToStore(formStore, ['answerByServer']);

//находим элементы на сранице
const logElement= document.getElementsByClassName('log')[0];
// создаем view для формы
const logView = new FormView(formElement);
//подписываемся во view на определенные поля из store