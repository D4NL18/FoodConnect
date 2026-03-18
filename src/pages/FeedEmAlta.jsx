import { mockRestaurants } from '../data/mockData';
import { Star, Banknote } from 'lucide-react';

export default function FeedEmAlta({ onRestaurantClick }) {
  const topRestaurants = [mockRestaurants[1], mockRestaurants[0]];

  return (
    <div>
      {topRestaurants.map((restaurant, index) => (
        <div key={restaurant.id} className="card relative-img" style={{ cursor: 'pointer' }} onClick={() => onRestaurantClick(restaurant.id)}>
          <div className="ranking-badge">#{index + 1}</div>
          <img src={restaurant.image} alt={restaurant.name} className="review-image" style={{ height: '300px' }} />
          
          <div style={{ padding: '20px' }}>
            <h2 className="highlight-title" style={{ padding: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {restaurant.name}
              {restaurant.handle && <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>{restaurant.handle}</span>}
            </h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#6b7280', fontSize: '14px', marginTop: '8px', marginBottom: '12px' }}>{restaurant.location}</div>
            
            <div className="review-stats">
              <div className="stat-badge rating">
                <Star size={14} fill="currentColor" />
                {restaurant.rating.toFixed(1)}
              </div>
              <div className="stat-badge">
                <Banknote size={14} />
                {restaurant.priceRange}
              </div>
            </div>
            
            <button className="btn-primary">Ver Cardápio Completo</button>
          </div>
        </div>
      ))}
    </div>
  );
}
