// app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA');
    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      return NextResponse.json({ error: 'Invalid API response' }, { status: 500 });
    }

    const filtered = json.data
      .filter((user: any) => user?.wagered?.this_month > 0)
      .sort((a: any, b: any) => b.wagered.this_month - a.wagered.this_month)
      .slice(0, 10)
      .map((user: any) => ({
        username: user.name,
        total: user.wagered.this_month,
      }));

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json({ error: 'API fetch failed' }, { status: 500 });
  }
}
