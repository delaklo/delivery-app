export interface Shop {
  _id: string; name: string; description: string;
  imageUrl: string; category: string; rating: number; createdAt: string;
}
export interface Product {
  _id: string; shopId: string; name: string; description: string;
  price: number; imageUrl: string; category: string;
}
export interface CartItem { product: Product; quantity: number; }
export interface CartState { items: CartItem[]; shopId: string | null; shopName: string | null; }
export interface OrderFormData { name: string; email: string; phone: string; address: string; }
export interface OrderPayload extends OrderFormData {
  items: { productId: string; name: string; price: number; quantity: number; imageUrl: string; }[];
  totalPrice: number; shopId: string; shopName: string;
}
export interface Order {
  _id: string; name: string; email: string; phone: string; address: string;
  items: { productId: string; name: string; price: number; quantity: number; imageUrl: string; }[];
  totalPrice: number; shopId: string; shopName: string; status: string; createdAt: string;
}
