import { IDormRepository } from "../../../domain/repositories/IDormRepository";
import { NotFoundError } from "../../../shared/errors/NotFoundError";

export interface ListDormSellersDTO {
  dormId: string;
}

export class ListDormSellers {
  constructor(private dormRepo: IDormRepository) {}

  async execute(dto: ListDormSellersDTO) {
    const dorm = await this.dormRepo.findById(dto.dormId);
    if (!dorm) {
      throw new NotFoundError("Dorm not found");
    }

    return this.dormRepo.listSellers(dto.dormId);
  }
}

