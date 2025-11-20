import { prisma } from "../database/prismaClient";
import { IProductRepository, ListProductFilters } from "../../domain/repositories/IProductRepository";
import { Product } from "../../domain/entities/Product";
import { Price } from "../../domain/valueObjects/Price";
import { Quantity } from "../../domain/valueObjects/Quantity";

type ProductRecord = Awaited<ReturnType<typeof prisma.product.findUnique>>;

export class PrismaProductRepository implements IProductRepository {
  async create(product: Product) {
    await prisma.product.create({ data: this.toPersistence(product) });
    return product;
  }

  async save(product: Product) {
    const data = this.toPersistence(product);
    await prisma.product.update({ where: { id: data.id }, data });
    return product;
  }

  async delete(id: string) {
    await prisma.product.delete({ where: { id } });
  }

  async findById(id: string) {
    const record = await prisma.product.findUnique({ where: { id } });
    return record ? this.toDomain(record) : null;
  }

  async list(filters: ListProductFilters) {
    const records = await prisma.product.findMany({
      where: {
        sellerId: filters.sellerId,
        categoryId: filters.category,
        seller: filters.dormId ? { user: { dormId: filters.dormId } } : undefined,
        isActive: filters.isActive,
      },
      orderBy: { createdAt: "desc" },
    });

    return records.map((record) => this.toDomain(record as NonNullable<ProductRecord>));
  }

  async countBySeller(sellerId: string) {
    return prisma.product.count({ where: { sellerId, isActive: true } });
  }

  private toPersistence(product: Product) {
    const json = product.toJSON();
    return {
      id: json.id,
      sellerId: json.sellerId,
      name: json.name,
      description: json.description,
      price: json.price,
      stock: json.stock,
      isActive: json.isActive,
      categoryId: json.categoryId,
    };
  }

  private toDomain(record: NonNullable<ProductRecord>) {
    return Product.create({
      id: record.id,
      sellerId: record.sellerId,
      name: record.name,
      description: record.description,
      price: Price.create(record.price),
      stock: Quantity.create(record.stock),
      isActive: record.isActive,
      categoryId: record.categoryId ?? undefined,
      createdAt: record.createdAt ?? undefined,
    });
  }
}

