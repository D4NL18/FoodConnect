import { useState } from 'react';
import { Image, MapPin, Star, DollarSign, X } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';

export default function CreatePostModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Criar Nova Avaliação</h2>
          <button onClick={onClose} className="close-btn"><X size={24} /></button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Fotos/Vídeos do Local ou Prato</label>
            <div className="upload-box">
              <Image size={32} color="var(--text-muted)" />
              <span>Clique para anexar 1 ou mais imagens</span>
            </div>
          </div>

          <div className="form-group">
            <label>Restaurante</label>
            <div className="search-input-wrapper">
              <MapPin size={18} />
              <select className="search-input" style={{ width: '100%', paddingLeft: '40px', appearance: 'none' }}>
                <option value="">Selecione um restaurante...</option>
                {mockRestaurants.map(r => (
                  <option key={r.id} value={r.id}>{r.name} - {r.location}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Sua Experiência</label>
            <textarea 
              className="search-input" 
              style={{ minHeight: '100px', width: '100%', padding: '12px' }} 
              placeholder="Como foi a comida? E o ambiente?"
            ></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label>Nota</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1,2,3,4,5].map(star => (
                  <button 
                    key={star} 
                    onClick={() => setRating(star)} 
                    style={{ color: star <= rating ? 'var(--primary-orange)' : 'var(--border-color)' }}
                  >
                    <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Quanto gastou? (Opcional)</label>
              <div className="search-input-wrapper">
                <DollarSign size={18} />
                <input type="text" className="search-input" placeholder="R$ 0,00" />
              </div>
            </div>
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="favorite" style={{ width: '18px', height: '18px', accentColor: 'var(--primary-orange)' }} />
            <label htmlFor="favorite" style={{ margin: 0, fontWeight: 500, cursor: 'pointer' }}>Marcar como Favorito ❤️</label>
          </div>

        </div>
        
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>Publicar Post</button>
        </div>
      </div>
    </div>
  );
}
