import { Presenter } from '../../../Lorelei';

const eventsConnectors = {
  viewToModel: [
    {
      in: 'handleSendToServer',
      out: 'sendDataToServer',
    },
  ],
  modelToModel: [
    {
      in: 'handleDataSentToServer',
      out: 'getModelData',
    },
    {
      in: 'handleReceivedDataByServer',
      out: 'getModelData',
    },
  ],
  modelToView: [
    {
      in: 'handleGetModelData',
      out: 'updateView',
    },
  ],
};

class FormPresenter extends Presenter {
  constructor(view, model, options) {
    super(view, model, eventsConnectors, options);
  }
}

export default FormPresenter;
