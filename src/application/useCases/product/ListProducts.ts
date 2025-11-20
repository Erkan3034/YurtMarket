import { IProductRepository, ListProductFilters } from "../../../domain/repositories/IProductRepository";

export class ListProducts {
  constructor(private productRepo: IProductRepository) {}

  async execute(filters: ListProductFilters) {
    return this.productRepo.list(filters);
  }
}

