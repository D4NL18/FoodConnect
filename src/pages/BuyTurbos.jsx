import { useState } from 'react';
import { Rocket, Zap, Crown, CreditCard, TrendingUp, CheckCircle, Info } from 'lucide-react';
import './BuyTurbos.css';

export default function BuyTurbos({ currentUser, turboBalance = 0, setTurboBalance }) {
  const [selectedPack, setSelectedPack] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const isRestaurant = currentUser?.type === 'restaurante';
  const multiplier = isRestaurant ? 5 : 1;

  const basePacks = [
    { id: 1, turbos: 3,  price: 9.90,  popular: false, icon: Zap },
    { id: 2, turbos: 15, price: 34.90, popular: true,  icon: TrendingUp },
    { id: 3, turbos: 40, price: 79.90, popular: false, icon: Crown },
  ];

  const packs = basePacks.map(p => ({ ...p, price: p.price * multiplier }));

  const handleBuy = (pack) => {
    setSelectedPack(pack);
    setTimeout(() => {
      setTurboBalance(prev => prev + pack.turbos);
      setSelectedPack(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="turbos-container">
      <div className="turbos-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="header-icon">
            <Rocket size={32} color="#f97316" />
          </div>
          <div>
            <h1>Turbinar Posts</h1>
            <p>Aumente o alcance das suas publicações e atraia mais olhares!</p>
          </div>
        </div>
        <div className="balance-card">
          <span>Seu Saldo:</span>
          <h2>{turboBalance} <Zap size={22} color="#f97316" fill="#f97316" style={{ marginLeft: '4px' }} /></h2>
          <p>Turbos disponíveis</p>
        </div>
      </div>

      {currentUser?.premium && turboBalance >= 0 && (
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fffbeb)', border: '1px solid #fbbf24', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Info size={20} color="#d97706" />
          <p style={{ margin: 0, color: '#92400e', fontSize: '14px' }}>
            <strong>Bônus Premium!</strong> Como assinante, você recebeu <strong>3 Turbos gratuitos</strong> ao ativar sua conta premium. Compre mais a qualquer momento!
          </p>
        </div>
      )}

      {showSuccess && (
        <div className="success-toast">
          <CheckCircle size={20} />
          Compra realizada com sucesso! Seus turbos já estão disponíveis.
        </div>
      )}

      <div className="packs-section">
        <h2>Comprar Turbos</h2>
        <p className="section-desc">Cada Turbo dura <strong>24 horas</strong> e faz a publicação aparecer muito mais na aba <em>Para Você</em> e em <em>Explorar</em>. Pacotes maiores têm custo por Turbo menor.</p>

        <div className="packs-grid">
          {packs.map(pack => {
            const Icon = pack.icon;
            const totalTurbos = pack.turbos;
            const pricePerTurbo = (pack.price / totalTurbos).toFixed(2).replace('.', ',');
            return (
              <div key={pack.id} className={`pack-card ${pack.popular ? 'popular' : ''}`}>
                {pack.popular && <span className="popular-badge">Mais Popular</span>}
                <div className="pack-icon">
                  <Icon size={32} color={pack.popular ? '#fff' : '#f97316'} />
                </div>
                <h3>{pack.turbos} Turbos</h3>
                <div className="pack-price">
                  <span className="currency">R$</span>
                  <span className="value">{pack.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '20px',
                  color: pack.popular ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)',
                  background: pack.popular ? 'rgba(255,255,255,0.15)' : '#f3f4f6',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  display: 'inline-block',
                }}>
                  R$ {pricePerTurbo} por Turbo
                </div>
                <button
                  className={`buy-btn ${selectedPack?.id === pack.id ? 'loading' : ''}`}
                  onClick={() => handleBuy(pack)}
                  disabled={!!selectedPack}
                >
                  {selectedPack?.id === pack.id ? (
                    'Processando...'
                  ) : (
                    <>
                      <CreditCard size={18} /> Comprar Agora
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="info-section">
        <h3>Como funciona?</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>1. Adquira Turbos</h4>
            <p>Compre pacotes de créditos{!isRestaurant ? ' (ou use seus turbos gratuitos do plano premium)' : ''}.</p>
          </div>
          <div className="info-card">
            <h4>2. Turbo no Post</h4>
            <p>Vá até o seu perfil e clique em "Turbinar" em qualquer avaliação ou publicação sua.</p>
          </div>
          <div className="info-card">
            <h4>3. Alcance 10x Maior por 24h</h4>
            <p>O post é priorizado nas abas <strong>Para Você</strong> e <strong>Explorar</strong> durante 24 horas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
