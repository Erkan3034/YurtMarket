import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { Price } from "../../../domain/valueObjects/Price";
import { Quantity } from "../../../domain/valueObjects/Quantity";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export interface UpdateProductDTO {
  productId: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string | null;
  isActive?: boolean;
}

export class UpdateProduct {
  constructor(private productRepo: IProductRepository) {}

  async execute(dto: UpdateProductDTO) {
    const product = await this.productRepo.findById(dto.productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const current = product.snapshot;

    product.update({
      name: dto.name ?? current.name,
      description: dto.description ?? current.description,
      price: dto.price !== undefined ? Price.create(dto.price) : current.price,
      stock: dto.stock !== undefined ? Quantity.create(dto.stock) : current.stock,
      categoryId: dto.categoryId !== undefined ? dto.categoryId : current.categoryId,
      isActive: dto.isActive ?? current.isActive,
    });

    return this.productRepo.save(product);
  }
}

