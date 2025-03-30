'use client';

import Leaderboard from '../components/Leaderboard';

export default function Home() {
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
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
        Johnny Knox
      </h1>
      <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Monthly</h2>
      <h3 style={{ fontSize: '24px', color: '#fff' }}>Goated Leaderboard</h3>

      <div style={{ marginTop: '40px' }}>
        <Leaderboard />
      </div>
    </div>
  );
}
