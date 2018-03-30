class Dispatcher {
  constructor(name) {
    this.name = name || 'Диспетчер приложения';
    this.stores = [];
    this.registerStore = this.registerStore.bind(this);
    this.makeAction = this.makeAction.bind(this);
  }

  registerStore(store) {
    if (!store ) {
      console.error('Вы должны передать store для регистрации!');
    }
    this.stores.push(store);
  }

  makeAction(action) {
    for (let i = 0; i < this.stores.length; i++) {
      const store = this.stores[i];
      store.update(action);
    }
  }

}

export {
  Dispatcher
};