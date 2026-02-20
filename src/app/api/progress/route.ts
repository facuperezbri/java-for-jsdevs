import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getDb } from '@/db';
import { users, userProgress } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { AppProgress } from '@/src/types';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const row = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.clerkUserId, userId))
      .limit(1);

    const progress: AppProgress = row[0]?.progress
      ? (row[0].progress as AppProgress)
      : { modules: {} };

    return NextResponse.json(progress);
  } catch (err) {
    console.error('GET /api/progress:', err);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    console.error('POST /api/progress:', err);
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    );
  }
}
