import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import sagas from './sagas';
import createApi from '../services/api';

const setupLogger = () => {
  const SAGA_LOGGING_BLACKLIST = [
    'EFFECT_TRIGGERED',
    'EFFECT_RESOLVED',
    'EFFECT_REJECTED',
  ];

  return createLogger({
    predicate: (getState, { type }) => SAGA_LOGGING_BLACKLIST.indexOf(type) === -1,
  });
};

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    sagaMiddleware,
  ];

  if (__DEV__) {
    middleware.push(setupLogger());
  }

  const enhancers = compose(
    applyMiddleware(
      ...middleware,
    ),
  );

  const store = createStore(
    rootReducer,
    enhancers,
  );

  const api = createApi();

  sagaMiddleware.run(sagas(api));

  return store;
};
