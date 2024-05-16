import React from 'react';
import styles from './home-styles.module.css';
import Leaderboard from '../../components/leaderboard/Leaderboard';
import UnplacedBoard from '../../components/unplaced-leaderboard/UnplacedBoard'
import LogProgressBtn from '../../components/log-progress/LogProgressBtn';
import AuthPage from '../auth-page/AuthPage';
import Burger from '../../components/burger/Burger';

import { SignedIn, SignedOut } from '@clerk/clerk-react';

const Home = () => {
  return (
      <>
        <SignedIn>
          <Burger />
          <Leaderboard />
          <UnplacedBoard />
          <LogProgressBtn />
        </SignedIn>

        <SignedOut>
          <AuthPage />
        </SignedOut>
      </>
  );
};

export default Home;