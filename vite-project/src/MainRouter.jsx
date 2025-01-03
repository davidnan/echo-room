import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import EchoRoom from './Login.jsx';
import App from './App.jsx';

const MainRouter = () => {
  const location = useLocation();
  useEffect(()=>{
    if (location.pathname === '/') {
       document.body.style.backgroundColor = 'white';
    } else {
        document.body.style.backgroundColor = 'black';
    }
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<EchoRoom />} />
      <Route path="/app" element={<App />} />
    </Routes>
  );
};

export default MainRouter;