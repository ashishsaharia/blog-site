import React from 'react';
import HeroHeader from './components/HeroHeader.jsx'
import HeroFooter from './components/HeroFooter.jsx'
import HeroSection from './components/HeroSection.jsx'

function App() {
	return(
	<div className = "heroPage"> 
		<HeroHeader></HeroHeader>
		<HeroSection></HeroSection>
		<HeroFooter></HeroFooter>
	</div>
	)
}


export default App;

