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
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  quantity: number;
  size?: string;
  color?: string;
  tagShape?: string;
  frontText?: string;
  backText?: string;
  badge?: string;
  weight?: string;
  dimensions?: string;
}

export interface OrderData {
  buyerName: string;
  buyerAddressEmail: string;
  buyerAddress: string;
  buyerNip?: string;
  buyerPhone: string;
  acceptedTerms: boolean;
  orderNote?: string;
  orderDate: string;
  orderTimestamp: number;
  orderNumber: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  orders: CartItem[];
  orderSummary: {
    totalItems: number;
    uniqueProducts: number;
    hasPersonalizedItems: boolean;
    averageItemPrice: number;
    shippingMethod: string;
    paymentMethod: string;
  };
  browserInfo?: any;
  orderSource: string;
}
