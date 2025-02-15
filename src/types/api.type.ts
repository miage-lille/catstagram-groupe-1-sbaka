import { Picture } from './picture.type';

export type Success = { type: 'SUCCESS'; pictures: Picture[] };
export type Loading = { type: 'LOADING' };
export type Failure = { type: 'FAILURE'; error: Error };
