export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
