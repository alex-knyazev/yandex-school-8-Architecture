const logElement = document.getElementsByClassName('log')[0];

class LogView {
  constructor() {
    this.element = logElement;
    this.dataFromLogs = {};
    this.updateByLogger = this.updateByLogger.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  /**
   * Соединение с логгером
   * @param {function} addSubscriber
   */
  connectToLogger(addSubscriber) {
    addSubscriber(this.updateByLogger);
  }

  /**
   * Функция, вызывающаяся при обновлении логгера
   * @param {array} newLogs 
   */
  updateByLogger(newLogs) {
    this.dataFromLogs = { ...this.dataFromLogs, newLogs };
    if (newLogs) {
      this.updateView(newLogs);
    }
  }

  /**
   * Изменение DOM
   */
  updateView(newLogs) {
    const logs = newLogs;
    this.element.innerText = logs.join('\n');
  }
}

export default LogView;

