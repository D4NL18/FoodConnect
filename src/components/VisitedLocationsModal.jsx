import { X, Navigation } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';

export default function VisitedLocationsModal({ isOpen, onClose, onRestaurantClick }) {
  if (!isOpen) return null;

  // Mock array to pretend these are the visited ones
  const visitedRestaurants = mockRestaurants.slice(0, 5); // Just giving first 5 as visited example

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'white', padding: '24px', borderRadius: '16px',
        width: '100%', maxWidth: '400px', maxHeight: '80vh', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Locais Visitados</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }}>
          {visitedRestaurants.map(restaurant => (
            <div 
              key={restaurant.id} 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px', borderRadius: '8px', background: '#f9fafb' }}
              onClick={() => {
                onClose();
                onRestaurantClick(restaurant.id);
              }}
            >
              <img src={restaurant.image} alt={restaurant.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>{restaurant.name}</div>
                <div style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Navigation size={12} /> {restaurant.distance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
