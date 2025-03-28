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
        return res.json(); // <- Šiuo atveju grąžina masyvą, ne objektą
      })
      .then((data) => {
        console.log('Gauti duomenys:', data);
        setUsers(data || []); // <- naudok `data` tiesiai
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Leaderboard
      </h1>

      {error ? (
        <p style={{ color: 'red' }}>Klaida kraunant duomenis: {error}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>#</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Vartotojas</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Mėnesinis wageris</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.total ? user.total.toFixed(2) : "0.00"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
