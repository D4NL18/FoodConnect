import { X, Star, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function FilterModal({ isOpen, onClose, onApply }) {
  const [distance, setDistance] = useState(5);
  const [minRating, setMinRating] = useState(4);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300); // 300 = ilimitado no slider
  
  const [categories, setCategories] = useState({
    'Italiana': false,
    'Japonesa': false,
    'Hamburgueria': false,
    'Brasileira': false,
    'Vegetariana/Vegana': false,
  });

  const [features, setFeatures] = useState({
    'Pet Friendly': false,
    'Espaço Kids': false,
    'Acessibilidade': false,
    'Música ao Vivo': false,
    'Estacionamento': false,
    'Ar Livre': false,
  });

  if (!isOpen) return null;

  const toggleCategory = (cat) => setCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  const toggleFeature = (feat) => setFeatures(prev => ({ ...prev, [feat]: !prev[feat] }));
  
  // Removido handlePriceToggle

  const handleApply = () => {
    const activeCategories = Object.keys(categories).filter(c => categories[c]);
    const activeFeatures = Object.keys(features).filter(f => features[f]);

    onApply({
      distance,
      minRating,
      minPrice,
      maxPrice,
      categories: activeCategories,
      features: activeFeatures
    });
    onClose();
  };

  const handleClear = () => {
    setDistance(5);
    setMinRating(4);
    setMinPrice(0);
    setMaxPrice(300);
    setCategories(Object.keys(categories).reduce((acc, cat) => ({...acc, [cat]: false}), {}));
    setFeatures(Object.keys(features).reduce((acc, feat) => ({...acc, [feat]: false}), {}));
    onApply(null);
    onClose();
  };

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Filtros Avançados</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-secondary)' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingRight: '8px' }}>
          
          {/* Distância */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ fontWeight: 600, fontSize: '15px' }}>Distância Máxima</label>
              <span style={{ color: 'var(--primary-orange)', fontWeight: 600 }}>Até {distance} km</span>
            </div>
            <input 
              type="range" 
              min="1" max="50" 
              value={distance} 
              onChange={(e) => setDistance(e.target.value)} 
              style={{ width: '100%', accentColor: 'var(--primary-orange)' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>

          {/* Nota Mínima */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ fontWeight: 600, fontSize: '15px' }}>Nota Mínima</label>
              <span style={{ color: 'var(--primary-orange)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={16} fill="currentColor" /> {minRating}.0+
              </span>
            </div>
            <input 
              type="range" 
              min="1" max="5" step="0.5"
              value={minRating} 
              onChange={(e) => setMinRating(e.target.value)} 
              style={{ width: '100%', accentColor: 'var(--primary-orange)' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1.0</span>
              <span>5.0</span>
            </div>
          </div>

          {/* Faixa de Preço */}
          <div>
            <label style={{ fontWeight: 600, fontSize: '15px', display: 'block', marginBottom: '12px' }}>Faixa de Preço (Ticket Médio)</label>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Mínimo</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary-orange)' }}>R$ {minPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="290" step="10"
                  value={minPrice} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val <= maxPrice) setMinPrice(val);
                  }} 
                  style={{ width: '100%', accentColor: 'var(--primary-orange)' }} 
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Máximo</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary-orange)' }}>
                    {maxPrice >= 300 ? 'Ilimitado' : `R$ ${maxPrice}`}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="10" max="300" step="10"
                  value={maxPrice} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= minPrice) setMaxPrice(val);
                  }} 
                  style={{ width: '100%', accentColor: 'var(--primary-orange)' }} 
                />
              </div>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <label style={{ fontWeight: 600, fontSize: '15px', display: 'block', marginBottom: '12px' }}>Culinária</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {Object.keys(categories).map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  style={{
                    padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 500, fontSize: '14px',
                    border: categories[cat] ? '1px solid var(--primary-orange)' : '1px solid var(--border-color)',
                    background: categories[cat] ? 'var(--feed-active-bg)' : '#fff',
                    color: categories[cat] ? 'var(--primary-orange)' : '#4b5563',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Características */}
          <div>
            <label style={{ fontWeight: 600, fontSize: '15px', display: 'block', marginBottom: '12px' }}>Comodidades</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {Object.keys(features).map(feat => (
                <button
                  key={feat}
                  onClick={() => toggleFeature(feat)}
                  style={{
                    padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 500, fontSize: '14px',
                    border: features[feat] ? '1px solid var(--primary-orange)' : '1px solid var(--border-color)',
                    background: features[feat] ? 'var(--feed-active-bg)' : '#fff',
                    color: features[feat] ? 'var(--primary-orange)' : '#4b5563',
                    transition: 'all 0.2s'
                  }}
                >
                  {feat}
                </button>
              ))}
            </div>
          </div>
          
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <button 
            onClick={handleClear}
            style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: 'transparent', fontWeight: 600, color: '#6b7280', cursor: 'pointer', fontSize: '15px' }}
          >
            Limpar Filtros
          </button>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', margin: 0, padding: '12px 32px', fontSize: '15px' }}
            onClick={handleApply}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}
