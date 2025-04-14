import React from 'react'
import styles from './log-styles.module.css';

const LogProgressBtn = ({ onClick }) => {

  return (
    <button 
      className={styles.logContainer} 
      onClick={onClick}
    >
        <span className={styles.buttonText}>Log Your Progress!</span>
    </button>
  )
}

export default LogProgressBtn