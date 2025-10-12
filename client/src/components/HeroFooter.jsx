import HeroHeaderButton from './HeroHeaderButton.jsx'

const HeroFooter = () => {
	return (
		<footer id = "heroFooter">
			<div>
				<HeroHeaderButton className = "footerButton" name = "Help"></HeroHeaderButton>
				<HeroHeaderButton className = "footerButton" name = "Status"></HeroHeaderButton>
				<HeroHeaderButton className = "footerButton" name = "Careers"></HeroHeaderButton>
				<HeroHeaderButton className = "footerButton" name = "Privacy"></HeroHeaderButton>
				<HeroHeaderButton className = "footerButton" name = "Terms"></HeroHeaderButton>
			</div>		
		</footer>
	)
}
export default HeroFooter;
