import React, { useState } from 'react'
import '../styles/StateWaste.css'

function StateWaste() {
  const [selectedState, setSelectedState] = useState(null)

  const stateWasteData = [
    {
      id: 1,
      state: 'Uttar Pradesh',
      wastePercentage: 22.4,
      totalWaste: '5.8M tonnes',
      breakdown: {
        residential: 50,
        commercial: 28,
        agricultural: 22
      },
      mainContributors: ['Grains (Wheat, Rice)', 'Fruits & Vegetables', 'Dairy'],
      initiatives: 'Community composting, cold‑chain pilot projects, surplus distribution drives'
    },
    {
      id: 2,
      state: 'Maharashtra',
      wastePercentage: 18.7,
      totalWaste: '4.9M tonnes',
      breakdown: {
        residential: 47,
        commercial: 31,
        agricultural: 22
      },
      mainContributors: ['Fruits & Vegetables', 'Grains', 'Seafood (coastal areas)'],
      initiatives: 'Urban food rescue networks and market waste segregation'
    },
    {
      id: 3,
      state: 'Bihar',
      wastePercentage: 16.3,
      totalWaste: '4.3M tonnes',
      breakdown: {
        residential: 49,
        commercial: 29,
        agricultural: 22
      },
      mainContributors: ['Rice & Pulses', 'Vegetables', 'Dairy'],
      initiatives: 'Farmer training on storage and local collection hubs'
    },
    {
      id: 4,
      state: 'West Bengal',
      wastePercentage: 15.1,
      totalWaste: '3.9M tonnes',
      breakdown: {
        residential: 46,
        commercial: 34,
        agricultural: 20
      },
      mainContributors: ['Rice', 'Fruits & Vegetables', 'Fish & Seafood'],
      initiatives: 'Cold storage expansion and community redistribution'
    },
    {
      id: 5,
      state: 'Madhya Pradesh',
      wastePercentage: 13.8,
      totalWaste: '3.6M tonnes',
      breakdown: {
        residential: 44,
        commercial: 34,
        agricultural: 22
      },
      mainContributors: ['Grains', 'Vegetables', 'Processed Goods'],
      initiatives: 'Decentralized compost units and village-level awareness'
    },
    {
      id: 6,
      state: 'Tamil Nadu',
      wastePercentage: 12.9,
      totalWaste: '3.2M tonnes',
      breakdown: {
        residential: 45,
        commercial: 35,
        agricultural: 20
      },
      mainContributors: ['Rice', 'Coconut & Vegetables', 'Dairy'],
      initiatives: 'Municipal segregation pilots and canteen waste programs'
    },
    {
      id: 7,
      state: 'Karnataka',
      wastePercentage: 12.2,
      totalWaste: '3.0M tonnes',
      breakdown: {
        residential: 43,
        commercial: 37,
        agricultural: 20
      },
      mainContributors: ['Grains', 'Fruits & Vegetables', 'Meat & Poultry'],
      initiatives: 'Tech-enabled redistribution platforms and farm storage incentives'
    },
    {
      id: 8,
      state: 'Gujarat',
      wastePercentage: 11.6,
      totalWaste: '2.7M tonnes',
      breakdown: {
        residential: 42,
        commercial: 38,
        agricultural: 20
      },
      mainContributors: ['Vegetables', 'Dairy', 'Processed Foods'],
      initiatives: 'Cold-chain partners and food bank partnerships'
    }
  ]

  return (
    <section className="state-waste">
      <div className="state-container">
        <h2>Food Waste by State (India)</h2>
        <p className="section-subtitle">Explore food waste patterns across major Indian states</p>

        <div className="state-grid">
          {stateWasteData.map((data) => (
            <div
              key={data.id}
              className={`state-card ${selectedState?.id === data.id ? 'active' : ''}`}
              onClick={() => setSelectedState(selectedState?.id === data.id ? null : data)}
            >
              <div className="state-header">
                <h3>{data.state}</h3>
                <div className="waste-indicator">
                  <div 
                    className="waste-bar" 
                    style={{ width: `${data.wastePercentage}%` }}
                  ></div>
                </div>
                <span className="waste-text">{data.wastePercentage}% of national waste</span>
              </div>

              {selectedState?.id === data.id && (
                <div className="state-details">
                  <div className="detail-row">
                    <span className="label">Total Annual Waste:</span>
                    <span className="value">{data.totalWaste}</span>
                  </div>

                  <div className="breakdown">
                    <h4>Waste Breakdown:</h4>
                    <div className="breakdown-chart">
                      <div className="breakdown-item">
                        <span>Residential: {data.breakdown.residential}%</span>
                        <div className="breakdown-bar">
                          <div 
                            className="breakdown-fill residential"
                            style={{ width: `${data.breakdown.residential}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="breakdown-item">
                        <span>Commercial: {data.breakdown.commercial}%</span>
                        <div className="breakdown-bar">
                          <div 
                            className="breakdown-fill commercial"
                            style={{ width: `${data.breakdown.commercial}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="breakdown-item">
                        <span>Agricultural: {data.breakdown.agricultural}%</span>
                        <div className="breakdown-bar">
                          <div 
                            className="breakdown-fill agricultural"
                            style={{ width: `${data.breakdown.agricultural}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="contributors">
                    <h4>Main Waste Contributors:</h4>
                    <ul>
                      {data.mainContributors.map((contributor, idx) => (
                        <li key={idx}>✓ {contributor}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="initiatives">
                    <h4>Local Initiatives:</h4>
                    <p>{data.initiatives}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="state-insights">
          <h3>Key Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <span className="insight-icon">📊</span>
              <h4>Highest Waste</h4>
              <p>Uttar Pradesh leads in estimated waste share, driven by large population and agricultural losses</p>
            </div>
            <div className="insight-card">
              <span className="insight-icon">🏙️</span>
              <h4>Urban vs Rural</h4>
              <p>Urban centres show higher residential and commercial waste, while rural areas lose more at post-harvest stages</p>
            </div>
            <div className="insight-card">
              <span className="insight-icon">🌱</span>
              <h4>Regional Solutions</h4>
              <p>States adopt local approaches: cold storage, redistribution, and decentralized composting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StateWaste
