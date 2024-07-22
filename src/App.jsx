import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import AuthPage from './pages/auth-page/AuthPage';
import CreateChallenge from './pages/create-challenge/CreateChallenge';
import AccessDenied from './pages/access denied/AccessDenied';
import { useUser } from '@clerk/clerk-react';
import { Spinner } from 'react-bootstrap';

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
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      {console.log("userRole inside return: ", userRole)}
      <Route path="/create-challenge" element={userRole ==='admin' ? <CreateChallenge /> : <AccessDenied />} />
    </Routes>
  );
}

export default App;
