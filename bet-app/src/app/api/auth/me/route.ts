import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyJwt } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: "Token mungon" }, { status: 401 });
    }

    const payload = verifyJwt(token);
    if (!payload) {
      return NextResponse.json({ error: "Token i pavlefshëm" }, { status: 401 });
    }

    const userRows = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        balance: users.balance,
        createdAt: users.createdAt
      })
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (userRows.length === 0) {
      return NextResponse.json({ error: "Përdoruesi nuk u gjet" }, { status: 404 });
    }

    return NextResponse.json(userRows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Gabim" }, { status: 500 });
  }
}