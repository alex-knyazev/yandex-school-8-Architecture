import dispatcher from './basicDispatcher';
import logger from './basicLogger';

import formStore from './stores/formStore';

import FormView from './views/FormView';
import LogView from './views/LogView';

// регистрируем store у диспетчера
dispatcher.registerStore(formStore);

// создаем view для формы
const formView = new FormView();
// подписываемся на логирование
logger.lookFor(formView);
// подписываемся во view на поля из formStore
formView.connectToStore(formStore);

// создаем view для формы
const logView = new LogView();
logView.connectToLogger(logger);
