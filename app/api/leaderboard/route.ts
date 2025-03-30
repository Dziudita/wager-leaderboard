import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA');

    if (!res.ok) {
      throw new Error('Failed to fetch external leaderboard data');
    }

    const data = await res.json();

    // Filtruojame KOVO mėnesio duomenis (pradedant nuo kovo 1 d.)
    const marchStart = new Date('2024-03-01T00:00:00Z');
    const filtered = data?.data?.filter((user: any) => {
      const createdAt = new Date(user.createdAt);
      return createdAt >= marchStart;
    });

    // Surūšiuojame pagal total nusileidžiančiai
    const sorted = filtered.sort((a: any, b: any) => b.total - a.total);

    return NextResponse.json(sorted);
  } catch (error) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: 'API error' }, { status: 500 });
  }
}

