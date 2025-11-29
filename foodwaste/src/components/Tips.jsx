import React, { useState } from 'react'
import '../styles/Tips.css'

function Tips() {
  const [expandedTip, setExpandedTip] = useState(null)

  const tips = [
    {
      category: 'Planning',
      icon: '📋',
      title: 'Plan Your Meals',
      description: 'Create a weekly meal plan to know exactly what you need. This prevents impulse buying and reduces waste by up to 30%.'
    },
    {
      category: 'Shopping',
      icon: '🛒',
      title: 'Smart Shopping',
      description: 'Buy only what you need, check expiry dates, and use a shopping list. Buy in bulk for non-perishables only.'
    },
    {
      category: 'Storage',
      icon: '❄️',
      title: 'Proper Storage',
      description: 'Store fruits and vegetables correctly. Keep herbs fresh in water, store potatoes away from onions, and organize your fridge.'
    },
    {
      category: 'Cooking',
      icon: '👨‍🍳',
      title: 'Use Everything',
      description: 'Use vegetable scraps for stock, eat peels where possible, and get creative with leftovers. Save broccoli stems, carrot tops, and more.'
    },
    {
      category: 'Community',
      icon: '🤝',
      title: 'Share & Donate',
      description: 'Join food sharing programs, donate surplus to food banks, and connect with neighbors. Apps like OLIO help share excess food.'
    },
    {
      category: 'Composting',
      icon: '♻️',
      title: 'Compost Scraps',
      description: 'Compost unavoidable food waste. This reduces methane in landfills and creates nutrient-rich soil for gardens.'
    }
  ]

  return (
    <section className="tips">
      <h2>Practical Tips to Reduce Food Waste</h2>
      <div className="tips-grid">
        {tips.map((tip, idx) => (
          <div 
            key={idx} 
            className={`tip-card ${expandedTip === idx ? 'expanded' : ''}`}
            onClick={() => setExpandedTip(expandedTip === idx ? null : idx)}
          >
            <div className="tip-header">
              <span className="tip-icon">{tip.icon}</span>
              <div className="tip-title-section">
                <span className="tip-category">{tip.category}</span>
                <h3>{tip.title}</h3>
              </div>
            </div>
            {expandedTip === idx && (
              <div className="tip-description">
                <p>{tip.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Tips
