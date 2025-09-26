# Bet App

Një aplikacion modern për baste të ndërtuar me Next.js, Drizzle ORM dhe MySQL.

## Karakteristikat

- 🔐 Autentifikim me JWT tokens
- 💰 Sistem balancash për përdoruesit
- 🎯 Vendosje bastesh në ndeshje sportive
- 📊 Historik bastesh
- 🎨 UI moderne me Tailwind CSS
- 🗄️ Database me MySQL dhe Drizzle ORM

## Teknologjitë e përdorura

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL me Drizzle ORM
- **Autentifikim**: JWT tokens
- **Styling**: Tailwind CSS

## Instalimi

1. **Klono projektin**
   ```bash
   git clone <repository-url>
   cd bet-app
   ```

2. **Instalo dependencies**
   ```bash
   pnpm install
   ```

3. **Konfiguro environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Përditëso `.env.local` me të dhënat e tua:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/bet_app"
   JWT_SECRET="your-super-secret-jwt-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Krijo databazën**
   Krijo një databazë MySQL me emrin `bet_app` (ose emrin që ke specifikuar në DATABASE_URL).

5. **Ekzekuto migrations**
   ```bash
   pnpm db:migrate
   ```

6. **Populo databazën me të dhëna demo (opsionale)**
   ```bash
   pnpm db:seed
   ```

7. **Nis aplikacionin**
   ```bash
   pnpm dev
   ```

Aplikacioni do të jetë i disponueshëm në `http://localhost:3000`.

## Kredencialet Demo

Nëse ke ekzekutuar `pnpm db:seed`, mund të përdorësh këto kredenciale:

- **Email**: demo@example.com
- **Password**: password123

## Scripts të disponueshme

- `pnpm dev` - Nis development server
- `pnpm build` - Build aplikacionin për production
- `pnpm start` - Nis production server
- `pnpm db:generate` - Gjeneron migration files
- `pnpm db:migrate` - Ekzekuton migrations
- `pnpm db:seed` - Populo databazën me të dhëna demo

## Struktura e projektit

```
src/
├── app/
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── providers/     # Context providers
│   └── ...           # Pages
├── db/
│   ├── schema.ts     # Database schema
│   └── index.ts      # Database connection
└── lib/
    ├── auth.ts       # Authentication utilities
    └── utils/        # Utility functions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Regjistrim përdoruesi
- `POST /api/auth/login` - Login përdoruesi
- `GET /api/auth/me` - Merr informacionet e përdoruesit

### Events & Odds
- `GET /api/events` - Lista e ndeshje
- `POST /api/events` - Krijo ndeshje të re
- `GET /api/odds` - Lista e odds
- `POST /api/odds` - Krijo odds të reja

### Bets
- `GET /api/bets` - Historiku i basteve
- `POST /api/bets` - Vendos bast të ri

## Kontributi

1. Fork projektin
2. Krijo një branch të ri (`git checkout -b feature/amazing-feature`)
3. Commit ndryshimet (`git commit -m 'Add some amazing feature'`)
4. Push në branch (`git push origin feature/amazing-feature`)
5. Hap një Pull Request

## Licensa

MIT License