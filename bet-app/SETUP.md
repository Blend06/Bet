# Setup Instructions

## 1. MySQL Setup

Hap MySQL Workbench dhe ekzekuto këto komanda:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS bet_app;

-- Create user
CREATE USER IF NOT EXISTS 'bet_user'@'localhost' IDENTIFIED BY 'bet123';
CREATE USER IF NOT EXISTS 'bet_user'@'127.0.0.1' IDENTIFIED BY 'bet123';

-- Grant privileges
GRANT ALL PRIVILEGES ON bet_app.* TO 'bet_user'@'localhost';
GRANT ALL PRIVILEGES ON bet_app.* TO 'bet_user'@'127.0.0.1';

-- Flush privileges
FLUSH PRIVILEGES;
```

## 2. Run Migrations

Pas krijimit të user-it, ekzekuto:

```bash
pnpm db:migrate-manual
```

## 3. Seed Database

```bash
pnpm db:seed
```

## 4. Start Application

```bash
pnpm dev
```

## Demo Credentials

- Email: demo@example.com
- Password: password123

## Environment Variables

Sigurohu që `.env` file ka këto vlera:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bet_app
DB_USERNAME=bet_user
DB_PASSWORD=bet123
DATABASE_URL="mysql://bet_user:bet123@127.0.0.1:3306/bet_app"
JWT_SECRET="3e62192b51fe436f8e2ef31ef5f6d7803a3b5b03e2b00694b1484e38f47c46e0400d425df7f76060785b7172bdcb1409f4c5195ba0c3299df0a7b9fd9882f19a"
NEXTAUTH_URL="http://localhost:3000"
```