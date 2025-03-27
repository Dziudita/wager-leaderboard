export async function GET() {
  try {
    const res = await fetch("https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA");

    if (!res.ok) {
      return new Response("Failed to fetch Goated API", { status: 500 });
    }

    const json = await res.json();

    // Grąžiname tik reikalingus duomenis
    const leaderboard = json.data.map((user: any) => ({
      username: user.name,
      total: user.wagered?.all_time || 0
    }));

    return Response.json(leaderboard);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
