import { Home, Search, Users, User, PlusCircle, UserSearch, Calendar, LogOut, BarChart2, Star, Megaphone, Rocket, Crown, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import CreatePostModal from './CreatePostModal';

export default function Sidebar({ activePage, setActivePage, onLogout, userType, currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let navItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'explorar', label: 'Explorar', icon: Search },
    { id: 'buscar_pessoas', label: 'Buscar Pessoas', icon: UserSearch },
    { id: 'comunidade', label: 'Comunidade', icon: Users },
    { id: 'reservas', label: 'Minhas Reservas', icon: Calendar },
    { id: 'perfil', label: 'Meu Perfil', icon: User },
    { id: 'premium', label: 'Assinar Premium', icon: Crown },
    // Premium items last:
    { id: 'turbos', label: 'Turbinar Posts', icon: Rocket },
  ];

  if (userType === 'cliente' && currentUser?.premium) {
    navItems.push({ id: 'parcerias', label: 'Parcerias', icon: Star, premium: true });
  }

  if (userType === 'restaurante') {
    navItems = [
      { id: 'perfil', label: 'Meu Perfil', icon: User },
      { id: 'reservas', label: 'Minhas Reservas', icon: Calendar },
      { id: 'premium', label: 'Premium', icon: Crown },
      // Premium items last:
      { id: 'turbos', label: 'Turbinar Posts', icon: Rocket },
      { id: 'cursos', label: 'Cursos', icon: GraduationCap, premium: true },
      { id: 'dashboard', label: 'Dashboard', icon: BarChart2, premium: true },
      { id: 'buscar_influencers', label: 'Buscar Influencers', icon: Megaphone, premium: true },
      { id: 'gerenciar_parcerias', label: 'Minhas Parcerias', icon: Star, premium: true },
    ];
  }

  return (
    <aside className="sidebar">
      <div className="logo cursor-pointer" onClick={() => setActivePage('feed')} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <img src="/logo.png" alt="Gastronomy Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', borderRadius: '50%' }} />
        <span style={{ fontSize: '24px', fontWeight: 900 }}>Gastronomy</span>
      </div>

      <nav className="nav-menu" style={{ flex: 1 }}>
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <Icon size={20} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.premium && (
                <Star
                  size={13}
                  fill="#f59e0b"
                  color="#f59e0b"
                  style={{ flexShrink: 0, filter: 'drop-shadow(0 0 3px rgba(245,158,11,0.5))' }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => setIsModalOpen(true)}>
          <PlusCircle size={20} />
          Criar Post
        </button>
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '12px',
            marginTop: '12px',
            borderRadius: '8px',
            color: 'var(--text-secondary)',
            fontWeight: '600',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#fee2e2';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </aside>
  );
}
