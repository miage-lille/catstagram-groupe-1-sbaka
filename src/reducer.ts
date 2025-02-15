import { cmdFetch } from './commands';
import { Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import picturesRaw from './fake-datas.json';
import { fetchCatsRequest } from './actions';
import { Failure, Loading, Success } from './types/api.type';
import { failure, loading, success } from './api';

export type State = {
  counter: number;
  apiStatus: Success | Loading | Failure;
  selectedPicture?: Picture;
};

const defaultState: State = {
  counter: 3,
  apiStatus: success([]),
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux

  switch (action.type) {
    case 'INCREMENT': {
      const newCounter = state.counter + 1 > picturesRaw.length ? state.counter : state.counter + 1;
      const newState = {
        ...state,
        counter: newCounter,
        pictures: picturesRaw.slice(-newCounter),
      };
      // Instead of calling dispatch via useDispatch, return a loop with a command to dispatch fetchCatsRequest
      return loop(newState, cmdFetch(fetchCatsRequest(newCounter)));
    }
    case 'DECREMENT': {
      const newCounter = state.counter < 3 ? state.counter : state.counter - 1;
      const newState = {
        ...state,
        counter: newCounter,
        pictures: picturesRaw.slice(-newCounter),
      };
      return loop(newState, cmdFetch(fetchCatsRequest(newCounter)));
    }
    case 'SELECT_PICTURE':
      return { ...state, selectedPicture: action.picture };
    case 'CLOSE_MODAL':
      return { ...state, selectedPicture: undefined };
    case 'FETCH_CATS_REQUEST':
      return { ...state, apiStatus: loading() };
    case 'FETCH_CATS_COMMIT':
      return { ...state, apiStatus: success(action.payload) };
    case 'FETCH_CATS_ROLLBACK':
      return { ...state, apiStatus: failure(action.error) };
    default:
      return state;
  }
};

export const counterSelector = (state: State) => state.counter;
export const picturesSelector = (state: State) => {
  const { apiStatus } = state;
  if (apiStatus.type === 'SUCCESS') {
    return apiStatus.pictures;
  }
  console.log('apiStatus', apiStatus);
  
  return [];
};
export const getSelectedPicture = (state: State) => state.selectedPicture;

export default compose(liftState, reducer);
