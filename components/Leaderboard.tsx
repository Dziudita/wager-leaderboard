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
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data) => {
        setUsers(data || []);
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
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
          Johnny Knox
        </h1>
        <h2 style={{ fontSize: '32px', margin: 0 }}>Monthly</h2>
        <h3
          style={{
            fontSize: '24px',
            color: 'white',
            marginTop: '10px',
          }}
        >
          Goated Leaderboard
        </h3>
      </div>

      {error && <p style={{ color: 'red' }}>Error loading leaderboard: {error}</p>}

      <table
        style={{
          width: '100%',
          color: 'white',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '2px solid #FFD700' }}>
            <th style={{ textAlign: 'left', padding: '12px', color: '#FFD700' }}>Place</th>
            <th style={{ textAlign: 'left', padding: '12px', color: '#FFD700' }}>User</th>
            <th style={{ textAlign: 'left', padding: '12px', color: '#FFD700' }}>Wager</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.username} style={{ borderBottom: '1px solid #444' }}>
              <td style={{ padding: '12px' }}>{index + 1}.</td>
              <td style={{ padding: '12px' }}>{user.username}</td>
              <td style={{ padding: '12px' }}>${user.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
