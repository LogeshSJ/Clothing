import { Cloth } from './cloth';

export interface Cart {
  id?: number;
  cloth: Cloth;
  count: number;
  price: number;
  userId?: number;
  clothId?: number;
}
