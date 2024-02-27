export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  brand: string;
  description: string;
  inStock: boolean;
  fastDelivery: boolean;
  rating: number;
  quantity: number[];
  thumbnail: string;
  discountPercentage: number;
  stock: number;
  category: string;
}
