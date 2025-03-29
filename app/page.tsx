'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [marchWagers, setMarchWagers] = useState([]);

  useEffect(() => {
    const fetchWagers = async () => {
      try {
        const res = await fetch(
          'https://api.goated.com/user2/affiliate/referral-leaderboard/OQID5MA'
        );
        const data = await res.json();

        // Filtruojam tik kovo mėnesį
        const marchOnly = data.filter((entry: any) => {
          const date = new Date(entry.timestamp);
          return date.getMonth() === 2 && date.getFullYear() === 2025; // Kovas = 2
        });

        // Rikiuojam nuo didžiausio wagerio
        const sorted = marchOnly.sort((a: any, b: any) => b.wagerAmount - a.wagerAmount);

        setMarchWagers(sorted.slice(0, 10)); // top 10
      } catch (err) {
        console.error('Klaida gaunant duomenis:', err);
      }
    };

    fetchWagers();
  }, []);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#FFD700', // aukso spalva
        color: '#000000', // juoda
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <img
        src="/logo.png"
        alt="StakeSheep Logo"
        style={{
          width: '150px',
          height: 'auto',
          marginBottom: '2rem',
          borderRadius: '0.8rem',
          background: '#000',
          padding: '1rem',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        }}
      />

      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>TOP 10 Wager (Kovas)</h2>

      <table style={{ backgroundColor: '#000', color: '#FFD700', borderRadius: '8px', padding: '1rem', minWidth: '300px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px' }}>#</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Vartotojas</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>Wager (USDT)</th>
          </tr>
        </thead>
        <tbody>
          {marchWagers.map((user: any, index: number) => (
            <tr key={user.id}>
              <td style={{ padding: '8px' }}>{index + 1}</td>
              <td style={{ padding: '8px' }}>{user.username || 'Anon'}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>
                {user.wagerAmount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <a
        href="https://www.goated.com/r/STAKESHEEP"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: '2rem',
          padding: '12px 24px',
          backgroundColor: '#000',
          color: '#FFD700',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => ((e.currentTarget.style.transform = 'scale(1.05)'))}
        onMouseLeave={(e) => ((e.currentTarget.style.transform = 'scale(1)'))}
      >
        Prisijunk su STAKESHEEP 🔥
      </a>
    </main>
  );
}
