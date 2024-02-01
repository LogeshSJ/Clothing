import { Address } from './address';
import { Cloth } from './cloth';
import { Orderstatus } from './orderstatus';

export interface Order {
  id: number;
  name: string;
  username: string;
  address: Address;
  cloth?: Cloth;
  orderStatus: Orderstatus;
  userId?: number;
  title: string;
  clothList: Cloth[];
}
