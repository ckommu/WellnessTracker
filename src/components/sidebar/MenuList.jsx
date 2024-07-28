import React from 'react';
import { Menu } from 'antd';
import { IoHomeOutline, IoStatsChart } from 'react-icons/io5';
import { SignedIn, UserButton } from '@clerk/clerk-react';
import styles from './menulist-styles.module.css';

const MenuList = () => {
  return (
    <Menu theme='light' mode='inline' className={styles.menu}>
      <SignedIn>
        <Menu.Item key='account'>
          <div className={styles.account}>
            <UserButton />
          </div>
        </Menu.Item>
      </SignedIn>
      <Menu.Item key='home' icon={<IoHomeOutline />}>
        Home
      </Menu.Item>
      <Menu.Item key='stats' icon={<IoStatsChart />}>
        My Stats
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
