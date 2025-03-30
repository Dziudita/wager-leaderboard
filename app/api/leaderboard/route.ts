import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA');

    if (!res.ok) {
      throw new Error('Failed to fetch leaderboard');
    }

    const json = await res.json();

    // Filtruojame tik vartotojus, kurie turi wager šį mėnesį
    const filtered = json.data.filter((user: any) => user.wagered?.this_month > 0);

    // Rikiuojame nuo didžiausio prie mažiausio
    const sorted = filtered.sort((a: any, b: any) => b.wagered.this_month - a.wagered.this_month);

    // Grąžinam top 10
    const top10 = sorted.slice(0, 10);

    return NextResponse.json(top10);
  } catch (error) {
    console.error('API ERROR:', error);
    return NextResponse.json({ error: 'API error' }, { status: 500 });
  }
}
