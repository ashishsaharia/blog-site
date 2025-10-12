import HeroHeaderButton from "./HeroHeaderButton.jsx";
import logo from "../assets/logo.png";

const HeroHeader = () => {
  return (
    <header id="heroHeader" className="header">
      <div id="heroHeaderLeft">
        <img id = "heroHeaderLogo" src={logo} alt="Logo" />   
      </div>
      <div id="heroHeaderRight">
        <HeroHeaderButton name="About" />
        <HeroHeaderButton name="Sign In" />
        <HeroHeaderButton name="Write" />
        <HeroHeaderButton className="get-start-button-one" name="Get Started" />
      </div>
    </header>
  );
};

export default HeroHeader;

