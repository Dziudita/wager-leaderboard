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
    <div style={{ backgroundColor: '#000', color: '#FFD700', minHeight: '100vh', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>Johnny Knox</h1>
      <h2 style={{ fontSize: '32px', marginTop: 0 }}>$400 Monthly</h2>
      <h3 style={{ fontSize: '24px', marginTop: '10px', color: '#fff' }}>Goated Leaderboard</h3>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <table style={{ width: '100%', marginTop: '30px', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #FFD700' }}>
            <th style={{ textAlign: 'left', padding: '12px', color: '#FFD700' }}>Place</th>
            <th style={{ textAlign: 'left', padding: '12px', color: '#FFD700' }}>User</th>
            <th style={{ textAlign: 'left', padding: '12px', color: '#FFD700' }}>Wager</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.username} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '12px' }}>{index + 1}.</td>
              <td style={{ padding: '12px', fontWeight: 'bold', color: '#FFD700' }}>{user.username}</td>
              <td style={{ padding: '12px' }}>${user.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
