class Logger {
  constructor() {
    this.logs = [];
    this.subscribers = [];
    this.saveLog = this.saveLog.bind(this);
    this.addSubscriber = this.addSubscriber.bind(this);
    this.getLogger = this.getLogger.bind(this);
  }

  getLogger() {
    return this;
  }

  /**
   * Обработка и сохранение лога
   * @param {string} className 
   * @param {string} methodName 
   */
  saveLog(connectorType, connector) {
    this.logs.push(`${connectorType}. ${connector.in} - ${connector.out}`);
    for (let i = 0; i < this.subscribers.length; i++) {
      const subscriber = this.subscribers[i];
      subscriber(this.logs);
    }
  }

  /**
   * Добавление подписчика на изменения в Store
   * @param {function} subscriber 
   */
  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
    subscriber(this.logs);
  }
}

export { 
  Logger
}