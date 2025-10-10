import React from 'react';
import heroImg from '../assets/hero.webp'; // You can put your green-hand image in src/assets/

function Hero() {
  return (
    <section className="hero">
      <div>
        <h2>Human stories & ideas</h2>
        <p>A place to read, write, and deepen your understanding</p>
        <button>Start reading</button>
      </div>
      <img src={heroImg} alt="Hero illustration" />
    </section>
  );
}

export default Hero;

