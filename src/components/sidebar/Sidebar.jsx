import React from 'react';
import { Drawer, Layout } from 'antd';
import Logo from '../logo/Logo';
import MenuList from './MenuList';
import styles from './sidebar-styles.module.css';

const Sidebar = ({ open, onClose }) => {

  const { Sider } = Layout;

  return (
    <Drawer
      title="Menu"
      placement="right"
      closable={true}
      onClose={onClose}
      open={open}
      width={250}
    >
      <Layout>
        <Sider className={styles.sidebar}>
          <div className={styles.logo}>
            <Logo />
            <MenuList />
          </div>
        </Sider>
      </Layout>
    </Drawer>
  );
};

export default Sidebar;
