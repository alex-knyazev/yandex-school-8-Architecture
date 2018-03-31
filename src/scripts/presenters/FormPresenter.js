class FormPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.initEvents();
  }

  initEvents() {
    this.view.events.handleSendToServer( (inputValue) => {
      this.model.sendDataToServer(inputValue);
    });

    this.model.events.handleDataIsSent((status) => {
      this.view.updateView(status);
    });
    this.model.events.handleDataReceived((data) => {
      this.view.updateView(data);
    })
    
  }
}

export {
  FormPresenter
}