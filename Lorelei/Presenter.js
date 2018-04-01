import Logger from './Logger';

class Presenter extends Logger {
  constructor(view, model, eventsConnectors, options) {
    super();
    this.view = view;
    this.model = model;
    this.eventsConnectors = eventsConnectors;
    this.initConnectors = this.initConnectors.bind(this);
    this.options = options;
    this.initConnectors();
  }

  /**
   * инициализация коннекторов
   */
  initConnectors() {
    this.initConnector('viewToModel');
    this.initConnector('modelToView');
    this.initConnector('modelToModel');
  }

  /**
   * Связывание событий из источника с методом из цели
   * @param {string} connectorType 
   */
  initConnector(connectorType) {
    const {
      view,
      model,
      eventsConnectors,
      options,
    } = this;
    const { isLogging } = options;
    const connectors = eventsConnectors[connectorType];
    if (!connectors.length) {
      return;
    }

    let source;
    let target;
    switch (connectorType) {
      case 'viewToModel':
        source = view;
        target = model;        
        break;
      case 'modelToView':
        source = model;
        target = view;
        break;
      case 'modelToModel':
        source = model;
        target = model;
        break;
      default:
        throw new Error('фреймворк не знает о предоставленном типе коннектора');
    }

    connectors.forEach((connector) => {
      source.events[connector.in]((value) => {
        if (isLogging) {
          this.saveLog(Presenter.makeLog(connectorType, connector));
        }
        target[connector.out](value);
      });
    });
  }

  /**
   * создание лога
   * @param {string} connectorType 
   * @param {object} connector 
   */
  static makeLog(connectorType, connector) {
    const communicators = connectorType.split('To').map(c => c.toLowerCase());
    return `Presenter: -> на событие ${connector.in} из ${communicators[0]} \
      срабатывает метод ${connector.out} из ${communicators[1]}`;
  }
}

export default Presenter;
