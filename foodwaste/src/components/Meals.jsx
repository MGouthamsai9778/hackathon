import React, { useState } from 'react';
import '../styles/Meals.css';

const Meals = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const mealsData = [
    {
      id: 1,
      name: 'Andhra Breakfast',
      items: [
        { name: 'Idli', wastePercent: '12%', tip: 'Store in airtight box; reheat steam', decomposition: '1–2 weeks (cooked)'} ,
        { name: 'Dosa', wastePercent: '15%', tip: 'Keep batter refrigerated; freeze portions', decomposition: '1–2 weeks (cooked)' },
        { name: 'Pesarattu', wastePercent: '14%', tip: 'Use fresh moong dal batter; refrigerate', decomposition: '1–2 weeks (cooked)' },
        { name: 'Upma', wastePercent: '18%', tip: 'Cool quickly and refrigerate', decomposition: '1–2 weeks (cooked)' },
        { name: 'Medu Vada', wastePercent: '16%', tip: 'Store in airtight container to retain crunch', decomposition: '1–2 weeks (cooked)' }
      ],
      icon: '🌅'
    },
    {
      id: 2,
      name: 'Andhra Lunch',
      items: [
        { name: 'Pulihora (Tamarind Rice)', wastePercent: '10%', tip: 'Portion and refrigerate', decomposition: '2–3 weeks' },
        { name: 'Andhra Biryani', wastePercent: '12%', tip: 'Cool quickly; refrigerate within 2 hours', decomposition: '2–3 weeks' },
        { name: 'Sambar', wastePercent: '20%', tip: 'Store in sealed containers', decomposition: '1–2 weeks' },
        { name: 'Chicken Curry', wastePercent: '15%', tip: 'Freeze leftovers for later use', decomposition: '1–2 weeks' },
        { name: 'Steamed Rice', wastePercent: '8%', tip: 'Cool and refrigerate in portions', decomposition: '1–2 weeks (cooked)'}
      ],
      icon: '🌞'
    },
    {
      id: 3,
      name: 'Andhra Dinner',
      items: [
        { name: 'Gongura Pachadi (Chutney)', wastePercent: '8%', tip: 'Small batches; refrigerate', decomposition: '2–3 weeks (pickles last longer)' },
        { name: 'Fish Curry', wastePercent: '14%', tip: 'Consume fresh or freeze quickly', decomposition: '1–2 weeks' },
        { name: 'Dal/Pappu', wastePercent: '9%', tip: 'Cool and refrigerate', decomposition: '1–2 weeks' },
        { name: 'Vegetable Kurma', wastePercent: '12%', tip: 'Use airtight containers', decomposition: '1–2 weeks' },
        { name: 'Roti/Chapati', wastePercent: '10%', tip: 'Store rolled in cloth for a short time or freeze', decomposition: '1–2 weeks (cooked)'}
      ],
      icon: '🌙'
    },
    {
      id: 4,
      name: 'Andhra Snacks',
      items: [
        { name: 'Mirchi Bajji', wastePercent: '22%', tip: 'Consume freshly; refrigerate leftovers', decomposition: '1–2 weeks' },
        { name: 'Murukulu/Chakli', wastePercent: '8%', tip: 'Keep dry in sealed jars', decomposition: 'Several weeks – 1 month (dry snacks)' },
        { name: 'Sundal (Boiled Legumes)', wastePercent: '10%', tip: 'Refrigerate and consume within 2 days', decomposition: '1–2 weeks' },
        { name: 'Banana (ripe)', wastePercent: '28%', tip: 'Use overripe bananas for smoothies or baking', decomposition: '~2 months (peel composts faster)' },
        { name: 'Mysore Pak', wastePercent: '6%', tip: 'Store in cool, dry place', decomposition: '~3 months (confectionery)'}
      ],
      icon: '🍿'
    },
    {
      id: 5,
      name: 'Vegetables (Local)',
      items: [
        { name: 'Brinjal (Eggplant)', wastePercent: '18%', tip: 'Store at cool room temperature', decomposition: '2–3 months (in open composting)' },
        { name: 'Drumstick (Moringa)', wastePercent: '20%', tip: 'Wrap in damp cloth and refrigerate', decomposition: '2–3 months' },
        { name: 'Okra', wastePercent: '22%', tip: 'Use paper towel to reduce moisture', decomposition: '2–3 months' },
        { name: 'Tomato', wastePercent: '25%', tip: 'Store at room temperature until ripe', decomposition: '1–2 months' },
        { name: 'Onion', wastePercent: '10%', tip: 'Store in cool, ventilated space', decomposition: '2–6 months (dry storage)'}
      ],
      icon: '🥬'
    },
    {
      id: 6,
      name: 'Fruits (Local)',
      items: [
        { name: 'Mango', wastePercent: '18%', tip: 'Ripen at room temp; refrigerate when ripe', decomposition: '2–6 months (varies by seed/skin)' },
        { name: 'Jackfruit', wastePercent: '14%', tip: 'Portion and freeze', decomposition: '2–3 months (large fruit parts)' },
        { name: 'Papaya', wastePercent: '16%', tip: 'Use ripe pieces quickly or freeze', decomposition: '1–3 months' },
        { name: 'Guava', wastePercent: '20%', tip: 'Consume when firm or refrigerate', decomposition: '1–2 months' },
        { name: 'Coconut (inner flesh)', wastePercent: '8%', tip: 'Dry or refrigerate the fresh flesh', decomposition: 'Several months (dried)'}
      ],
      icon: '🍎'
    }
  ];

  return (
    <section id="meals" className="meals-section">
      <div className="meals-container">
        <h2 className="section-title">Food Items & Storage Tips</h2>
        <p className="section-subtitle">Learn how to properly store common food items to reduce waste</p>

        <div className="meals-grid">
          {mealsData.map((meal) => (
            <div
              key={meal.id}
              className={`meal-card ${selectedMeal?.id === meal.id ? 'active' : ''}`}
              onClick={() => setSelectedMeal(selectedMeal?.id === meal.id ? null : meal)}
            >
              <div className="meal-header">
                <span className="meal-icon">{meal.icon}</span>
                <h3 className="meal-title">{meal.name}</h3>
                <span className="meal-count">{meal.items.length} items</span>
              </div>

              {selectedMeal?.id === meal.id && (
                <div className="meal-items">
                  {meal.items.map((item, index) => (
                    <div key={index} className="food-item">
                      <div className="item-header">
                        <span className="item-name">{item.name}</span>
                        <span className="waste-badge">{item.wastePercent} waste</span>
                      </div>
                      <p className="item-tip">💡 {item.tip}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="storage-tips">
          <h3>🏠 General Storage Rules</h3>
          <ul>
            <li>Keep refrigerator at 40°F (4°C) or below</li>
            <li>Use "First In, First Out" (FIFO) method</li>
            <li>Separate ethylene-producing fruits from others</li>
            <li>Label containers with dates</li>
            <li>Store raw meat on bottom shelf to prevent drips</li>
            <li>Keep leftovers in airtight containers</li>
            <li>Freeze items before they expire</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Meals;
