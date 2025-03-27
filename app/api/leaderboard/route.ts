export async function GET() {
  try {
    const res = await fetch("https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA");
    if (!res.ok) {
      return new Response("Failed to fetch Goated API", { status: 500 });
    }

    const raw = await res.json();

    // Filtruojame ir rūšiuojame pagal this_month
    const filtered = raw.data
      .map((user: any) => ({
        name: user.name,
        wager: user.wagered?.this_month || 0
      }))
      .filter(user => user.wager > 0)
      .sort((a, b) => b.wager - a.wager)
      .slice(0, 10);

    return Response.json(filtered);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
