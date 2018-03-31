import { Model } from '../../../Nataly'

const events = {
  handleDataIsSent: (handler) => {
    document.addEventListener('dataIsSent', (e) => {
      handler(e.detail);
    })
  },
  handleDataReceived: (handler) => {
    document.addEventListener('dataReceived', (e) => {
      debugger
      handler(e.detail);
    })
  }
}

class FormModel {
  constructor() {
    this.events = events;
  }

  sendDataToServer(value) {
    let event =  new CustomEvent('dataIsSent', { 'detail': 'Данные отправлены, ждем ответа' });
    document.dispatchEvent(event);
    setTimeout(() => {
    let event = new CustomEvent('dataReceived', { 'detail': 'Долго ждем ответа' });
      document.dispatchEvent(event);
    }, 2000 );
    let dataByServer = 'Сервер хотел получить сообщение, но до него дошла лишь пустота.'
    if(value.length) {
      dataByServer = 'Сервер получил ваше сообщение.'
    }
    setTimeout(() => {
      let event = new CustomEvent('dataReceived', { 'detail': dataByServer });
        document.dispatchEvent(event);
    }, 4000 );
  }
}

export {
  FormModel
}