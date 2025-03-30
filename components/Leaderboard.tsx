'use client';

import { useEffect, useState } from 'react';

type User = {
  username?: string;
  total?: number;
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
        if (data?.length) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  const tableStyle = {
    width: '100%',
    maxWidth: '800px',
    margin: '40px auto',
    borderCollapse: 'collapse' as const,
    fontSize: '1.2rem',
  };

  const headerCellStyle = {
    padding: '12px',
    borderBottom: '2px solid #f7c000',
    textAlign: 'left' as const,
    color: '#f7c000',
  };

  const cellStyle = {
    padding: '12px',
    borderBottom: '1px solid #444',
    color: 'white',
  };

  const cellStyleRight = {
    ...cellStyle,
    textAlign: 'right' as const,
  };

  return (
    <div
      style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center' as const,
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#f7c000' }}>
        Johnny Knox
      </h1>
      <h2 style={{ fontSize: '2rem', color: '#f7c000' }}>Monthly</h2>
      <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '30px' }}>
        Goated Leaderboard
      </h3>

      {error && (
        <p style={{ color: 'red', marginTop: '20px' }}>
          Error loading leaderboard: {error}
        </p>
      )}

      {users.length === 0 && !error && (
        <p style={{ color: '#aaa' }}>Loading or no data available.</p>
      )}

      {users.length > 0 && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>Place</th>
              <th style={headerCellStyle}>User</th>
              <th style={headerCellStyle}>Wager</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const name = user?.username || 'N/A';
              const wager =
                typeof user?.total === 'number'
                  ? `$${user.total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : 'N/A';

              return (
                <tr key={index}>
                  <td style={cellStyle}>{index + 1}.</td>
                  <td style={cellStyle}>{name}</td>
                  <td style={cellStyleRight}>{wager}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
