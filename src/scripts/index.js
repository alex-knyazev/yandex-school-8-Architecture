import { FormPresenter } from './presenters/FormPresenter';
import { FormModel } from './models/FormModel';

import { FormView } from './views/FormView';
import { LogView } from './views/LogView';

const formView = new FormView();

const formModel = new FormModel();

const isLogging = true;
const formPresenter = new FormPresenter(formView, formModel, { isLogging });

// создаем view для логирования
const logView = new LogView();
logView.connectToLogger(formPresenter.getLogger());


