'use client';

import { useEffect, useState } from 'react';

type User = {
  username: string;
  total: number;
  timestamp: string;
};

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        const marchStart = new Date('2024-03-01T00:00:00Z');
        const marchEnd = new Date('2024-03-31T23:59:59Z');

        const filtered = data.filter((user: User) => {
          const ts = new Date(user.timestamp);
          return ts >= marchStart && ts <= marchEnd;
        });

        setUsers(filtered || []);
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
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
        Johnny Knox
      </h1>
      <h2 style={{ fontSize: '32px', marginTop: 0, textAlign: 'center' }}>Monthly</h2>
      <h3 style={{ fontSize: '24px', color: 'white', textAlign: 'center' }}>Goated Leaderboard</h3>

      {error && <p style={{ color: 'red' }}>Error loading leaderboard: {error}</p>}

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
            <th style={{ padding: '10px', color: '#FFD700', textAlign: 'left' }}>Place</th>
            <th style={{ padding: '10px', color: '#FFD700', textAlign: 'left' }}>User</th>
            <th style={{ padding: '10px', color: '#FFD700', textAlign: 'right' }}>Wager</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.username} style={{ borderBottom: '1px solid #444' }}>
              <td style={{ padding: '10px' }}>{index + 1}.</td>
              <td style={{ padding: '10px' }}>{user.username}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>${user.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
