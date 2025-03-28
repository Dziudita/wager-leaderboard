'use client';

import React from "react";
import Leaderboard from "@/components/Leaderboard";
import RewardTiers from "@/components/RewardTiers";

export default function Page() {
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "10px", color: "#FFD700" }}>
        Johnny Knox
      </h1>
      <h2 style={{ fontSize: "32px", marginTop: 0, color: "#FFD700" }}>
        Monthly
      </h2>
      <h3 style={{ fontSize: "24px", marginTop: "10px" }}>
        Goated Leaderboard
      </h3>

      {/* Leaderboard Table */}
      <Leaderboard />

      {/* Reward Tiers Table */}
      <div style={{ marginTop: "60px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#FFD700" }}>
          Monthly Wager Rewards
        </h2>
        <RewardTiers />
      </div>
    </div>
  );
}
