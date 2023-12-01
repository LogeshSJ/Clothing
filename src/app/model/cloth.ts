import { Category } from './category';

export interface Cloth {
  id?: number;
  title: string;
  description: string;
  price: number;
  category_id?: number;
  count?: number;
  category?: Category;
}
