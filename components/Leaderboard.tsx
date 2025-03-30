'use client';

import { useEffect, useState } from 'react';

type User = {
  username: string;
  this_month: number;
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
      .then((data) => setUsers(data || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ marginTop: '40px' }}>
      {error && <p style={{ color: 'red', marginTop: '20px' }}>Error loading leaderboard: {error}</p>}
      {users.length === 0 && !error && <p style={{ color: '#aaa', marginTop: '20px' }}>Loading...</p>}

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
              <tr key={user.username}>
                <td style={cellStyle}>{index + 1}.</td>
                <td style={cellStyle}>{user.username}</td>
                <td style={{ ...cellStyle, textAlign: 'right' }}>
                  ${user.this_month.toLocaleString(undefined, {
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
  padding: '12px',
  borderBottom: '1px solid #444',
  color: '#fff',
};
