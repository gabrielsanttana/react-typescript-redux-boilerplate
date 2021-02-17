import {fromJS, List, Map} from 'immutable';
import {AnyAction, Reducer} from 'redux';
import {call, put} from 'redux-saga/effects';
import {createSelector} from 'reselect';
import {ApplicationState} from '../rootReducer';
import {fetchCatFactsService} from '../../services/catsServices';
import {action} from 'typesafe-actions';

//Action types
export enum CatsTypes {
  FETCH_CAT_FACTS_REQUEST = '@cats/FETCH_CAT_FACTS_REQUEST',
  FETCH_CAT_FACTS_SUCCESS = '@cats/FETCH_CAT_FACTS_SUCCESS',
  FETCH_CAT_FACTS_FAILURE = '@cats/FETCH_CAT_FACTS_FAILURE',
}

//State type
export interface CatsState extends Map<string, any> {
  readonly data: ImmutableMap<CatFact>;
  readonly dataCount: number;
  readonly loading: boolean;
  readonly error: boolean;
}

//Data types
export interface CatFact {
  _id: string;
  __v: number;
  text: string;
  updatedAt: string;
  deleted: boolean;
  source: string;
  sentCount: number;
}

//Fetch actions
export const fetchCatFactsRequest = ({
  animal_type,
  amount,
}: {
  animal_type?: string;
  amount?: number;
}) => action(CatsTypes.FETCH_CAT_FACTS_REQUEST, {animal_type, amount});

export const fetchCatFactsSuccess = (data: CatFact[]) =>
  action(CatsTypes.FETCH_CAT_FACTS_SUCCESS, {data});

export const fetchCatFactsFailure = () =>
  action(CatsTypes.FETCH_CAT_FACTS_FAILURE);

//Sagas
export function* fetchCatFacts(action: AnyAction) {
  try {
    const response = yield call(
      fetchCatFactsService,
      action.payload.animal_type,
      action.payload.amount,
    );

    yield put(fetchCatFactsSuccess(response.data));
  } catch (err) {
    yield put(fetchCatFactsFailure());
  }
}

//Initial state
export const INITIAL_STATE: CatsState = fromJS({
  data: fromJS([]),
  dataCount: 0,
  loading: false,
  error: false,
});

//Selectors
const catFactsSelector = (state: ImmutableMap<ApplicationState>) =>
  state.get('cats');

export const getCatFacts = createSelector(catFactsSelector, (catFacts) =>
  catFacts.get('data'),
);

export const getCatFactsCount = createSelector(catFactsSelector, (catFacts) =>
  catFacts.get('dataCount'),
);

export const isLoadingCatFacts = createSelector(catFactsSelector, (catFacts) =>
  catFacts.get('loading'),
);

//Reducer
const reducer: Reducer<CatsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CatsTypes.FETCH_CAT_FACTS_REQUEST:
      return state.withMutations((prevState: CatsState) =>
        prevState.set('error', false).set('loading', true),
      );

    case CatsTypes.FETCH_CAT_FACTS_SUCCESS:
      return state.withMutations((prevState: CatsState) =>
        prevState
          .set('data', fromJS(action.payload.data))
          .set('dataCount', action.payload.data.length ?? 1)
          .set('loading', false)
          .set('error', false),
      );

    case CatsTypes.FETCH_CAT_FACTS_FAILURE:
      return state.withMutations((prevState: CatsState) =>
        prevState
          .set('data', fromJS([]))
          .set('dataCount', 0)
          .set('loading', false)
          .set('error', true),
      );

    default:
      return state;
  }
};

export default reducer;
