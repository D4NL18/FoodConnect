import { X, Camera, MapPin, Globe, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function EditRestaurantProfileModal({ isOpen, onClose, restaurantData, onSave }) {
  const [formData, setFormData] = useState({ ...restaurantData });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'white', padding: '32px', borderRadius: '24px',
        width: '100%', maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#111827' }}>Editar Perfil do Restaurante</h2>
          <button onClick={onClose} style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', color: '#6b7280' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '4px' }}>
          {/* Cover Photo Placeholder */}
          <div style={{ position: 'relative', width: '100%', height: '120px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #d1d5db' }}>
            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <Camera size={24} style={{ marginBottom: '4px' }} />
              <div style={{ fontSize: '12px', fontWeight: 600 }}>Alterar Capa</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Nome do Estabelecimento</label>
              <input 
                type="text" 
                className="search-input" 
                value={formData.name || ''} 
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{ paddingLeft: '12px', height: '44px' }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Username (@handle)</label>
              <input 
                type="text" 
                className="search-input" 
                value={formData.handle || ''} 
                onChange={e => setFormData({ ...formData, handle: e.target.value })}
                style={{ paddingLeft: '12px', height: '44px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Endereço Completo</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#9ca3af' }} />
              <input 
                type="text" 
                className="search-input" 
                value={formData.location || ''} 
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                style={{ paddingLeft: '40px', height: '44px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Categoria Principal</label>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Ex: Italiana, Burger..."
                value={formData.category || ''} 
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                style={{ paddingLeft: '12px', height: '44px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Links de Contato</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ position: 'relative' }}>
                <Globe size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#9ca3af' }} />
                <input type="text" className="search-input" placeholder="Website" style={{ paddingLeft: '36px', height: '40px', fontSize: '13px' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#9ca3af' }} />
                <input type="text" className="search-input" placeholder="WhatsApp" style={{ paddingLeft: '36px', height: '40px', fontSize: '13px' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid #e5e7eb', background: 'white', fontWeight: 700, cursor: 'pointer', color: '#6b7280' }}
          >
            Descartar
          </button>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', margin: 0, padding: '12px 32px', borderRadius: '12px' }}
            onClick={() => {
              onSave(formData);
              onClose();
            }}
          >
            Salvar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}
