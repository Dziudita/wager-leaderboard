import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Leaderboard() {
  const { data, error } = useSWR('/api/leaderboard', fetcher);

  if (error) return <div>Klaida kraunant duomenis</div>;
  if (!data) return <div>Kraunama...</div>;

  return (
    <div>
      <h1>Top 10 vartotojų mėnesio statymai</h1>
      <ul>
        {data.map((user: any, index: number) => (
          <li key={index}>
            {index + 1}. {user.name} — {user.wageredThisMonth.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
