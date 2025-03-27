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
        const filtered = data.users
          .filter((u: any) => typeof u.total === 'number')
          .sort((a: User, b: User) => b.total - a.total)
          .slice(0, 10);

        setUsers(filtered);
      })
      .catch((err) => {
        setError('Klaida kraunant duomenis: ' + err.message);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Leaderboard</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>#</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Vartotojas</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Mėnesinis wageris</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.username}>
                <td style={{ padding: '0.5rem' }}>{index + 1}</td>
                <td style={{ padding: '0.5rem' }}>{user.username}</td>
                <td style={{ padding: '0.5rem' }}>{user.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
