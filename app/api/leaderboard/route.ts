export async function GET() {
  try {
    const res = await fetch("https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA");

    if (!res.ok) {
      return new Response("Failed to fetch Goated API", { status: 500 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
