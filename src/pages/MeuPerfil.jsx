import { useState } from 'react';
import { Settings, MapPin, Heart, Star, Navigation, AlertTriangle, Rocket, Zap, Clock, X, Eye, Crown } from 'lucide-react';
import { mockRestaurants, mockReviews, mockPeopleSearch } from '../data/mockData';
import FollowersModal from '../components/FollowersModal';
import EditProfileModal from '../components/EditProfileModal';
import FavoriteListsModal from '../components/FavoriteListsModal';
import FavoriteRestaurantsModal from '../components/FavoriteRestaurantsModal';
import VisitedLocationsModal from '../components/VisitedLocationsModal';
import UserReviewsModal from '../components/UserReviewsModal';

export default function MeuPerfil({ onRestaurantClick, onPostClick, favoriteRestaurants = [2, 3, 5], turboBalance = 0, turbosActive = {}, onBoostPost, onGoToTurbos, premium }) {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isListsModalOpen, setIsListsModalOpen] = useState(false);
  const [isVisitedModalOpen, setIsVisitedModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [turboConfirmPost, setTurboConfirmPost] = useState(null); // postId pendente de confirmação
  const currentUser = mockPeopleSearch.find(u => u.id === 201) || { followersCount: 12500, followersList: [] };

  const getTimeRemaining = (postId) => {
    const exp = turbosActive[postId];
    if (!exp) return null;
    const remaining = exp - Date.now();
    if (remaining <= 0) return null;
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h restantes` : `${minutes}min restantes`;
  };

  const handleTurbinarPost = (postId) => {
    if (turboBalance <= 0) {
      if (onGoToTurbos) onGoToTurbos();
      return;
    }
    if (turbosActive[postId] && turbosActive[postId] > Date.now()) return;
    setTurboConfirmPost(postId);
  };

  const handleConfirmTurbo = () => {
    if (onBoostPost && turboConfirmPost !== null) onBoostPost(turboConfirmPost);
    setTurboConfirmPost(null);
  };

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
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                {profileData.name} 
                {premium && <Crown size={18} fill="#f59e0b" color="#f59e0b" style={{ filter: 'drop-shadow(0 0 2px rgba(245,158,11,0.3))' }} />}
                <span style={{ fontSize: '16px', fontWeight: 400, color: 'var(--text-muted)' }}>(@anitta_s)</span>
              </h1>
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
        {turboBalance > 0 && (
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'linear-gradient(90deg,#f97316,#ea580c)', color: '#fff', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} fill="#fff" /> {turboBalance} Turbos disponíveis
            </span>
          </div>
        )}
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
              <div className="stat-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                <Eye size={12} /> {(review.id * 317 + 412).toLocaleString('pt-BR')} visualizações
              </div>
            </div>
            <p style={{ fontSize: '14px' }}>{review.text}</p>
            <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {getTimeRemaining(review.id) ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#f97316', fontWeight: 600 }}>
                  <Rocket size={14} /> Turbinado • <Clock size={12} /> {getTimeRemaining(review.id)}
                </span>
              ) : <span />}
              <button
                className="btn-primary"
                style={{
                  background: getTimeRemaining(review.id) ? '#d1fae5' : 'linear-gradient(90deg, #f97316, #ea580c)',
                  color: getTimeRemaining(review.id) ? '#065f46' : 'white',
                  border: 'none', padding: '6px 16px', borderRadius: '16px', fontSize: '13px',
                  display: 'flex', gap: '6px', alignItems: 'center', width: 'auto', margin: 0,
                  cursor: getTimeRemaining(review.id) ? 'default' : 'pointer'
                }}
                onClick={(e) => { e.stopPropagation(); handleTurbinarPost(review.id); }}
                disabled={!!getTimeRemaining(review.id)}
              >
                <Rocket size={16} /> {getTimeRemaining(review.id) ? 'Já Turbinado' : 'Turbinar'}
              </button>
            </div>
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

      {/* Custom Turbo Confirm Modal */}
      {turboConfirmPost !== null && (
        <div className="modal-overlay" onClick={() => setTurboConfirmPost(null)}>
          <div className="modal-content" style={{ maxWidth: '420px', padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', padding: '24px', textAlign: 'center' }}>
              <Rocket size={40} color="#fff" style={{ marginBottom: '8px' }} />
              <h2 style={{ color: '#fff', margin: 0, fontSize: '22px' }}>Turbinar Avaliação</h2>
            </div>
            <div style={{ padding: '28px 32px' }}>
              <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '16px' }}>
                Ao turbinar, esta avaliação aparecerá com <strong>muito mais destaque</strong> nas abas <em>Para Você</em> e <em>Explorar</em> durante <strong>24 horas</strong>.
              </p>
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <Zap size={20} color="#f97316" fill="#f97316" />
                <div>
                  <div style={{ fontWeight: 700, color: '#c2410c', fontSize: '14px' }}>Custo: 1 Turbo</div>
                  <div style={{ fontSize: '12px', color: '#9a3412' }}>Saldo após uso: {turboBalance - 1} turbo(s)</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setTurboConfirmPost(null)}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: '#fff', fontWeight: 600, fontSize: '15px', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmTurbo}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(90deg, #f97316, #ea580c)', color: '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Rocket size={18} /> Turbinar!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
