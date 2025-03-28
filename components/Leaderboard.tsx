import { useEffect, useState } from 'react';

// User type
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

  // Calculate total wagered among top 10
  const totalWager = users.reduce((sum, user) => sum + user.total, 0);

  // Determine reward based on reward tiers
  const getReward = (wager: number) => {
    const tiers = [
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
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (wager >= tiers[i].wager) return tiers[i].reward;
    }
    return 0;
  };

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

      </h3>

      {error && <p style={{ color: 'red' }}>Error loading leaderboard: {error}</p>}

      <table
        style={{
          width: '100%',
          marginTop: '30px',
          color: 'white',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '2px solid #FFD700' }}>
            <th style={{ padding: '10px', color: '#FFD700' }}>Place</th>
            <th style={{ padding: '10px', color: '#FFD700' }}>User</th>
            <th style={{ padding: '10px', color: '#FFD700' }}>Wager</th>
            <th style={{ padding: '10px', color: '#FFD700' }}>% of Total</th>
            <th style={{ padding: '10px', color: '#FFD700' }}>Reward</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const percent = totalWager ? (user.total / totalWager) * 100 : 0;
            const reward = getReward(user.total);
            return (
              <tr
                key={user.username}
                style={{ borderBottom: '1px solid #444', textAlign: 'center' }}
              >
                <td style={{ padding: '10px' }}>{index + 1}.</td>
                <td style={{ padding: '10px' }}>{user.username}</td>
                <td style={{ padding: '10px' }}>${user.total.toFixed(2)}</td>
                <td style={{ padding: '10px' }}>{percent.toFixed(2)}%</td>
                <td style={{ padding: '10px' }}>${reward.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
