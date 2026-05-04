import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import FeedTabs from './components/FeedTabs';
import FeedAmigos from './pages/FeedAmigos';
import FeedParaVoce from './pages/FeedParaVoce';
import FeedEmAlta from './pages/FeedEmAlta';
import Explorar from './pages/Explorar';
import Comunidade from './pages/Comunidade';
import MeuPerfil from './pages/MeuPerfil';
import RestaurantePerfil from './pages/RestaurantePerfil';
import FullMenu from './pages/FullMenu';
import PostDetail from './pages/PostDetail';
import BuscarPessoas from './pages/BuscarPessoas';
import UserProfile from './pages/UserProfile';
import MinhasReservas from './pages/MinhasReservas';
import GerenciarReservas from './pages/GerenciarReservas';
import GroupDetail from './pages/GroupDetail';
import Dashboard from './pages/Dashboard';
import AuthScreens from './components/AuthScreens';
import InfluencerSearch from './pages/InfluencerSearch';
import InfluencerOffers from './pages/InfluencerOffers';
import RestaurantOffers from './pages/RestaurantOffers';
import BuyTurbos from './pages/BuyTurbos';
import Premium from './pages/Premium';
import Cursos from './pages/Cursos';
import { mockReservations } from './data/mockData';

function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('landing');
  const [authInitialView, setAuthInitialView] = useState('login');
  const [postLoginAction, setPostLoginAction] = useState(null);
  const [activeTab, setActiveTab] = useState('para_voce');
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  const [activeMenu, setActiveMenu] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [reservations, setReservations] = useState(
    mockReservations.map((res, i) => ({
      ...res,
      id: i + 1,
      status: i === 0 ? 'Pendente' : (i === 1 ? 'Proposta Enviada' : 'Confirmada'),
      customerName: 'Cliente ' + (i + 1),
      partySize: res.partySize || '2 pessoas',
      date: res.date || 'Hoje',
      time: res.time || '19:00',
      proposedDate: i === 1 ? 'Amanhã' : undefined,
      proposedTime: i === 1 ? '20:30' : undefined
    }))
  );

  // ── Fila Virtual ─────────────────────────────────────────────────────────
  const [queue, setQueue] = useState({
    isOpen: true,
    entries: [
      { id: 1001, name: 'Carlos Mendes',   partySize: 3, joinedAt: '19:32' },
      { id: 1002, name: 'Aline Ferreira',  partySize: 2, joinedAt: '19:35' },
      { id: 1003, name: 'Roberto Lima',    partySize: 4, joinedAt: '19:38' },
      { id: 1004, name: 'Tatiane Ramos',   partySize: 1, joinedAt: '19:41' },
      { id: 1005, name: 'Gustavo Pereira', partySize: 5, joinedAt: '19:44' },
    ],
    calledEntries: [], // grupos chamados aguardando confirmação de chegada
    maxSize: 30,
    autoCloseTime: null,
    queueHistory: [14, 11, 13, 9, 16, 12, 10, 15, 11, 13, 8, 14, 12, 16, 10],
  });
  // Entrada do usuário cliente na fila (null se não está na fila)
  const [currentUserQueue, setCurrentUserQueue] = useState(null);
  // controla qual tab abre em MinhasReservas (para redirect pós-entrada na fila)
  const [initialReservasTab, setInitialReservasTab] = useState('reservas');

  const handleQueueUpdate = (patch) => {
    setQueue(prev => ({ ...prev, ...patch }));
  };

  const handleJoinQueue = ({ partySize }) => {
    const now = new Date();
    const joinedAt = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const entry = { id: Date.now(), name: user?.name || 'Você', partySize, joinedAt };
    setCurrentUserQueue(entry);
    setQueue(prev => ({ ...prev, entries: [...prev.entries, entry] }));
  };

  const handleLeaveQueue = () => {
    if (!currentUserQueue) return;
    setQueue(prev => ({ ...prev, entries: prev.entries.filter(e => e.id !== currentUserQueue.id) }));
    setCurrentUserQueue(null);
  };

  // Entra na fila a partir do perfil do restaurante e navega para Minhas Reservas → Fila
  const handleJoinQueueAndNavigate = ({ partySize, restaurantId, restaurantName }) => {
    const now = new Date();
    const joinedAt = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const entry = { id: Date.now(), name: user?.name || 'Você', partySize, joinedAt, restaurantId, restaurantName };
    setCurrentUserQueue(entry);
    setQueue(prev => ({ ...prev, entries: [...prev.entries, entry] }));
    setActiveRestaurant(null);
    setInitialReservasTab('fila');
    setActivePage('reservas');
  };

  const [favoriteRestaurants, setFavoriteRestaurants] = useState([2, 3, 5]);
  const [turboBalance, setTurboBalance] = useState(0);
  // turbosActive: { [postId]: expiresAt (timestamp) }
  const [turbosActive, setTurbosActive] = useState({});

  // Offers state
  const [offers, setOffers] = useState([
    {
      id: 1,
      restaurantId: 2,
      restaurantName: 'Burger House - Pinheiros',
      influencerId: 201,
      influencerName: 'Ana Silva',
      status: 'Pendente', 
      posts: 2,
      videos: 1,
      value: 1500,
      originalOffer: null
    },
    {
      id: 2,
      restaurantId: 1,
      restaurantName: 'Oásis Veggie Gourmet',
      influencerId: 211,
      influencerName: 'Camila Freitas',
      status: 'Pendente',
      posts: 3,
      videos: 2,
      value: 2000,
      originalOffer: null
    },
    {
      id: 3,
      restaurantId: 1,
      restaurantName: 'Oásis Veggie Gourmet',
      influencerId: 201,
      influencerName: 'Ana Silva',
      status: 'Contra-Proposta',
      posts: 1,
      videos: 2,
      value: 2500,
      originalOffer: {
        posts: 2,
        videos: 2,
        value: 1800
      }
    },
    {
      id: 4,
      restaurantId: 1,
      restaurantName: 'Oásis Veggie Gourmet',
      influencerId: 209,
      influencerName: 'Beatriz Almeida',
      status: 'Aceita',
      posts: 1,
      videos: 1,
      value: 1000,
      originalOffer: null
    },
    {
      id: 5,
      restaurantId: 3,
      restaurantName: 'La Trattoria Bella',
      influencerId: 201,
      influencerName: 'Ana Silva',
      status: 'Pendente',
      posts: 4,
      videos: 0,
      value: 3000,
      originalOffer: null
    },
    {
      id: 6,
      restaurantId: 1,
      restaurantName: 'Oásis Veggie Gourmet',
      influencerId: 206,
      influencerName: 'Fernanda Lima',
      status: 'Recusada',
      posts: 3,
      videos: 3,
      value: 1200,
      originalOffer: null
    },
    {
      id: 7,
      restaurantId: 4,
      restaurantName: 'Sushi Lounge',
      influencerId: 201,
      influencerName: 'Ana Silva',
      status: 'Aceita',
      posts: 2,
      videos: 1,
      value: 1800,
      originalOffer: null
    },
    {
      id: 8,
      restaurantId: 1,
      restaurantName: 'Oásis Veggie Gourmet',
      influencerId: 201,
      influencerName: 'Ana Silva',
      status: 'Recusada',
      posts: 1,
      videos: 0,
      value: 800,
      originalOffer: null
    }
  ]);

  const handleCreateOffer = (offerData) => {
    setOffers(prev => [...prev, { ...offerData, id: Date.now(), status: 'Pendente' }]);
  };

  const handleUpdateOffer = (id, newStatus, extraData = {}) => {
    setOffers(prev => prev.map(offer => offer.id === id ? { ...offer, status: newStatus, ...extraData } : offer));
  };

  const handleUpdateReservation = (id, newStatus, extraData = {}) => {
    setReservations(prev => prev.map(res => res.id === id ? { ...res, status: newStatus, ...extraData } : res));
  };

  const toggleFavoriteRestaurant = (id) => {
    setFavoriteRestaurants(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  const handleLogin = (userType, userData) => {
    setUser({ type: userType, ...userData });
    
    if (postLoginAction === 'premium') {
      setActivePage('premium');
      setPostLoginAction(null);
    } else if (userType === 'cliente') {
      setActivePage('feed');
      setActiveTab('para_voce');
    } else if (userType === 'restaurante') {
      setActivePage('perfil');
    }

    if (userType === 'cliente') {
      setActiveRestaurant(null);
      // Premium clients get 3 free turbos
      if (userData.premium) setTurboBalance(3);
    } else if (userType === 'restaurante') {
      setActiveRestaurant(userData.id);
    }
  };

  const handleBoostPost = (postId) => {
    if (turboBalance <= 0) return false;
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24h
    setTurboBalance(prev => prev - 1);
    setTurbosActive(prev => ({ ...prev, [postId]: expiresAt }));
    return true;
  };

  const renderContent = () => {
    if (activeGroup) {
      return (
        <GroupDetail 
          group={activeGroup} 
          onBack={() => setActiveGroup(null)} 
        />
      );
    }
    if (activePost) {
      return (
        <PostDetail
          postId={activePost}
          onBack={() => setActivePost(null)}
          onRestaurantClick={setActiveRestaurant}
          activeUser={activeUser}
          activePage={activePage}
          currentUser={user}
        />
      );
    }

    if (activeMenu) {
      const restId = activeRestaurant || (user?.type === 'restaurante' ? user.id : null);
      if (restId) {
        return <FullMenu restaurantId={restId} onBack={() => setActiveMenu(false)} />;
      }
    }

    if (activeRestaurant && activeRestaurant !== user?.id) {
      return <RestaurantePerfil
        restaurantId={activeRestaurant}
        onBack={() => setActiveRestaurant(null)}
        onOpenMenu={() => setActiveMenu(true)}
        onReserve={(res) => setReservations(prev => [...prev, { ...res, id: Date.now(), status: 'Pendente', customerName: user?.type === 'cliente' ? user.name : 'Cliente Anônimo' }])}
        favoriteRestaurants={favoriteRestaurants}
        toggleFavorite={toggleFavoriteRestaurant}
        currentUser={user}
        queue={user?.type === 'cliente' ? queue : null}
        currentUserQueue={currentUserQueue}
        onJoinQueueAndNavigate={user?.type === 'cliente' ? handleJoinQueueAndNavigate : null}
      />;
    }

    if (activeUser) {
      return (
        <UserProfile 
          userId={activeUser} 
          onBack={() => setActiveUser(null)} 
          onPostClick={setActivePost}
          onRestaurantClick={setActiveRestaurant}
        />
      );
    }

    if (activePage === 'explorar') return <Explorar onRestaurantClick={setActiveRestaurant} />;
    if (activePage === 'buscar_pessoas') return <BuscarPessoas onUserClick={setActiveUser} />;
    
    if (activePage === 'reservas') {
      if (user?.type === 'restaurante') {
        return <GerenciarReservas reservations={reservations} onUpdateReservation={handleUpdateReservation} queue={queue} onQueueUpdate={handleQueueUpdate} />;
      }
      return <MinhasReservas
        reservations={reservations}
        onRestaurantClick={setActiveRestaurant}
        onUpdateReservation={handleUpdateReservation}
        currentUser={user}
        queue={queue}
        onJoinQueue={handleJoinQueue}
        onLeaveQueue={handleLeaveQueue}
        currentUserQueue={currentUserQueue}
        initialTab={initialReservasTab}
        onInitialTabConsumed={() => setInitialReservasTab('reservas')}
      />;
    }
    if (activePage === 'dashboard' && user?.type === 'restaurante') {
      return <Dashboard />;
    }
    
    if (activePage === 'cursos' && user?.type === 'restaurante') {
      return <Cursos />;
    }
    
    if (activePage === 'buscar_influencers' && user?.type === 'restaurante') {
      return <InfluencerSearch currentUser={user} onCreateOffer={handleCreateOffer} onInfluencerClick={setActiveUser} offers={offers} />;
    }

    if (activePage === 'gerenciar_parcerias' && user?.type === 'restaurante') {
      return <RestaurantOffers currentUser={user} offers={offers} onUpdateOffer={handleUpdateOffer} onInfluencerClick={setActiveUser} />;
    }

    if (activePage === 'parcerias' && user?.type === 'cliente' && user?.premium) {
      return <InfluencerOffers currentUser={user} offers={offers} onUpdateOffer={handleUpdateOffer} onRestaurantClick={setActiveRestaurant} />;
    }

    if (activePage === 'turbos') {
      return <BuyTurbos currentUser={user} turboBalance={turboBalance} setTurboBalance={setTurboBalance} />;
    }
    
    if (activePage === 'premium') {
      return <Premium currentUser={user} />;
    }

    if (activePage === 'comunidade') return <Comunidade onRestaurantClick={setActiveRestaurant} onGroupClick={setActiveGroup} />;
    
    if (activePage === 'perfil') {
      if (user?.type === 'restaurante') {
        return (
          <RestaurantePerfil
            restaurantId={user.id}
            onBack={null} // Sem botão de voltar para o próprio restaurante
            onOpenMenu={() => setActiveMenu(true)}
            onReserve={(res) => setReservations(prev => [...prev, res])}
            favoriteRestaurants={favoriteRestaurants}
            toggleFavorite={toggleFavoriteRestaurant}
            currentUser={user}
          />
        );
      }
      return <MeuPerfil onRestaurantClick={setActiveRestaurant} onPostClick={setActivePost} favoriteRestaurants={favoriteRestaurants} turboBalance={turboBalance} turbosActive={turbosActive} onBoostPost={handleBoostPost} onGoToTurbos={() => setActivePage('turbos')} premium={user?.premium} />;
    }

    // Otherwise we are on the 'feed' page
    return (
      <>
        <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'amigos' && <FeedAmigos onRestaurantClick={setActiveRestaurant} />}
        {activeTab === 'para_voce' && <FeedParaVoce onRestaurantClick={setActiveRestaurant} />}
        {activeTab === 'em_alta' && <FeedEmAlta onRestaurantClick={setActiveRestaurant} />}
      </>
    );
  };

  if (!user && activePage === 'landing') {
    return <LandingPage onGoToAuth={(view = 'login', action = null) => {
      setAuthInitialView(view);
      setPostLoginAction(action);
      setActivePage('auth');
    }} />;
  }

  return (
    <>
      {!user && activePage === 'auth' && <AuthScreens onLogin={handleLogin} onBack={() => setActivePage('landing')} initialView={authInitialView} />}
      {user && (
        <div className="app-container">
      <Sidebar
        activePage={activePage}
        userType={user?.type}
        currentUser={user}
        setActivePage={(page) => {
          setActivePage(page);
          setActiveRestaurant(null);
          setActiveMenu(false);
          setActivePost(null);
          setActiveUser(null);
          setActiveGroup(null);
        }}
        onLogout={() => {
          setUser(null);
          setActivePage('landing');
        }}
      />
      <main className="main-content" style={(activePage === 'cursos' || activePage === 'dashboard' || activePage === 'turbos' || activePage === 'premium' || activePage === 'buscar_influencers' || activePage === 'gerenciar_parcerias' || activePage === 'parcerias' || (activePage === 'reservas' && user?.type === 'restaurante')) ? { maxWidth: 'none', padding: '16px' } : {}}>
        {renderContent()}
      </main>
        <RightPanel
          activeTab={activeTab}
          activePage={activePage}
          currentUser={user}
          onRestaurantClick={setActiveRestaurant}
          onPostClick={setActivePost}
          offers={offers}
        />
      </div>
      )}
    </>
  );
}

export default App;


