import { randomUUID } from "crypto";
import { Product } from "../../../domain/entities/Product";
import { ISellerRepository } from "../../../domain/repositories/ISellerRepository";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { Price } from "../../../domain/valueObjects/Price";
import { Quantity } from "../../../domain/valueObjects/Quantity";
import { DomainError } from "../../../shared/errors/DomainError";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export interface AddProductDTO {
  sellerId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId?: string;
}

export class AddProduct {
  constructor(private productRepo: IProductRepository, private sellerRepo: ISellerRepository) {}

  async execute(dto: AddProductDTO) {
    const seller = await this.sellerRepo.findById(dto.sellerId);
    if (!seller) {
      throw new NotFoundError("Seller not found");
    }

    const productCount = await this.productRepo.countBySeller(dto.sellerId);
    const hasPremium = await this.sellerRepo.hasPremiumPlan(dto.sellerId);

    if (!hasPremium && productCount >= 3) {
      throw new DomainError("Free listing limit reached");
    }

    const product = Product.create({
      id: randomUUID(),
      sellerId: dto.sellerId,
      name: dto.name,
      description: dto.description,
      price: Price.create(dto.price),
      stock: Quantity.create(dto.stock),
      categoryId: dto.categoryId,
    });

    return this.productRepo.create(product);
  }
}

