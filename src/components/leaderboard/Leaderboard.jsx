import React, { useState } from "react";
import styles from './leaderboard-styles.module.css';

const Leaderboard = () => {
    return (
        <div className={styles.leaderboardContainer}>
            <div className={`${styles.secondPlace} ${styles.leaderboardItem}`}>
                <span className={styles.secondText}>Second</span>
            </div>
            <div className={`${styles.firstPlace} ${styles.leaderboardItem}`}>
                <span className={styles.firstText}>First</span>
            </div>
            <div className={`${styles.thirdPlace} ${styles.leaderboardItem}`}>
                <span className={styles.thirdText}>Third</span>
            </div>
        </div>
    );
};

export default Leaderboard;