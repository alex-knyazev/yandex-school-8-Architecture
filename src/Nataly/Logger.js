class Logger {
  constructor() {
    this.logs = [];
    this.log = this.log.bind(this)
  }

  //декорирование функций объекта класса
  lookForFunctions(object) {
    const log  = this.log;
    const keys = Object.keys(object);
    for(let i = 0; i < keys.length; i++ ) {
      let value = object[keys[i]] 
      if(typeof value === 'function') {
        object[keys[i]]  = function() {
          log(object.constructor.name, value.name);
          return value(...arguments)
        } 
      }
    }
  }

  log(className, methodName) {
    console.log(`в экземпляре класса ${className} вызван метод ${methodName}`)
    this.logs.push(`в экземпляре класса ${className} вызван метод ${methodName}`)
  }
}

export { 
  Logger
}