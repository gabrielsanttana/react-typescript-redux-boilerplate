import throttle from 'lodash.throttle';
import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeEnhancers} from '../utils/composeEnhancers';
import rootReducer, {ApplicationState} from './reducers/rootReducer';
import rootSaga from './reducers/rootSaga';
import {loadState, saveState} from './services/localStorage';

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const persistedState = loadState();

const store: Store<ApplicationState> = createStore(
  rootReducer(),
  persistedState,
  enhancer,
);

sagaMiddleware.run(rootSaga);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000),
);

export default store;
