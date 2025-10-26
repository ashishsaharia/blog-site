import React from 'react';
import HeroPage from './pages/HeroPage.jsx'
import	HomeNavigationMenu from './components/HomeNavigationMenu.jsx' 
import HomePageHeader from './components/HomePageHeader.jsx'	
import HomePage from './pages/HomePage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage.jsx';
import CreatePostPage from './pages/CreatePost.jsx';
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
        </Routes>
      </BrowserRouter>
		</div>

	)
}


export default App;

