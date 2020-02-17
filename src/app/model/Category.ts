import { Product } from './Product';

export interface Category {
      id: number;
      categoryName: string;
      products: Product[];
}