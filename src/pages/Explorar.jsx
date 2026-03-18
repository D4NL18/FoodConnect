import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, Star, Banknote } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import FilterModal from '../components/FilterModal';

export default function Explorar({ onRestaurantClick }) {
  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  
  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    // Para simplificar a demonstração local no Mock, guardamos os filtros ativos no state, 
    // e poderíamos aplicar a lógica de filter combinada abaixo.
  };

  const filtered = mockRestaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(query.toLowerCase()) || 
                          r.location.toLowerCase().includes(query.toLowerCase());
    
    if (!activeFilters) return matchesSearch;

    // 1. Rating
    const matchesRating = r.rating >= parseFloat(activeFilters.minRating);

    // 2. Distance Parse (Ex: "A 800m" -> 0.8, "A 2.5km" -> 2.5)
    let distKm = 0;
    if (r.distance.includes('km')) {
      distKm = parseFloat(r.distance.replace('A ', '').replace('km', '').trim());
    } else if (r.distance.includes('m')) {
      distKm = parseFloat(r.distance.replace('A ', '').replace('m', '').trim()) / 1000;
    }
    const matchesDistance = distKm <= parseFloat(activeFilters.distance);

    // 3. Price Parse (Ex: "R$ ~50,00" -> 50)
    let priceVal = 0;
    const priceStr = r.priceRange.replace('R$ ~', '').replace(',', '.');
    priceVal = parseFloat(priceStr);
    
    let priceMatches = true;
    const minP = parseFloat(activeFilters.minPrice || 0);
    const maxP = parseFloat(activeFilters.maxPrice || 300);
    
    if (maxP < 300) {
      priceMatches = priceVal >= minP && priceVal <= maxP;
    } else {
      priceMatches = priceVal >= minP;
    }

    // 4. Categories Parse (Italiana, Hamburgueria, etc matches Location text)
    let catMatches = true;
    if (activeFilters.categories.length > 0) {
      catMatches = activeFilters.categories.some(cat => {
        const catMap = {
          'Italiana': 'italiana', 'Japonesa': 'japonês', 'Hamburgueria': 'hamburgueria',
          'Brasileira': 'brasileira', 'Vegetariana/Vegana': 'vegano'
        };
        const term = catMap[cat] || cat.toLowerCase();
        return r.location.toLowerCase().includes(term);
      });
    }

    // 5. Features Parse
    let featMatches = true;
    if (activeFilters.features.length > 0) {
      // Must contain at least one of the selected features
      featMatches = activeFilters.features.some(feat => r.features?.includes(feat));
    }

    return matchesSearch && matchesRating && matchesDistance && priceMatches && catMatches && featMatches;
  });

  return (
    <div>
      <h1 className="section-header" style={{ marginBottom: '16px', fontSize: '24px' }}>Explorar Restaurantes</h1>
      
      {/* Search and Filter bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div className="search-input-wrapper" style={{ flex: 1 }}>
          <Search size={18} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar por prato, restaurante ou IA (Ex: Onde comer massa italiana barato?)" 
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <button 
          className="btn-primary" 
          onClick={() => setIsFilterOpen(true)}
          style={{ marginTop: 0, width: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}
        >
          <Filter size={18} /> Filtros {activeFilters && Object.keys(activeFilters).length > 0 && '(Ativo)'}
        </button>
      </div>

      {/* Quick Filters */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '32px', paddingBottom: '8px' }}>
        {['Comida Italiana', 'Hamburgueria', 'Pet Friendly', 'Aberto Agora', 'Bom Custo-Benefício', 'Espaço Kids'].map((f) => (
          <div key={f} style={{ padding: '8px 16px', background: '#f3f4f6', borderRadius: '20px', fontSize: '14px', whiteSpace: 'nowrap', cursor: 'pointer', fontWeight: 500 }}>
            {f}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {filtered.map(restaurant => (
          <div key={restaurant.id} className="card" style={{ marginBottom: 0, cursor: 'pointer' }} onClick={() => onRestaurantClick(restaurant.id)}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {restaurant.name}
                {restaurant.handle && <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 400 }}>{restaurant.handle}</span>}
              </h3>
              <div style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                <MapPin size={14} /> {restaurant.location} ({restaurant.distance})
              </div>
              
              <div className="review-stats">
                <div className="stat-badge rating">
                  <Star size={14} fill="currentColor" />
                  {restaurant.rating.toFixed(1)}
                </div>
                <div className="stat-badge">
                  <Banknote size={14} />
                  {restaurant.priceRange}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                {restaurant.features?.map(feature => (
                  <span key={feature} style={{ fontSize: '11px', padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280' }}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ gridColumn: '1 / -1', color: 'var(--text-muted)' }}>Nenhum restaurante encontrado para a sua busca.</p>}
      </div>

      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={handleApplyFilters} 
      />
    </div>
  );
}
