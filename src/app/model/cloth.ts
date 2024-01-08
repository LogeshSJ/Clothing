import { Category } from './category';

export interface Cloth {
  id?: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  count?: number;
  category?: Category;
}
