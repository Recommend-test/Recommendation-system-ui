import { Product } from './Product';

export interface Category {
  [x: string]: any;
      id: number;
      categoryName: string;
      products: Product[];
}