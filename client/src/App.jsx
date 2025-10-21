import React from 'react';
import HeroPage from './pages/HeroPage.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
	return(
		// <HeroPage></HeroPage>
		<div>
			<BrowserRouter>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          {/* <Route path="/blog/:id" element={<Blog />} /> */}
          <Route path="/home" element={<Home />} />
          {/* <Route path="/publish" element={<Publish />} /> */}
        </Routes>
      </BrowserRouter>
		</div>

	)
}


export default App;

