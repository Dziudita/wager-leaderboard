'use client';

import { useEffect, useState } from 'react';

type User = {
  username: string;
  total: number;
  timestamp?: number;
};

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/proxy')
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data: User[]) => {
        const marchStart = new Date('2025-03-01T00:00:00Z').getTime();
        const marchEnd = new Date('2025-04-01T00:00:00Z').getTime();

        const filtered = data.filter((user) => {
          const time = user.timestamp || 0;
          return time >= marchStart && time < marchEnd;
        });

        const sorted = filtered.sort((a, b) => b.total - a.total).slice(0, 10);
        setUsers(sorted);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#000',
        color: '#FFD700',
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
        Johnny Knox
      </h1>
      <h2 style={{ fontSize: '32px', marginTop: 0 }}>Monthly</h2>
      <h3 style={{ fontSize: '24px', color: 'white' }}>Goated Leaderboard</h3>

      {error && (
        <p style={{ color: 'red', marginTop: '20px' }}>
          Error loading leaderboard: {error}
        </p>
      )}

      {!error && (
        <table
          style={{
            width: '100%',
            marginTop: '30px',
            color: 'white',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #FFD700' }}>
              <th
                style={{
                  textAlign: 'left',
                  padding: '10px',
                  color: '#FFD700',
                }}
              >
                Place
              </th>
              <th
                style={{
                  textAlign: 'left',
                  padding: '10px',
                  color: '#FFD700',
                }}
              >
                User
              </th>
              <th
                style={{
                  textAlign: 'right',
                  padding: '10px',
                  color: '#FFD700',
                }}
              >
                Wager
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.username}
                style={{ borderBottom: '1px solid #444' }}
              >
                <td style={{ padding: '10px' }}>{index + 1}.</td>
                <td style={{ padding: '10px' }}>{user.username}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>
                  ${user.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
