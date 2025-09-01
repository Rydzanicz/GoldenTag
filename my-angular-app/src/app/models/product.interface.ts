export interface Product {
  id: number;
  name: string;
  description: string;
  descriptionDetails?: string;
  price: number;
  originalPrice?: number;
  image: string[];
  category?: string;
  badge?: string;
  materials?: string;
  rating?: number;
  ratingCount?: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  materials?: string;
  quantity: number;
}
