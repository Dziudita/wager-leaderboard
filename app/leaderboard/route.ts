export async function GET() {
  try {
    const res = await fetch("https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA");
    if (!res.ok) {
      return new Response("Failed to fetch Goated API", { status: 500 });
    }

    const json = await res.json();
    const data = json.data;

    // Rūšiuojame pagal MĖNESINĮ wager'į ir paimame top 10
    const top10 = data
      .map((user: any) => ({
        name: user.name,
        wager: user.wagered.this_month,
      }))
     .sort((a: { username: string; total: number }, b: { username: string; total: number }) => b.total - a.total)
      .slice(0, 10);

    return Response.json(top10);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
