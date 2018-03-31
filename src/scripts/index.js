import { FormPresenter } from './presenters/FormPresenter';
import { FormView } from './views/FormView';
import { FormModel } from './models/FormModel';

const formView = new FormView();
const formModel = new FormModel();
const formPresenter = new FormPresenter(formView, formModel);