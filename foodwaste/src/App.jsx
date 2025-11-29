import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Statistics from './components/Statistics'
import Tips from './components/Tips'
import Impact from './components/Impact'
import Quiz from './components/Quiz'
import Meals from './components/Meals'
import StateWaste from './components/StateWaste'
import Gallery from './components/Gallery'
import Auth from './components/Auth'
import Footer from './components/Footer'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    setActiveTab('home')
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setActiveTab('home')
  }

  const handleAuthClick = () => {
    setActiveTab('auth')
  }

  if (!isAuthenticated && activeTab === 'auth') {
    return (
      <div className="app">
        <Auth 
          onLogin={handleLogin}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
        />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="app">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isAuthenticated={isAuthenticated}
          user={user}
          onAuthClick={handleAuthClick}
        />
        
        <div className="restricted-message">
          <div className="restricted-content">
            <h2>🔒 Access Restricted</h2>
            <p>Please sign in to explore all features of our platform</p>
            <button className="signin-btn" onClick={handleAuthClick}>Sign In Now</button>
          </div>
        </div>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="app">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        user={user}
        onAuthClick={handleAuthClick}
      />
      
      {activeTab === 'profile' && (
        <Auth 
          onLogin={handleLogin}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      {activeTab === 'home' && (
        <>
          <Hero />
          <Statistics />
          <Tips />
          <Gallery />
          <Meals />
        </>
      )}
      
      {activeTab === 'states' && <StateWaste />}
      {activeTab === 'impact' && <Impact />}
      {activeTab === 'quiz' && <Quiz />}
      {activeTab === 'meals' && <Meals />}
      
      <Footer />
    </div>
  )
}

export default App
