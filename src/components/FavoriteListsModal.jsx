import { X, Trash2, Plus, ChevronLeft, Search } from 'lucide-react';
import { useState } from 'react';
import { mockRestaurants } from '../data/mockData';

export default function FavoriteListsModal({ isOpen, onClose, isOwnProfile, initialLists }) {
  // lists -> { id, name, restaurants: [restaurantId] }
  const [lists, setLists] = useState(initialLists || []);
  const [activeListId, setActiveListId] = useState(null);
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleCreateList = () => {
    const listName = prompt('Nome da nova lista:');
    if (listName) {
      setLists([...lists, { id: Date.now(), name: listName, restaurants: [] }]);
    }
  };

  const handleDeleteList = (id, e) => {
    e.stopPropagation(); // Evita que clique na lixeira abra a lista
    if (window.confirm('Tem certeza que deseja apagar esta lista inteira?')) {
      setLists(lists.filter(list => list.id !== id));
      if (activeListId === id) setActiveListId(null);
    }
  };

  const handleExcludeRestaurant = (listId, restId) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return { ...list, restaurants: (list.restaurants || []).filter(rId => rId !== restId) };
      }
      return list;
    }));
  };

  const handleAddRestaurantToList = (listId, addRestId) => {
    setLists(lists.map(list => {
      if (list.id === listId && !(list.restaurants || []).includes(addRestId)) {
        return { ...list, restaurants: [...(list.restaurants || []), addRestId] };
      }
      return list;
    }));
    setIsAddingRestaurant(false);
    setSearchTerm('');
  };

  const activeList = lists.find(list => list.id === activeListId);
  
  const handleClose = () => {
    setIsAddingRestaurant(false);
    setSearchTerm('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'white', padding: '24px', borderRadius: '16px',
        width: '100%', maxWidth: '400px', maxHeight: '80vh', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activeListId && (
              <button 
                onClick={() => {
                  if (isAddingRestaurant) {
                    setIsAddingRestaurant(false);
                    setSearchTerm('');
                  } else {
                    setActiveListId(null);
                  }
                }} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
              {isAddingRestaurant ? 'Selecione um Restaurante' : (activeListId ? activeList.name : 'Listas de Favoritos')}
            </h2>
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* MODO ROOT: Exibir todas as listas */}
        {!activeListId && (
          <>
            {isOwnProfile && (
              <button 
                onClick={handleCreateList}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                  width: '100%', padding: '10px', borderRadius: '8px', 
                  background: 'var(--feed-active-bg)', color: 'var(--primary-orange)', border: 'none', 
                  fontWeight: 600, marginBottom: '16px', cursor: 'pointer' 
                }}>
                <Plus size={18} /> Criar Nova Lista
              </button>
            )}
            
            <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {lists.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '20px' }}>Nenhuma lista salva.</p>
              ) : (
                lists.map(list => (
                  <div 
                    key={list.id} 
                    onClick={() => setActiveListId(list.id)}
                    style={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                      padding: '16px', border: '1px solid var(--border-color)', borderRadius: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '15px' }}>{list.name}</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        {(list.restaurants || []).length} {(list.restaurants || []).length === 1 ? 'restaurante' : 'restaurantes'}
                      </div>
                    </div>
                    {isOwnProfile && (
                      <button onClick={(e) => handleDeleteList(list.id, e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-red)', padding: '8px' }}>
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* MODO DETALHE DA LISTA */}
        {activeListId && activeList && !isAddingRestaurant && (
          <>
            {isOwnProfile && (
              <button 
                onClick={() => setIsAddingRestaurant(true)}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                  width: '100%', padding: '10px', borderRadius: '8px', 
                  background: '#fef3c7', color: '#d97706', border: 'none', 
                  fontWeight: 600, marginBottom: '16px', cursor: 'pointer' 
                }}>
                <Plus size={18} /> Adicionar Restaurante
              </button>
            )}

            <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(activeList.restaurants || []).length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '20px' }}>Nenhum restaurante nesta lista.</p>
              ) : (
                (activeList.restaurants || []).map(restId => {
                  const restaurant = mockRestaurants.find(r => r.id === restId);
                  if (!restaurant) return null;
                  return (
                    <div key={restaurant.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f9fafb', padding: '8px', borderRadius: '8px' }}>
                      <img src={restaurant.image} alt={restaurant.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '15px' }}>{restaurant.name}</div>
                        <div style={{ fontSize: '13px', color: '#6b7280' }}>{restaurant.location}</div>
                      </div>
                      {isOwnProfile && (
                        <button onClick={() => handleExcludeRestaurant(activeList.id, restaurant.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-red)', padding: '8px' }}>
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* MODO ADICIONAR RESTAURANTE NA LISTA */}
        {activeListId && activeList && isAddingRestaurant && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, minHeight: 0 }}>
            <div className="search-input-wrapper">
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Buscar restaurante..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }}>
              {mockRestaurants
                .filter(r => !(activeList.restaurants || []).includes(r.id))
                .filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.location.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(restaurant => (
              <div key={restaurant.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f9fafb', padding: '8px', borderRadius: '8px' }}>
                <img src={restaurant.image} alt={restaurant.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '15px' }}>{restaurant.name}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>{restaurant.location}</div>
                </div>
                {isOwnProfile && (
                  <button onClick={() => handleAddRestaurantToList(activeList.id, restaurant.id)} style={{ background: 'var(--feed-active-bg)', border: 'none', cursor: 'pointer', color: 'var(--primary-orange)', padding: '8px', borderRadius: '8px' }}>
                    <Plus size={18} />
                  </button>
                )}
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
