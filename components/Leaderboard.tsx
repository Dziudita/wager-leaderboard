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
    fetch('https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA')
      .then((res) => {
        if (!res.ok) throw new Error('Klaida gaunant duomenis');
        return res.json();
      })
      .then((data) => {
        // Pritaikyk, jei struktūra skiriasi
        setUsers(data?.users || []);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) return <div>Klaida kraunant duomenis: {error}</div>;

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username} - {user.total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
