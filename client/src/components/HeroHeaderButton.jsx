// HeroHeaderButton.jsx
import React from "react";

const HeroHeaderButton = ({ name, className = "", onClickButton, type = "button" }) => {
  return (
    <button
      type={type}
      onClick = {onClickButton}
      className={`button ${className}`}
    >
      {name}
    </button>
  );
};

export default HeroHeaderButton;

