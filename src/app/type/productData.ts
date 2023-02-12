export interface ProductData {
  productId: undefined | number;
  id: number
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  quantity: undefined | number;
}

export interface cartItem {
  id: number;
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  quantity: undefined | number;
  userId: number;
  productId: number;
}
export interface priceSummary {
  price: number;
  tax: number;
  delivery: number;
  discount: number;
  total: number;
}
