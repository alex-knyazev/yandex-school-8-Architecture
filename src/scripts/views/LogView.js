const logElement = document.getElementsByClassName('log')[0];

class LogView {
  constructor() {
    this.element = logElement;
    this.dataFromLogs = {};
    this.updateByLogger = this.updateByLogger.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  connectToLogger(addSubscriber) {
    addSubscriber(this.updateByLogger);
  }

  updateByLogger(newLogs) {
    this.dataFromLogs = { ...this.dataFromLogs, newLogs };
    if (newLogs) {
      this.updateView(newLogs);
    }
  }

  updateView(newLogs) {
    const logs = newLogs;
    this.element.innerText = logs.join('\n');
  }
}

export default LogView;

