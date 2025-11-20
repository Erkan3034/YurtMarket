import api from "./api-client";
import { AuthUser } from "@/store/auth-store";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  dormId: string;
  roomNumber?: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ProductPayload {
  sellerId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId?: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await api.post<AuthUser>("/auth/register", payload);
  return data;
};

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post<{ user: AuthUser; session: { accessToken: string; refreshToken?: string } }>(
    "/auth/login",
    payload,
  );
  return data;
};

export const fetchDorms = async () => {
  const { data } = await api.get<Array<{ id: string; name: string; location?: string }>>("/dorm/list");
  return data;
};

export const applySeller = async (userId: string) => {
  const { data } = await api.post("/seller/apply", { userId });
  return data;
};

export const fetchPopularSellers = async () => {
  const { data } = await api.get<Array<{ id: string; status: string; totalSales: number; ratingAvg: number }>>(
    "/seller/popular",
  );
  return data;
};

export const fetchProducts = async (params?: { dormId?: string; category?: string }) => {
  const { data } = await api.get<
    Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      stock: number;
      isActive: boolean;
      sellerId: string;
    }>
  >("/product", { params });
  return data;
};

export const createProduct = async (payload: ProductPayload) => {
  const { data } = await api.post("/product", payload);
  return data;
};

