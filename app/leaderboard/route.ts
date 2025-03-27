import { NextResponse } from 'next/server';

const API_URL = 'https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA';
const START_DATE = new Date('2025-03-17T00:00:00Z');

export async function GET() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const filtered = data.filter((entry: any) => new Date(entry.timestamp) >= START_DATE);

    const totals: Record<string, number> = {};

    filtered.forEach((entry: any) => {
      const name = entry.username || 'Unknown';
      totals[name] = (totals[name] || 0) + entry.wager;
    });

    const sorted = Object.entries(totals)
      .map(([username, total]) => ({ username, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    return NextResponse.json(sorted);
  } catch (error) {
    return NextResponse.json({ error: 'Klaida gaunant duomenis' }, { status: 500 });
  }
}