class Store {
  /**
   * Создаем новый Store
   * @param {object} data
   * @param {function} updateStoreByActions
   */
  constructor(data, updateStoreByActions) {
    this.className = 'Store';
    this.data = data;
    this.updateStoreByActions = updateStoreByActions;
    this.subscribers = [];
    this.updateStoreByActions = this.updateStoreByActions.bind(this);
    this.addSubscriber = this.addSubscriber.bind(this);
  }

  /**
   * Обновление данных в Store
   * @param {object} action
   */
  update(action) {
    const { subscribers } = this;
    const updatingResult = this.updateStoreByActions(action);
    if (updatingResult) {
      for (let i = 0; i < subscribers.length; i++) {
        const subscriber = subscribers[i];
        subscriber(updatingResult);
      }
    }
  }

  /**
   * Добавление подписчика на изменения в Store
   * @param {function} subscriber
   */
  addSubscriber(subscriber) {
    if (typeof subscriber !== 'function') {
      throw new Error('подписчик, регистрируемыей в хранилище, должен быть функцией');
    }
    this.subscribers.push(subscriber);
    subscriber(this.data);
  }
}

export default Store;
