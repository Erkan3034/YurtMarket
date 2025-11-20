import { Dorm } from "../entities/Dorm";
import { Seller } from "../entities/Seller";

export interface IDormRepository {
  findById(id: string): Promise<Dorm | null>;
  listAll(): Promise<Dorm[]>;
  listSellers(dormId: string): Promise<Seller[]>;
}

