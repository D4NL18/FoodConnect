import { useState } from 'react';
import './AuthScreens.css';
import { ChefHat, User, ArrowRight, UtensilsCrossed } from 'lucide-react';

const AVAILABLE_FEATURES = [
  "Acessibilidade", "Ar Livre", "Benefício de Aniversário", 
  "Carta de Vinhos", "Espaço Kids", "Estacionamento", 
  "Eventos", "Happy Hour", "Música ao Vivo", 
  "Pet Friendly", "Rodízio", "Vegano"
];

const AVAILABLE_TASTES = [
  "Alta Gastronomia", "Árabe", "Bar", "Brasileira", "Cafés Especiais", 
  "Cerveja Artesanal", "Churrasco", "Comida Caseira", "Doces Artesanais", 
  "Doces Finos", "Frutos do Mar", "Fusion", "Hamburguer", "Italiana", 
  "Japonês", "Mexicana", "Molecular", "Nordestina", "Pizza", "Ramen", 
  "Vegano", "Vegetariano", "Vinhos"
];

const AuthScreens = ({ onLogin }) => {
  const [view, setView] = useState('login'); // 'login', 'register-customer', 'register-restaurant'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Formulário Cliente
  const [custName, setCustName] = useState('');
  const [custHandle, setCustHandle] = useState('');
  const [custTastes, setCustTastes] = useState([]);

  const toggleTaste = (taste) => {
    setCustTastes(prev => 
      prev.includes(taste) ? prev.filter(t => t !== taste) : [...prev, taste]
    );
  };

  // Formulário Restaurante
  const [restName, setRestName] = useState('');
  const [restHandle, setRestHandle] = useState('');
  const [restCep, setRestCep] = useState('');
  const [restNumber, setRestNumber] = useState('');
  const [restFeatures, setRestFeatures] = useState([]);

  const toggleFeature = (feature) => {
    setRestFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email === 'cliente@teste.com' && password === 'senha123') {
      // Clientes premium têm acesso às funcionalidades de parcerias (influenciadores)
      onLogin('cliente', { id: 201, name: 'Ana Silva', email, handle: '@anitta_s', premium: true, followersCount: 12500, tastes: ['Vegetariano', 'Vinhos', 'Doces Artesanais'] });
    } else if (email === 'restaurante@teste.com' && password === 'senha123') {
      onLogin('restaurante', { id: 1, name: 'Oásis Veggie Gourmet', email });
    } else {
      alert('Credenciais inválidas. Tente cliente@teste.com ou restaurante@teste.com com a senha senha123.');
    }
  };

  const handleRegisterCustomer = (e) => {
    e.preventDefault();
    // Simulate register
    const formattedHandle = custHandle.startsWith('@') ? custHandle : `@${custHandle}`;
    onLogin('cliente', { id: Date.now(), name: custName, handle: formattedHandle, email });
  };

  const handleRegisterRestaurant = (e) => {
    e.preventDefault();
    // Simulate register
    const formattedHandle = restHandle.startsWith('@') ? restHandle : `@${restHandle}`;
    onLogin('restaurante', { id: 1, name: restName, handle: formattedHandle, email }); // Using ID 1 to map to an existing mock restaurant profile
  };

  if (view === 'login') {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px', flexDirection: 'row' }}>
            <img src="/logo.png" alt="Gastronomy Logo" style={{ height: '64px', objectFit: 'contain', mixBlendMode: 'multiply', borderRadius: '50%' }} />
            <h1 style={{ margin: 0, fontSize: '36px' }}>Gastronomy</h1>
          </div>
          <h2>Bem-vindo de volta</h2>
          <p className="auth-subtitle">Conectando você aos melhores sabores</p>

          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="auth-input-group">
              <label>E-mail</label>
              <input 
                type="email" 
                placeholder="cliente@teste.com ou restaurante@teste.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="auth-input-group">
              <label>Senha</label>
              <input 
                type="password" 
                placeholder="senha123" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="auth-btn auth-btn-primary">
              Entrar <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>Novo por aqui?</span>
          </div>

          <div className="auth-options">
            <button onClick={() => setView('register-customer')} className="auth-btn auth-btn-secondary">
              <User size={18} /> Sou Cliente
            </button>
            <button onClick={() => setView('register-restaurant')} className="auth-btn auth-btn-secondary">
              <ChefHat size={18} /> Sou Restaurante
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'register-customer') {
    return (
      <div className="auth-container">
        <div className="auth-box auth-box-large">
          <div className="auth-header">
            <h2>Criar Conta de Cliente</h2>
            <p className="auth-subtitle">Descubra novos pratos e compartilhe suas experiências</p>
          </div>

          <form onSubmit={handleRegisterCustomer} className="auth-form list-form">
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="auth-input-group" style={{ flex: 1 }}>
                <label>Nome</label>
                <input type="text" placeholder="Seu nome" value={custName} onChange={(e) => setCustName(e.target.value)} required />
              </div>
              <div className="auth-input-group" style={{ flex: 1 }}>
                <label>Usuário</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 'bold' }}>@</span>
                  <input type="text" placeholder="seu_usuario" value={custHandle} onChange={(e) => setCustHandle(e.target.value)} required style={{ paddingLeft: '38px', width: '100%' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="auth-input-group" style={{ flex: 1 }}>
                <label>E-mail</label>
                <input type="email" placeholder="seuemail@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="auth-input-group" style={{ flex: 1 }}>
                <label>Senha</label>
                <input type="password" placeholder="Mín. 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <div className="auth-input-group">
              <label>Preferências Gastronômicas</label>
              <div className="features-selection">
                {AVAILABLE_TASTES.map(t => (
                  <button 
                    type="button" 
                    key={t} 
                    className={`feature-chip ${custTastes.includes(t) ? 'active' : ''}`}
                    onClick={() => toggleTaste(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <button type="submit" className="auth-btn auth-btn-primary">Criar Conta</button>
            <button type="button" onClick={() => setView('login')} className="auth-btn auth-btn-text">
              Já tem conta? Fazer login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === 'register-restaurant') {
    return (
      <div className="auth-container">
        <div className="auth-box auth-box-large">
          <div className="auth-header">
            <h2>Registrar Restaurante</h2>
            <p className="auth-subtitle">Encontre novos clientes e expanda seu negócio</p>
          </div>

          <form onSubmit={handleRegisterRestaurant} className="auth-form list-form">
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="auth-input-group" style={{ flex: 1 }}>
                <label>Estabelecimento</label>
                <input type="text" placeholder="Nome" value={restName} onChange={(e) => setRestName(e.target.value)} required />
              </div>
              <div className="auth-input-group" style={{ flex: 1 }}>
                <label>Usuário</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 'bold' }}>@</span>
                  <input type="text" placeholder="restaurante" value={restHandle} onChange={(e) => setRestHandle(e.target.value)} required style={{ paddingLeft: '38px', width: '100%' }} />
                </div>
              </div>
            </div>
            <div className="auth-input-group">
              <label>E-mail</label>
              <input type="email" placeholder="contato@restaurante.com.br" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="auth-input-group" style={{ flex: 1, minWidth: 0 }}>
                <label>Senha</label>
                <input type="password" placeholder="Mínimo 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: 0 }}>
                <div className="auth-input-group" style={{ flex: 2, minWidth: 0 }}>
                  <label>CEP</label>
                  <input type="text" placeholder="00000-000" value={restCep} onChange={(e) => setRestCep(e.target.value)} required />
                </div>
                <div className="auth-input-group" style={{ flex: 1, minWidth: 0 }}>
                  <label>Nº</label>
                  <input type="text" placeholder="123" value={restNumber} onChange={(e) => setRestNumber(e.target.value)} required />
                </div>
              </div>
            </div>
            <div className="auth-input-group">
              <label>Diferenciais</label>
              <div className="features-selection">
                {AVAILABLE_FEATURES.map(f => (
                  <button 
                    type="button" 
                    key={f} 
                    className={`feature-chip ${restFeatures.includes(f) ? 'active' : ''}`}
                    onClick={() => toggleFeature(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            
            <button type="submit" className="auth-btn auth-btn-primary">Registrar Restaurante</button>
            <button type="button" onClick={() => setView('login')} className="auth-btn auth-btn-text">
              Já tem conta? Fazer login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthScreens;
