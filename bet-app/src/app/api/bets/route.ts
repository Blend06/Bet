import { NextResponse } from "next/server";
import { db } from "@/db";
import { bets, users, odds } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
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

    const userBets = await db
      .select({
        id: bets.id,
        stake: bets.stake,
        potentialPayout: bets.potentialPayout,
        status: bets.status,
        createdAt: bets.createdAt,
        oddDescription: odds.description,
        oddValue: odds.oddValue,
      })
      .from(bets)
      .leftJoin(odds, eq(bets.oddId, odds.id))
      .where(eq(bets.userId, payload.userId))
      .orderBy(desc(bets.createdAt));

    return NextResponse.json(userBets);
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Gabim" }, { status: 500 });
  }
}

export async function POST(req: Request) {
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

    const { oddId, stake } = await req.json();

    // Get the odd to calculate potential payout
    const [odd] = await db
      .select()
      .from(odds)
      .where(eq(odds.id, oddId))
      .limit(1);

    if (!odd) {
      return NextResponse.json({ error: "Odd nuk u gjet" }, { status: 404 });
    }

    // Check user balance
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "Përdoruesi nuk u gjet" }, { status: 404 });
    }

    if (parseFloat(user.balance) < stake) {
      return NextResponse.json({ error: "Balanca e pamjaftueshme" }, { status: 400 });
    }

    const potentialPayout = stake * parseFloat(odd.oddValue);

    // Create bet and update user balance in a transaction
    await db.transaction(async (tx) => {
      // Create the bet
      await tx.insert(bets).values({
        userId: payload.userId,
        oddId: oddId,
        stake: stake.toString(),
        potentialPayout: potentialPayout.toString(),
      });

      // Update user balance
      await tx
        .update(users)
        .set({
          balance: (parseFloat(user.balance) - stake).toFixed(2)
        })
        .where(eq(users.id, payload.userId));
    });

    return NextResponse.json({
      message: "Basti u vendos me sukses",
      potentialPayout
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Gabim" }, { status: 500 });
  }
}