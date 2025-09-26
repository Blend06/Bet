import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { verifyPassword, signJwt } from "@/lib/auth";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const { email, password } = schema.parse(json);
		const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
		if (rows.length === 0) return NextResponse.json({ error: "Kredenciale të pasakta" }, { status: 401 });
		const user = rows[0];
		const ok = await verifyPassword(password, user.passwordHash);
		if (!ok) return NextResponse.json({ error: "Kredenciale të pasakta" }, { status: 401 });
		const token = signJwt({ userId: user.id, email });
		return NextResponse.json({ token });
	} catch (err: any) {
		return NextResponse.json({ error: err.message ?? "Gabim" }, { status: 400 });
	}
}


