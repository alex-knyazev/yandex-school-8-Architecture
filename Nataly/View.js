class View {
  constructor(DOMElement) {
    this.element = DOMElement;
    this.runListeners = this.runListeners.bind(this);
  }

  /**
   * Запускаем функции-слушатели событий
   * @param {array} listeners 
   */
  runListeners(listeners) {
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }
}

export {
  View
}