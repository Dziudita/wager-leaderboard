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
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        setError(`Klaida kraunant duomenis: ${err.message}`);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Leaderboard
      </h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>#</th>
            <th style={{ textAlign: 'left' }}>Username</th>
            <th style={{ textAlign: 'left' }}>Monthly Wager</th>
          </tr>
        </thead>
        <tbody>
          users.map((user) => (
  <div key={user.username}>
    {user.username} — {typeof user.total === 'number' ? user.total.toFixed(2) : 'N/A'}
  </div>
))
            <tr key={idx}>
              <td style={{ padding: '0.5rem 0' }}>{idx + 1}</td>
              <td>{user.username}</td>
              <td>{user.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
