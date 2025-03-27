export async function GET() {
  const users = [
    { username: 'User1', total: 1234.56 },
    { username: 'User2', total: 987.65 },
    { username: 'User3', total: 654.32 },
  ];

  return Response.json(users);
}
