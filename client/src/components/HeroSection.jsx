import HeroHeaderButton from './HeroHeaderButton.jsx'
import hero from '../assets/hero.png';


const HeroSection = () => {
	return (
		<section className = "heroSection"> 
			<div className = "heroLeft">
				<div>
					<h1 className = "heroHeading">Think & Grow<br/> Together</h1>
					<h3 className = "heroTagLine"> A place to Read, Write and Connect with the Community.</h3>
					<HeroHeaderButton className = "get-start-button-two" name = "Start Reading"></HeroHeaderButton>
				</div>	
			</div>
			<div className = "heroRight">
				<img src = {hero}/>	
			</div>
		</section>
	)
}
export default HeroSection;
