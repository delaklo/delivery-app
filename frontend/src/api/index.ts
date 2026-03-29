import { Shop, Product, OrderPayload, Order } from '../types';
const BASE = import.meta.env.VITE_API_URL || '/api';

async function req<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...opts });
  if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.message || 'Request failed'); }
  return res.json();
}

export interface Pagination { page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrev: boolean; }
export interface ProductsResponse { products: Product[]; pagination: Pagination; }

export const api = {
  getShops: () => req<Shop[]>('/shops'),
  getProducts: (shopId: string, params: { page?: number; limit?: number; category?: string; sort?: string }) => {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.limit) qs.set('limit', String(params.limit));
    if (params.category) qs.set('category', params.category);
    if (params.sort) qs.set('sort', params.sort);
    return req<ProductsResponse>(`/shops/${shopId}/products?${qs}`);
  },
  createOrder: (data: OrderPayload) =>
    req<{ message: string; order: { _id: string } }>('/orders', { method: 'POST', body: JSON.stringify(data) }),
  searchOrders: (params: { email?: string; phone?: string; orderId?: string }) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]);
    return req<Order[]>(`/orders/search?${qs}`);
  },
};
