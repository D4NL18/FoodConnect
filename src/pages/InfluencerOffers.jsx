import { useState } from 'react';
import { Star, Check, X, Edit3, DollarSign, Image as ImageIcon, Video } from 'lucide-react';
import './InfluencerSearch.css'; // Reuse CSS
import { mockRestaurants } from '../data/mockData';

export default function InfluencerOffers({ currentUser, offers, onUpdateOffer, onRestaurantClick }) {
  const [counterModal, setCounterModal] = useState({ open: false, offer: null });
  const [postsAmount, setPostsAmount] = useState(1);
  const [videosAmount, setVideosAmount] = useState(1);
  const [offerValue, setOfferValue] = useState(500);

  // Offers related to the current user (the influencer)
  const myOffers = offers.filter(o => o.influencerId === currentUser.id);

  const pendingOffers = myOffers.filter(o => o.status === 'Pendente' || o.status === 'Contra-Proposta');
  const pastOffers = myOffers.filter(o => o.status === 'Aceita' || o.status === 'Recusada');

  const handleOpenCounter = (offer) => {
    setCounterModal({ open: true, offer });
    setPostsAmount(offer.posts);
    setVideosAmount(offer.videos);
    setOfferValue(offer.value);
  };

  const handleSubmitCounter = (e) => {
    e.preventDefault();
    onUpdateOffer(counterModal.offer.id, 'Contra-Proposta', {
      originalOffer: { ...counterModal.offer },
      posts: parseInt(postsAmount),
      videos: parseInt(videosAmount),
      value: parseFloat(offerValue)
    });
    setCounterModal({ open: false, offer: null });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aceita': return 'var(--success-color, #10b981)';
      case 'Recusada': return 'var(--danger-color, #ef4444)';
      case 'Contra-Proposta': return 'var(--warning-color, #f59e0b)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="influencer-search-container">
      <div className="header-section">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Star color="#f59e0b" fill="#f59e0b" />
          Minhas Parcerias Premium
        </h1>
        <p className="subtitle-text">Gerencie propostas de restaurantes buscando sua influência</p>
      </div>

      <div className="offers-lists">
        <h2>Propostas em Análise</h2>
        {pendingOffers.length === 0 ? (
          <p className="no-results" style={{ textAlign: 'left' }}>Você não tem propostas pendentes no momento.</p>
        ) : (
          <div className="offers-grid">
            {pendingOffers.map(offer => (
              <div key={offer.id} className="offer-card">
                <div 
                  className="offer-banner"
                  style={{
                    height: '140px',
                    backgroundImage: `url(${mockRestaurants.find(r => r.id === offer.restaurantId)?.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '-24px -24px 16px -24px',
                    borderRadius: '12px 12px 0 0'
                  }}
                />
                <div className="offer-header">
                  <h3 
                    onClick={() => onRestaurantClick && onRestaurantClick(offer.restaurantId)}
                    style={{ cursor: 'pointer', color: 'var(--primary-color)' }}
                  >
                    {offer.restaurantName}
                  </h3>
                  <span className="offer-badge" style={{ backgroundColor: getStatusColor(offer.status), color: '#fff' }}>
                    {offer.status}
                  </span>
                </div>
                
                <div className="offer-details">
                  <div className="detail-item">
                    <ImageIcon size={16} /> {offer.posts} Posts no Feed
                  </div>
                  <div className="detail-item">
                    <Video size={16} /> {offer.videos} Vídeos Curtos
                  </div>
                  <div className="detail-item total-value">
                    <DollarSign size={18} /> R$ {offer.value.toFixed(2)}
                  </div>
                </div>

                {offer.status === 'Pendente' && (
                  <div className="offer-actions">
                    <button className="off-btn accept" onClick={() => onUpdateOffer(offer.id, 'Aceita')}>
                      <Check size={16} /> Aceitar
                    </button>
                    <button className="off-btn reject" onClick={() => onUpdateOffer(offer.id, 'Recusada')}>
                      <X size={16} /> Recusar
                    </button>
                    <button className="off-btn counter" onClick={() => handleOpenCounter(offer)}>
                      <Edit3 size={16} /> Contra-Proposta
                    </button>
                  </div>
                )}
                {offer.status === 'Contra-Proposta' && (
                  <div className="offer-waiting">
                    Aguardando resposta do restaurante.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <h2 style={{ marginTop: '24px' }}>Histórico de Parcerias</h2>
        {pastOffers.length === 0 ? (
          <p className="no-results" style={{ textAlign: 'left' }}>Nenhum histórico disponível.</p>
        ) : (
          <div className="offers-grid">
            {pastOffers.map(offer => (
              <div key={offer.id} className="offer-card inactive">
                <div 
                  className="offer-banner"
                  style={{
                    height: '140px',
                    backgroundImage: `url(${mockRestaurants.find(r => r.id === offer.restaurantId)?.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '-24px -24px 16px -24px',
                    borderRadius: '12px 12px 0 0',
                    filter: 'grayscale(50%)'
                  }}
                />
                <div className="offer-header">
                  <h3>{offer.restaurantName}</h3>
                  <span className="offer-badge" style={{ backgroundColor: getStatusColor(offer.status), color: '#fff' }}>
                    {offer.status}
                  </span>
                </div>
                <div className="offer-details">
                  <div className="detail-item">
                    <ImageIcon size={16} /> {offer.posts} Posts no Feed
                  </div>
                  <div className="detail-item">
                    <Video size={16} /> {offer.videos} Vídeos Curtos
                  </div>
                  <div className="detail-item total-value">
                    <DollarSign size={18} /> R$ {offer.value.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {counterModal.open && counterModal.offer && (
        <div className="modal-overlay">
          <div className="offer-modal">
            <button className="close-btn" onClick={() => setCounterModal({ open: false, offer: null })}>
              <X size={24} />
            </button>
            <h2>Contra-Proposta para {counterModal.offer.restaurantName}</h2>
            <p className="subtitle">Ajuste os valores para algo que atenda melhor suas expectativas.</p>

            <form onSubmit={handleSubmitCounter}>
              <div className="form-group">
                <label><ImageIcon size={18} /> Quantidade de Posts no Feed</label>
                <input 
                  type="number" 
                  min="0"
                  value={postsAmount}
                  onChange={(e) => setPostsAmount(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label><Video size={18} /> Quantidade de Vídeos Curtos</label>
                <input 
                  type="number" 
                  min="0"
                  value={videosAmount}
                  onChange={(e) => setVideosAmount(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label><DollarSign size={18} /> Valor Total Desejado (R$)</label>
                <input 
                  type="number" 
                  min="0"
                  step="50"
                  value={offerValue}
                  onChange={(e) => setOfferValue(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-offer-btn">
                Enviar Contra-Proposta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
