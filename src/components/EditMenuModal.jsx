import { X, Plus, Trash2, Camera, PenLine, ChevronDown, ChevronUp, Check, AlertTriangle } from 'lucide-react';
import { useState, memo, useCallback } from 'react';

// Optimized item editor component
const MenuItemEditor = memo(({ item, onUpdate, onDelete, onToggleHero }) => {
  const [localName, setLocalName] = useState(item.name);
  const [localPrice, setLocalPrice] = useState(item.price);
  const [localDesc, setLocalDesc] = useState(item.description);

  return (
    <div style={{ 
      padding: '16px', borderRadius: '12px', border: item.isHero ? '2px solid var(--primary-orange)' : '1px solid #f3f4f6',
      background: '#fcfcfc', transition: 'border-color 0.2s'
    }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 0, width: '60px', height: '60px', background: '#e5e7eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
          <Camera size={18} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Nome"
              value={localName} 
              onChange={e => setLocalName(e.target.value)}
              onBlur={() => onUpdate(item.id, 'name', localName)}
              style={{ paddingLeft: '10px', height: '36px', fontWeight: 700, fontSize: '14px', flex: 1 }}
            />
            <div style={{ position: 'relative', width: '100px' }}>
              <span style={{ position: 'absolute', left: '8px', top: '10px', fontSize: '12px', fontWeight: 700 }}>R$</span>
              <input 
                type="text" 
                className="search-input" 
                placeholder="0,00"
                value={localPrice} 
                onChange={e => setLocalPrice(e.target.value)}
                onBlur={() => onUpdate(item.id, 'price', localPrice)}
                style={{ paddingLeft: '28px', height: '36px', fontWeight: 700, fontSize: '14px' }}
              />
            </div>
          </div>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Descrição..."
            value={localDesc} 
            onChange={e => setLocalDesc(e.target.value)}
            onBlur={() => onUpdate(item.id, 'description', localDesc)}
            style={{ paddingLeft: '10px', height: '32px', fontSize: '12px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <button 
              onClick={() => onToggleHero(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.isHero ? 'var(--primary-orange)' : '#9ca3af', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <PenLine size={14} /> {item.isHero ? 'Destaque' : 'Marcar destaque'}
            </button>
            <button onClick={() => onDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function EditMenuModal({ isOpen, onClose, restaurantName, currentItems }) {
  const [categories, setCategories] = useState(['Entradas', 'Pratos Principais', 'Bebidas', 'Sobremesas']);
  const [items, setItems] = useState(currentItems || [
    { id: 1, name: 'Hambúrguer de Costela', price: '45,00', description: 'Hambúrguer de 200g, geleia de bacon.', category: 'Pratos Principais', isHero: true },
    { id: 2, name: 'Batata Rústica', price: '25,00', description: 'Com alecrim e sal grosso.', category: 'Entradas', isHero: false },
    { id: 3, name: 'Soda Italiana', price: '15,00', description: 'Limão Siciliano ou Morango.', category: 'Bebidas', isHero: false }
  ]);
  const [expandedCategory, setExpandedCategory] = useState('Pratos Principais');
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  
  const [confirmModal, setConfirmModal] = useState({ 
    isOpen: false, title: '', message: '', onConfirm: null, type: 'danger', showCancel: true 
  });

  const handleAddItem = useCallback((category) => {
    const newItem = { id: Date.now(), name: '', price: '0,00', description: '', category: category, isHero: false };
    setItems(prev => [newItem, ...prev]);
    setExpandedCategory(category);
  }, []);

  const handleUpdateItem = useCallback((id, field, value) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  }, []);

  const handleDeleteItem = useCallback((id) => {
    setConfirmModal({
      isOpen: true,
      title: 'Excluir Item',
      message: 'Tem certeza que deseja remover este item do cardápio?',
      type: 'danger',
      showCancel: true,
      onConfirm: () => {
        setItems(prev => prev.filter(item => item.id !== id));
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  }, []);

  const handleToggleHero = useCallback((id) => {
    setItems(prev => prev.map(item => ({ ...item, isHero: item.id === id })));
  }, []);

  const handleConfirmAddCategory = () => {
    const name = newCatName.trim();
    if (name && !categories.includes(name)) {
      setCategories([...categories, name]);
      setExpandedCategory(name);
      setNewCatName('');
      setIsAddCatModalOpen(false);
    }
  };

  const handleDeleteCategory = (cat) => {
    if (items.some(item => item.category === cat)) {
      setConfirmModal({
        isOpen: true,
        title: 'Ação Bloqueada',
        message: 'Não é possível remover uma categoria que possui itens.',
        type: 'warning',
        showCancel: false,
        onConfirm: () => setConfirmModal(prev => ({ ...prev, isOpen: false }))
      });
      return;
    }
    setConfirmModal({
      isOpen: true,
      title: 'Remover Categoria',
      message: `Deseja remover a categoria "${cat}"?`,
      type: 'danger',
      showCancel: true,
      onConfirm: () => {
        setCategories(categories.filter(c => c !== cat));
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleSaveAll = () => {
    onClose(); 
    setTimeout(() => {
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    }, 100);
  };

  if (!isOpen && !showSaveSuccess) return null;

  return (
    <>
    {isOpen && (
      <div className="modal-overlay" onClick={onClose} style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1050
      }}>
        <div className="modal-content" onClick={e => e.stopPropagation()} style={{
          background: 'white', padding: '32px', borderRadius: '24px',
          width: '100%', maxWidth: '750px', maxHeight: '90vh', display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)', position: 'relative',
          animation: 'popInFade 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#111827' }}>Gerenciar Cardápio</h2>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Organize por categorias e destaque seus melhores pratos.</p>
            </div>
            <button onClick={onClose} style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', color: '#6b7280' }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '4px' }}>
            <button 
              onClick={() => setIsAddCatModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '10px', borderRadius: '12px', background: '#f9fafb', color: '#374151', border: '1px solid #e5e7eb', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}
            >
              <Plus size={18} /> Adicionar Nova Categoria
            </button>

            {categories.map(category => (
              <div key={category} style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
                <div 
                  onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                  style={{ padding: '16px 20px', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{category}</h3>
                    <span style={{ fontSize: '12px', color: '#6b7280', background: '#fff', padding: '2px 8px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                      {items.filter(i => i.category === category).length} itens
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={(e) => { e.stopPropagation(); handleAddItem(category); }} style={{ background: 'var(--feed-active-bg)', border: 'none', borderRadius: '8px', padding: '4px 8px', color: 'var(--primary-orange)', fontWeight: 600, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Plus size={14} /> Add Item
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                    {expandedCategory === category ? <ChevronUp size={20} color="#6b7280" /> : <ChevronDown size={20} color="#6b7280" />}
                  </div>
                </div>
                {expandedCategory === category && (
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
                    {items.filter(i => i.category === category).length === 0 ? (
                      <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', margin: '10px 0' }}>Nenhum item nesta categoria.</p>
                    ) : (
                      items.filter(i => i.category === category).map(item => (
                        <MenuItemEditor key={item.id} item={item} onUpdate={handleUpdateItem} onDelete={handleDeleteItem} onToggleHero={handleToggleHero} />
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid #e5e7eb', background: 'white', fontWeight: 700, cursor: 'pointer', color: '#6b7280' }}>
              Cancelar
            </button>
            <button className="btn-primary" style={{ width: 'auto', margin: 0, padding: '12px 32px', borderRadius: '12px' }} onClick={handleSaveAll}>
              Salvar Cardápio
            </button>
          </div>

          {isAddCatModalOpen && (
             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, borderRadius: '24px' }}>
                <div style={{ background: '#fff', padding: '32px', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', width: '320px', border: '1px solid #f3f4f6', animation: 'popInSimple 0.2s ease-out' }}>
                   <h4 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 800 }}>Nova Categoria</h4>
                   <input type="text" className="search-input" autoFocus placeholder="Ex: Drinks..." style={{ padding: '10px 14px', background: '#f9fafb', fontSize: '14px', marginBottom: '20px' }} value={newCatName} onChange={e => setNewCatName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleConfirmAddCategory()} />
                   <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => { setIsAddCatModalOpen(false); setNewCatName(''); }} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Cancelar</button>
                      <button onClick={handleConfirmAddCategory} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--primary-orange)', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Adicionar</button>
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>
    )}

    {confirmModal.isOpen && (
       <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2200 }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '24px', width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', animation: 'popInSimple 0.3s ease-out' }}>
             <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: confirmModal.type === 'danger' ? '#fee2e2' : '#fef3c7', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: confirmModal.type === 'danger' ? '#ef4444' : '#f59e0b' }}>
                {confirmModal.type === 'danger' ? <Trash2 size={28} /> : <AlertTriangle size={28} />}
             </div>
             <h3 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 800 }}>{confirmModal.title}</h3>
             <p style={{ margin: '0 0 28px', color: '#6b7280', lineHeight: 1.5, fontSize: '15px' }}>{confirmModal.message}</p>
             <div style={{ display: 'flex', gap: '12px' }}>
                {confirmModal.showCancel && (
                  <button onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff', fontWeight: 700, cursor: 'pointer' }}>Não, cancelar</button>
                )}
                <button onClick={confirmModal.onConfirm} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: confirmModal.type === 'danger' ? '#ef4444' : 'var(--primary-orange)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Confirmar</button>
             </div>
          </div>
       </div>
    )}

    {showSaveSuccess && (
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '40px 60px', borderRadius: '30px', boxShadow: '0 25px 60px rgba(0,0,0,0.2)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', animation: 'popInCenteredSuccess 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-orange)', boxShadow: '0 8px 16px rgba(249, 115, 22, 0.2)' }}>
          <Check size={40} strokeWidth={3} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#111827' }}>Cardápio Atualizado!</h3>
          <p style={{ margin: '8px 0 0', color: '#6b7280', fontWeight: 600 }}>Suas alterações já estão ao vivo.</p>
        </div>
      </div>
    )}
    <style>{`
      @keyframes popInFade {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes popInSimple {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes popInCenteredSuccess {
        from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
    `}</style>
    </>
  );
}
