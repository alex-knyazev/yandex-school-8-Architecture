import { Store } from '../../../Nataly';

import logger from '../basicLogger';
import { SEND_VALUE_TO_SERVER } from '../actionsCreator/sendValueToServer';

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
}

// создаем singleton
const formStore = new Store(formStoreData, updateStoreByActions);
// подписываемся на логгинг событий в formStore 
logger.lookFor(formStore);

export default formStore;
