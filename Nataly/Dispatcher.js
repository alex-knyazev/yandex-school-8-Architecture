class Dispatcher {
  constructor(name) {
    this.stores = [];
    this.registerStore = this.registerStore.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  /**
   * Регистрация хранилища
   * @param {Store} store 
   */
  registerStore(store) {
    if (!store ) {
      console.error('Вы должны передать store для регистрации!');
    }
    this.stores.push(store);
  }

  /**
   * Оповещение зарегестрированных хранилищ об Action
   * @param {object} action 
   */
  dispatch(action) {
    for (let i = 0; i < this.stores.length; i++) {
      const store = this.stores[i];
      store.update(action);
    }
  }

}

export {
  Dispatcher
};