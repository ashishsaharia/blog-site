import { FiMenu, FiSearch, FiEdit3, FiBell } from "react-icons/fi";

const HomePageHeader = ({ onMenuClick }) => {
  return (
    <header className="homePageHeader">
      <div className="header-left">
        <button className="menu-icon" onClick={onMenuClick}>
          <FiMenu size={20} />
        </button>

        <h1 className="logo">BMU Blog</h1>

        <div className="search-container">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="header-right">
        <button className="write-btn">
          <FiEdit3 />
          Write
        </button>

        <button className="icon-btn">
          <FiBell />
        </button>

        <div className="avatar">A</div>
      </div>
    </header>
  );
};

export default HomePageHeader;

