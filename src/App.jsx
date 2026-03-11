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
import GroupDetail from './pages/GroupDetail';
import { mockReservations } from './data/mockData';

function App() {
  const [activePage, setActivePage] = useState('feed');
  const [activeTab, setActiveTab] = useState('para_voce');
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  const [activeMenu, setActiveMenu] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [reservations, setReservations] = useState(mockReservations);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([2, 3, 5]);

  const toggleFavoriteRestaurant = (id) => {
    setFavoriteRestaurants(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
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

    if (activeMenu && activeRestaurant) {
      return <FullMenu restaurantId={activeRestaurant} onBack={() => setActiveMenu(false)} />;
    }

    if (activeRestaurant) {
      return <RestaurantePerfil
        restaurantId={activeRestaurant}
        onBack={() => setActiveRestaurant(null)}
        onOpenMenu={() => setActiveMenu(true)}
        onReserve={(res) => setReservations(prev => [...prev, res])}
        favoriteRestaurants={favoriteRestaurants}
        toggleFavorite={toggleFavoriteRestaurant}
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
    if (activePage === 'reservas') return <MinhasReservas reservations={reservations} onRestaurantClick={setActiveRestaurant} />;
    if (activePage === 'comunidade') return <Comunidade onRestaurantClick={setActiveRestaurant} onGroupClick={setActiveGroup} />;
    if (activePage === 'perfil') return <MeuPerfil onRestaurantClick={setActiveRestaurant} onPostClick={setActivePost} favoriteRestaurants={favoriteRestaurants} />;

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
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          setActiveRestaurant(null);
          setActiveMenu(false);
          setActivePost(null);
          setActiveUser(null);
          setActiveGroup(null);
        }}
      />
      <main className="main-content">
        {renderContent()}
      </main>
      <RightPanel
        activeTab={activeTab}
        activePage={activePage}
        onRestaurantClick={setActiveRestaurant}
        onPostClick={setActivePost}
      />
    </div>
  );
}

export default App;


