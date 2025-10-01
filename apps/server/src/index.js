import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db, init } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

init();

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

app.post('/api/products', (req, res) => {
  const { name, description, price_cents, image_url } = req.body;
  if (!name || !price_cents) return res.status(400).json({ error: 'name and price_cents required' });
  db.run(
    'INSERT INTO products (name, description, price_cents, image_url) VALUES (?,?,?,?)',
    [name, description || null, price_cents, image_url || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API on http://localhost:${PORT}`);
});
