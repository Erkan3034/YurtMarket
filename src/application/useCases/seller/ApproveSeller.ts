import { ISellerRepository } from "../../../domain/repositories/ISellerRepository";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export interface ApproveSellerDTO {
  sellerId: string;
  status: "approved" | "rejected";
}

export class ApproveSeller {
  constructor(private sellerRepo: ISellerRepository) {}

  async execute(dto: ApproveSellerDTO) {
    const seller = await this.sellerRepo.findById(dto.sellerId);

    if (!seller) {
      throw new NotFoundError("Seller not found");
    }

    seller.updateStatus(dto.status);
    return this.sellerRepo.save(seller);
  }
}

