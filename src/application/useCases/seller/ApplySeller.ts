import { randomUUID } from "crypto";
import { Seller } from "../../../domain/entities/Seller";
import { ISellerRepository } from "../../../domain/repositories/ISellerRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { DomainError } from "../../../shared/errors/DomainError";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export interface ApplySellerDTO {
  userId: string;
  pitch?: string;
}

export class ApplySeller {
  constructor(private sellerRepo: ISellerRepository, private userRepo: IUserRepository) {}

  async execute(dto: ApplySellerDTO) {
    const user = await this.userRepo.findById(dto.userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const existing = await this.sellerRepo.findByUserId(dto.userId);
    if (existing) {
      throw new DomainError("Seller application already exists");
    }

    const seller = Seller.create({
      id: randomUUID(),
      userId: dto.userId,
      status: "pending",
      totalSales: 0,
      ratingAvg: 0,
    });

    return this.sellerRepo.create(seller);
  }
}

