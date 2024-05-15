import Leaderboard from './components/leaderboard/Leaderboard';
import UnplacedBoard from './components/unplaced-leaderboard/UnplacedBoard';
import './app-styles.css';
import { MdMenu } from "react-icons/md";
import Auth from './components/auth/Auth';

function App() {

  return (
    <>
      <Auth />
        <MdMenu className='burger' />
        <Leaderboard />
        <UnplacedBoard />
    </>
  );
};

export default App
