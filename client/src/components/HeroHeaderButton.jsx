// HeroHeaderButton.jsx
import React from "react";

const HeroHeaderButton = ({ name, className = "", onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className}`}
    >
      {name}
    </button>
  );
};

export default HeroHeaderButton;

