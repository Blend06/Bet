import { NextResponse } from "next/server";
import { db } from "@/db";
import { transactions, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({ userId: z.number(), type: z.enum(["deposit", "withdraw"]), amount: z.number().positive() });

export async function GET() {
	const rows = await db.select().from(transactions);
	return NextResponse.json(rows);
}

export async function POST(req: Request) {
	try {
		const body = schema.parse(await req.json());
		const [user] = await db.select().from(users).where(eq(users.id, body.userId)).limit(1);
		if (!user) return NextResponse.json({ error: "User jo valid" }, { status: 400 });
		// Update balance atomically-ish: insert tx then update balance
		await db.insert(transactions).values({ userId: body.userId, type: body.type, amount: String(body.amount) as any }).execute();
		const newBalance = body.type === "deposit" ? Number(user.balance) + body.amount : Number(user.balance) - body.amount;
		if (newBalance < 0) return NextResponse.json({ error: "Fonde të pamjaftueshme" }, { status: 400 });
		await db.update(users).set({ balance: String(newBalance) as any }).where(eq(users.id, body.userId));
		return NextResponse.json({ balance: newBalance }, { status: 201 });
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
}


