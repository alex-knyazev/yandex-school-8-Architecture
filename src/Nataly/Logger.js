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
   * todo - добавить поддержку аргументов разного типа 
   */
  lookFor(object) {
    const saveLog  = this.saveLog;
    const keys = Object.keys(object);
    for(let i = 0; i < keys.length; i++ ) {
      let value = object[keys[i]] 
      if(typeof value === 'function') {
        object[keys[i]]  = function() {
          saveLog(object.constructor.name, value.name);
          return value(...arguments)
        } 
      }
    }
  }

  /**
   * Обработка и сохранение лога
   * @param {string} className 
   * @param {string} methodName 
   */
  saveLog(className, methodName) {
    methodName = methodName.split(' ');
    methodName = methodName[methodName.length - 1];
    const logNumber = this.logs.length + 1;
    this.logs.push(`${logNumber}. в экземпляре класса ${className} вызван метод ${methodName}`);
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