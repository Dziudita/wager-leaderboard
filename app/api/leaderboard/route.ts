'use client';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA');
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }

    const data = await response.json();

    const filtered = data.data
      .filter((user: any) => user.wagered?.this_month && user.wagered.this_month > 0)
      .map((user: any) => ({
        username: user.name,
        total: user.wagered.this_month,
      }))
      .sort((a: any, b: any) => b.total - a.total)
      .slice(0, 10);

    return NextResponse.json(filtered);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to load leaderboard' }, { status: 500 });
  }
}
