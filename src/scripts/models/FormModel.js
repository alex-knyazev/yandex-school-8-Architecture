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

  /**
   * Отправка данных из формы на сервер
   * @param {string} value 
   */
  sendDataToServer(value) {
    // данные отправлены
    this.updateModelData('данные отправлены, ждем ответа');
    this.makeEvent('dataSentToServer');

    
    setTimeout(() => {
      // оповестим что все еще ждем
      this.updateModelData('Долго ждем ответа');
      this.makeEvent('dataSentToServer');
    }, 2000);

    setTimeout(() => {
      // данные получены
      let dataByServer = 'Сервер хотел получить сообщение, но до него дошла лишь пустота.';
      if (value.length) {
        dataByServer = 'Сервер получил ваше сообщение.';
      }
      this.updateModelData(dataByServer);
      this.makeEvent('dataReceivedByServer');
    }, 4000); 
  }
}

export default FormModel;
