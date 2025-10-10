import React from 'react';

function Header() {
  return (
    <header>
      <h1>Medium</h1>
      <nav>
        <a href="#">Our story</a>
        <a href="#">Membership</a>
        <a href="#">Write</a>
        <a href="#">Sign in</a>
        <button className="cta">Get started</button>
      </nav>
    </header>
  );
}

export default Header;
