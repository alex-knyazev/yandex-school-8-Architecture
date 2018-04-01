const createDefaultEvents = elementForEvents => ({
  handleGetModelData: (handler) => {
    elementForEvents.addEventListener('getModelData', (e) => {
      handler(e.detail);
    });
  },
});

class Model {
  constructor(data, elementForEvents) {
    this.data = data;
    this.elementForEvents = elementForEvents;
    this.events = createDefaultEvents(elementForEvents);
  }

  addEvents(events) {
    this.events = Object.assign(this.events, events);
  }

  getModelData() {
    this.makeEvent('getModelData', this.data);
  }

  updateModelData(newData) {
    this.data = newData;
  }

  makeEvent(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    this.elementForEvents.dispatchEvent(event);
  }
}

export default Model;
