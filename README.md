# WebWeed — Full‑Stack Shop (Web + API + Mobile)

This is a learning project with three apps:
- **API**: Node.js + Express + SQLite (`apps/server`)
- **Web**: React + Vite (`apps/web`)
- **Mobile**: Expo React Native (`apps/mobile`)

## Run
### API
```bash
cd apps/server
npm install
npm run seed
npm run dev
```

### Web
```bash
cd apps/web
npm install
echo VITE_API_BASE=http://localhost:4000 > .env
npm run dev
```

### Mobile
```bash
cd apps/mobile
npm install
npm start
```
> On Android emulator use API base `http://10.0.2.2:4000`.
