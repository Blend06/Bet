import { mysqlTable, serial, varchar, datetime, int, decimal, mysqlEnum, index } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

// Users
export const users = mysqlTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 191 }).notNull(),
	email: varchar("email", { length: 191 }).notNull().unique(),
	passwordHash: varchar("password_hash", { length: 191 }).notNull(),
	balance: decimal("balance", { precision: 12, scale: 2 }).notNull().default("0.00"),
	createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Events
export const events = mysqlTable("events", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	startTime: datetime("start_time").notNull(),
	status: mysqlEnum("status", ["upcoming", "finished"]).notNull().default("upcoming"),
	category: varchar("category", { length: 100 }),
	createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// Odds (Outcomes)
export const odds = mysqlTable("odds", {
	id: serial("id").primaryKey(),
	eventId: int("event_id").notNull(),
	description: varchar("description", { length: 255 }).notNull(),
	oddValue: decimal("odd_value", { precision: 8, scale: 2 }).notNull(),
	createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => ({
	eventIdx: index("odds_event_id_idx").on(table.eventId),
}));

// Bets
export const bets = mysqlTable("bets", {
	id: serial("id").primaryKey(),
	userId: int("user_id").notNull(),
	oddId: int("odd_id").notNull(),
	stake: decimal("stake", { precision: 12, scale: 2 }).notNull(),
	potentialPayout: decimal("potential_payout", { precision: 12, scale: 2 }).notNull(),
	status: mysqlEnum("status", ["pending", "won", "lost"]).notNull().default("pending"),
	createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => ({
	userIdx: index("bets_user_id_idx").on(table.userId),
	oddIdx: index("bets_odd_id_idx").on(table.oddId),
}));

// Transactions (optional)
export const transactions = mysqlTable("transactions", {
	id: serial("id").primaryKey(),
	userId: int("user_id").notNull(),
	type: mysqlEnum("type", ["deposit", "withdraw"]).notNull(),
	amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
	timestamp: datetime("timestamp").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
	userIdx: index("transactions_user_id_idx").on(table.userId),
}));


