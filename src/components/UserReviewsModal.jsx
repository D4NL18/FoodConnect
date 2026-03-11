import { X, Star, MapPin } from 'lucide-react';
import { mockReviews, mockRestaurants } from '../data/mockData';

export default function UserReviewsModal({ isOpen, onClose, onReviewClick, userId }) {
  if (!isOpen) return null;

  // Se for 201 considera o hardcoded do Meu Perfil para testes.
  // Mapeia nas mockReviews apenas as reviews do userId informado ou a primeira por padrao pro mock n quebrar.
  // Nota: no mockData, nao temos userId nas reviews, temos o name da pessoa, entao vamos parear via `user.name`
  // Assumindo que o mockPeopleSearch nos daria o name do user para parearmos, porem por seguranca filtramos de forma livre/aleatoria pareada ao ID no mock para exemplo caso nao ache.

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
          <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Avaliações Realizadas</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>
        
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }}>
          {mockReviews
            .filter(r => {
              // Simples mapeamento de IDs de Usuarios Mockados para as Avaliações Mockadas 
              // 201 = Ana Silva (id 302), 205 = João Mendes (id 301), 202 = Pedro Henrique (id 303)
              if (userId === 201) return r.user.name === 'Ana Silva';
              if (userId === 205) return r.user.name === 'João Mendes';
              if (userId === 202) return r.user.name === 'Pedro Henrique';
              // Fallback para outros usuarios pra não ficar vazio
              return r.id === 303; 
            })
            .map((review) => {
            const tempRestId = review.restaurantId || mockRestaurants[0].id; // Fallback se nao tiver restID
            const restInfo = mockRestaurants.find(r => r.id === tempRestId);
            
            return (
              <div 
                key={review.id} 
                style={{ 
                  display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', 
                  padding: '12px', borderRadius: '12px', border: '1px solid #e5e7eb' 
                }}
                onClick={() => {
                  onClose();
                  onReviewClick(review.id); 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={restInfo?.image || review.image} alt="Restaurant" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{review.restaurant}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} /> {restInfo?.location || 'Localização'}
                    </div>
                  </div>
                  <div className="stat-badge rating" style={{ padding: '4px 8px', borderRadius: '6px' }}>
                    <Star size={12} fill="currentColor" /> {review.rating.toFixed(1)}
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#4b5563', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  "{review.text}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
