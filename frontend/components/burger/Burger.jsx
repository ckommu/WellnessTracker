import React from 'react';
import { MdMenu } from "react-icons/md";
import styles from './burger-styles.module.css';

const Burger = ({ onClick }) => {
  return (
    <div className={styles.burgerContainer} onClick={onClick}>
      <MdMenu className={styles.burger}/>
    </div>
  );
};

export default Burger;
