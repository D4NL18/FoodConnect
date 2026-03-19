import { useState } from 'react';
import { Search, MapPin, Users, Building2 } from 'lucide-react';
import { mockNearby, mockPeopleSearch, mockRestaurants } from '../data/mockData';
import DirectMessageModal from './DirectMessageModal';

export default function RightPanel({ activeTab, activePage, onRestaurantClick, onPostClick, currentUser, offers }) {
  const isRestaurant = currentUser?.type === 'restaurante';
  
  const showPartnerInfluencers = isRestaurant && activePage === 'gerenciar_parcerias';
  const showPartnerRestaurants = !isRestaurant && activePage === 'parcerias';
  const showPeople = (!showPartnerInfluencers && !showPartnerRestaurants) && (isRestaurant || (activePage === 'feed' && activeTab === 'amigos'));

  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);

  const myOffersRest = offers?.filter(o => o.restaurantId === currentUser?.id) || [];
  const infIds = [...new Set(myOffersRest.map(o => o.influencerId))];
  const partnerInfluencers = mockPeopleSearch.filter(p => infIds.includes(p.id) && p.name.toLowerCase().includes(query.toLowerCase()));

  const myOffersInf = offers?.filter(o => o.influencerId === currentUser?.id) || [];
  const restIds = [...new Set(myOffersInf.map(o => o.restaurantId))];
  const partnerRestaurants = mockRestaurants.filter(r => restIds.includes(r.id) && r.name.toLowerCase().includes(query.toLowerCase()));

  const filteredPeople = mockPeopleSearch.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  const filteredPlaces = mockNearby.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside className="right-panel">
      {showPartnerInfluencers ? (
        <>
          <div className="search-container">
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--primary-orange)" /> Chats de Parceria
            </h3>
            <div className="search-input-wrapper">
              <Search size={18} />
              <input type="text" className="search-input" placeholder="Buscar parceiros..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
          </div>
          <div className="nearby-list">
            {partnerInfluencers.length > 0 ? partnerInfluencers.map(person => (
              <div onClick={() => setSelectedPerson(person)} key={person.id} className="user-search-item" style={{ cursor: 'pointer' }}>
                <img src={person.avatar} alt="Avatar" />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
                  <span className="user-search-name">{person.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Influenciador</span>
                </div>
              </div>
            )) : <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Nenhum chat encontrado.</p>}
          </div>
        </>
      ) : showPartnerRestaurants ? (
        <>
          <div className="search-container">
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={20} color="var(--primary-orange)" /> Chats de Parceria
            </h3>
            <div className="search-input-wrapper">
              <Search size={18} />
              <input type="text" className="search-input" placeholder="Buscar restaurantes..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
          </div>
          <div className="nearby-list">
            {partnerRestaurants.length > 0 ? partnerRestaurants.map(restaurant => (
              <div onClick={() => setSelectedPerson(restaurant)} key={restaurant.id} className="user-search-item" style={{ cursor: 'pointer' }}>
                <img src={restaurant.image} alt="Logo" />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
                  <span className="user-search-name">{restaurant.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Restaurante</span>
                </div>
              </div>
            )) : <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Nenhum chat com restaurante encontrado.</p>}
          </div>
        </>
      ) : showPeople ? (
        <>
          <div className="search-container">
            {isRestaurant ? (
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} color="var(--primary-orange)" /> Clientes (Inbox)
              </h3>
            ) : null}
            <div className="search-input-wrapper">
              <Search size={18} />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar Pessoas..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="nearby-list">
            {filteredPeople.length > 0 ? filteredPeople.map(person => (
              <div onClick={() => setSelectedPerson(person)}
                key={person.id}
                className="user-search-item"
                style={{ cursor: 'pointer' }}
              >
                <img src={person.avatar} alt="Avatar" />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
                  <span className="user-search-name">{person.name}</span>
                  {person.handle && <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{person.handle}</span>}
                </div>
              </div>
            )) : <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Nenhuma pessoa encontrada.</p>}
          </div>
        </>
      ) : (
        <>
          <div className="search-container">
            <div className="section-header" style={{ marginBottom: '16px' }}>
              <MapPin size={24} />
              <span>Perto de você</span>
            </div>
            <div className="search-input-wrapper">
              <Search size={18} />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Nova busca por local..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="nearby-list">
            {filteredPlaces.length > 0 ? filteredPlaces.map(place => (
              <div key={place.id} className="nearby-item">
                <div className="nearby-info">
                  <h4>{place.name}</h4>
                  <p>{place.details}</p>
                </div>
                <div className={`status-badge status-${place.statusType === 'reserva' ? 'fila' : place.statusType}`}>
                  {place.statusLabel}
                </div>
              </div>
            )) : <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Nenhum local encontrado.</p>}
          </div>
        </>
      )}

      <DirectMessageModal 
        isOpen={!!selectedPerson} 
        onClose={() => setSelectedPerson(null)} 
        person={selectedPerson} 
        onRestaurantClick={onRestaurantClick}
        onPostClick={onPostClick}
      />
    </aside>
  );
}
