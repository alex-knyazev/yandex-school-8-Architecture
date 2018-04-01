import { Model } from '../../../Lorelei';

const elementForEvents = document.createElement('div');

const events = {
  handleDataSentToServer: (handler) => {
    elementForEvents.addEventListener('dataSentToServer', (e) => {
      handler(e.detail);
    });
  },

  handleReceivedDataByServer: (handler) => {
    elementForEvents.addEventListener('dataReceivedByServer', (e) => {
      handler(e.detail);
    });
  },
};

class FormModel extends Model {
  constructor() {
    super(null, elementForEvents);
    this.addEvents(events);
  }


  sendDataToServer(value) {
    // данные отправлены
    this.updateModelData('данные отправлены, ждем ответа');
    this.makeEvent('dataSentToServer');

    // оповестим что все еще ждем
    setTimeout(() => {
      this.updateModelData('Долго ждем ответа');
      this.makeEvent('dataSentToServer');
    }, 2000);

    // данные получены
    let dataByServer = 'Сервер хотел получить сообщение, но до него дошла лишь пустота.';
    if (value.length) {
      dataByServer = 'Сервер получил ваше сообщение.';
    }
    setTimeout(() => {
      this.updateModelData(dataByServer);
      this.makeEvent('dataReceivedByServer');
    }, 4000); 
  }
}

export default FormModel;
