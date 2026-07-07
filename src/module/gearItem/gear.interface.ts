import { Decimal } from "@prisma/client/runtime/client";

export interface IGearItem {
  id: string;
  photo: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: Decimal;
  stock: number;
  isActive: boolean;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}