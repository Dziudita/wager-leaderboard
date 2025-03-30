'use client';

// app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA');
  const data = await res.json();

  if (!data.success) {
    return NextResponse.json({ error: 'Failed to fetch data from Goated API' }, { status: 500 });
  }

  const filtered = data.data
    .filter((user: any) => user.wagered?.this_month && user.wagered.this_month > 0)
    .sort((a: any, b: any) => b.wagered.this_month - a.wagered.this_month)
    .slice(0, 10)
    .map((user: any) => ({
      username: user.name,
      total: user.wagered.this_month,
    }));

  return NextResponse.json(filtered);
}

