import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions, Decrement, Increment } from './types/actions.type';

export type State = {
  counter: number;
};
export const defaultState = {
  counter: 0,
};

const increment  = (): Increment => ({ type: 'INCREMENT' });
const decrement = (): Decrement => ({ type: 'DECREMENT' });


export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1};
    case 'DECREMENT':
      return { ...state, counter: state.counter < 4 ? state.counter : state.counter - 1};
    case 'SELECT_PICTURE':
      throw 'Not Implemented';
    case 'CLOSE_MODAL':
      throw 'Not Implemented';
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
  throw 'Not Implemented';
};
export const getSelectedPicture = (state: State) => {
  throw 'Not Implemented';
};

export default compose(liftState, reducer);
