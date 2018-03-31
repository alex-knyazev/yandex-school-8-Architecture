class Store {
  /**
   * Создаем новый Store
   * @param {object} data 
   * @param {function} updateStoreByActions 
   */
  constructor(data, updateStoreByActions) {
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
    const subscribers = this.subscribers;
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
    this.subscribers.push(subscriber);
    subscriber(this.data);
  }

}

export {
  Store
}