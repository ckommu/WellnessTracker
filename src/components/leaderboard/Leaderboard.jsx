import React, { useState } from "react";
import "./leaderboard-styles.css";

const Leaderboard = () => {
    return (
        <div className="leaderboard-container">
            <div className="leaderboard-item second-place"></div>
            <div className="leaderboard-item first-place"></div>
            <div className="leaderboard-item third-place"></div>
        </div>
    );
};

export default Leaderboard;