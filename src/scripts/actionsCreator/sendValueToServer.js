import { dispatcher } from '../basicDispatcher'

export const SEND_VALUE_TO_SERVER = 'SEND_VALUE_TO_SERVER';

export const sendValueToServer = (value) => {
  dispatcher.dispatch({
    type: SEND_VALUE_TO_SERVER,
    payload: 'Происходит отправка данных'
  });
  setTimeout(()=> {
    dispatcher.dispatch({
      type: SEND_VALUE_TO_SERVER,
      payload: 'Очень долгая отправка данных'
    });
  },2000);
  setTimeout(()=> {
    let payload = 'Сервер хотел получить сообщение, но до него дошла лишь пустота.'
    if(value.length) {
      payload = 'Сервер получил ваше сообщение.'
    }
    dispatcher.dispatch({
      type: SEND_VALUE_TO_SERVER,
      payload: payload
    })
  },3500);
}
