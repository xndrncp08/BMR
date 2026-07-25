export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stockQuantity: number;
  imageUrl: string | null;
  createdAt?: string;
  updatedAt?: string;
}