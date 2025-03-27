'use client';

import { useEffect, useState } from 'react';

type User = {
  username: string;
  total: number;
};

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/leaderboard')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Klaida gaunant duomenis:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top 10 Wagerių nuo 2025-03-17</h1>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Vartotojas</th>
            <th className="p-2 border">Wager ($)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td className="p-2 border text-center">{i + 1}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border text-right">{user.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
