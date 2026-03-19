import { useState, useMemo } from 'react';
import { mockPeopleSearch } from '../data/mockData';
import { Search, Filter, Star, DollarSign, Send, X, Video, Image as ImageIcon, UserCheck, CheckCircle } from 'lucide-react';
import './InfluencerSearch.css';

export default function InfluencerSearch({ currentUser, onCreateOffer, onInfluencerClick, offers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [minFollowers, setMinFollowers] = useState(0);
  const [maxFollowers, setMaxFollowers] = useState(0); // 0 means any/no limit
  const [selectedTastes, setSelectedTastes] = useState([]);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  const [postsAmount, setPostsAmount] = useState(1);
  const [videosAmount, setVideosAmount] = useState(1);
  const [offerValue, setOfferValue] = useState(500);
  const [showSuccess, setShowSuccess] = useState(false);

  // Consider influencers: famous or followers >= 5000
  const influencers = useMemo(() => {
    return mockPeopleSearch.filter(p => p.isFamous || p.followersCount >= 5000);
  }, []);

  const allTastes = useMemo(() => {
    const tastes = new Set();
    influencers.forEach(inf => inf.tastes.forEach(t => tastes.add(t)));
    return Array.from(tastes).sort();
  }, [influencers]);

  const filteredInfluencers = useMemo(() => {
    return influencers.filter(inf => {
      if (searchTerm && !inf.name.toLowerCase().includes(searchTerm.toLowerCase()) && !inf.handle.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (inf.followersCount < minFollowers) return false;
      if (maxFollowers > 0 && inf.followersCount > maxFollowers) return false;
      if (selectedTastes.length > 0) {
        if (!selectedTastes.some(t => inf.tastes.includes(t))) return false;
      }
      return true;
    });
  }, [influencers, searchTerm, minFollowers, maxFollowers, selectedTastes]);

  const toggleTaste = (taste) => {
    setSelectedTastes(prev => prev.includes(taste) ? prev.filter(t => t !== taste) : [...prev, taste]);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleOpenOffer = (inf) => {
    setSelectedInfluencer(inf);
    setPostsAmount(1);
    setVideosAmount(1);
    setOfferValue(500);
    setOfferModalOpen(true);
    setShowSuccess(false);
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    onCreateOffer({
      restaurantId: currentUser.id,
      restaurantName: currentUser.name || 'Meu Restaurante',
      influencerId: selectedInfluencer.id,
      influencerName: selectedInfluencer.name,
      posts: parseInt(postsAmount),
      videos: parseInt(videosAmount),
      value: parseFloat(offerValue),
    });
    setOfferModalOpen(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="influencer-search-container">
      <div className="header-section">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Star color="#f59e0b" fill="#f59e0b" />
          Buscar Influenciadores
        </h1>
        <p className="subtitle-text">Encontre os parceiros perfeitos para divulgar o seu restaurante</p>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou @"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Mínimo de Seguidores:</label>
          <select 
            value={minFollowers} 
            onChange={(e) => {
              const val = Number(e.target.value);
              setMinFollowers(val);
              if (maxFollowers > 0 && maxFollowers <= val) setMaxFollowers(0);
            }}
          >
            <option value={0}>Qualquer</option>
            {(maxFollowers === 0 || maxFollowers > 5000) && <option value={5000}>5k+</option>}
            {(maxFollowers === 0 || maxFollowers > 10000) && <option value={10000}>10k+</option>}
            {(maxFollowers === 0 || maxFollowers > 50000) && <option value={50000}>50k+</option>}
          </select>
        </div>

        <div className="filter-group">
          <label>Máximo de Seguidores:</label>
          <select 
            value={maxFollowers} 
            onChange={(e) => {
              const val = Number(e.target.value);
              setMaxFollowers(val);
              if (val > 0 && minFollowers >= val) setMinFollowers(0);
            }}
          >
            <option value={0}>Sem limite</option>
            {minFollowers < 10000 && <option value={10000}>Até 10k</option>}
            {minFollowers < 50000 && <option value={50000}>Até 50k</option>}
            {minFollowers < 100000 && <option value={100000}>Até 100k</option>}
          </select>
        </div>

        <div className="tastes-filter">
          <label>Preferências:</label>
          <div className="tastes-chips">
            {allTastes.map(taste => (
              <button 
                key={taste} 
                className={`taste-chip ${selectedTastes.includes(taste) ? 'active' : ''}`}
                onClick={() => toggleTaste(taste)}
              >
                {taste}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="success-toast">
          <CheckCircle size={20} />
          Oferta enviada com sucesso! Você pode acompanhar em suas Reservas/Dashboard.
        </div>
      )}

      <div className="influencers-grid">
        {filteredInfluencers.length === 0 ? (
          <div className="no-results">Nenhum influenciador encontrado com os filtros atuais.</div>
        ) : (
          filteredInfluencers.map(inf => {
            const infOffers = offers.filter(o => o.influencerId === inf.id && o.restaurantId === currentUser.id);
            const hasPending = infOffers.some(o => o.status === 'Pendente' || o.status === 'Contra-Proposta');
            
            return (
              <div key={inf.id} className="influencer-card">
                <div className="inf-header">
                  <img src={inf.avatar} alt={inf.name} onClick={() => onInfluencerClick && onInfluencerClick(inf.id)} style={{ cursor: 'pointer' }} />
                  <div className="inf-info">
                    <h3 onClick={() => onInfluencerClick && onInfluencerClick(inf.id)} style={{ cursor: 'pointer' }}>{inf.name}</h3>
                    <span className="inf-handle">{inf.handle}</span>
                  </div>
                </div>
                
                <div className="inf-stats">
                  <div className="stat">
                    <strong>{formatNumber(inf.followersCount)}</strong>
                    <span>Seguidores</span>
                  </div>
                </div>

                <div className="inf-tastes">
                  {inf.tastes.map((t, index) => (
                    <span key={index} className="sm-taste">{t}</span>
                  ))}
                </div>

                <button 
                  className={`btn-offer ${hasPending ? 'btn-pending' : ''}`}
                  onClick={() => !hasPending && handleOpenOffer(inf)}
                  disabled={hasPending}
                >
                  {hasPending ? 'Oferta em Análise' : 'Fazer Oferta'}
                </button>
              </div>
            );
          })
        )}
      </div>

      {offerModalOpen && selectedInfluencer && (
        <div className="modal-overlay">
          <div className="offer-modal">
            <button className="close-btn" onClick={() => setOfferModalOpen(false)}>
              <X size={24} />
            </button>
            <h2>Nova Oferta para {selectedInfluencer.name}</h2>
            <p className="subtitle">Defina as condições da sua proposta de parceria.</p>

            <form onSubmit={handleSubmitOffer}>
              <div className="form-group">
                <label>
                  <ImageIcon size={18} />
                  Quantidade de Posts no Feed
                </label>
                <input 
                  type="number" 
                  min="0"
                  value={postsAmount}
                  onChange={(e) => setPostsAmount(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Video size={18} />
                  Quantidade de Vídeos Curtos (Reels/TikTok)
                </label>
                <input 
                  type="number" 
                  min="0"
                  value={videosAmount}
                  onChange={(e) => setVideosAmount(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <DollarSign size={18} />
                  Valor Total Oferecido (R$)
                </label>
                <input 
                  type="number" 
                  min="50"
                  step="50"
                  value={offerValue}
                  onChange={(e) => setOfferValue(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-offer-btn">
                <Send size={18} />
                Enviar Oferta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
