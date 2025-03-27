export async function GET() {
  try {
    const res = await fetch('https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA');

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'API klaida' }), { status: 500 });
    }

    const data = await res.json();

    // Pritaikom prie mūsų struktūros
    const users = data.map((user: any) => ({
      username: user.username,
      total: user.total_wagered,
    }));

    return Response.json(users);
  } catch (error) {
    console.error('Goated API klaida:', error);
    return new Response(JSON.stringify({ error: 'Serverio klaida' }), { status: 500 });
  }
}
