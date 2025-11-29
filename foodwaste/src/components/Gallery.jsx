import React from 'react'
import '../styles/Gallery.css'

function Gallery() {
  const images = [
    {
      id: 1,
      title: 'Stop Food Waste',
      src: '/images/hero-banner.svg',
      description: 'Join the movement to reduce food waste'
    },
    {
      id: 2,
      title: 'Waste Statistics',
      src: '/images/statistics-chart.svg',
      description: 'See the impact of food waste worldwide'
    },
    {
      id: 3,
      title: 'Practical Tips',
      src: '/images/tips-illustration.svg',
      description: 'Learn practical ways to reduce waste'
    },
    {
      id: 4,
      title: 'Environmental Impact',
      src: '/images/impact-earth.svg',
      description: 'Your actions create global impact'
    },
    {
      id: 5,
      title: 'Test Your Knowledge',
      src: '/images/quiz-questions.svg',
      description: 'Take our awareness quiz'
    }
  ]

  return (
    <section className="gallery">
      <div className="gallery-container">
        <h2>Visual Journey Through Our Platform</h2>
        <p className="gallery-subtitle">Explore our interactive resources</p>
        
        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image.id} className="gallery-card">
              <div className="image-wrapper">
                <img src={image.src} alt={image.title} loading="lazy" />
              </div>
              <div className="image-info">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
