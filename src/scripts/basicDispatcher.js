import { Dispatcher } from '../../Nataly';

import { logger } from './basicLogger';

const dispatcher = new Dispatcher();
logger.lookFor(dispatcher);

export {
  dispatcher
}