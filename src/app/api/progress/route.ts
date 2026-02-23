import { getDb } from "@/db";
import { userProgress, users } from "@/db/schema";
import { migrateProgress } from "@/src/lib/progress-migration";
import type { AppProgress } from "@/src/types";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();
    const row = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.clerkUserId, userId))
      .limit(1);

    const raw = row[0]?.progress as Record<string, unknown> | undefined;
    const progress: AppProgress = raw ? migrateProgress(raw) : { paths: {} };

    return NextResponse.json(progress);
  } catch (err) {
    console.error("GET /api/progress:", err);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as AppProgress;

    const db = getDb();
    await db
      .insert(users)
      .values({
        clerkUserId: userId,
        createdAt: new Date(),
      })
      .onConflictDoNothing();

    await db
      .insert(userProgress)
      .values({
        clerkUserId: userId,
        progress: body,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: userProgress.clerkUserId,
        set: {
          progress: body,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/progress:", err);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}
