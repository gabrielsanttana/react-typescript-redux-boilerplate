import {all, takeLatest} from 'redux-saga/effects';
import {CatsTypes, fetchCatFacts} from './cats';

export default function* rootSaga() {
  yield all([takeLatest(CatsTypes.FETCH_CAT_FACTS_REQUEST, fetchCatFacts)]);
}
