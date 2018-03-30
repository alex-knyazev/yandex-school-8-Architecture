import { dispatcher } from '../basicDispatcher'

export const SEND_VALUE_TO_SERVER = 'SEND_VALUE_TO_SERVER';

export const sendValueToServer = (value) => {
  //здесь типа посылка данных на сервер, все хорошо
  let payload = 'Сервер хотел получить сообщение, но до него дошла лишь пустота.'
  if(value.length) {
    payload = 'Сервер получил ваше сообщение.'
  }
  dispatcher.makeAction({
    type: SEND_VALUE_TO_SERVER,
    payload: payload
  })
}