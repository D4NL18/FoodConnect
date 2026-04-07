import { useState } from 'react';
import { Search } from 'lucide-react';
import { mockPeopleSearch } from '../data/mockData';
import VerifiedBadge from '../components/VerifiedBadge';

export default function BuscarPessoas({ onUserClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Meus gostos mockados (ex: user atual)
  const myTastes = ['Vegetariano', 'Vinhos', 'Japonês'];

  // Famous profiles with similar tastes
  const recommendedProfiles = mockPeopleSearch
    .filter(u => u.isFamous)
    .filter(u => u.tastes.some(t => myTastes.includes(t)))
    .sort((a, b) => b.followersCount - a.followersCount);

  // Search Results
  const searchResults = mockPeopleSearch.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (u.handle && u.handle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="card" style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Buscar Pessoas</h1>
      
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <input 
          type="text" 
          placeholder="Buscar por nome ou @usuário..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px 16px 12px 48px', 
            borderRadius: '24px', 
            border: '1px solid var(--border-color)', 
            fontSize: '15px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <Search size={20} style={{ position: 'absolute', left: '16px', top: '12px', color: '#6b7280' }} />
      </div>

      {!searchQuery && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-color)' }}>
            Recomendações para você
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Perfis famosos com gostos semelhantes aos seus.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {recommendedProfiles.map(user => (
              <div 
                key={user.id} 
                onClick={() => onUserClick(user.id)}
                style={{ 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '16px', 
                  padding: '16px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  background: '#f9fafb'
                }}>
                <img src={user.avatar} alt={user.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px' }} />
                <div style={{ fontWeight: 600, fontSize: '15px', textAlign: 'center' }}>
                  {user.name}
                  {user.verified && <VerifiedBadge size={14} />}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{user.handle}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-orange)' }}>{user.followersCount.toLocaleString()} seguidores</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchQuery && (
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-color)' }}>
            Resultados
          </h2>
          {searchResults.length === 0 ? (
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Nenhum usuário encontrado para "{searchQuery}".</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {searchResults.map(user => (
                <div 
                  key={user.id} 
                  onClick={() => onUserClick(user.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px', 
                    padding: '12px', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}>
                  <img src={user.avatar} alt={user.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>
                      {user.name}
                      {user.verified && <VerifiedBadge size={14} />}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{user.handle}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-color)' }}>{user.followersCount.toLocaleString()} seg</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
