import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import picturesRaw from './fake-datas.json';

export type State = {
  counter: number;
  pictures: Picture[];
  selectedPicture?: Picture;
};
//load the data

export const defaultState = {
  counter: 3,
  pictures: picturesRaw.slice(-3),
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT': {
      let incrementCounter = state.counter + 1 > picturesRaw.length ? state.counter : state.counter + 1;
      return { ...state, counter: incrementCounter, pictures: picturesRaw.slice(-incrementCounter) };
    }
    case 'DECREMENT': {
      let decrementCounter = state.counter < 3 ? state.counter : state.counter - 1;
      return { ...state, counter: decrementCounter, pictures: picturesRaw.slice(-decrementCounter) };
    }
    case 'SELECT_PICTURE':
      return { ...state, selectedPicture: action.picture };
    case 'CLOSE_MODAL':
      return { ...state, selectedPicture: undefined };
    case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';
    default:
      throw 'Unknown action';
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  return state.selectedPicture;
};

export default compose(liftState, reducer);
