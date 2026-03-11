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
          
          <div className="review-content">
            <h2 className="highlight-title" style={{ padding: 0 }}>{restaurant.name}</h2>
            <div className="review-time" style={{ marginBottom: '16px' }}>{restaurant.location}</div>
            
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
