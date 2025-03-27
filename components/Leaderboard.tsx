'use client';

import { useEffect, useState } from 'react';

type User = {
  name: string;
  wager: number;
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
      .then((data) => setUsers(data))
      .catch((err) => setError('Klaida kraunant duomenis: ' + err.message));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Leaderboard</h1>
      <ol>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} — {user.wager.toFixed(2)}
          </li>
        ))}
      </ol>
    </div>
  );
}
