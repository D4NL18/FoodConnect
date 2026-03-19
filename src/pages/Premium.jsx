import { useState } from 'react';
import { Crown, Check, Star, Rocket, Zap, Heart, TrendingUp, Shield, Gift, Sparkles } from 'lucide-react';

export default function Premium({ currentUser }) {
  const isRestaurant = currentUser?.type === 'restaurante';
  const price = isRestaurant ? '200' : '50';
  
  const features = isRestaurant ? [
    { icon: <TrendingUp size={20} />, title: "Dashboard Analítico", desc: "Acesso total a métricas de visualizações, conversão e desempenho de posts." },
    { icon: <Zap size={20} />, title: "3 Turbos Mensais Grátis", desc: "Aumente o alcance dos seus melhores pratos com 3 boosts gratuitos todo mês." },
    { icon: <Star size={20} />, title: "Selo de Verificado", desc: "Destaque sua marca com um selo dourado exclusivo que gera mais confiança." },
    { icon: <Shield size={20} />, title: "Prioridade na Busca", desc: "Seu restaurante aparecerá no topo dos resultados de busca e no Explorar." },
    { icon: <Sparkles size={20} />, title: "Busca de Influencers", desc: "Encontre e negocie parcerias diretamente com os maiores criadores da região." },
  ] : [
    { icon: <Zap size={20} />, title: "3 Turbos Mensais Grátis", desc: "Destaque suas reviews e fotos de pratos para toda a comunidade." },
    { icon: <Star size={20} />, title: "Perfil Premium", desc: "Selo dourado no seu perfil e comentários para se destacar na comunidade." },
    { icon: <TrendingUp size={20} />, title: "Seja um Influencer", desc: "Acesse a aba de parcerias e receba convites exclusivos de restaurantes." },
    { icon: <Shield size={20} />, title: "Fila Prioritária", desc: "Prioridade em reservas e confirmação instantânea em estabelecimentos parceiros." },
    { icon: <Gift size={20} />, title: "Benefícios Exclusivos", desc: "Descontos e cortesias secretas liberadas apenas para membros Premium." },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); } 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); } }
        .feature-card:hover { transform: scale(1.02); background: rgba(255, 255, 255, 0.08) !important; border-color: #f59e0b !important; }
        .gradient-text { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999; animation: fadeIn 0.3s ease-out; }
      `}</style>

      {/* Hero Section */}
      <div style={{ 
        position: 'relative', 
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', 
        borderRadius: '24px', 
        padding: '60px 40px', 
        color: '#fff',
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        marginBottom: '40px'
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: 'rgba(245, 158, 11, 0.1)', 
          padding: '12px 24px', 
          borderRadius: '50px', 
          border: '1px solid rgba(245, 158, 11, 0.3)',
          marginBottom: '24px'
        }}>
          <Crown size={24} color="#f59e0b" style={{ marginRight: '10px' }} />
          <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>FoodConnect Premium</span>
        </div>

        <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '16px', lineHeight: 1.2 }}>
          {isRestaurant ? 'Leve seu restaurante ao próximo nível' : 'A experiência gastronômica definitiva'}
        </h1>
        
        <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
          {isRestaurant 
            ? 'Acesse ferramentas exclusivas de marketing, dashboard analítico e parcerias com os maiores influencers da região.' 
            : 'Ganhe destaque na comunidade, receba convites para parcerias e aproveite benefícios exclusivos em estabelecimentos parceiros.'}
        </p>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          <span style={{ fontSize: '24px', fontWeight: 600, color: '#9ca3af' }}>R$</span>
          <span style={{ fontSize: '64px', fontWeight: 900, color: '#fff' }}>{price}</span>
          <span style={{ fontSize: '20px', fontWeight: 500, color: '#9ca3af' }}>/mês</span>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ 
            padding: '18px 48px', 
            fontSize: '18px', 
            fontWeight: 800, 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
            border: 'none', 
            color: '#000', 
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(217, 119, 6, 0.3)',
            animation: 'pulse 2s infinite',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Assinar Agora
        </button>
        <p style={{ marginTop: '16px', fontSize: '13px', color: '#6b7280' }}>Cancele a qualquer momento • Sem fidelidade</p>
      </div>

      {/* Modal de Confirmação */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div style={{ 
            background: '#fff', 
            width: '90%', 
            maxWidth: '450px', 
            borderRadius: '24px', 
            padding: '40px', 
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            border: '1px solid #f59e0b33'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'rgba(245, 158, 11, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 24px',
              color: '#f59e0b'
            }}>
              <Crown size={40} />
            </div>
            
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px', color: '#111827' }}>Confirmar Assinatura</h2>
            <p style={{ color: '#6b7280', marginBottom: '32px', lineHeight: 1.6 }}>
              Você está prestes a assinar o plano **FoodConnect Premium** por **R$ {price}/mês**. 
              Todos os benefícios serão liberados instantaneamente na sua conta.
            </p>

            <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '20px', marginBottom: '32px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Check size={18} color="#16a34a" /> <span style={{ fontSize: '14px', fontWeight: 600 }}>Status Premium no Perfil</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Check size={18} color="#16a34a" /> <span style={{ fontSize: '14px', fontWeight: 600 }}>Suporte Prioritário 24/7</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={18} color="#16a34a" /> <span style={{ fontSize: '14px', fontWeight: 600 }}>Cancelamento em 1 clique</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={() => setIsSuccess(true)}
                style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', 
                  color: '#fff', 
                  fontWeight: 700, 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Confirmar e Pagar R$ {price}
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ 
                  padding: '12px', 
                  borderRadius: '12px', 
                  background: 'transparent', 
                  color: '#6b7280', 
                  fontWeight: 600, 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Sucesso Customizado */}
      {isSuccess && (
        <div className="modal-overlay" onClick={() => { setIsSuccess(false); setIsModalOpen(false); }}>
          <div style={{ 
            background: '#fff', 
            width: '90%', 
            maxWidth: '450px', 
            borderRadius: '24px', 
            padding: '40px', 
            textAlign: 'center',
            position: 'relative',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            border: '1px solid #16a34a33'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'rgba(22, 163, 74, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 24px',
              color: '#16a34a'
            }}>
              <Sparkles size={40} />
            </div>
            
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px', color: '#111827' }}>Parabéns!</h2>
            <p style={{ color: '#6b7280', marginBottom: '32px', lineHeight: 1.6 }}>
              Sua assinatura foi realizada com sucesso! Aproveite todos os seus benefícios **FoodConnect Premium** agora mesmo.
            </p>

            <button 
              onClick={() => {
                setIsSuccess(false);
                setIsModalOpen(false);
              }}
              style={{ 
                width: '100%',
                padding: '16px', 
                borderRadius: '12px', 
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', 
                color: '#fff', 
                fontWeight: 700, 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Começar a usar
            </button>
          </div>
        </div>
      )}



      {/* Features Grid */}
      <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 800, marginBottom: '32px', color: 'var(--text-primary)' }}>Por que ser Premium?</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {features.map((feature, i) => (
          <div key={i} className="feature-card" style={{ 
            padding: '24px', 
            background: '#fff', 
            border: '1px solid var(--border-color)', 
            borderRadius: '16px', 
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
          }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              background: 'rgba(245, 158, 11, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#f59e0b',
              marginBottom: '16px'
            }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{feature.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Social Proof / Trust Section */}
      <div style={{ background: '#f9731610', padding: '32px', borderRadius: '24px', border: '1px dashed #f9731630', textAlign: 'center' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary-orange)', marginBottom: '16px' }}>Junte-se à Elite do FoodConnect</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)' }}>{isRestaurant ? '12k+' : '45k+'}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{isRestaurant ? 'Restaurantes Parceiros' : 'Usuários Premium'}</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)' }}>{isRestaurant ? '3.5x' : '2.8x'}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{isRestaurant ? 'Mais Alcance Médio' : 'Mais Interações'}</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)' }}>100%</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Satisfação Garantida</div>
          </div>
        </div>
      </div>
    </div>
  );
}
