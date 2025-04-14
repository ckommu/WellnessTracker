import React from "react";
import "./unplaced-styles.css";
import { BsFire } from "react-icons/bs";

const UnplacedBoard = () => {

    return (
        <div className="unplaced-container">
            <div className="unplaced-item">
                <span className="emp-name">Christine Kommu</span>
                <div className="right-side-container">
                    <span className="curr-progress">42m</span>
                    <BsFire className="fire-icon" />
                </div>
                
            </div>
        </div>
    );
};

export default UnplacedBoard;