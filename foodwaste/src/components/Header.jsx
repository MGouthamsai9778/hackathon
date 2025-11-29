import React from 'react'
import '../styles/Header.css'

function Header({ activeTab, setActiveTab, isAuthenticated, user, onAuthClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🌍 Food Waste Awareness</h1>
        </div>
        <nav className="nav">
          <button 
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${activeTab === 'states' ? 'active' : ''}`}
            onClick={() => setActiveTab('states')}
          >
            By State
          </button>
          <button 
            className={`nav-btn ${activeTab === 'impact' ? 'active' : ''}`}
            onClick={() => setActiveTab('impact')}
          >
            Impact
          </button>
          <button 
            className={`nav-btn ${activeTab === 'meals' ? 'active' : ''}`}
            onClick={() => setActiveTab('meals')}
          >
            Meals & Storage
          </button>
          <button 
            className={`nav-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            Quiz
          </button>
          
          {isAuthenticated ? (
            <button 
              className={`nav-btn profile-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
              title={user?.fullName}
            >
              👤 {user?.fullName?.split(' ')[0]}
            </button>
          ) : (
            <button 
              className="nav-btn auth-btn"
              onClick={onAuthClick}
            >
              🔐 Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
