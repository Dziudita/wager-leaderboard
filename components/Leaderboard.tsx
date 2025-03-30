'use client';

import { useEffect, useState } from 'react';

type User = {
  name: string;
  wagered: {
    this_month: number;
  };
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
      .then((data) => setUsers(data))
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
      <h2 style={{ fontSize: '32px', marginTop: 0 }}>Monthly</h2>
      <h3 style={{ fontSize: '24px', color: '#fff' }}>Goated Leaderboard</h3>

      {error && (
        <p style={{ color: 'red', marginTop: '20px' }}>
          Error loading leaderboard: {error}
        </p>
      )}

      {!error && users.length === 0 && (
        <p style={{ color: '#aaa', marginTop: '20px' }}>Loading...</p>
      )}

      {users.length > 0 && (
        <table
          style={{
            margin: '40px auto',
            width: '80%',
            borderCollapse: 'collapse',
            fontSize: '18px',
          }}
        >
          <thead>
            <tr>
              <th style={headerStyle}>Place</th>
              <th style={headerStyle}>User</th>
              <th style={headerStyle}>Wager</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.name}>
                <td style={cellStyle}>{index + 1}.</td>
                <td style={cellStyle}>{user.name}</td>
                <td style={{ ...cellStyle, textAlign: 'right' }}>
                  ${user.wagered.this_month.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const headerStyle = {
  padding: '12px',
  borderBottom: '2px solid #FFD700',
  textAlign: 'left' as const,
  color: '#FFD700',
};

const cellStyle = {
  padding: '10px',
  borderBottom: '1px solid #444',
  color: '#fff',
};
