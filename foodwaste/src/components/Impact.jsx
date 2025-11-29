import React, { useState } from 'react'
import '../styles/Impact.css'

function Impact() {
  const [selectedAction, setSelectedAction] = useState('reduce-waste')

  const actions = {
    'reduce-waste': {
      title: 'Reduce Your Food Waste',
      impact: [
        { action: 'Plan meals weekly', saved: 'Save 30% on groceries' },
        { action: 'Check fridge before shopping', saved: '2,000 kg CO2 per year' },
        { action: 'Store food properly', saved: 'Extend shelf life by 2 weeks' },
        { action: 'Use all parts of food', saved: 'Reduce waste by 50%' }
      ]
    },
    'personal-savings': {
      title: 'Personal Savings & Benefits',
      impact: [
        { action: 'Save on grocery bills', saved: 'Average $1,500/year' },
        { action: 'Healthier eating habits', saved: 'Better nutrition & wellness' },
        { action: 'Time efficiency', saved: 'Better meal prep skills' },
        { action: 'Reduced stress', saved: 'Less food guilt & anxiety' }
      ]
    },
    'environmental': {
      title: 'Environmental Impact',
      impact: [
        { action: 'Reduce CO2 emissions', saved: '3.3B tonnes annually prevented' },
        { action: 'Save freshwater', saved: '1/4 of global water usage' },
        { action: 'Protect ecosystems', saved: 'Preserve biodiversity' },
        { action: 'Combat climate change', saved: 'Reduce 8% of global emissions' }
      ]
    },
    'community': {
      title: 'Community & Global Impact',
      impact: [
        { action: 'Feed the hungry', saved: 'Help 821M food insecure people' },
        { action: 'Inspire others', saved: 'Create movement in community' },
        { action: 'Support local farmers', saved: 'Build stronger food systems' },
        { action: 'Achieve SDG goals', saved: 'Progress toward UN goals' }
      ]
    }
  }

  const current = actions[selectedAction]

  return (
    <section className="impact">
      <div className="impact-container">
        <h2>Your Impact Matters</h2>
        <p className="impact-subtitle">See the difference your actions can make</p>

        <div className="action-buttons">
          {Object.keys(actions).map((key) => (
            <button
              key={key}
              className={`action-btn ${selectedAction === key ? 'active' : ''}`}
              onClick={() => setSelectedAction(key)}
            >
              {actions[key].title}
            </button>
          ))}
        </div>

        <div className="impact-content">
          <h3>{current.title}</h3>
          <div className="impact-list">
            {current.impact.map((item, idx) => (
              <div key={idx} className="impact-item">
                <div className="impact-action">
                  <span className="action-icon">✓</span>
                  <p className="action-text">{item.action}</p>
                </div>
                <div className="impact-result">
                  <span className="saved-icon">🌟</span>
                  <p className="saved-text">{item.saved}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="call-to-action">
          <h3>Start Your Journey Today</h3>
          <p>Every action counts. Together, we can reduce food waste and create a sustainable future!</p>
          <div className="pledges">
            <div className="pledge">
              <input type="checkbox" id="pledge1" />
              <label htmlFor="pledge1">I commit to meal planning weekly</label>
            </div>
            <div className="pledge">
              <input type="checkbox" id="pledge2" />
              <label htmlFor="pledge2">I will start composting</label>
            </div>
            <div className="pledge">
              <input type="checkbox" id="pledge3" />
              <label htmlFor="pledge3">I will share excess food with others</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Impact
