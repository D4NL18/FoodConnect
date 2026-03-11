import { useState } from 'react';
import { Image, Star, DollarSign, X, MapPin } from 'lucide-react';

export default function RestaurantPostModal({ isOpen, onClose, restaurant }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [spent, setSpent] = useState('');

  if (!isOpen) return null;

  const handlePublish = () => {
    // Aqui seria integrado com backend
    onClose();
    setRating(0);
    setText('');
    setSpent('');
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'white', borderRadius: '16px', width: '100%',
        maxWidth: '500px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Nova Avaliação</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={24} color="var(--text-secondary)" />
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Restaurante fixo */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Restaurante</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--feed-active-bg)', borderRadius: '10px', border: '1px solid var(--primary-orange)' }}>
              <img src={restaurant?.image} alt={restaurant?.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>{restaurant?.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <MapPin size={12} /> {restaurant?.location}
                </div>
              </div>
            </div>
          </div>

          {/* Foto/Upload */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Fotos do Local ou Prato</label>
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <Image size={32} />
              <span style={{ fontSize: '14px' }}>Clique para anexar imagens</span>
            </div>
          </div>

          {/* Texto */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Sua Experiência</label>
            <textarea
              className="search-input"
              rows={4}
              style={{ paddingLeft: '12px', resize: 'vertical', width: '100%' }}
              placeholder="Como foi a comida? E o ambiente? Recomendaria?"
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>

          {/* Nota + Gasto */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Nota</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: star <= rating ? 'var(--primary-orange)' : 'var(--border-color)' }}
                  >
                    <Star size={26} fill={star <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Quanto gastou?</label>
              <div className="search-input-wrapper">
                <DollarSign size={16} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="R$ 0,00"
                  value={spent}
                  onChange={e => setSpent(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'white', fontWeight: 600, cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button
            className="btn-primary"
            style={{ margin: 0, width: 'auto', padding: '10px 24px' }}
            onClick={handlePublish}
          >
            Publicar Post
          </button>
        </div>
      </div>
    </div>
  );
}
