class View {
  constructor(DOMElement) {
    this.element = DOMElement;
    this.connectToStore = this.connectToStore.bind(this);
    this.runListeners = this.runListeners.bind(this);
    this.updateByStore = this.updateByStore.bind(this);
    this.fieldsFromStore = [];
    this.dataFromStore = {};
  }

  connectToStore(store, fieldsFromStore) {
    this.dataFromStore = store.data;
    this.fieldsFromStore  = fieldsFromStore;
    store.addSubscriber(this);
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