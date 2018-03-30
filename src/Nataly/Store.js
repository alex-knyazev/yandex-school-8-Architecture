class Store {
  constructor(data, updateStoreByActions) {
    this.data = data;
    this.updateStoreByActions = updateStoreByActions;
    this.subscribers = [];
    this.updateStoreByActions = this.updateStoreByActions.bind(this);
    this.addSubscriber = this.addSubscriber.bind(this);
  }

  update(action) {
    const subscribers = this.subscribers;
    const updatingResult = this.updateStoreByActions(action);
    if (updatingResult) {
      for (let i = 0; i < subscribers.length; i++) {
        const subscriber = subscribers[i];
        subscriber.updateByStore(updatingResult)
      }
    }
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
    subscriber.updateByStore(this.data);
  }

}

export {
  Store
}