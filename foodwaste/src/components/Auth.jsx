import React, { useState } from 'react'
import '../styles/Auth.css'

function Auth({ onLogin, isAuthenticated, user, onLogout }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    state: '',
    age: ''
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'demo123',
      fullName: 'Demo User',
      state: 'California',
      age: '25'
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return
    }

    if (isSignUp && !formData.fullName) {
      setError('Full name is required for signup')
      return
    }

    const userData = {
      id: Date.now(),
      email: formData.email,
      fullName: formData.fullName || formData.email.split('@')[0],
      state: formData.state || 'Not specified',
      age: formData.age || 'Not specified',
      joinDate: new Date().toLocaleDateString()
    }

    // Show success message
    const action = isSignUp ? 'Account Created' : 'Login Successful'
    const message = isSignUp 
      ? `Welcome ${userData.fullName}! Your account has been created successfully. 🎉`
      : `Welcome back ${userData.fullName}! You have logged in successfully. ✅`
    
    setSuccessMessage(message)
    setShowSuccess(true)
    
    // Call onLogin after showing success message
    setTimeout(() => {
      onLogin(userData)
      setFormData({
        email: '',
        password: '',
        fullName: '',
        state: '',
        age: ''
      })
    }, 1500)
  }

  if (isAuthenticated && user) {
    return (
      <div className="auth-container">
        <div className="user-profile">
          <div className="profile-header">
            <div className="profile-avatar">{user.fullName.charAt(0).toUpperCase()}</div>
            <div className="profile-info">
              <h3>{user.fullName}</h3>
              <p className="profile-email">{user.email}</p>
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">📍 State:</span>
              <span className="detail-value">{user.state}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">🎂 Age:</span>
              <span className="detail-value">{user.age}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">📅 Member Since:</span>
              <span className="detail-value">{user.joinDate}</span>
            </div>
          </div>

          <div className="user-stats">
            <h4>Your Impact</h4>
            <div className="stats-grid">
              <div className="stat">
                <span className="stat-number">12</span>
                <span className="stat-label">Tips Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Quizzes Taken</span>
              </div>
              <div className="stat">
                <span className="stat-number">23 kg</span>
                <span className="stat-label">Waste Reduced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-message-box">
            <div className="success-icon">✅</div>
            <h2>{successMessage.split('!')[0]}!</h2>
            <p>{successMessage}</p>
            <div className="success-animation"></div>
          </div>
        </div>
      )}

      <div className="auth-wrapper">
        {/* Left Side - Image and Message */}
        <div className="auth-left-section">
          <div className="left-content">
            <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" className="auth-illustration">
              <defs>
                <linearGradient id="authGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#51cf66', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#40c057', stopOpacity:1}} />
                </linearGradient>
              </defs>

              {/* Background */}
              <rect width="400" height="500" fill="rgba(200, 220, 200, 0.1)"/>

              {/* Top Section - Trash/Waste */}
              <g>
                {/* Trash bin */}
                <rect x="280" y="30" width="80" height="90" rx="5" fill="#888" stroke="#444" strokeWidth="2"/>
                <rect x="275" y="20" width="90" height="20" rx="3" fill="#666" stroke="#444" strokeWidth="2"/>
                
                {/* Lid handle */}
                <path d="M 305 20 Q 320 5 335 20" stroke="#444" strokeWidth="2" fill="none"/>
                
                {/* Wasted food items in/around trash */}
                {/* Banana peel - falling */}
                <path d="M 300 60 Q 305 80 310 110" stroke="#ffd43b" strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round"/>
                <circle cx="310" cy="115" r="5" fill="#ffd43b" opacity="0.7"/>
                
                {/* Apple - falling */}
                <circle cx="330" cy="50" r="12" fill="#ff6b6b" opacity="0.7"/>
                <path d="M 330 37 L 332 35" stroke="#51cf66" strokeWidth="1"/>
                
                {/* Bread - thrown */}
                <rect x="290" y="40" width="20" height="15" rx="3" fill="#d4a574" opacity="0.6" transform="rotate(-30 300 47)"/>
                
                {/* Carrot - thrown */}
                <polygon points="340,70 355,60 350,85" fill="#ff922b" opacity="0.6"/>
              </g>

              {/* Middle Section - Comparison Arrow */}
              <g>
                <line x1="50" y1="200" x2="350" y2="200" stroke="#999" strokeWidth="2" strokeDasharray="5,5" opacity="0.5"/>
                <text x="200" y="190" fontSize="14" textAnchor="middle" fill="#666" fontWeight="bold">Stop Wasting</text>
              </g>

              {/* Bottom Section - Sustainable Living */}
              <g>
                {/* Growing plant with more detail */}
                <line x1="80" y1="380" x2="80" y2="280" stroke="#51cf66" strokeWidth="8" strokeLinecap="round"/>
                <circle cx="80" cy="390" r="18" fill="#8B7355"/>
                
                {/* Soil layers */}
                <ellipse cx="80" cy="400" rx="25" ry="8" fill="#704d26" opacity="0.6"/>
                
                {/* Left leaf */}
                <ellipse cx="50" cy="340" rx="30" ry="45" fill="#51cf66" transform="rotate(-50 50 340)"/>
                <line x1="50" y1="340" x2="50" y2="365" stroke="#40c057" strokeWidth="2"/>
                
                {/* Middle leaf */}
                <ellipse cx="80" cy="310" rx="35" ry="55" fill="#40c057" transform="rotate(0 80 310)"/>
                <line x1="80" y1="310" x2="80" y2="340" stroke="#2d8a2d" strokeWidth="2"/>
                
                {/* Right leaf */}
                <ellipse cx="110" cy="340" rx="30" ry="45" fill="#51cf66" transform="rotate(50 110 340)"/>
                <line x1="110" y1="340" x2="110" y2="365" stroke="#40c057" strokeWidth="2"/>
                
                {/* Top flowers */}
                <circle cx="80" cy="270" r="12" fill="#ff69b4"/>
                <circle cx="65" cy="290" r="10" fill="#ff1493"/>
                <circle cx="95" cy="290" r="10" fill="#ff69b4"/>
              </g>

              {/* Right Side - Saved Food Items (Preserved) */}
              <g>
                {/* Food preservation container */}
                <rect x="240" y="280" width="130" height="100" rx="8" fill="rgba(81, 207, 102, 0.2)" stroke="#51cf66" strokeWidth="2" strokeDasharray="5,5"/>
                
                {/* Preserved items */}
                {/* Vegetables */}
                <circle cx="260" cy="310" r="10" fill="#51cf66"/>
                <line x1="260" y1="295" x2="260" y2="300" stroke="#2d8a2d" strokeWidth="1"/>
                
                {/* Apple preserved */}
                <circle cx="290" cy="320" r="11" fill="#ff6b6b" opacity="0.8"/>
                
                {/* Carrots preserved */}
                <polygon points="320,330 335,320 330,345" fill="#ff922b" opacity="0.8"/>
                
                {/* Tomato preserved */}
                <circle cx="310" cy="300" r="9" fill="#ff6b6b" opacity="0.8"/>
                
                {/* Berries preserved */}
                <circle cx="265" cy="360" r="7" fill="#a64d79"/>
                <circle cx="275" cy="365" r="7" fill="#a64d79"/>
                <circle cx="285" cy="362" r="7" fill="#a64d79"/>
                
                {/* Label */}
                <text x="305" y="370" fontSize="12" textAnchor="middle" fill="#51cf66" fontWeight="bold">Saved</text>
              </g>

              {/* Center message with checkmark */}
              <g>
                <circle cx="200" cy="240" r="35" fill="rgba(81, 207, 102, 0.15)" stroke="#51cf66" strokeWidth="2"/>
                <text x="200" y="250" fontSize="40" textAnchor="middle" fill="#51cf66">✓</text>
              </g>

              {/* Bottom text */}
              <text x="200" y="470" fontSize="18" textAnchor="middle" fill="#51cf66" fontWeight="bold">
                Reduce Waste, Save Future
              </text>
            </svg>

            <div className="left-message">
              <h2>🌱 Food Waste Reduction</h2>
              <p>Join thousands making a difference. Reduce food waste, save money, and help protect our planet.</p>
              <ul className="benefits-list">
                <li>💰 Save money on groceries</li>
                <li>🌍 Reduce environmental impact</li>
                <li>📚 Learn practical tips</li>
                <li>👥 Join a community</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-right-section">
          <div className="auth-form-wrapper">
        <div className="auth-header">
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignUp ? 'Join our community' : 'Sign in to your account'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          {isSignUp && (
            <>
              <div className="form-group">
                <label htmlFor="state">State (Optional)</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select your state</option>
                  <option value="California">California</option>
                  <option value="Texas">Texas</option>
                  <option value="Florida">Florida</option>
                  <option value="New York">New York</option>
                  <option value="Illinois">Illinois</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                  <option value="Ohio">Ohio</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="age">Age (Optional)</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="13"
                  max="120"
                />
              </div>
            </>
          )}

          <button type="submit" className="auth-btn">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          {!isSignUp && (
            <button type="button" className="demo-btn" onClick={handleDemoLogin}>
              📝 Use Demo Account
            </button>
          )}
        </form>

        <div className="auth-footer">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              type="button"
              className="toggle-btn"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
                setFormData({
                  email: '',
                  password: '',
                  fullName: '',
                  state: '',
                  age: ''
                })
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="waste-message">
          <div className="message-content">
            <div className="message-icon">🌱</div>
            <h3>Join the Movement</h3>
            <p>Every small action counts. Help reduce food waste and create a sustainable future for our planet.</p>
            <div className="message-stats">
              <div className="mini-stat">
                <span className="mini-icon">♻️</span>
                <span>1.3B tonnes saved potential</span>
              </div>
              <div className="mini-stat">
                <span className="mini-icon">🌍</span>
                <span>Global impact awaits</span>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
