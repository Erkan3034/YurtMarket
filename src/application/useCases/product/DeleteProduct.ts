import { IProductRepository } from "../../../domain/repositories/IProductRepository";

export interface DeleteProductDTO {
  productId: string;
}

export class DeleteProduct {
  constructor(private productRepo: IProductRepository) {}

  async execute(dto: DeleteProductDTO) {
    await this.productRepo.delete(dto.productId);
  }
}

