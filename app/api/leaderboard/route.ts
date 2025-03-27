export async function GET() {
  try {
    const res = await fetch("https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA");
    if (!res.ok) {
      return new Response("Failed to fetch Goated API", { status: 500 });
    }

    const data = await res.json();

    // Rūšiuojame vartotojus pagal mėnesio statymų sumą mažėjančia tvarka
    const sortedUsers = data.data
      .map((user: any) => ({
        name: user.name,
        wageredThisMonth: user.wagered.this_month || 0
      }))
      .sort((a, b) => b.wageredThisMonth - a.wageredThisMonth)
      .slice(0, 10); // Pasirenkame Top 10 vartotojų

    return new Response(JSON.stringify(sortedUsers), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
