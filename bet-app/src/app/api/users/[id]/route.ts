import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateSchema = z.object({ name: z.string().min(1).optional(), balance: z.coerce.number().nonnegative().optional() });

export async function GET(_: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id);
	const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
	if (rows.length === 0) return NextResponse.json({ error: "Nuk u gjet" }, { status: 404 });
	return NextResponse.json(rows[0]);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const json = await req.json();
		const data = updateSchema.parse(json);
		await db.update(users).set(data).where(eq(users.id, id));
		return NextResponse.json({ ok: true });
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id);
	await db.delete(users).where(eq(users.id, id));
	return NextResponse.json({ ok: true });
}


