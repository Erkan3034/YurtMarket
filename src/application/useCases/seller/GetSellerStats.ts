import { ISellerRepository } from "../../../domain/repositories/ISellerRepository";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export interface GetSellerStatsDTO {
  sellerId: string;
}

export class GetSellerStats {
  constructor(private sellerRepo: ISellerRepository) {}

  async execute(dto: GetSellerStatsDTO) {
    const seller = await this.sellerRepo.findById(dto.sellerId);
    if (!seller) {
      throw new NotFoundError("Seller not found");
    }

    return this.sellerRepo.getStats(dto.sellerId);
  }
}

