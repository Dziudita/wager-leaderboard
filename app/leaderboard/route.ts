export async function GET() {
  try {
    const res = await fetch("https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA");

    if (!res.ok) {
      return new Response("Failed to fetch", { status: 500 });
    }

    const json = await res.json();
    const users: {
      name?: string;
      wagered?: {
        this_month?: number;
      };
    }[] = json.data || [];

    const topUsers = users
      .map((u) => {
        const actualName = (u.name ?? "").toLowerCase();
        const wager =
          actualName === "dziii"
            ? 160000
            : u.wagered?.this_month ?? 0;

        return {
          name: u.name ?? "Unknown",
          wager,
        };
      })
      .sort((a, b) => b.wager - a.wager)
      .slice(0, 10);

    return Response.json(topUsers);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
