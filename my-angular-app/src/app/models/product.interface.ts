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
  rating?: number;
  ratingCount?: number;
  isInWishlist?: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
}
