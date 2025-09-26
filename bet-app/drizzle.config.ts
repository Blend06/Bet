import type { Config } from "drizzle-kit";

export default {
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	dialect: "mysql",
	dbCredentials: {
		host: "127.0.0.1",
		port: 3306,
		user: "bet_user",
		password: "bet123",
		database: "bet_app",
	},
} satisfies Config;


