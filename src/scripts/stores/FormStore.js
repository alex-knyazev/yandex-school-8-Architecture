import { Store } from '../../Nataly';

import { logger } from '../basicLogger';
import { SEND_VALUE_TO_SERVER } from '../actions';

const formStoreData = {
  answerByServer: 'Ответа от сервера еще не было',
};

function updateStoreByActions(action) {
  switch (action.type) {
    case SEND_VALUE_TO_SERVER:
      return { ...this.data, answerByServer: action.payload };
    default:
      return null;
  }
};


const formStore = new Store(formStoreData, updateStoreByActions);

//подписываемся на логгинг события в formStore 
logger.lookFor(formStore);

export {
  formStore
}