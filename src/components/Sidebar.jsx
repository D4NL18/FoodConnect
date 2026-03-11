import { Home, Search, Users, User, PlusCircle, UserSearch, Calendar } from 'lucide-react';
import { useState } from 'react';
import CreatePostModal from './CreatePostModal';

export default function Sidebar({ activePage, setActivePage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'explorar', label: 'Explorar', icon: Search },
    { id: 'buscar_pessoas', label: 'Buscar Pessoas', icon: UserSearch },
    { id: 'comunidade', label: 'Comunidade', icon: Users },
    { id: 'reservas', label: 'Minhas Reservas', icon: Calendar },
    { id: 'perfil', label: 'Meu Perfil', icon: User },
  ];

  return (
    <aside className="sidebar">
      <div className="logo cursor-pointer" onClick={() => setActivePage('feed')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2V12M11 12H8V2M11 12V22M8 12V22M16 2V12M16 12C16 14.2091 14.2091 16 12 16V22M16 12C17.7909 12 19.5 10.2091 19.5 8C19.5 5.79086 17.7909 4 16 4V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        FoodConnect
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
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => setIsModalOpen(true)}>
          <PlusCircle size={20} />
          Criar Post
        </button>
      </div>

      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </aside>
  );
}
