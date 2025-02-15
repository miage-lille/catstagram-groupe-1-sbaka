import { Loading, Success, Failure } from './types/api.type';
import { Picture } from './types/picture.type';

export const loading = (): Loading => ({ type: 'LOADING' });

export const success = (pictures: Picture[]): Success => ({ type: 'SUCCESS', pictures });

export const failure = (error: Error): Failure => ({ type: 'FAILURE', error });
