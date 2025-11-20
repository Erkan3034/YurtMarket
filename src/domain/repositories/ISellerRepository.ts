import { Seller } from "../entities/Seller";

export interface SellerStats {
  totalSales: number;
  ratingAvg: number;
  productCount: number;
}

export interface ISellerRepository {
  create(seller: Seller): Promise<Seller>;
  save(seller: Seller): Promise<Seller>;
  findById(id: string): Promise<Seller | null>;
  findByUserId(userId: string): Promise<Seller | null>;
  listPopular(): Promise<Seller[]>;
  getStats(sellerId: string): Promise<SellerStats | null>;
  hasPremiumPlan(sellerId: string): Promise<boolean>;
}

