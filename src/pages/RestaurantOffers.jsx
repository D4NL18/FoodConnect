import { useState } from 'react';
import { Star, Check, X, DollarSign, Image as ImageIcon, Video, MessageCircle } from 'lucide-react';
import './InfluencerSearch.css'; // We can reuse the same styles as they share similar layouts
import { mockPeopleSearch } from '../data/mockData';
import DirectMessageModal from '../components/DirectMessageModal';

export default function RestaurantOffers({ currentUser, offers, onUpdateOffer, onInfluencerClick }) {
  const [chatPerson, setChatPerson] = useState(null);

  // Offers created by this restaurant
  const myOffers = offers.filter(o => o.restaurantId === currentUser.id);

  const pendingOffers = myOffers.filter(o => o.status === 'Pendente' || o.status === 'Contra-Proposta');
  const pastOffers = myOffers.filter(o => o.status === 'Aceita' || o.status === 'Recusada');

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
          Gerenciar Parcerias
        </h1>
        <p className="subtitle-text">Acompanhe as propostas enviadas para os influenciadores e analise contra-propostas.</p>
      </div>

      <div className="offers-lists">
        <h2>Propostas em Andamento</h2>
        {pendingOffers.length === 0 ? (
          <p className="no-results" style={{ textAlign: 'left' }}>Você não tem propostas em negociação no momento.</p>
        ) : (
          <div className="offers-grid">
            {pendingOffers.map(offer => {
              const person = mockPeopleSearch.find(p => p.id === offer.influencerId) || {};
              return (
              <div key={offer.id} className="offer-card">
                <div className="offer-header" style={{ alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {person.avatar && (
                      <img 
                        src={person.avatar} 
                        alt={offer.influencerName} 
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    )}
                    <div>
                      <h3 
                        onClick={() => onInfluencerClick && onInfluencerClick(offer.influencerId)}
                        style={{ cursor: 'pointer', color: 'var(--primary-color)', margin: 0 }}
                      >
                        {offer.influencerName}
                      </h3>
                      {person.followersCount && (
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          {person.followersCount.toLocaleString('pt-BR')} seguidores
                        </div>
                      )}
                    </div>
                  </div>
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

                {offer.status === 'Contra-Proposta' && (
                  <div className="offer-actions">
                    <button className="off-btn accept" onClick={() => onUpdateOffer(offer.id, 'Aceita')}>
                      <Check size={16} /> Aceitar
                    </button>
                    <button className="off-btn reject" onClick={() => onUpdateOffer(offer.id, 'Recusada')}>
                      <X size={16} /> Recusar
                    </button>
                    <button className="off-btn" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }} onClick={() => setChatPerson(person)}>
                      <MessageCircle size={16} /> Chat
                    </button>
                  </div>
                )}
                {offer.status === 'Pendente' && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <div className="offer-waiting" style={{ flex: 1, margin: 0 }}>
                      Aguardando resposta.
                    </div>
                    <button className="off-btn" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', flex: 'none', padding: '10px 16px' }} onClick={() => setChatPerson(person)}>
                      <MessageCircle size={16} /> Chat
                    </button>
                  </div>
                )}
              </div>
            )})}
          </div>
        )}

        <h2 style={{ marginTop: '24px' }}>Histórico de Negociações</h2>
        {pastOffers.length === 0 ? (
          <p className="no-results" style={{ textAlign: 'left' }}>Nenhum histórico disponível.</p>
        ) : (
          <div className="offers-grid">
            {pastOffers.map(offer => {
              const person = mockPeopleSearch.find(p => p.id === offer.influencerId) || {};
              return (
              <div key={offer.id} className="offer-card inactive">
                <div className="offer-header" style={{ alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {person.avatar && (
                      <img 
                        src={person.avatar} 
                        alt={offer.influencerName} 
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(50%)' }}
                      />
                    )}
                    <div>
                      <h3 style={{ margin: 0 }}>{offer.influencerName}</h3>
                      {person.followersCount && (
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          {person.followersCount.toLocaleString('pt-BR')} seguidores
                        </div>
                      )}
                    </div>
                  </div>
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
                <div className="offer-actions" style={{ marginTop: '16px' }}>
                  <button className="off-btn" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', width: '100%' }} onClick={() => setChatPerson(person)}>
                    <MessageCircle size={16} /> Enviar Mensagem
                  </button>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
      <DirectMessageModal 
        isOpen={!!chatPerson} 
        onClose={() => setChatPerson(null)} 
        person={chatPerson} 
      />
    </div>
  );
}
