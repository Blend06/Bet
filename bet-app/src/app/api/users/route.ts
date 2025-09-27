import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const createSchema = z.object({ name: z.string().min(1), email: z.string().email(), passwordHash: z.string().min(6), balance: z.coerce.number().nonnegative().optional() });

export async function GET() {
	const rows = await db.select().from(users);
	return NextResponse.json(rows);
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const data = createSchema.parse(body);
		const result = await db.insert(users).values({
			name: data.name,
			email: data.email,
			passwordHash: data.passwordHash,
			balance: data.balance ?? "0.00",
		}).execute();
		return NextResponse.json({ id: (result as any).insertId }, { status: 201 });
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
}