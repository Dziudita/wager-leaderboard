export async function GET() {
  try {
    const res = await fetch(
      "https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA"
    );

    if (!res.ok) {
      return new Response("Failed to fetch Goated API", { status: 500 });
    }

    const json = await res.json();

    type GoatedUser = {
      name: string;
      wagered: {
        today: number;
        this_week: number;
        this_month: number;
        all_time: number;
      };
    };

    const data: GoatedUser[] = json.data;

    const topUsers = data
      .map((user) => ({
        name: user.name,
        wager: user.wagered.this_month,
      }))
      .sort((a, b) => b.wager - a.wager)
      .slice(0, 10);

    return Response.json(topUsers);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
