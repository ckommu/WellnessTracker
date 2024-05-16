import React, { useState } from "react";
import styles from './leaderboard-styles.module.css';

const Leaderboard = () => {
    return (
        <div className={styles.leaderboardContainer}>
            <div className={`${styles.secondPlace} ${styles.leaderboardItem}`}></div>
            <div className={`${styles.firstPlace} ${styles.leaderboardItem}`}></div>
            <div className={`${styles.thirdPlace} ${styles.leaderboardItem}`}></div>
        </div>
    );
};

export default Leaderboard;