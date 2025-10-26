import React, { useEffect } from 'react';
import HeroPage from './pages/HeroPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

// Wrapper so we can use hooks like useNavigate inside
function AppRoutes() {
  const navigate = useNavigate();
  const { isLoading, handleRedirectCallback } = useAuth0();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const result = await handleRedirectCallback();
      const target = result?.appState?.returnTo || "/";
      navigate(target, { replace: true });
    };

    // only run if Auth0 redirected back with ?code=
    if (window.location.search.includes("code=")) {
      handleAuthRedirect();
    }
  }, [handleRedirectCallback, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
