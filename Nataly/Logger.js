class Logger {
  constructor() {
    this.logs = [];
    this.subscribers = [];
    this.saveLog = this.saveLog.bind(this);
    this.addSubscriber = this.addSubscriber.bind(this);
  }

  /**
   * Декорирование функций объекта для слежения за их вызовом
   * @param {object} object
   */
  lookFor(object) {
    const { saveLog } = this;
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      const value = object[keys[i]];
      if (typeof value === 'function') {
        // eslint-disable-next-line
        object[keys[i]] = function wrapper(...args) {
          saveLog(object.className, value.name);
          return value(...args);
        };
      }
    }
  }

  /**
   * Обработка и сохранение лога
   * @param {string} className
   * @param {string} methodName
   */
  saveLog(className, methodName) {
    let normalizeMethodName = methodName.split(' ');
    normalizeMethodName = normalizeMethodName[normalizeMethodName.length - 1];
    const logNumber = this.logs.length + 1;
    this.logs.push(`${logNumber}. в экземпляре класса ${className} вызван метод ${normalizeMethodName}`);
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
