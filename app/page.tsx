import React from 'react';
import Leaderboard from '../../components/Leaderboard';
import RewardTiers from '../../components/RewardTiers';

export default function Page() {
  return (
    <main
      style={{
        backgroundColor: '#000',
        color: '#FFD700',
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
        Johnny Knox
      </h1>
      <h2 style={{ fontSize: '32px', marginTop: 0 }}>Monthly</h2>
      <h3 style={{ fontSize: '24px', fontWeight: 'normal', color: '#fff' }}>
        Goated Leaderboard
      </h3>

      <div style={{ marginTop: '40px' }}>
        <Leaderboard />
      </div>

      <div style={{ marginTop: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#FFD700' }}>
          Monthly Wager Rewards
        </h2>
        <RewardTiers />
      </div>
    </main>
  );
}
