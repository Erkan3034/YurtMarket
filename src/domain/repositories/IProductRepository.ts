import { Product } from "../entities/Product";

export interface ListProductFilters {
  dormId?: string;
  category?: string;
  sellerId?: string;
  isActive?: boolean;
}

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Product | null>;
  list(filters: ListProductFilters): Promise<Product[]>;
  countBySeller(sellerId: string): Promise<number>;
}

