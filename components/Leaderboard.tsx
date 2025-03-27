'use client';

import { useEffect, useState } from 'react';

type User = {
  username: string;
  total: number;
};

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => {
        if (!res.ok) {
          throw new Error('API klaida');
        }
        return res.json();
      })
      .then(data => {
        console.log('Gauti duomenys:', data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error('Gauti ne masyvo tipo duomenys');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Klaida gaunant duomenis:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Klaida kraunant duomenis.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Leaderboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="border p-2 rounded shadow-md flex justify-between"
          >
            <span>{user.username}</span>
            <span>{user.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
