import HeroHeader from '../components/HeroHeader.jsx'
import HeroFooter from '../components/HeroFooter.jsx'
import HeroSection from '../components/HeroSection.jsx'
import { useRef } from 'react';

const HeroPage = () => {
  const dialogRef = useRef(null);

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
      </dialog>
    </div>
  );
};

export default HeroPage;

