import React from 'react';
import { MdMenu } from "react-icons/md";
import styles from './burger-styles.module.css';

const Burger = () => {
  return (
    <div className={styles.burgerContainer}>
      <MdMenu className={styles.burger}/>
    </div>
      
  );
};

export default Burger;