import HeroHeader from '../components/HeroHeader.jsx'
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import HeroFooter from '../components/HeroFooter.jsx'
import HeroSection from '../components/HeroSection.jsx'
import { useAuth0 } from "@auth0/auth0-react";
import { useRef } from 'react';

const HeroPage = () => {
	const dialogRef = useRef(null);
	const { loginWithRedirect } = useAuth0();
	function openDialog() {
		if (dialogRef.current) dialogRef.current.showModal();
		console.log("Dialog function called");
	}

	function closeDialog() {
		if (dialogRef.current) dialogRef.current.close();
	}

	return (
		<div className="heroPage">
		<HeroHeader onClickButton={openDialog} />
		<HeroSection onClickButton={openDialog} />
		<HeroFooter />

		<dialog ref={dialogRef} className="signUpDialog">
		{/* Close X */}
		<button className="dialogClose" onClick={closeDialog}>×</button>
		<h3 className = "dialogHeading">Join Blog</h3>
		



		<button className="joinButton" onClick={() => loginWithRedirect({ appState: { returnTo: "/home" } })}>
		<img
		src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
		alt="Google logo"
		className="googleLogo"
		/>
		Continue with Google
		</button>

		<button className="joinButton" onClick={() => loginWithRedirect({ appState: { returnTo: "/home" } })}>
		<FaFacebook size={25} color="#1877F2" /> {/* Facebook blue */}
		Continue with Facebook
		</button>

		<button className="joinButton" onClick={() => loginWithRedirect({ appState: { returnTo: "/home" } })}>
		<FaLinkedin size={25} color="#0A66C2" /> {/* LinkedIn blue */}
		Continue with LinkedIn
		</button>

		</dialog>
		</div>
	);
};

export default HeroPage;

