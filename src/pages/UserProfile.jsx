import { useState } from 'react';
import { ArrowLeft, Heart, Navigation, Star } from 'lucide-react';
import { mockPeopleSearch, mockRestaurants, mockReviews } from '../data/mockData';
import FollowersModal from '../components/FollowersModal';
import FavoriteListsModal from '../components/FavoriteListsModal';
import FavoriteRestaurantsModal from '../components/FavoriteRestaurantsModal';
import VisitedLocationsModal from '../components/VisitedLocationsModal';
import UserReviewsModal from '../components/UserReviewsModal';

export default function UserProfile({ userId, onBack, onRestaurantClick, onPostClick }) {
  const user = mockPeopleSearch.find(u => u.id === userId);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isListsModalOpen, setIsListsModalOpen] = useState(false);
  const [isVisitedModalOpen, setIsVisitedModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  if (!user) return <div>Usuário não encontrado.</div>;

  return (
    <div>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-secondary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{user.name} <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-muted)' }}>({user.handle})</span></h1>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{user.tastes?.join(' · ')}</div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div 
                  style={{ cursor: 'pointer', textDecoration: 'underline' }} 
                  onClick={() => setIsFollowersModalOpen(true)}
                >
                  <span style={{ fontWeight: 'bold' }}>{user.followersCount.toLocaleString()}</span> seguidores
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <div onClick={() => setIsVisitedModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-orange)' }}>{Math.floor(Math.random() * 50) + 12}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'underline' }}>Locais Visitados</div>
          </div>
          <div onClick={() => setIsReviewsModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-orange)' }}>{Math.floor(Math.random() * 20) + 5}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'underline' }}>Avaliações Realizadas</div>
          </div>
          <div onClick={() => setIsFavoritesModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-orange)' }}>{Math.floor(Math.random() * 5) + 1}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'underline' }}>Restaurantes Favoritos</div>
          </div>
          <div onClick={() => setIsListsModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-orange)' }}>{user.userLists ? user.userLists.length : 0}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'underline' }}>Listas de Recomendação</div>
          </div>
        </div>
        
        {user.tastes && user.tastes.length > 0 && (
          <div style={{ marginTop: '24px', flex: 1 }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#6b7280' }}>Gostos e Preferências</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {user.tastes.map((taste, idx) => (
                <span key={idx} style={{ fontSize: '13px', padding: '6px 12px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '20px', fontWeight: 600 }}>
                  {taste}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Heart size={20} className="primary-color" /> Favoritos Recentes
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {mockRestaurants.slice(2, 4).map(restaurant => (
          <div key={restaurant.id} className="card" style={{ marginBottom: 0, cursor: 'pointer' }} onClick={() => onRestaurantClick(restaurant.id)}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {restaurant.name}
                {restaurant.handle && <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 400 }}>{restaurant.handle}</span>}
              </h3>
              <div style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Navigation size={14} /> {restaurant.distance}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Star size={20} className="primary-color" /> Posts e Avaliações
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {mockReviews
          .filter(r => {
            if (userId === 201) return r.user.name === 'Ana Silva';
            if (userId === 205) return r.user.name === 'João Mendes';
            if (userId === 202) return r.user.name === 'Pedro Henrique';
            return r.id === 303; 
          })
          .map((review) => (
          <div key={review.id} className="card" style={{ padding: '16px', cursor: 'pointer', marginBottom: 0 }} onClick={() => onPostClick && onPostClick(review.id)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <img src={user.avatar} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              <div>
                <div style={{ fontWeight: 600 }}>{user.name} avaliou o restaurante <span style={{ color: 'var(--primary-orange)' }}>{review.restaurant}</span></div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{review.timeAgo}</div>
              </div>
            </div>
            {review.image && <img src={review.image} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />}
            <div className="review-stats" style={{ marginBottom: '8px' }}>
              <div className="stat-badge rating"><Star size={12} fill="currentColor" /> {review.rating.toFixed(1)}</div>
              <div className="stat-badge">Gasto: {review.spent}</div>
            </div>
            <p style={{ fontSize: '14px' }}>{review.text}</p>
          </div>
        ))}
      </div>

      <FollowersModal 
        isOpen={isFollowersModalOpen} 
        onClose={() => setIsFollowersModalOpen(false)} 
        followers={user.followersList || []}
      />
      
      <FavoriteRestaurantsModal 
        isOpen={isFavoritesModalOpen} 
        onClose={() => setIsFavoritesModalOpen(false)} 
        isOwnProfile={false}
        initialFavorites={[1, 4]}
      />
      
      <FavoriteListsModal 
        isOpen={isListsModalOpen} 
        onClose={() => setIsListsModalOpen(false)} 
        isOwnProfile={false}
        initialLists={user.userLists || []}
      />
      <VisitedLocationsModal 
        isOpen={isVisitedModalOpen} 
        onClose={() => setIsVisitedModalOpen(false)} 
        onRestaurantClick={onRestaurantClick} 
      />
      <UserReviewsModal 
        isOpen={isReviewsModalOpen} 
        onClose={() => setIsReviewsModalOpen(false)} 
        onReviewClick={onPostClick} 
        userId={userId}
      />
    </div>
  );
}
