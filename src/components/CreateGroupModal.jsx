import { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

export default function CreateGroupModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate({
        id: Date.now(),
        name,
        description,
        members: '1 (Você)',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&w=200&q=80' // default random food groups image
      });
      setName('');
      setDescription('');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'white', padding: '24px', borderRadius: '16px',
        width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Criar Grupo / Fórum</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            height: '100px', width: '100%', backgroundColor: '#f3f4f6',
            borderRadius: '12px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#9ca3af', cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <ImageIcon size={24} />
              <span style={{ fontSize: '13px' }}>Adicionar Capa</span>
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px', color: '#374151' }}>Nome do Grupo</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Ex: Amantes de Massa SP" 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
              required 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '4px', color: '#374151' }}>Descrição</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Sobre o que é este grupo?"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', minHeight: '80px', resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
            Criar Grupo
          </button>
        </form>
      </div>
    </div>
  );
}
