class Logger {
  constructor() {
    this.logs = [];
    this.subscribers = [];
    this.addSubscriber = this.addSubscriber.bind(this);
  }

  /**
   * Метод для получения элементами возможности подписаться на 
   * изменения в логгере
   */
  getLoggerPublisher() {
    return this.addSubscriber;
  }

  /**
   * Обработка и сохранение лога
   * @param {string} log
   */
  saveLog(log) {
    const logNumber = this.logs.length;
    this.logs.push(`${logNumber}. ${log}`);
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

export default Logger;
