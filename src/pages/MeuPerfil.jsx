import { useState } from 'react';
import { Settings, MapPin, Heart, Star, Navigation, AlertTriangle } from 'lucide-react';
import { mockRestaurants, mockReviews, mockPeopleSearch } from '../data/mockData';
import FollowersModal from '../components/FollowersModal';
import EditProfileModal from '../components/EditProfileModal';
import FavoriteListsModal from '../components/FavoriteListsModal';
import FavoriteRestaurantsModal from '../components/FavoriteRestaurantsModal';
import VisitedLocationsModal from '../components/VisitedLocationsModal';
import UserReviewsModal from '../components/UserReviewsModal';

export default function MeuPerfil({ onRestaurantClick, onPostClick, favoriteRestaurants = [2, 3, 5] }) {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isListsModalOpen, setIsListsModalOpen] = useState(false);
  const [isVisitedModalOpen, setIsVisitedModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const currentUser = mockPeopleSearch.find(u => u.id === 201) || { followersCount: 12500, followersList: [] };

  const [profileData, setProfileData] = useState({
    name: 'Ana Silva',
    location: 'São Paulo, SP',
    description: 'Amante de gastronomia vegetariana e descobrindo aos poucos bons vinhos! 🍷 Ponto fraco: doces artesanais.',
    preferences: ['Alergia a Amendoim', 'Ovo-lacto-vegetariana', 'Prefere ambientes abertos']
  });

  return (
    <div>
      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80" 
              alt="Profile" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{profileData.name} <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-muted)' }}>(@anitta_s)</span></h1>
              <div style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <MapPin size={16} /> {profileData.location}
              </div>
              <p style={{ marginTop: '12px', fontSize: '15px' }}>
                {profileData.description}
              </p>
            </div>
          </div>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', marginTop: 0, padding: '8px 16px', background: '#f3f4f6', color: '#374151' }}
            onClick={() => setIsEditModalOpen(true)}
          >
            <Settings size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '24px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <div onClick={() => setIsVisitedModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-orange)' }}>124</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'underline' }}>Locais Visitados</div>
          </div>
          <div onClick={() => setIsReviewsModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-orange)' }}>86</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'underline' }}>Avaliações Realizadas</div>
          </div>
          <div onClick={() => setIsFavoritesModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-orange)' }}>{favoriteRestaurants.length}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'underline' }}>Restaurantes Favoritos</div>
          </div>
          <div onClick={() => setIsListsModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-orange)' }}>
              {currentUser.userLists ? currentUser.userLists.length : 0}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'underline' }}>Listas</div>
          </div>
          <div onClick={() => setIsFollowersModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-orange)' }}>
              {currentUser.followersCount >= 1000 ? (currentUser.followersCount / 1000).toFixed(1) + 'k' : currentUser.followersCount}
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, textDecoration: 'underline' }}>Seguidores</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Restrições & Preferências</h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {profileData.preferences.map((pref, idx) => (
              <span key={idx} style={{ fontSize: '13px', padding: '6px 12px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '20px', fontWeight: 600 }}>
                {pref}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Heart size={20} className="primary-color" /> Meus Favoritos Recentes
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {mockRestaurants.filter(r => favoriteRestaurants.includes(r.id)).slice(0, 2).map(restaurant => (
          <div key={restaurant.id} className="card" style={{ marginBottom: 0, cursor: 'pointer' }} onClick={() => onRestaurantClick(restaurant.id)}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{restaurant.name}</h3>
              <div style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Navigation size={14} /> {restaurant.distance}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Star size={20} className="primary-color" /> Meus Posts e Avaliações
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mockReviews.map((review) => (
          <div key={review.id} className="card" style={{ padding: '16px', cursor: 'pointer' }} onClick={() => onPostClick && onPostClick(review.id)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              <div>
                <div style={{ fontWeight: 600 }}>Você avaliou o restaurante <span style={{ color: 'var(--primary-orange)' }}>{review.restaurant}</span></div>
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
        followers={currentUser.followersList || []}
      />
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        profileData={profileData}
        onSave={(data) => setProfileData(data)}
      />
      <FavoriteRestaurantsModal 
        isOpen={isFavoritesModalOpen} 
        onClose={() => setIsFavoritesModalOpen(false)} 
        isOwnProfile={true}
        initialFavorites={favoriteRestaurants}
      />
      <FavoriteListsModal 
        isOpen={isListsModalOpen} 
        onClose={() => setIsListsModalOpen(false)} 
        isOwnProfile={true}
        initialLists={currentUser.userLists || []}
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
        userId={201}
      />
    </div>
  );
}
