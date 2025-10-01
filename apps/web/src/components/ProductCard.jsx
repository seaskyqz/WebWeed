export default function ProductCard({ p, onAdd }) {
  const price = (p.price_cents / 100).toFixed(2);
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16 }}>
      {p.image_url && (
        <img src={p.image_url} alt={p.name} style={{ width: '100%', borderRadius: 8, aspectRatio: '3/2', objectFit: 'cover' }} />
      )}
      <h3 style={{ margin: '12px 0 4px' }}>{p.name}</h3>
      <p style={{ margin: '0 0 8px', color: '#555' }}>{p.description}</p>
      <strong>฿{price}</strong>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => onAdd(p)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
