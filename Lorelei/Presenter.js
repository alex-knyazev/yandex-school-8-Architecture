import { Logger } from './Logger';

class Presenter extends Logger {
  constructor(view, model, eventsConnector, options) {
    super();
    this.view = view;
    this.model = model;
    this.eventsConnector = eventsConnector;
    this.initEvents = this.initEvents.bind(this);
    this.options = options;
    this.initEvents();
  }

  initEvents() {
    const { view, model, eventsConnector, options } = this;
    const { viewToModel, modelToView } = eventsConnector;
    const { isLogging } = options;

    if (viewToModel.length) {
      viewToModel.forEach( (connector) => {
        this.view.events[connector.in]( (value) => {
          if (isLogging) {
            this.saveLog('viewToModel', connector);
          }
          this.model[connector.out](value);
        })
      });
    }
    if (modelToView.length) {
      modelToView.forEach( (connector) => {
        this.model.events[connector.in]( (value) => {
          if (isLogging) {
            this.saveLog('modelToView', connector);
          }
          this.view[connector.out](value)
        })
      });
    }
  }
}

export {
  Presenter
};