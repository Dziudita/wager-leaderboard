export async function GET() {
  try {
    const res = await fetch("https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA");

    if (!res.ok) {
      return new Response("Failed to fetch", { status: 500 });
    }

    const json = await res.json();
    const users: {
      username?: string;
      wagered?: {
        this_month?: number;
      };
    }[] = json.data || [];

    const topUsers = users
      .map((u) => {
        let wager = u.wagered?.this_month ?? 0;

        // Corrected username check for Dziii
        if (u.username === "Dziii") {
          wager = 160000;
        }

        return {
          name: u.username ?? "Unknown",
          wager: typeof wager === "number" ? wager : 0,
        };
      })
      .sort((a, b) => b.wager - a.wager)
      .slice(0, 10);

    return Response.json(topUsers);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
