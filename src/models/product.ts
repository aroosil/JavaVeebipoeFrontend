import type { Category } from "./category";

export type Product = {
  id?: number;
  name: string;
  price: number;
  stock: number;
  active: boolean;
  category: Category;

  image?: String;
};
