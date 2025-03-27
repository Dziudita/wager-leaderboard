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
    <div style={{ padding: '2rem' }}>
      <h1>Top 10 Mėnesio Wageris</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Vieta</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Slapyvardis</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Wager (EUR)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{user.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {user.wager.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
