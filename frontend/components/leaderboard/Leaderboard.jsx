import React, { useState } from "react";
import styles from './leaderboard-styles.module.css';

const Leaderboard = ({ top3 }) => {
    const places = [
        { label: "Second", style: "secondPlace" },
        { label: "First", style: "firstPlace" },
        { label: "Third", style: "thirdPlace" },
      ];

    const podiumOrder = [1, 0, 2]

  return (
    <div className={styles.leaderboardContainer}>
      {podiumOrder.map((dataIndex, idx) => {
        const user = top3[dataIndex];
        const place = places[idx];

        return (
          <div className={styles.leaderboardItem} key={idx}>
            <div className={`${styles.bar} ${styles[place.style]}`}>
              <div className={styles.name}>{user?.name || "—"}</div>
              <div className={styles.value}>
                {user?.value != null ? `${user.value}${user.unit}` : "—"}
              </div>
            </div>
            <div className={styles.rankLabel}>{place.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Leaderboard;