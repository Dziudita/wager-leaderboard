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

    // Rankiniu būdu suvesti 1–16 d. wageriai iš screenshotų
    const firstTwoWeeks = [
      { name: "NotGemini", wager: 125011.58 },
      { name: "Millyoo", wager: 49988.53 },
      { name: "Frankthetank2356", wager: 18467.33 },
      { name: "AboutToBust", wager: 5290.11 },
      { name: "Error404", wager: 5139.81 },
      { name: "Dzïïï", wager: 3587.36 }, // Patikrink vardo tikslumą iš API!
      { name: "DevDestroys", wager: 790.98 }
    ];

    // Mėnesinis wageris iš API
    const topUsers = users
      .map((u) => {
        const wager = u.wagered?.this_month ?? 0;
        const previous = firstTwoWeeks.find(p => p.name === u.name);
        const adjustedWager = wager - (previous?.wager ?? 0);

        return {
          username: u.name ?? "Nežinomas",
          total: typeof adjustedWager === "number" ? Math.max(adjustedWager, 0) : 0,
        };
      })
      .filter((u) => u.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    return Response.json(topUsers);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
