import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import HeroPage from "./pages/HeroPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreatePostPage from "./pages/CreatePost.jsx";
import NewsletterPage from "./pages/Newsletter.jsx";

function AppRoutes() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, handleRedirectCallback } = useAuth0();

  useEffect(() => {
    const processRedirect = async () => {
      try {
        const result = await handleRedirectCallback();
        const target = result?.appState?.returnTo || "/home";
        navigate(target, { replace: true });
      } catch (err) {
        console.error("Redirect error:", err);
      }
    };

    if (window.location.search.includes("code=")) {
      processRedirect();
    }
  }, [handleRedirectCallback, navigate]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/create-post" element={<CreatePostPage />} />
      <Route path="/newsletters" element={<NewsletterPage />} />
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

