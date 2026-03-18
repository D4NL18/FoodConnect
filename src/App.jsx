import { useState } from 'react';
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
import AuthScreens from './components/AuthScreens';
import { mockReservations } from './data/mockData';

function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('feed');
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
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([2, 3, 5]);

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
    if (userType === 'cliente') {
      setActivePage('feed');
      setActiveTab('para_voce');
      setActiveRestaurant(null);
    } else if (userType === 'restaurante') {
      setActivePage('perfil');
      setActiveRestaurant(userData.id);
    }
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
        />
      );
    }

    if (activeMenu && activeRestaurant && activeRestaurant !== user?.id) {
      return <FullMenu restaurantId={activeRestaurant} onBack={() => setActiveMenu(false)} />;
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
        return <GerenciarReservas reservations={reservations} onUpdateReservation={handleUpdateReservation} />;
      }
      return <MinhasReservas reservations={reservations} onRestaurantClick={setActiveRestaurant} onUpdateReservation={handleUpdateReservation} currentUser={user} />;
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
      return <MeuPerfil onRestaurantClick={setActiveRestaurant} onPostClick={setActivePost} favoriteRestaurants={favoriteRestaurants} />;
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

  return (
    <>
      {!user && <AuthScreens onLogin={handleLogin} />}
      {user && (
        <div className="app-container">
      <Sidebar
        activePage={activePage}
        userType={user?.type}
        setActivePage={(page) => {
          setActivePage(page);
          setActiveRestaurant(null);
          setActiveMenu(false);
          setActivePost(null);
          setActiveUser(null);
          setActiveGroup(null);
        }}
        onLogout={() => setUser(null)}
      />
      <main className="main-content">
        {renderContent()}
      </main>
        <RightPanel
          activeTab={activeTab}
          activePage={activePage}
          currentUser={user}
          onRestaurantClick={setActiveRestaurant}
          onPostClick={setActivePost}
        />
      </div>
      )}
    </>
  );
}

export default App;


