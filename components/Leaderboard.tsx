'use client';

import { useEffect, useState } from 'react';

type User = {
  username: string;
  total: number;
  createdAt?: string;
  timestamp?: string;
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
        const list = Array.isArray(data) ? data : data?.data || [];
        const marchUsers = list.filter((entry: any) => {
          const date = new Date(entry.createdAt || entry.timestamp);
          return date.getMonth() === 2; // 0 = Sausis, 2 = Kovas
        });
        setUsers(marchUsers);
      })
      .catch((err) => {
        console.error(err);
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
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>Johnny Knox</h1>
      <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Monthly</h2>
      <h3 style={{ fontSize: '24px', color: 'white', marginBottom: '30px' }}>Goated Leaderboard</h3>

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
            <th style={{ textAlign: 'left', padding: '10px', color: '#FFD700' }}>Place</th>
            <th style={{ textAlign: 'left', padding: '10px', color: '#FFD700' }}>User</th>
            <th style={{ textAlign: 'right', padding: '10px', color: '#FFD700' }}>Wager</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.username} style={{ borderBottom: '1px solid #444' }}>
              <td style={{ padding: '10px' }}>{index + 1}.</td>
              <td style={{ padding: '10px' }}>{user.username}</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>
                ${user.total.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
