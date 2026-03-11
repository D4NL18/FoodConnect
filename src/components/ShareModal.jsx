import { X, Search } from 'lucide-react';
import { useState } from 'react';
import { mockPeopleSearch } from '../data/mockData';

export default function ShareModal({ isOpen, onClose, review }) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  if (!isOpen || !review) return null;

  const filteredFriends = mockPeopleSearch.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const toggleFriend = (id) => {
    if (selectedFriends.includes(id)) {
      setSelectedFriends(selectedFriends.filter(fid => fid !== id));
    } else {
      setSelectedFriends([...selectedFriends, id]);
    }
  };

  const handleShare = () => {
    if (selectedFriends.length === 0) {
      alert('Selecione pelo menos um amigo para enviar.');
      return;
    }

    selectedFriends.forEach(fid => {
      const store = window.__chatStore;
      if (!store[fid]) {
        store[fid] = [
          { sender: 'friend', text: `Oi! Tudo bem?`, time: 'Hoje' }
        ];
      }
      store[fid].push({
        sender: 'user',
        text: message || `Olha só o que eu achei sobre o ${review.restaurant}!`,
        isSharedPost: true,
        postDetails: review,
        time: 'Agora'
      });
    });

    alert('Post compartilhado com sucesso!');
    onClose();
    setSelectedFriends([]);
    setMessage('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ display: 'flex', flexDirection: 'column', height: '70vh', maxHeight: '500px' }}>
        <div className="modal-header">
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Compartilhar</h2>
          <button onClick={onClose} className="close-btn" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={24} /></button>
        </div>
        
        <div className="modal-body" style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <div className="search-input-wrapper">
              <Search size={18} />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar amigos..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>Amigos</h3>
            {filteredFriends.map(friend => (
              <div 
                key={friend.id} 
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '8px 0', cursor: 'pointer' 
                }}
                onClick={() => toggleFriend(friend.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={friend.avatar} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <span style={{ fontWeight: 500 }}>{friend.name}</span>
                </div>
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', 
                  border: `2px solid ${selectedFriends.includes(friend.id) ? 'var(--primary-orange)' : 'var(--border-color)'}`,
                  background: selectedFriends.includes(friend.id) ? 'var(--primary-orange)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {selectedFriends.includes(friend.id) && <span style={{ color: '#fff', fontSize: '14px' }}>✓</span>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', background: '#f9fafb' }}>
            <input 
              type="text" 
              placeholder="Adicionar uma mensagem... (opcional)" 
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '16px' }}
            />
            <button className="btn-primary" style={{ width: '100%', margin: 0 }} onClick={handleShare}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
