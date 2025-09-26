import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("Missing DATABASE_URL environment variable");
}

export const pool = mysql.createPool(databaseUrl);
export const db = drizzle(pool);


