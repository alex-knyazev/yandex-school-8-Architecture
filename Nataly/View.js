class View {
  constructor(DOMElement) {
    this.element = DOMElement;
  }

  /**
   * Запускаем функции-слушатели событий
   * @param {array} listeners 
   */
  static runListeners(listeners) {
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }
}

export default View;
