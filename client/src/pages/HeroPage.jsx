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
  }

  function closeDialog() {
    if (dialogRef.current) dialogRef.current.close();
  }


  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: "/home" },
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
  };

  return (
    <div className="heroPage">
      <HeroHeader onClickButton={openDialog} />
      <HeroSection onClickButton={openDialog} />
      <HeroFooter />

      <dialog ref={dialogRef} className="signUpDialog">
        <button className="dialogClose" onClick={closeDialog}>×</button>
        <h3 className="dialogHeading">Join Blog</h3>

        <button className="joinButton" onClick={handleLogin}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="googleLogo"
          />
          Continue with Google
        </button>

        <button className="joinButton" onClick={handleLogin}>
          <FaFacebook size={25} color="#1877F2" />
          Continue with Facebook
        </button>

        <button className="joinButton" onClick={handleLogin}>
          <FaLinkedin size={25} color="#0A66C2" />
          Continue with LinkedIn
        </button>
      </dialog>
    </div>
  );
};

export default HeroPage;
