import Logger from './Logger';

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
    const {
      view,
      model,
      eventsConnector,
      options,
    } = this;
    const { viewToModel, modelToView, modelToModel } = eventsConnector;
    const { isLogging } = options;

    if (viewToModel && viewToModel.length) {
      viewToModel.forEach((connector) => {
        view.events[connector.in]((value) => {
          if (isLogging) {
            this.saveLog('Presenter: viewToModel', connector);
          }
          this.model[connector.out](value);
        });
      });
    }

    if (modelToView && modelToView.length) {
      modelToView.forEach((connector) => {
        model.events[connector.in]((value) => {
          if (isLogging) {
            this.saveLog('Presenter: modelToView', connector);
          }
          this.view[connector.out](value);
        });
      });
    }

    if (modelToModel && modelToModel.length) {
      modelToModel.forEach((connector) => {
        model.events[connector.in]((value) => {
          if (isLogging) {
            this.saveLog('Presenter: modelToModel', connector);
          }
          this.model[connector.out](value);
        });
      });
    }
  }
}

export default Presenter;
