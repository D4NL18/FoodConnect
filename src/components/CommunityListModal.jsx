import { X } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';

export default function CommunityListModal({ isOpen, onClose, list, onRestaurantClick }) {
  if (!isOpen || !list) return null;

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
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{list.name}</h2>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>Por {list.author}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', alignSelf: 'flex-start' }}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }}>
          {(list.restaurants || []).length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '20px' }}>Nenhum restaurante nesta lista.</p>
          ) : (
            (list.restaurants || []).map(restId => {
              const restaurant = mockRestaurants.find(r => r.id === restId);
              if (!restaurant) return null;
              return (
                <div 
                  key={restaurant.id} 
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f9fafb', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => {
                    onClose();
                    onRestaurantClick && onRestaurantClick(restaurant.id);
                  }}
                >
                  <img src={restaurant.image} alt={restaurant.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{restaurant.name}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{restaurant.location}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
