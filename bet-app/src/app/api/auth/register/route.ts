import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { hashPassword, signJwt } from "@/lib/auth";

const schema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
});

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const { name, email, password } = schema.parse(json);

		const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
		if (existing.length > 0) {
			return NextResponse.json({ error: "Email ekziston" }, { status: 409 });
		}

		const passwordHash = await hashPassword(password);
		const result = await db.insert(users).values({ name, email, passwordHash }).execute();
		// mysql2 result contains insertId
		const userId = (result as any).insertId as number;
		const token = signJwt({ userId, email });
		return NextResponse.json({ token }, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message ?? "Gabim" }, { status: 400 });
	}
}


