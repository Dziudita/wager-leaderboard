export async function GET() {
  return Response.json([
    { username: 'TestUser1', total: 1234 },
    { username: 'TestUser2', total: 5678 },
  ]);
}
