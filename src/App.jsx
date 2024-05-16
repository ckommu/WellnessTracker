import Home from './pages/home/Home';
import AuthPage from './pages/auth-page/AuthPage';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>  
    </>
  );
};

export default App
