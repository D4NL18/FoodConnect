import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { mockNearby, mockPeopleSearch } from '../data/mockData';
import DirectMessageModal from './DirectMessageModal';

export default function RightPanel({ activeTab, activePage, onRestaurantClick, onPostClick }) {
  const showPeople = activePage === 'feed' && activeTab === 'amigos';
  const [query, setQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredPeople = mockPeopleSearch.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  const filteredPlaces = mockNearby.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside className="right-panel">
      {showPeople ? (
        <>
          <div className="search-container">
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
