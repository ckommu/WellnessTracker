import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import AuthPage from './pages/auth-page/AuthPage';
import MyStats from './pages/my-stats/MyStats';
import CreateChallenge from './pages/create-challenge/CreateChallenge';
import AccessDenied from './pages/access denied/AccessDenied';
import NavigationBar from './components/navbar/NavigationBar';
import { RedirectToSignIn, useUser } from '@clerk/clerk-react';


function App() {
  const { user } = useUser();
  const [userRole, setUserRole] = useState(null);

  if (user && userRole !== user.publicMetadata.role) {
    setUserRole(user.publicMetadata.role);
    console.log("userRole = ",user.publicMetadata.role);
    console.log("user object: ", user);
  }

  if (!user || userRole === null) {
    return (
      <RedirectToSignIn />
    );
  }


  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        {console.log("userRole inside return: ", userRole)}
        <Route path="/create-challenge" element={userRole ==='admin' ? <CreateChallenge /> : <AccessDenied />} />
        <Route path='/stats' element={<MyStats />}/>
      </Routes>
    </>
  );
}

export default App;
