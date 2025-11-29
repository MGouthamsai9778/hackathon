import React from 'react'
import '../styles/Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-content">
          <h1>Stop Food Waste, Save the Planet</h1>
          <p>Join the movement to reduce food waste and create a sustainable future</p>
          <button className="cta-button">Get Started →</button>
        </div>
        <div className="hero-visual">
          <div className="visual-container">
            <img src="/images/hero-banner.svg" alt="Stop Food Waste" className="hero-image" />
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-box">
          <div className="stat-icon">📊</div>
          <h3>1.3B Tonnes</h3>
          <p>Food wasted annually</p>
        </div>
        <div className="stat-box">
          <div className="stat-icon">🌍</div>
          <h3>10%</h3>
          <p>Of global emissions from food waste</p>
        </div>
        <div className="stat-box">
          <div className="stat-icon">🤝</div>
          <h3>821M</h3>
          <p>People suffering from hunger</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
