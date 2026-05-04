import { useState, useEffect, useRef } from 'react';
import { 
  UtensilsCrossed, Star, Users, Store, Camera, Calendar, 
  UserPlus, MapPin, Heart, TrendingUp, CheckCircle, 
  ArrowRight, ChefHat, Instagram, Twitter, Facebook, 
  Sparkles, Shield, Award, Globe
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onGoToAuth }) => {
  const [scrollY, setScrollY] = useState(0);
  const [countersVisible, setCountersVisible] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [restCount, setRestCount] = useState(0);
  const [influencerCount, setInfluencerCount] = useState(0);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountersVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!countersVisible) return;
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setUserCount(Math.floor(eased * 50000));
      setRestCount(Math.floor(eased * 2000));
      setInfluencerCount(Math.floor(eased * 500));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [countersVisible]);

  const features = [
    { icon: <Camera size={28} />, title: 'Compartilhe Experiências', desc: 'Publique fotos e avaliações dos seus pratos favoritos e inspire outros apreciadores.' },
    { icon: <Calendar size={28} />, title: 'Reserve Mesas', desc: 'Reserve com 1 clique nos melhores restaurantes, sem filas, sem espera.' },
    { icon: <UserPlus size={28} />, title: 'Convide Amigos', desc: 'Crie grupos gastronômicos e planeje jantares e eventos com quem você ama.' },
    { icon: <MapPin size={28} />, title: 'Descubra Restaurantes', desc: 'Encontre restaurantes incríveis perto de você com avaliações reais da comunidade.' },
    { icon: <Star size={28} />, title: 'Siga Influencers', desc: 'Acompanhe os maiores influencers gastronômicos e fique por dentro das tendências.' },
    { icon: <Globe size={28} />, title: 'Explore a Região', desc: 'Descubra a culinária local e regional com mapas interativos e dicas exclusivas.' },
  ];

  const restaurantPlans = [
    {
      name: 'Plano Básico',
      price: 'R$ 0',
      period: '/mês',
      highlight: false,
      features: ['Perfil no app', 'Receber avaliações', 'Acesso ao painel básico'],
    },
    {
      name: 'Gastronomy Premium',
      price: 'R$ 200',
      period: '/mês',
      highlight: true,
      badge: 'Popular',
      features: ['Dashboard Analítico', '3 Turbos Mensais Grátis', 'Selo de Verificado', 'Prioridade na Busca', 'Busca de Influencers'],
    }
  ];

  const influencerPlans = [
    {
      name: 'Usuário Padrão',
      price: 'R$ 0',
      period: '/mês',
      highlight: false,
      features: ['Perfil público', 'Publicar reviews', 'Seguir restaurantes', 'Feed personalizado'],
    },
    {
      name: 'Gastronomy Premium',
      price: 'R$ 50',
      period: '/mês',
      highlight: true,
      badge: 'Recomendado',
      features: ['3 Turbos Mensais Grátis', 'Perfil Premium (Selo)', 'Parcerias com Restaurantes', 'Fila Prioritária', 'Benefícios Exclusivos'],
    },
  ];

  const userBenefits = [
    { icon: <Sparkles size={24} />, title: 'Busca Inteligente', desc: 'Algoritmo que aprende seus gostos e sugere o que você vai amar.' },
    { icon: <Calendar size={24} />, title: 'Reserva 1 Click', desc: 'Reserve sua mesa favorita em segundos, direto pelo app.' },
    { icon: <Heart size={24} />, title: 'Top Favoritos', desc: 'Salve e organize seus restaurantes e pratos preferidos.' },
    { icon: <MapPin size={24} />, title: 'Listas para Conhecer', desc: 'Crie listas de "quero ir" e compartilhe com amigos.' },
  ];

  return (
    <div className="landing-page">
      {/* ─── NAVBAR ──────────────────────────────────────────── */}
      <nav className={`landing-nav ${scrollY > 20 ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-brand">
            <div className="nav-logo-icon">
              <UtensilsCrossed size={22} />
            </div>
            <span className="nav-brand-name">Gastronomy</span>
          </div>
          <div className="nav-links">
            <a href="#funcionalidades" className="nav-link">Funcionalidades</a>
            <a href="#planos" className="nav-link">Planos</a>
            <a href="#influencers" className="nav-link">Influencers</a>
            <a href="#restaurantes" className="nav-link">Restaurantes</a>
          </div>
          <div className="nav-actions">
            <button className="nav-btn-outline" onClick={() => onGoToAuth('login')}>Entrar</button>
            <button className="nav-btn-primary" onClick={() => onGoToAuth('register-customer')}>Cadastre-se</button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            GASTRONOMY FOOD SOCIAL NETWORK
          </div>
          <h1 className="hero-title">
            Conecte-se com o<br />
            <span className="hero-title-accent">melhor da gastronomia</span>
          </h1>
          <p className="hero-subtitle">
            Descubra restaurantes, siga influencers gastronômicos, reserve mesas,
            convide amigos e compartilhe experiências únicas.
          </p>
          <div className="hero-ctas">
            <button className="cta-primary" onClick={() => onGoToAuth('register-customer')}>
              Comece Grátis <ArrowRight size={18} />
            </button>
            <button className="cta-secondary" onClick={() => onGoToAuth('register-restaurant')}>
              <ChefHat size={18} /> Sou Restaurante
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats" ref={statsRef}>
          <div className="stat-item">
            <span className="stat-number">+{userCount.toLocaleString('pt-BR')}</span>
            <span className="stat-label">Usuários ativos</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">+{restCount.toLocaleString('pt-BR')}</span>
            <span className="stat-label">Restaurantes</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">+{influencerCount.toLocaleString('pt-BR')}</span>
            <span className="stat-label">Influencers</span>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────── */}
      <section className="features-section" id="funcionalidades">
        <div className="section-container">
          <div className="section-label">FUNCIONALIDADES</div>
          <h2 className="section-title">Tudo que você precisa em um só lugar</h2>
          <p className="section-subtitle">Uma plataforma completa para descobrir, compartilhar e vivenciar a gastronomia.</p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESTAURANT PLANS ────────────────────────────────── */}
      <section className="plans-section" id="restaurantes">
        <div className="section-container">
          <div className="section-label">PARA NEGÓCIOS</div>
          <h2 className="section-title">Para Restaurantes &amp; Food Services</h2>
          <p className="section-subtitle">Escolha o plano ideal e conecte-se a milhares de clientes apaixonados por gastronomia.</p>
          <div className="plans-grid plans-grid-2" id="planos">
            {restaurantPlans.map((plan, i) => (
              <div className={`plan-card ${plan.highlight ? 'plan-card-highlight' : ''}`} key={i}>
                {plan.badge && <div className="plan-badge">{plan.badge}</div>}
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="plan-price-value">{plan.price}</span>
                    <span className="plan-price-period">{plan.period}</span>
                  </div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feat, j) => (
                    <li key={j}>
                      <CheckCircle size={16} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`plan-btn ${plan.highlight ? 'plan-btn-primary' : 'plan-btn-outline'}`}
                  onClick={() => onGoToAuth(plan.price === 'R$ 0' ? 'register-restaurant' : 'login', plan.price === 'R$ 0' ? null : 'premium')}
                >
                  {plan.price === 'R$ 0' ? 'Começar Grátis' : 'Assinar Agora'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INFLUENCER PLANS ────────────────────────────────── */}
      <section className="influencer-section" id="influencers">
        <div className="section-container">
          <div className="section-label">PARA CRIADORES</div>
          <h2 className="section-title">Para Influencers Gastronômicos</h2>
          <p className="section-subtitle">Monetize seu conteúdo, ganhe visibilidade e feche parcerias com os melhores restaurantes.</p>
          <div className="plans-grid plans-grid-2">
            {influencerPlans.map((plan, i) => (
              <div className={`plan-card ${plan.highlight ? 'plan-card-highlight' : ''}`} key={i}>
                {plan.badge && <div className="plan-badge">{plan.badge}</div>}
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="plan-price-value">{plan.price}</span>
                    <span className="plan-price-period">{plan.period}</span>
                  </div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feat, j) => (
                    <li key={j}>
                      <CheckCircle size={16} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`plan-btn ${plan.highlight ? 'plan-btn-primary' : 'plan-btn-outline'}`}
                  onClick={() => onGoToAuth(plan.price === 'R$ 0' ? 'register-customer' : 'login', plan.price === 'R$ 0' ? null : 'premium')}
                >
                  {plan.price === 'R$ 0' ? 'Criar Perfil Grátis' : 'Assinar Premium'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USER BENEFITS ───────────────────────────────────── */}
      <section className="user-section">
        <div className="section-container">
          <div className="user-section-inner">
            <div className="user-section-text">
              <div className="section-label">PARA USUÁRIOS</div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Gratuito para Usuários</h2>
              <p className="section-subtitle" style={{ textAlign: 'left' }}>
                Acesse gratuitamente o melhor da gastronomia, com recursos inteligentes feitos para você.
              </p>
              <button className="cta-primary" style={{ marginTop: '24px', display: 'inline-flex' }} onClick={() => onGoToAuth('register-customer')}>
                Criar Conta Grátis <ArrowRight size={18} />
              </button>
            </div>
            <div className="user-benefits-grid">
              {userBenefits.map((b, i) => (
                <div className="user-benefit-card" key={i}>
                  <div className="benefit-icon">{b.icon}</div>
                  <div>
                    <h4 className="benefit-title">{b.title}</h4>
                    <p className="benefit-desc">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL COMMITMENT ───────────────────────────────── */}
      <section className="commitment-section">
        <div className="section-container">
          <div className="commitment-inner">
            <div className="commitment-icon-wrap">
              <Shield size={48} />
            </div>
            <h2 className="commitment-title">Nosso Compromisso Social</h2>
            <p className="commitment-desc">
              Acreditamos que a gastronomia une pessoas e culturas. Por isso, reinvestimos parte da receita em 
              projetos de capacitação gastronômica em comunidades carentes, apoiando pequenos produtores e 
              restaurantes locais que fazem a diferença na vida das pessoas.
            </p>
            <div className="commitment-stats">
              <div className="commitment-stat">
                <Award size={20} />
                <span>+200 produtores apoiados</span>
              </div>
              <div className="commitment-stat">
                <Users size={20} />
                <span>+1.500 capacitados</span>
              </div>
              <div className="commitment-stat">
                <Heart size={20} />
                <span>15 comunidades atendidas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ───────────────────────────────────────── */}
      <section className="final-cta-section">
        <div className="section-container">
          <div className="final-cta-inner">
            <h2 className="final-cta-title">Pronto para descobrir o melhor da gastronomia?</h2>
            <p className="final-cta-sub">Junte-se a +50 mil apaixonados por gastronomia. É grátis para começar.</p>
            <div className="hero-ctas" style={{ justifyContent: 'center' }}>
              <button className="cta-primary" onClick={() => onGoToAuth('register-customer')}>
                Cadastre-se Gratuitamente <ArrowRight size={18} />
              </button>
              <button className="cta-secondary" onClick={() => onGoToAuth('login')}>
                Fazer Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="nav-logo-icon">
                <UtensilsCrossed size={20} />
              </div>
              <span>Gastronomy</span>
            </div>
            <p className="footer-tagline">A rede social mais saborosa do Brasil. Conectamos pessoas, restaurantes e influencers pelo amor à gastronomia.</p>
            <div className="footer-socials">
              <a href="#" className="social-icon"><Instagram size={18} /></a>
              <a href="#" className="social-icon"><Twitter size={18} /></a>
              <a href="#" className="social-icon"><Facebook size={18} /></a>
            </div>
          </div>
          <div className="footer-links-group">
            <h4>Plataforma</h4>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#planos">Planos</a>
            <a href="#influencers">Para Influencers</a>
            <a href="#restaurantes">Para Restaurantes</a>
          </div>
          <div className="footer-links-group">
            <h4>Conta</h4>
            <button onClick={() => onGoToAuth('login')}>Fazer Login</button>
            <button onClick={() => onGoToAuth('register-customer')}>Cadastre-se</button>
            <button onClick={() => onGoToAuth('register-restaurant')}>Sou Restaurante</button>
          </div>
          <div className="footer-links-group">
            <h4>Empresa</h4>
            <a href="#">Sobre nós</a>
            <a href="#">Blog</a>
            <a href="#">Contato</a>
            <a href="#">Política de Privacidade</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Gastronomy Food Social Network. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
