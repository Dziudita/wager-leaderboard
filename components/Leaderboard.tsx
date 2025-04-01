'use client';

import { useEffect, useState } from 'react';

const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes in milliseconds

type User = {
  username?: string;
  total?: number;
};

const rewardTiers = [
  { threshold: 5000000, pool: 11400 },
  { threshold: 4500000, pool: 10260 },
  { threshold: 4000000, pool: 9120 },
  { threshold: 3500000, pool: 7980 },
  { threshold: 3000000, pool: 6840 },
  { threshold: 2500000, pool: 5700 },
  { threshold: 2000000, pool: 4560 },
  { threshold: 1750000, pool: 3990 },
  { threshold: 1500000, pool: 3420 },
  { threshold: 1250000, pool: 2850 },
  { threshold: 1000000, pool: 2280 },
  { threshold: 750000, pool: 1710 },
  { threshold: 500000, pool: 1140 },
  { threshold: 400000, pool: 912 },
  { threshold: 300000, pool: 684 },
  { threshold: 200000, pool: 456 },
  { threshold: 100000, pool: 228 },
  { threshold: 50000, pool: 114 },
];

function getRewardPool(totalWager: number) {
  for (const tier of rewardTiers) {
    if (totalWager >= tier.threshold) {
      return tier.pool;
    }
  }
  return 0;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = () => {
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
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const tableStyle = {
    width: '100%',
    maxWidth: '900px',
    margin: '40px auto',
    borderCollapse: 'collapse' as const,
    fontSize: '1.2rem',
  };

  const headerCellStyle = {
    padding: '12px',
    borderBottom: '2px solid #f7c000',
    color: '#f7c000',
    textAlign: 'center' as const,
  };

  const cellStyle = {
    padding: '12px',
    borderBottom: '1px solid #444',
    color: 'white',
    textAlign: 'center' as const,
  };

  const totalMonthlyWager = users.reduce((sum, user) => sum + (user.total || 0), 0);
  const rewardPool = getRewardPool(totalMonthlyWager);

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
      
      <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '30px' }}>
        This leaderboard refreshes automatically every 30 minutes.
      </p>

      {error && (
        <p style={{ color: 'red', marginTop: '20px' }}>
          Error loading leaderboard: {error}
        </p>
      )}

      {users.length === 0 && !error && (
        <p style={{ color: '#aaa' }}>Loading or no data available.</p>
      )}

      {users.length > 0 && (
        <>
          <p style={{ color: '#f7c000', fontSize: '1rem', marginBottom: '10px' }}>
            Total Wagered: ${totalMonthlyWager.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p style={{ color: '#f7c000', fontSize: '1rem', marginBottom: '30px' }}>
            Reward Pool: ${rewardPool.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Place</th>
                <th style={headerCellStyle}>User</th>
                <th style={headerCellStyle}>Wager</th>
                <th style={headerCellStyle}>Payout</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 10).map((user, index) => {
                const name = user?.username || 'N/A';
                const wagerValue = user?.total || 0;
                const wager = `$${wagerValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`;
                const payout = rewardPool > 0 ? (wagerValue / totalMonthlyWager) * rewardPool : 0;
                const payoutDisplay = `$${payout.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`;

                return (
                  <tr key={index}>
                    <td style={cellStyle}>{index + 1}.</td>
                    <td style={cellStyle}>{name}</td>
                    <td style={cellStyle}>{wager}</td>
                    <td style={cellStyle}>{payoutDisplay}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
<p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '20px' }}>
  Leaderboard will be payed out within 24 - 48 hours.
</p>
</>
      )}
    </div>
  );
}
