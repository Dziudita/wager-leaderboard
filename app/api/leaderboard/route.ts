export async function GET() {
  const users = [
    { username: "User1", total: 1000 },
    { username: "User2", total: 800 },
    { username: "User3", total: 500 }
  ];

  return Response.json(users);
}
