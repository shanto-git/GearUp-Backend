import { Decimal } from "@prisma/client/runtime/client";

export interface IGearItem {
  photo: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: Decimal;
  stock: number;
  isActive: boolean;

  category: {
    name: string;
    slug: string;
    description?: string;
  };
}
