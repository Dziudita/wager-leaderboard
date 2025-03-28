'use client';
import { useEffect, useState } from 'react';

type User = {
  name: string;
  wager: number;
};

const rewardTiers = [
  { wager: 50000, reward: 143 },
  { wager: 100000, reward: 285 },
  { wager: 200000, reward: 570 },
  { wager: 300000, reward: 855 },
  { wager: 400000, reward: 1140 },
  { wager: 500000, reward: 1425 },
  { wager: 750000, reward: 2138 },
  { wager: 1000000, reward: 2850 },
  { wager: 1250000, reward: 3563 },
  { wager: 1500000, reward: 4275 },
  { wager: 1750000, reward: 4988 },
  { wager: 2000000, reward: 5700 },
  { wager: 2500000, reward: 7125 },
  { wager: 3000000, reward: 8550 },
  { wager: 3500000, reward: 9975 },
  { wager: 4000000, reward: 11400 },
  { wager: 4500000, reward: 12825 },
  { wager: 5000000, reward: 14250 },
];

function calculateReward(wager: number): number {
  let reward = 0;
  for (const tier of rewardTiers) {
    if (wager >= tier.wager) {
      reward = tier.reward;
    } else {
      break;
    }
  }
  return reward;
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

  const totalWagered = users.reduce((sum, user) => sum + user.wager, 0);

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
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', textAlign: 'center' }}>
        Johnny Knox
      </h1>
      <h2 style={{ fontSize: '32px', textAlign: 'center' }}>Monthly</h2>
      <h3 style={{ fontSize: '24px', color: 'white', textAlign: 'center' }}>
        Goated Leaderboard
      </h3>

      {error && <p style={{ color: 'red' }}>Error loading leaderboard: {error}</p>}

      <table
        style={{
          width: '100%',
          marginTop: '30px',
          color: 'white',
          borderCollapse: 'collapse',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '2px solid #FFD700' }}>
            <th style={{ padding: '10px', color: '#FFD700' }}>Place</th>
            <th style={{ padding: '10px', color: '#FFD700' }}>User</th>
            <th style={{ padding: '10px', color: '#FFD700' }}>Wagered</th>
            <th style={{ padding: '10px', color: '#FFD700' }}>% of Total</th>
            <th style={{ padding: '10px', color: '#FFD700' }}>Reward</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const percentage = totalWagered
              ? ((user.wager / totalWagered) * 100).toFixed(2)
              : '0.00';
            const reward = calculateReward(user.wager);
            return (
              <tr key={user.name} style={{ borderBottom: '1px solid #444' }}>
                <td style={{ padding: '10px' }}>{index + 1}.</td>
                <td style={{ padding: '10px' }}>{user.name}</td>
                <td style={{ padding: '10px' }}>${user.wager.toLocaleString()}</td>
                <td style={{ padding: '10px' }}>{percentage}%</td>
                <td style={{ padding: '10px' }}>${reward.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
