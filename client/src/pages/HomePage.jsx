import { useState } from "react";
import HomePageHeader from "../components/HomePageHeader";
import HomeNavigationMenu from "../components/HomeNavigationMenu";

const HomePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div className="homeLayout">
      <HomePageHeader onMenuClick={() => setIsNavOpen(!isNavOpen)} />
      <div className="homeContentArea">
        <HomeNavigationMenu isOpen={isNavOpen} />
        <main className="homeMainContent">
          {/* Add your feed or articles here */}
        </main>
      </div>
    </div>
  );
};

export default HomePage;

