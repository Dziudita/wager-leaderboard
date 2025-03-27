import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA');
    if (!res.ok) {
      return NextResponse.json({ error: 'Nepavyko gauti duomenų iš Goated API' }, { status: 500 });
    }

    const data = await res.json();

    // Apdorojame ir rūšiuojame vartotojus pagal mėnesinius statymus mažėjančia tvarka
    const sortedUsers = data.data
      .map((user: any) => ({
        name: user.name,
        wageredThisMonth: user.wagered.this_month || 0,
      }))
      .sort((a, b) => b.wageredThisMonth - a.wageredThisMonth)
      .slice(0, 10); // Pasirenkame Top 10 vartotojų

    return NextResponse.json(sortedUsers);
  } catch (error) {
    return NextResponse.json({ error: 'Serverio klaida' }, { status: 500 });
  }
}
