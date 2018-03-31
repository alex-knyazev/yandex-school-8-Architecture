class View {
  constructor(DOMElement) {
    this.element = DOMElement;
    this.runListeners = this.runListeners.bind(this);
  }

  runListeners(listeners) {
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }
}

export {
  View
}