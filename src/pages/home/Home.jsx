import React, { useState } from 'react';
import styles from './home-styles.module.css';
import Leaderboard from '../../components/leaderboard/Leaderboard';
import UnplacedBoard from '../../components/unplaced-leaderboard/UnplacedBoard';
import LogProgressBtn from '../../components/log-progress/LogProgressBtn';
import AuthPage from '../auth-page/AuthPage';
import Burger from '../../components/burger/Burger';
import CalendarModal from '../../components/calendar-modal/CalendarModal';
import Sidebar from '../../components/sidebar/Sidebar';

import { SignedIn, SignedOut } from '@clerk/clerk-react';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleBurgerClick = () => {
    console.log("Burger clicked!");
    setShowSidebar(!showSidebar);
  };

  const handleProgressClick = () => {
    setShowModal(true);
    console.log("button is working!");
  };

  const handleProgressClose = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.homeRoot}>
      <SignedIn>
        <Burger onClick={handleBurgerClick} className={styles.burger} />
        <div className={styles.contentWrapper}>
          <Leaderboard />
          <UnplacedBoard />
          <LogProgressBtn 
            onClick={handleProgressClick}  
          />
        </div>
        <CalendarModal show={showModal} handleClose={handleProgressClose}/>
        <Sidebar open={showSidebar} onClose={() => setShowSidebar(false)} />
      </SignedIn>
      <SignedOut>
        <AuthPage />
      </SignedOut>
    </div>
  );
};

export default Home;
