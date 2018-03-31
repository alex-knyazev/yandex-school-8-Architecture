import { Presenter } from "../../../Lorelei";

const eventsConnector = {
  viewToModel: [
    {
      in: 'handleSendToServer',
      out: 'sendDataToServer'
    },
  ],
  modelToView: [
    {
      in: 'handleDataIsSent',
      out: 'updateView'
    },
    {
      in: 'handleDataReceived',
      out: 'updateView'
    }
  ]
}

class FormPresenter extends Presenter {
  constructor(view, model, options) {
    super(view, model, eventsConnector, options);
  }
}

export {
  FormPresenter
}