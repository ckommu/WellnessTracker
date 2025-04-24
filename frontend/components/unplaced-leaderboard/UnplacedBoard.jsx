import React from "react";
import "./unplaced-styles.css";
import { BsFire } from "react-icons/bs";

const UnplacedBoard = ({ others }) => {

    return (
        <div className="unplaced-container">
            {others.map((user, index) => (
                <div className="unplaced-item" key={index}>
                    <span className="emp-name">{user.name}</span>
                    <div className="right-side-container">
                        {user.value != null ? (
                            <>
                                <span className="curr-progress">{user.value}{user.unit}</span>
                                <BsFire className="fire-icon" />
                            </>
                        ) : (
                            <span className="curr-progress"> is working on it!</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UnplacedBoard;