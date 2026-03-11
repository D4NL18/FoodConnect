import { X } from 'lucide-react';
import { useState } from 'react';

export default function EditProfileModal({ isOpen, onClose, profileData, onSave }) {
  const [formData, setFormData] = useState({ ...profileData });

  const mockOptions = [
    'Alergia a Amendoim', 'Intolerante à Lactose', 'Sem Glúten', 
    'Alergia a Frutos do Mar', 'Ovo-lacto-vegetariana', 'Vegano', 
    'Prefere ambientes abertos', 'Pet Friendly', 'Acessibilidade', 'Zero Açúcar'
  ];

  const togglePreference = (pref) => {
    let current = formData.preferences || [];
    if (current.includes(pref)) {
      setFormData({ ...formData, preferences: current.filter(p => p !== pref) });
    } else {
      setFormData({ ...formData, preferences: [...current, pref] });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'white', padding: '24px', borderRadius: '16px',
        width: '100%', maxWidth: '500px', maxHeight: '90vh', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Editar Perfil</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Nome</label>
            <input 
              type="text" 
              className="search-input" 
              value={formData.name || ''} 
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={{ paddingLeft: '12px' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Localização</label>
            <input 
              type="text" 
              className="search-input" 
              value={formData.location || ''} 
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              style={{ paddingLeft: '12px' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Descrição</label>
            <textarea 
              className="search-input" 
              rows="3"
              value={formData.description || ''} 
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              style={{ paddingLeft: '12px', resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Restrições & Preferências</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {mockOptions.map(option => {
                const isSelected = (formData.preferences || []).includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => togglePreference(option)}
                    type="button"
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--primary-orange)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'var(--feed-active-bg)' : 'white',
                      color: isSelected ? 'var(--primary-orange)' : '#6b7280',
                      transition: 'all 0.2s'
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Selecione as opções que se aplicam a você para recomendarmos os melhores locais.</p>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', fontWeight: 600, cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', margin: 0 }}
            onClick={() => {
              onSave(formData);
              onClose();
            }}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
