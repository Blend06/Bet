import { NextResponse } from "next/server";
import { db } from "@/db";
import { events, odds } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const eventsWithOdds = await db
      .select({
        id: events.id,
        name: events.name,
        startTime: events.startTime,
        status: events.status,
        category: events.category,
      })
      .from(events)
      .where(eq(events.status, "upcoming"));

    // Get odds for each event
    const eventsWithOddsData = await Promise.all(
      eventsWithOdds.map(async (event) => {
        const eventOdds = await db
          .select()
          .from(odds)
          .where(eq(odds.eventId, event.id));

        return {
          ...event,
          odds: eventOdds,
        };
      })
    );

    return NextResponse.json(eventsWithOddsData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Gabim" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, startTime, category } = await req.json();
    
    const [newEvent] = await db
      .insert(events)
      .values({
        name,
        startTime: new Date(startTime),
        category,
      })
      .returning();

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Gabim" }, { status: 500 });
  }
}