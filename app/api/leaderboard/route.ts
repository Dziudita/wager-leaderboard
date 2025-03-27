export async function GET() {
  try {
    const res = await fetch("https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA");
    if (!res.ok) {
      return new Response("Failed to fetch Goated API", { status: 500 });
    }

    const result = await res.json();

    // Kovo 17-osios data kaip UNIX timestamp (milisekundėmis)
    const cutoffDate = new Date("2024-03-17").getTime();

    const filteredData = result.data.map((user: any) => {
      // Jei yra data logika iš API, naudoti čia
      return {
        name: user.name,
        total: user.wagered.all_time // arba pakeisk į user.wagered.since_march_17 jei būtų toks
      };
    })
    .sort((a: any, b: any) => b.total - a.total)
    .slice(0, 10);

    return Response.json(filteredData);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
