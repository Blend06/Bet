import { NextResponse } from "next/server";
import { db } from "@/db";
import { odds } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    let query = db.select().from(odds);
    
    if (eventId) {
      query = query.where(eq(odds.eventId, parseInt(eventId)));
    }

    const result = await query;
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Gabim" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { eventId, description, oddValue } = await req.json();
    
    const [newOdd] = await db
      .insert(odds)
      .values({
        eventId,
        description,
        oddValue,
      })
      .returning();

    return NextResponse.json(newOdd, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Gabim" }, { status: 500 });
  }
}