export interface ProductData {
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
  id: number
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
