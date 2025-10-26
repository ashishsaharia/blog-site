import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroPage from './pages/HeroPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CreatePostPage from './pages/CreatePost.jsx';
import NewsletterPage from './pages/Newsletter.jsx';
function App() {
	return(
		// <HeroPage></HeroPage>
		<div>
			<BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          {/* <Route path="/blog/:id" element={<Blog />} /> */}
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/publish" element={<Publish />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/newsletters" element={<NewsletterPage />} />
        </Routes>
      </BrowserRouter>
		</div>

	)
}

export default App;
