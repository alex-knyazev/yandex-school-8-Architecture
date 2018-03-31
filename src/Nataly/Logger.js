const humanizeMethodName = (methodName) => {
  methodName = methodName.split(' ');
  methodName = methodName[methodName.length - 1];
  return methodName;
}

class Logger {
  constructor() {
    this.logs = [];
    this.subscribers = [];
    this.makeLog = this.makeLog.bind(this);
    this.logToView = this.logToView.bind(this);
  }

  /**
   * Декорирование функций объекта для слежения за их вызовом
   * @param {object} object
   * todo - добавить поддержку аргументов разного типа 
   */
  lookFor(object) {
    const makeLog  = this.makeLog;
    const keys = Object.keys(object);
    for(let i = 0; i < keys.length; i++ ) {
      let value = object[keys[i]] 
      if(typeof value === 'function') {
        object[keys[i]]  = function() {
          makeLog(object.constructor.name, value.name);
          return value(...arguments)
        } 
      }
    }
  }

  makeLog(className, methodName) {
    methodName = humanizeMethodName(methodName);
    this.logs.push(`в экземпляре класса ${className} вызван метод ${methodName}`);
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

  logToView() {
    this.connectedView.logs = this.logs;
  }
}

export { 
  Logger
}