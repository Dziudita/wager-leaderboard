'use client';

import { useEffect, useState } from 'react';

type User = {
  name: string;
  wager: number;
};

type Tier = {
  threshold: number;
  reward: number;
};

const rewardTiers: Tier[] = [
  { threshold: 50000, reward: 143 },
  { threshold: 100000, reward: 285 },
  { threshold: 200000, reward: 570 },
  { threshold: 300000, reward: 855 },
  { threshold: 400000, reward: 1140 },
  { threshold: 500000, reward: 1425 },
  { threshold: 750000, reward: 2138 },
  { threshold: 1000000, reward: 2850 },
  { threshold: 1250000, reward: 3563 },
  { threshold: 1500000, reward: 4275 },
  { threshold: 1750000, reward: 4988 },
  { threshold: 2000000, reward: 5700 },
  { threshold: 2500000, reward: 7125 },
  { threshold: 3000000, reward: 8550 },
  { threshold: 3500000, reward: 9975 },
  { threshold: 4000000, reward: 11400 },
  { threshold: 4500000, reward: 12825 },
  { threshold: 5000000, reward: 14250 },
];

function getReward(wager: number): number {
  for (let i = rewardTiers.length - 1; i >= 0; i--) {
    if (wager >= rewardTiers[i].threshold) {
      return rewardTiers[i].reward;
    }
  }
  return 0;
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
        const cleaned: User[] = (data || []).map((u: any) => ({
          name: u.name ?? 'Unknown',
          wager: u.wagered?.this_month ?? 0,
        }));
        setUsers(cleaned);
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
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>Johnny Knox</h1>
      <h2 style={{ fontSize: '32px', marginTop:
