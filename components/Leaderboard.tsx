'use client';
import { useEffect, useState } from 'react';

type User = {
  username: string;
  total: number;
};

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => {
        if (!res.ok) throw new Error('Klaida iš API');
        return res.json();
      })
      .then((data) => setUsers(data || []))
      .catch((err) => setError('Klaida kraunant duomenis: ' + err.message));
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Leaderboard</h1>
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users
            .sort((a, b) => b.total - a.total)
            .slice(0, 10)
            .map((user, i) => (
              <li key={i}>
                {i + 1}. {user.username} — {user.total.toFixed(2)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
