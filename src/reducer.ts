import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions, Decrement, Increment } from './types/actions.type';
import { Picture } from './types/picture.type';
import picturesRaw from './fake-datas.json';

export type State = {
  counter: number;
  pictures: Picture[];
};
//load the data 

  

export const defaultState = {
  counter: 3,
  pictures: picturesRaw.slice(-3),
};


export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      let incrementCounter = state.counter + 1 > picturesRaw.length ? state.counter : state.counter + 1;
      return { ...state, counter: incrementCounter, pictures: picturesRaw.slice(-incrementCounter)};
    case 'DECREMENT':
      let decrementCounter = state.counter < 3 ? state.counter : state.counter - 1;
      return { ...state, counter: decrementCounter, pictures: picturesRaw.slice(-decrementCounter)};
    case 'SELECT_PICTURE':
      return { ...state, pictures: picturesRaw.slice(-state.counter)};
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
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  throw 'Not Implemented';
};

export default compose(liftState, reducer);
