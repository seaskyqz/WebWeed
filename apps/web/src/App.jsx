import { useEffect, useState } from 'react'
import { fetchProducts } from './api.js'
import ProductCard from './components/ProductCard.jsx'

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const onAdd = (p) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === p.id)
      if (found) return prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
  }

  const total = cart.reduce((sum, i) => sum + i.price_cents * i.qty, 0)

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>
  if (error) return <p style={{ padding: 24, color: 'crimson' }}>Error: {error}</p>

  return (
    <div style={{ maxWidth: 980, margin: '24px auto', padding: '0 16px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>Mini Shop</h1>
        <div><strong>Cart:</strong> {cart.length} items — ฿{(total/100).toFixed(2)}</div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {products.map((p) => (
          <ProductCard key={p.id} p={p} onAdd={onAdd} />
        ))}
      </div>
    </div>
  )
}
