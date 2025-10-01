import { db, init } from './db.js';

init();

const products = [
  { name: 'Classic Tee', description: 'Soft cotton tee for everyday wear', price_cents: 29900, image_url: 'https://picsum.photos/seed/tee/600/400' },
  { name: 'Canvas Tote', description: 'Reusable bag for groceries and books', price_cents: 19900, image_url: 'https://picsum.photos/seed/tote/600/400' },
  { name: 'Water Bottle 750ml', description: 'BPA‑free bottle, keeps water cool', price_cents: 25900, image_url: 'https://picsum.photos/seed/bottle/600/400' }
];

function insertProducts(items) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO products (name, description, price_cents, image_url) VALUES (?,?,?,?)`);
    for (const p of items) {
      stmt.run(p.name, p.description, p.price_cents, p.image_url);
    }
    stmt.finalize((err) => (err ? reject(err) : resolve()));
  });
}

insertProducts(products)
  .then(() => console.log('Seed complete'))
  .catch((e) => console.error(e))
  .finally(() => db.close());
