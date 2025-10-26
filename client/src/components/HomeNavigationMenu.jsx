import { Home, Bookmark, User, FileText, BarChart2, Users, Plus } from "lucide-react";

const HomeNavigationMenu = ({ isOpen }) => {
  return (
    <nav className={`homeNavBar ${isOpen ? "open" : "collapsed"}`}>
      <div className="navButtons">
        <div className="homeNavButton active">
          <Home className="navIcon" />
          <span>Home</span>
        </div>
        <div className="homeNavButton">
          <Bookmark className="navIcon" />
          <span>Library</span>
        </div>
        <div className="homeNavButton">
          <User className="navIcon" />
          <span>Profile</span>
        </div>
        <div className="homeNavButton">
          <FileText className="navIcon" />
          <span>Stories</span>
        </div>
        <div className="homeNavButton">
          <BarChart2 className="navIcon" />
          <span>Stats</span>
        </div>
      </div>

      <div className="navDivider" />

      <div className="navButtons">
        <div className="homeNavButton">
          <Users className="navIcon" />
          <span>Following</span>
        </div>
        <div className="homeNavButton">
          <Plus className="navIcon" />
          <div className="navTextBlock">
            <span>Find writers and publications to follow.</span>
            <a href="#" className="navLink">See suggestions</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavigationMenu;

