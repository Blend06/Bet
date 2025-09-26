import { NextResponse } from "next/server";
import { db } from "@/db";
import { bets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({ status: z.enum(["pending", "won", "lost"]).optional() });

export async function GET(_: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id);
	const rows = await db.select().from(bets).where(eq(bets.id, id)).limit(1);
	if (rows.length === 0) return NextResponse.json({ error: "Nuk u gjet" }, { status: 404 });
	return NextResponse.json(rows[0]);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		const json = schema.parse(await req.json());
		await db.update(bets).set(json).where(eq(bets.id, id));
		return NextResponse.json({ ok: true });
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 400 });
	}
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
	const id = Number(params.id);
	await db.delete(bets).where(eq(bets.id, id));
	return NextResponse.json({ ok: true });
}


