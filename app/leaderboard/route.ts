export async function GET() {
  try {
    const res = await fetch("https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA");

    if (!res.ok) {
      return new Response("Failed to fetch", { status: 500 });
    }

    const json = await res.json();
    const users: any[] = json.data || [];

    const topUsers = users
  .map((u: any) => ({
    username: u.name,
    total: u.wagered && typeof u.wagered.this_month === "number" ? u.wagered.this_month : 0
  }))
  .filter((u) => u.total > 0)
  .sort((a, b) => b.total - a.total)
  .slice(0, 10);

    return Response.json(topUsers);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
