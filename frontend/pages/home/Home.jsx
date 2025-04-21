import React, { useState, useEffect } from 'react';
import styles from './home-styles.module.css';
import Leaderboard from '../../components/leaderboard/Leaderboard';
import UnplacedBoard from '../../components/unplaced-leaderboard/UnplacedBoard';
import LogProgressBtn from '../../components/log-progress/LogProgressBtn';
import AuthPage from '../auth-page/AuthPage';
import CalendarModal from '../../components/calendar-modal/CalendarModal';
import { useUser } from '@clerk/clerk-react';

import { SignedIn, SignedOut } from '@clerk/clerk-react';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    // Fetch the active challenge when the component mounts
    const fetchActiveChallenge = async () => {
      try {
        const response = await fetch('/api/challenges/active');
        if (!response.ok) {
          throw new Error('Failed to fetch active challenge');
        }
        const data = await response.json();
        console.log('Fetched active challenge:', data);
        setChallenge(data); // Assuming the response contains the active challenge object
      } catch (error) {
        console.error('Error fetching active challenge:', error);
      }
    };
  
    fetchActiveChallenge();
  }, []);

  const handleProgressClick = () => {
    setShowModal(true);
    console.log("button is working!");
  };

  const handleProgressClose = () => {
    setShowModal(false);
  };

  const handleLogProgress = (progressData) => {
    console.log('Logged progress: ', progressData);

    fetch('/api/progress', { // port the SERVER Is listening on!!!
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          challengeId: challenge?._id,
          date: progressData.date,
          value: progressData.value
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { 
                console.error('Server response error text:', text);
                throw new Error(text || 'Server returned an error with empty response text');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response: ', data);
    })
    .catch(error => {
        console.error('Error in handleLogProgress:', error);
    });
};

  return (
    <div className={styles.homeRoot}>
      <SignedIn>
        {challenge && (
          <div className={styles.challengeCard}>
            <h2>{challenge.title}</h2>
            <p>{challenge.description}</p>
            <p>{new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}</p>
          </div>
        )}
        <div className={styles.contentWrapper}>
          <Leaderboard />
          <UnplacedBoard />
          <LogProgressBtn 
            onClick={handleProgressClick}  
          />
        </div>
        <CalendarModal 
          show={showModal} 
          handleClose={handleProgressClose}
          handleLogProgress={handleLogProgress}
          unit={challenge?.unit}
        />
      </SignedIn>
      <SignedOut>
        <AuthPage />
      </SignedOut>
    </div>
  );
};

export default Home;
