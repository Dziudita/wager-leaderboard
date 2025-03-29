// app/api/proxy/route.ts

export async function GET() {
  try {
    const response = await fetch('https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // svarbu, kad visada būtų švieži duomenys
    });

    if (!response.ok) {
      return new Response(`Goated API error: ${response.statusText}`, {
        status: response.status,
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(`Fetch failed: ${error.message || 'Unknown error'}`, {
      status: 500,
    });
  }
}
