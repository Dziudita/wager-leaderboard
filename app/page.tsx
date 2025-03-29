'use client';

import React from 'react';
import Leaderboard from '../components/Leaderboard';
import RewardTiers from '../components/RewardTiers';

export default function Page() {
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
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>Johnny Knox</h1>
      <h2 style={{ fontSize: '32px', marginTop: 0 }}>Monthly</h2>
      <h3 style={{ fontSize: '24px', color: 'white' }}>Goated Leaderboard</h3>

      <div style={{ marginTop: '60px' }}>
        <Leaderboard month="March" />
      </div>

      <h3 style={{ fontSize: '24px', marginTop: '60px', marginBottom: '10px', color: 'white' }}>
        Monthly Wager Rewards
      </h3>
      <RewardTiers />
    </div>
  );
}
