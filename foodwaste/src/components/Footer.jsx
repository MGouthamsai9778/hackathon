import React, { useState } from 'react'
import '../styles/Footer.css'

function Footer() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState('')

  // Nearby search state (for Connect modal)
  const [geoLoading, setGeoLoading] = useState(false)
  const [results, setResults] = useState([])
  const [searchLocation, setSearchLocation] = useState('')
  const [searchError, setSearchError] = useState('')
  const [coords, setCoords] = useState(null)

  const openModal = (key) => {
    setModalKey(key)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalKey('')
  }

  const modalContent = {
    about: (
      <div>
        <h3>About</h3>
        <p><strong>Mission:</strong> Reduce food waste by educating households, communities, and businesses with practical, culturally relevant guidance.</p>
        <p><strong>Vision:</strong> A future where surplus food is redistributed, organic waste is composted locally, and families save money while protecting the climate.</p>
        <p><strong>What we do:</strong> Provide state-level data, storage tips, quizzes, and community actions to turn awareness into measurable reduction.</p>
      </div>
    ),
    quicklines: (
      <div>
        <h3>Quicklines</h3>
        <ul>
          <li>Store cooked rice and dals in shallow containers to cool quickly and refrigerate.</li>
          <li>Small changes at home can cut food waste by up to 30%.</li>
          <li>Freeze extra portions within 2 hours to avoid spoilage.</li>
          <li>Use FIFO — label and rotate food by date.</li>
          <li>Try a “Zero-Waste Meal” once a week and log the leftovers saved.</li>
        </ul>
      </div>
    ),
    resources: (
      <div>
        <h3>Resources</h3>
        <ul>
          <li>Practical storage & preservation guide (printable checklist)</li>
          <li>Local partners: food banks, cold-storage co-ops, municipal compost hubs</li>
          <li>Explainers on cold chain, post-harvest loss, and home composting</li>
          <li>Tools: household waste & savings calculators</li>
          <li>Downloads: meal planning template and leftover recipe cards (PDF)</li>
        </ul>
      </div>
    ),
    connect: (
      <div>
        <h3>Connect</h3>
        <div className="tf-list">
          <h4>Toll-free numbers</h4>
          <ul>
            <li>National Food Helpline: 1800-123-FOOD (1800-123-3663)</li>
            <li>Compost Support: 1800-456-COMP (1800-456-2667)</li>
            <li>Redistribution & Food Banks: 1800-789-SHARE (1800-789-7427)</li>
          </ul>
        </div>

        <div className="finder">
          <h4>Find old-age homes near you</h4>
          <p className="finder-note">Use your browser location or enter a city/locality and press Search.</p>
          <div className="finder-controls">
            <input
              type="text"
              placeholder="Enter city or locality (optional)"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button onClick={async () => { await handleSearch(); }}>Search</button>
            <button className="secondary" onClick={useMyLocation}>Use my location</button>
          </div>

          {geoLoading && <p>Searching nearby places…</p>}
          {searchError && <p className="error">{searchError}</p>}

          <div className="finder-results">
            {results.length === 0 && !geoLoading && <p>No results yet.</p>}
            {results.map((r, idx) => (
              <div key={idx} className="finder-item">
                <h5>{r.display_name.split(',')[0]}</h5>
                <p className="small">{r.display_name}</p>
                {r.distanceKm !== undefined && <p className="small">{r.distanceKm.toFixed(2)} km away</p>}
                <a href={`https://www.openstreetmap.org/?mlat=${r.lat}&mlon=${r.lon}#map=18/${r.lat}/${r.lon}`} target="_blank" rel="noreferrer">Open in map</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Helper: compute haversine distance in km
  const haversineKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180
    const R = 6371
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Compute small viewbox around coords (km radius)
  const makeViewbox = (lat, lon, km=10) => {
    const latDelta = km / 111
    const lonDelta = km / (111 * Math.cos(lat * Math.PI / 180))
    const left = lon - lonDelta
    const right = lon + lonDelta
    const top = lat + latDelta
    const bottom = lat - latDelta
    return `${left},${top},${right},${bottom}`
  }

  async function useMyLocation() {
    setSearchError('')
    setGeoLoading(true)
    setResults([])
    if (!navigator.geolocation) {
      setSearchError('Geolocation not supported in this browser.')
      setGeoLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      setCoords({ lat, lon })
      await fetchNearby(lat, lon)
    }, (err) => {
      setSearchError('Unable to retrieve location: ' + err.message)
      setGeoLoading(false)
    }, { enableHighAccuracy: true, timeout: 10000 })
  }

  async function handleSearch() {
    setSearchError('')
    setGeoLoading(true)
    setResults([])
    // If user provided a location string, try to geocode it first
    if (searchLocation && searchLocation.trim().length > 2) {
      try {
        const resp = await fetch(`https://nominatim.openstreetmap.org/search.php?format=json&q=${encodeURIComponent(searchLocation)}&limit=1`)
        const data = await resp.json()
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat)
          const lon = parseFloat(data[0].lon)
          setCoords({ lat, lon })
          await fetchNearby(lat, lon)
          return
        }
      } catch (e) {
        // fallthrough to geolocation
      }
    }

    // fallback to geolocation
    await useMyLocation()
  }

  async function fetchNearby(lat, lon) {
    try {
      const viewbox = makeViewbox(lat, lon, 10)
      const q = encodeURIComponent('old age home')
      const url = `https://nominatim.openstreetmap.org/search.php?format=json&q=${q}&viewbox=${viewbox}&bounded=1&limit=12`
      const resp = await fetch(url, { headers: { 'Accept-Language': 'en' } })
      const data = await resp.json()
      // compute distances
      const withDist = data.map((item) => ({ ...item, distanceKm: haversineKm(lat, lon, parseFloat(item.lat), parseFloat(item.lon)) }))
      setResults(withDist.sort((a,b) => a.distanceKm - b.distanceKm))
    } catch (e) {
      setSearchError('Search failed: ' + e.message)
    } finally {
      setGeoLoading(false)
    }
  }

  return (
    <footer className="footer">
      <div className="footer-banner">
        <img src="/images/footer-banner.svg" alt="Together we can make a difference" />
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <button className="header-btn" onClick={() => openModal('about')}>About</button>
          <p>Food Waste Reduction Awareness is dedicated to educating and empowering individuals to reduce food waste and create a sustainable future.</p>
        </div>

        <div className="footer-section">
          <button className="header-btn" onClick={() => openModal('quicklines')}>Quicklines</button>
          <ul>
            <li>Store cooked rice and dals in shallow containers to cool quickly and refrigerate.</li>
            <li>Small changes at home can cut food waste by up to 30%.</li>
            <li>Freeze extra portions within 2 hours to avoid spoilage.</li>
          </ul>
        </div>

        <div className="footer-section">
          <button className="header-btn" onClick={() => openModal('resources')}>Resources</button>
          <ul>
            <li>Practical guides & local partners</li>
            <li>Household waste calculators</li>
            <li>Downloads: planner, recipe cards</li>
          </ul>
        </div>

        <div className="footer-section">
          <button className="header-btn" onClick={() => openModal('connect')}>Connect</button>
          <ul>
            <li>Volunteer or start a compost circle</li>
            <li>Follow us on social for tips</li>
            <li>Contact: hello@foodwaste.example</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Food Waste Reduction Awareness. All rights reserved.</p>
        <p>Together we can make a difference! 🌍</p>
      </div>

      {modalOpen && (
        <div className="fw-modal-overlay" onClick={closeModal}>
          <div className="fw-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fw-modal-close" onClick={closeModal}>×</button>
            <div className="fw-modal-body">{modalContent[modalKey]}</div>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
