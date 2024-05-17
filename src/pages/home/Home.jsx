import React from 'react';
import styles from './home-styles.module.css';
import Leaderboard from '../../components/leaderboard/Leaderboard';
import UnplacedBoard from '../../components/unplaced-leaderboard/UnplacedBoard';
import LogProgressBtn from '../../components/log-progress/LogProgressBtn';
import AuthPage from '../auth-page/AuthPage';
import Burger from '../../components/burger/Burger';

import { SignedIn, SignedOut } from '@clerk/clerk-react';

const Home = () => {
  return (
    <div className={styles.homeRoot}>
      <SignedIn>
        <Burger className={styles.burger}/>
        <div className={styles.contentWrapper}>
          <Leaderboard />
          <UnplacedBoard />
          <LogProgressBtn />
        </div>
      </SignedIn>
      <SignedOut>
        <AuthPage />
      </SignedOut>
    </div>
  );
};

export default Home;
