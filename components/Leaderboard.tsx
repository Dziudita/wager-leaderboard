import React, { useEffect, useState } from 'react';

interface User {
  name: string;
  wager: number;
}

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
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
        Johnny Knox
      </h1>
      <h2 style={{ fontSize: '32px', marginTop: 0 }}>Monthly</h2>
      <h3 style={{ fontSize: '24px', color: '#fff', marginTop: '20px' }}>
        Goated Leaderboard
      </h3>

      {error && (
        <p style={{ color: 'red' }}>Error loading leaderboard: {error}</p>
      )}

      <table style={{ width: '100%', marginTop: '30px', fontSize: '20px', color: '#fff' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #FFD700' }}>
            <th style={{ textAlign: 'left', paddingBottom: '10px' }}>Place</th>
            <th style={{ textAlign: 'left', paddingBottom: '10px' }}>User</th>
            <th style={{ textAlign: 'left', paddingBottom: '10px' }}>Wager</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.name}>
              <td style={{ padding: '10px 0' }}>{index + 1}.</td>
              <td>{user.name}</td>
              <td>${user.wager.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
