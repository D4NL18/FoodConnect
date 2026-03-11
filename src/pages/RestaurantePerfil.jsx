import { mockRestaurants, mockReviews } from '../data/mockData';
import { ArrowLeft, Star, MapPin, Map, Clock, MessageSquare, Heart, ShieldCheck, Search, ExternalLink, Smartphone, PenLine } from 'lucide-react';
import { useState } from 'react';
import ReservationModal from '../components/ReservationModal';
import ChatModal from '../components/ChatModal';
import RestaurantPostModal from '../components/RestaurantPostModal';

export default function RestaurantePerfil({ restaurantId, onBack, onOpenMenu, onReserve, favoriteRestaurants, toggleFavorite }) {
  const restaurant = mockRestaurants.find(r => r.id === restaurantId) || mockRestaurants[0];
  const [activeTab, setActiveTab] = useState('cardapio');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReservaOpen, setIsReservaOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('Todos');
  const [isPostOpen, setIsPostOpen] = useState(false);

  const isFavorite = favoriteRestaurants?.includes(restaurantId);

  return (
    <div style={{ paddingBottom: '40px' }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-secondary)', fontWeight: 600 }}>
        <ArrowLeft size={20} /> Voltar
      </button>

      {/* Header Info */}
      <div className="card" style={{ overflow: 'visible', marginBottom: '16px' }}>
        <div style={{ position: 'relative' }}>
          <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
          <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => toggleFavorite && toggleFavorite(restaurantId)}
              style={{ background: 'rgba(255,255,255,0.9)', padding: '8px', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer', border: 'none' }}
            >
              <Heart size={20} color="var(--primary-orange)" fill={isFavorite ? 'var(--primary-orange)' : 'none'} />
            </button>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>{restaurant.name}</h1>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-orange)', fontWeight: 600 }}>
                  <Star fill="currentColor" size={16} /> {restaurant.rating.toFixed(1)}
                </span>
                <span>•</span>
                <span>{mockReviews.length * 43} Avaliações</span>
                <span>•</span>
                <span className="stat-badge">{restaurant.priceRange}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', color: '#6b7280', fontSize: '14px' }}>
                <MapPin size={16} /> {restaurant.location} - {restaurant.distance}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px' }}>
              <button className="btn-primary" style={{ margin: 0, padding: '10px' }} onClick={() => setIsReservaOpen(true)}>Reservar Mesa</button>
              <button 
                onClick={() => setIsChatOpen(true)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-primary)' }}
              >
                <MessageSquare size={18} /> Chat do Local
              </button>
              <button 
                onClick={() => setIsPostOpen(true)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', border: '1px solid var(--primary-orange)', fontWeight: 600, color: 'var(--primary-orange)', background: 'var(--feed-active-bg)' }}
              >
                <PenLine size={18} /> Criar Post
              </button>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '6px 12px', background: '#fef3c7', color: '#d97706', borderRadius: '20px', fontWeight: 600 }}>
              <ShieldCheck size={14} /> Atualizado Hoje
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '6px 12px', background: 'var(--feed-active-bg)', color: 'var(--primary-orange)', borderRadius: '20px', fontWeight: 600 }}>
              Favoritado por 1.2k
            </span>
          </div>
          
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '13px' }}><ExternalLink size={14} /> iFood</a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '13px' }}><Smartphone size={14} /> WhatsApp</a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '13px' }}><ExternalLink size={14} /> Site Oficial</a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="feed-tabs" style={{ marginBottom: '16px' }}>
        <button className={`tab ${activeTab === 'cardapio' ? 'active' : ''}`} onClick={() => setActiveTab('cardapio')}>Cardápio</button>
        <button className={`tab ${activeTab === 'marcados' ? 'active' : ''}`} onClick={() => setActiveTab('marcados')}>Marcados (Reviews)</button>
        <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Informações</button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'cardapio' && (
        <div>
          <div className="card" style={{ padding: '20px', marginBottom: '16px', background: 'linear-gradient(to right, #fff, var(--feed-active-bg))' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary-orange)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={16} fill="currentColor" /> Carro Chefe
            </h3>
            <p style={{ fontWeight: 600, fontSize: '18px' }}>Hambúrguer de Costela com Geleia de Bacon</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>R$ 45,00 - Aproximadamente 540 recomendações.</p>
          </div>
          
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Cardápio Digital</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Explore todas as nossas opções de Entradas, Pratos Principais, Bebidas e Sobremesas.</p>
            <button className="btn-primary" style={{ width: 'auto', margin: '0 auto', display: 'inline-block' }} onClick={onOpenMenu}>
              Ver Cardápio Completo
            </button>
          </div>
        </div>
      )}

      {activeTab === 'marcados' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Fotos e Avaliações</h2>
            <div className="search-input-wrapper" style={{ width: 'auto' }}>
              <select 
                className="search-input" 
                style={{ padding: '8px', width: 'auto' }}
                value={reviewFilter}
                onChange={(e) => setReviewFilter(e.target.value)}
              >
                <option value="Todos">Ticket Médio: Todos</option>
                <option value="Ate50">Até R$ 50</option>
                <option value="50a100">R$ 50 a R$ 100</option>
                <option value="Acima100">Acima de R$ 100</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
             <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&w=400&q=80" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
             <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&w=400&q=80" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
          
          {mockReviews.filter(review => {
            if (reviewFilter === 'Todos') return true;
            
            const spentValue = parseFloat(review.spent.replace('R$ ', '').replace(',', '.'));
            
            if (reviewFilter === 'Ate50') return spentValue <= 50;
            if (reviewFilter === '50a100') return spentValue > 50 && spentValue <= 100;
            if (reviewFilter === 'Acima100') return spentValue > 100;
            
            return true;
          }).map((review, i) => (
            <div key={i} className="card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img src={review.user.avatar} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{review.user.name} {review.user.handle && <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '13px' }}>({review.user.handle})</span>}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{review.timeAgo}</div>
                </div>
              </div>
              <div className="review-stats" style={{ marginBottom: '8px' }}>
                <div className="stat-badge rating"><Star size={12} fill="currentColor" /> {review.rating.toFixed(1)}</div>
                <div className="stat-badge">Gasto: {review.spent}</div>
              </div>
              <p style={{ fontSize: '14px' }}>{review.text}</p>
            </div>
          ))}
          {mockReviews.filter(review => {
            if (reviewFilter === 'Todos') return true;
            const spentValue = parseFloat(review.spent.replace('R$ ', '').replace(',', '.'));
            if (reviewFilter === 'Ate50') return spentValue <= 50;
            if (reviewFilter === '50a100') return spentValue > 50 && spentValue <= 100;
            if (reviewFilter === 'Acima100') return spentValue > 100;
            return true;
          }).length === 0 && <p style={{ color: 'var(--text-muted)' }}>Nenhuma avaliação encontrada nessa faixa de preço.</p>}
        </div>
      )}

      {activeTab === 'info' && (
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Localização e Horários</h2>
          <div style={{ background: '#f3f4f6', height: '150px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--text-muted)' }}>
            <Map size={32} /> <span style={{ marginLeft: '8px' }}>Mapa Interativo aqui</span>
          </div>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px' }}>
            <MapPin size={18} color="var(--primary-orange)" /> Av. Faria Lima, 1234 - Pinheiros, São Paulo
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Clock size={18} color="var(--primary-orange)" /> Aberto Hoje: 11:30 - 23:00
          </p>
        </div>
      )}

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} restaurantName={restaurant.name} />
      <ReservationModal 
        isOpen={isReservaOpen} 
        onClose={() => setIsReservaOpen(false)} 
        restaurantName={restaurant.name} 
        onConfirm={(res) => onReserve && onReserve({ ...res, restaurantId, image: restaurant.image, restaurantName: restaurant.name })}
      />
      <RestaurantPostModal
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
        restaurant={restaurant}
      />
    </div>
  );
}
