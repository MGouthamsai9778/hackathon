import React from 'react'
import '../styles/Statistics.css'

function Statistics() {
  const stats = [
    {
      title: 'Environmental Impact',
      items: [
        '🌱 Food waste produces 3.3 billion tonnes of CO2 annually',
        '💧 Uses 1/4 of the world\'s freshwater',
        '🌳 Causes habitat destruction & biodiversity loss'
      ]
    },
    {
      title: 'Economic Loss',
      items: [
        '💰 $1 trillion lost globally per year',
        '📉 Farmers lose significant income',
        '🏪 Retailers waste substantial products'
      ]
    },
    {
      title: 'Social Impact',
      items: [
        '🍽️ 821 million people face hunger',
        '👨‍👩‍👧‍👦 Inequality in food distribution',
        '⚖️ Global food insecurity crisis'
      ]
    }
  ]

  return (
    <section className="statistics">
      <h2>Why Food Waste Matters</h2>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <h3>{stat.title}</h3>
            <ul>
              {stat.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Statistics
