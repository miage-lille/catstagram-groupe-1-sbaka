import { Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment } from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (count: number): FetchCatsRequest => {
  const token = import.meta.env.VITE_PIXABAY_TOKEN;
  const baseUrl = new URL('https://pixabay.com/api/');
  
  // Safely add query parameters
  const params = new URLSearchParams({
    key: token,
    per_page: count.toString(),
    q: 'cat'
  });
  
  return {
    type: 'FETCH_CATS_REQUEST',
    method: 'GET',
    path: `${baseUrl}?${params.toString()}`
  };
};

export const fetchCatsCommit = (payload: Picture[]): FetchCatsCommit => ({ 
  type: 'FETCH_CATS_COMMIT', 
  payload 
});

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ 
  type: 'FETCH_CATS_ROLLBACK', 
  error 
});
