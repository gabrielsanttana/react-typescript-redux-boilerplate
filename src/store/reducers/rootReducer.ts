import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable';
import {History} from 'history';
import {connectRouter} from 'connected-react-router';
import catsReducer, {CatsState} from '../reducers/cats';

export interface ApplicationState extends Map<any, any> {
  readonly cats: CatsState;
}

const rootReducer = () =>
  combineReducers({
    cats: catsReducer,
  });

export default rootReducer;
