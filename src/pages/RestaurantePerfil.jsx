import { mockRestaurants, mockReviews } from '../data/mockData';
import { ArrowLeft, Star, MapPin, Map, Clock, MessageSquare, Heart, ShieldCheck, Search, ExternalLink, Smartphone, PenLine, Send, Rocket, Eye, UtensilsCrossed, Users, Zap, Brain, Award, CheckCircle } from 'lucide-react';
import VerifiedBadge from '../components/VerifiedBadge';
import { useState } from 'react';
import ReservationModal from '../components/ReservationModal';
import ChatModal from '../components/ChatModal';
import RestaurantPostModal from '../components/RestaurantPostModal';
import EditRestaurantProfileModal from '../components/EditRestaurantProfileModal';
import EditMenuModal from '../components/EditMenuModal';

export default function RestaurantePerfil({ restaurantId, onBack, onOpenMenu, onReserve, favoriteRestaurants, toggleFavorite, currentUser, queue, currentUserQueue, onJoinQueueAndNavigate }) {
  const restaurant = mockRestaurants.find(r => r.id === restaurantId) || mockRestaurants[0];
  const [activeTab, setActiveTab] = useState('cardapio');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReservaOpen, setIsReservaOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('Todos');
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [commentingPost, setCommentingPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [queuePartySize, setQueuePartySize] = useState(2);
  const [customPartyInputText, setCustomPartyInputText] = useState('8');
  const [showCustomPartyInput, setShowCustomPartyInput] = useState(false);
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [joiningQueue, setJoiningQueue] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  const [restaurantPosts, setRestaurantPosts] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&w=400&q=80',
      text: 'Apresentamos nosso novo prato da estação! Venha experimentar essa delícia feita com ingredientes frescos e locais. O que acharam?',
      likes: 124,
      comments: 18,
      commentsList: [],
      timeAgo: 'Há 2 dias',
      isLiked: false,
      views: 1843
    },
    {
      id: 2,
      image: '',
      text: 'Fim de semana chegou e nada melhor do que aproveitar com a nossa carta de vinhos especial. Estamos abertos até as 23h, esperando vocês!',
      likes: 89,
      comments: 5,
      commentsList: [],
      timeAgo: 'Há 5 dias',
      isLiked: false,
      views: 962
    }
  ]);

  const handleLikePost = (postId) => {
    setRestaurantPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setRestaurantPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          text: commentText,
          authorName: currentUser?.name || 'Visitante',
          authorAvatar: currentUser?.type === 'cliente' ? 'https://ui-avatars.com/api/?name=' + (currentUser.name || 'User') + '&background=random' : restaurant.image,
          timeAgo: 'Agora mesmo'
        };
        return { 
          ...post, 
          comments: post.comments + 1,
          commentsList: [...(post.commentsList || []), newComment]
        };
      }
      return post;
    }));
    setCommentText('');
    setCommentingPost(null);
  };

  // Is this the logged in restaurant owner?
  const isOwner = currentUser?.type === 'restaurante' && currentUser?.id === restaurantId;
  
  // Is this ANY restaurant profile visiting this page?
  const isRestaurantViewer = currentUser?.type === 'restaurante';

  const isFavorite = favoriteRestaurants?.includes(restaurantId);

  return (
    <div style={{ paddingBottom: '40px' }}>
      {onBack && (
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-secondary)', fontWeight: 600 }}>
          <ArrowLeft size={20} /> Voltar
        </button>
      )}

      {/* Header Info */}
      <div className="card" style={{ overflow: 'visible', marginBottom: '16px' }}>
        <div style={{ position: 'relative' }}>
          <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
          {!isRestaurantViewer && (
            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => toggleFavorite && toggleFavorite(restaurantId)}
                style={{ background: 'rgba(255,255,255,0.9)', padding: '8px', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer', border: 'none' }}
              >
                <Heart size={20} color="var(--primary-orange)" fill={isFavorite ? 'var(--primary-orange)' : 'none'} />
              </button>
            </div>
          )}
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ marginBottom: '12px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0, display: 'inline-block', verticalAlign: 'middle' }}>
                  {restaurant.name}
                  {restaurant.verified && <VerifiedBadge size={22} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '8px' }} />}
                </h1>
                
                {/* Michelin Badges */}
                {restaurant.awards && restaurant.awards.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {restaurant.awards.filter(a => a.type.startsWith('michelin')).map(award => {
                      if (award.type === 'michelin-star') {
                        return (
                          <div key={award.id} style={{ display: 'flex', alignItems: 'center', gap: '2px', background: '#da291c', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 800, boxShadow: '0 2px 4px rgba(218,41,28,0.3)' }}>
                            {Array.from({ length: award.value || 1 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} style={{ transform: 'scale(1.1)' }} />)}
                            <span style={{ marginLeft: '4px' }}>MICHELIN {award.year}</span>
                          </div>
                        );
                      }
                      if (award.type === 'michelin-green') {
                        return (
                          <div key={award.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#22c55e', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 800, boxShadow: '0 2px 4px rgba(34,197,94,0.3)' }}>
                            <Star size={14} fill="currentColor" strokeWidth={0} style={{ transform: 'scale(1.1)' }} />
                            <span>ESTRELA VERDE {award.year}</span>
                          </div>
                        );
                      }
                      if (award.type === 'michelin-bib') {
                        return (
                          <div key={award.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#da291c', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 800, boxShadow: '0 2px 4px rgba(218,41,28,0.3)' }}>
                            <Award size={14} />
                            <span>Bib Gourmand {award.year}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
                
                {restaurant.handle && <div style={{ fontSize: '16px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '8px' }}>{restaurant.handle}</div>}
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: '#4b5563', fontSize: '15px', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-orange)', fontWeight: 700 }}>
                  <Star fill="currentColor" size={18} /> {restaurant.rating.toFixed(1)}
                </span>
                <span style={{ color: '#d1d5db' }}>|</span>
                <span style={{ fontWeight: 500 }}>{mockReviews.length * 43} Avaliações</span>
                <span style={{ color: '#d1d5db' }}>|</span>
                <span className="stat-badge" style={{ background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>{restaurant.priceRange}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px' }}>
                <MapPin size={18} className="primary-color" /> 
                <span style={{ fontWeight: 500 }}>{restaurant.location} • {restaurant.distance}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '200px' }}>
              {isOwner ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button 
                    onClick={() => setIsEditProfileOpen(true)}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-primary)', background: '#fff', cursor: 'pointer' }}
                  >
                    <PenLine size={18} /> Editar Perfil
                  </button>
                  <button 
                    onClick={() => setIsEditMenuOpen(true)}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', border: '1px solid var(--primary-orange)', fontWeight: 600, color: 'var(--primary-orange)', background: 'var(--feed-active-bg)', cursor: 'pointer' }}
                  >
                    <UtensilsCrossed size={18} /> Editar Cardápio
                  </button>
                </div>
              ) : !isRestaurantViewer ? (
                <>
                  <button className="btn-primary" style={{ margin: 0, padding: '10px' }} onClick={() => setIsReservaOpen(true)}>Reservar Mesa</button>

                  {/* Botão de Entrar na Fila */}
                  {queue && (
                    currentUserQueue
                      ? (
                        // Já está na fila: mostra mini-status
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', background: 'linear-gradient(135deg,#1e1b4b,#312e81)', color: '#fff' }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite', display: 'inline-block', flexShrink: 0 }} />
                          <span style={{ fontWeight: 700, fontSize: '13px', flex: 1 }}>
                            Na fila: #{(queue.entries?.findIndex(e => e.id === currentUserQueue.id) ?? 0) + 1}
                          </span>
                          <span style={{ fontSize: '12px', color: '#fde68a', fontWeight: 700 }}>
                            ~{Math.ceil(Math.round(((queue.entries?.findIndex(e => e.id === currentUserQueue.id) ?? 0)) * (queue.queueHistory?.length ? Math.round(queue.queueHistory.reduce((a,b)=>a+b,0)/queue.queueHistory.length) : 12) * 0.6) / 5) * 5}min
                          </span>
                        </div>
                      )
                      : (
                        <button
                          onClick={() => setIsQueueModalOpen(true)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', fontWeight: 600, border: 'none', background: queue.isOpen ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : '#e5e7eb', color: queue.isOpen ? '#fff' : '#9ca3af', cursor: queue.isOpen ? 'pointer' : 'default', width: '100%', transition: 'all .2s' }}
                        >
                          <Users size={18} />
                          {queue.isOpen ? 'Entrar na Fila' : 'Fila Fechada'}
                        </button>
                      )
                  )}

                  <button
                    onClick={() => setIsChatOpen(true)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    <MessageSquare size={18} /> Chat do Local
                  </button>
                  <button
                    onClick={() => setIsPostOpen(true)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', border: '1.5px solid var(--primary-orange)', fontWeight: 700, color: 'var(--primary-orange)', background: '#fff', transition: 'all 0.2s' }}
                    className="hover-subtle"
                  >
                    <PenLine size={18} /> Criar Post
                  </button>
                </>
              ) : null}
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '6px 12px', background: '#fef3c7', color: '#d97706', borderRadius: '20px', fontWeight: 600 }}>
              <ShieldCheck size={14} /> Atualizado Hoje
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '6px 12px', background: 'var(--feed-active-bg)', color: 'var(--primary-orange)', borderRadius: '20px', fontWeight: 600 }}>
              Favoritado por 1.2k
            </span>
          </div>
          
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '13px' }}><ExternalLink size={14} /> iFood</a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '13px' }}><Smartphone size={14} /> WhatsApp</a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '13px' }}><ExternalLink size={14} /> Site Oficial</a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="feed-tabs" style={{ marginBottom: '16px' }}>
        <button className={`tab ${activeTab === 'cardapio' ? 'active' : ''}`} onClick={() => setActiveTab('cardapio')}>Cardápio</button>
        <button className={`tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>Posts</button>
        <button className={`tab ${activeTab === 'marcados' ? 'active' : ''}`} onClick={() => setActiveTab('marcados')}>Marcados (Reviews)</button>
        <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>Informações</button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'cardapio' && (
        <div>
          <div className="card" style={{ padding: '20px', marginBottom: '16px', background: 'linear-gradient(to right, #fff, var(--feed-active-bg))' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary-orange)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={16} fill="currentColor" /> Carro Chefe
            </h3>
            <p style={{ fontWeight: 600, fontSize: '18px' }}>Hambúrguer de Costela com Geleia de Bacon</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>R$ 45,00 - Aproximadamente 540 recomendações.</p>
          </div>
          
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Cardápio Digital</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Explore todas as nossas opções de Entradas, Pratos Principais, Bebidas e Sobremesas.</p>
            <button className="btn-primary" style={{ width: 'auto', margin: '0 auto', display: 'inline-block' }} onClick={onOpenMenu}>
              Ver Cardápio Completo
            </button>
          </div>
        </div>
      )}

      {activeTab === 'marcados' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Fotos e Avaliações</h2>
            <div className="search-input-wrapper" style={{ width: 'auto' }}>
              <select 
                className="search-input" 
                style={{ padding: '8px', width: 'auto' }}
                value={reviewFilter}
                onChange={(e) => setReviewFilter(e.target.value)}
              >
                <option value="Todos">Ticket Médio: Todos</option>
                <option value="Ate50">Até R$ 50</option>
                <option value="50a100">R$ 50 a R$ 100</option>
                <option value="Acima100">Acima de R$ 100</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
             <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&w=400&q=80" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
             <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&w=400&q=80" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
          
          {mockReviews.filter(review => {
            if (reviewFilter === 'Todos') return true;
            
            const spentValue = parseFloat(review.spent.replace('R$ ', '').replace(',', '.'));
            
            if (reviewFilter === 'Ate50') return spentValue <= 50;
            if (reviewFilter === '50a100') return spentValue > 50 && spentValue <= 100;
            if (reviewFilter === 'Acima100') return spentValue > 100;
            
            return true;
          }).map((review, i) => (
            <div key={i} className="card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img src={review.user.avatar} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{review.user.name} {review.user.handle && <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '13px' }}>({review.user.handle})</span>}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{review.timeAgo}</div>
                </div>
              </div>
              <div className="review-stats" style={{ marginBottom: '8px' }}>
                <div className="stat-badge rating"><Star size={12} fill="currentColor" /> {review.rating.toFixed(1)}</div>
                <div className="stat-badge">Gasto: {review.spent}</div>
              </div>
              <p style={{ fontSize: '14px' }}>{review.text}</p>
            </div>
          ))}
          {mockReviews.filter(review => {
            if (reviewFilter === 'Todos') return true;
            const spentValue = parseFloat(review.spent.replace('R$ ', '').replace(',', '.'));
            if (reviewFilter === 'Ate50') return spentValue <= 50;
            if (reviewFilter === '50a100') return spentValue > 50 && spentValue <= 100;
            if (reviewFilter === 'Acima100') return spentValue > 100;
            return true;
          }).length === 0 && <p style={{ color: 'var(--text-muted)' }}>Nenhuma avaliação encontrada nessa faixa de preço.</p>}
        </div>
      )}

      {activeTab === 'posts' && (
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Publicações do Restaurante</h2>
          {isOwner && (
            <div className="card" style={{ padding: '16px', marginBottom: '16px', border: '1px dashed var(--primary-orange)' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>O que há de novo no {restaurant.name}?</p>
              <button 
                onClick={() => setIsPostOpen(true)}
                className="btn-primary" 
                style={{ width: 'auto', padding: '8px 16px', borderRadius: '99px' }}
              >
                Adicionar Nova Publicação
              </button>
            </div>
          )}
          {restaurantPosts.map(post => (
            <div key={post.id} className="card" style={{ padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img src={restaurant.image} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>{restaurant.name} {restaurant.handle && <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '13px' }}>{restaurant.handle}</span>}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{post.timeAgo}</div>
                </div>
              </div>
              <p style={{ fontSize: '14px', marginBottom: '12px', lineHeight: 1.5 }}>{post.text}</p>
              {post.image && (
                <img src={post.image} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
              )}
              <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <button 
                  onClick={() => handleLikePost(post.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: post.isLiked ? 'var(--primary-orange)' : 'inherit', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
                >
                  <Heart size={18} fill={post.isLiked ? 'var(--primary-orange)' : 'none'} /> {post.likes} Curtidas
                </button>
                <button 
                  onClick={() => setCommentingPost(commentingPost === post.id ? null : post.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
                >
                  <MessageSquare size={18} /> {post.comments} Comentários
                </button>
                {isOwner && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-muted)', marginLeft: '4px' }}>
                    <Eye size={15} /> {post.views?.toLocaleString('pt-BR') ?? 0} visualizações
                  </span>
                )}
                {isOwner && (
                  <button
                    onClick={(e) => { e.stopPropagation(); alert('Adquira um pacote de Turbos na aba lateral para aumentar o alcance desta publicação!'); }}
                    style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(90deg, #f97316, #ea580c)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600, padding: '4px 14px', borderRadius: '16px' }}
                  >
                    <Rocket size={14} /> Turbinar Post
                  </button>
                )}
              </div>
              
              {post.commentsList && post.commentsList.length > 0 && (
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {post.commentsList.map(c => (
                    <div key={c.id} style={{ display: 'flex', gap: '8px' }}>
                      <img src={c.authorAvatar} alt="Avatar" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ background: '#f3f4f6', padding: '8px 12px', borderRadius: '12px', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <span style={{ fontWeight: 600, fontSize: '13px' }}>{c.authorName}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.timeAgo}</span>
                        </div>
                        <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-primary)' }}>{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {commentingPost === post.id && (
                <form onSubmit={(e) => handleAddComment(e, post.id)} style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <img src={currentUser?.type === 'cliente' ? 'https://ui-avatars.com/api/?name=' + (currentUser.name || 'User') + '&background=random' : restaurant.image} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div className="search-input-wrapper" style={{ margin: 0, padding: 0 }}>
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Adicione um comentário..." 
                      style={{ padding: '8px 12px', background: '#f3f4f6', border: '1px solid var(--border-color)', borderRadius: '99px' }}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button type="submit" disabled={!commentText.trim()} style={{ background: commentText.trim() ? 'var(--primary-orange)' : '#e5e7eb', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: commentText.trim() ? 'pointer' : 'default', transition: '0.2s' }}>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'info' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Localização e Horários</h2>
            <div style={{ background: '#f3f4f6', height: '150px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--text-muted)' }}>
              <Map size={32} /> <span style={{ marginLeft: '8px' }}>Mapa Interativo aqui</span>
            </div>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px' }}>
              <MapPin size={18} color="var(--primary-orange)" /> Av. Faria Lima, 1234 - Pinheiros, São Paulo
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Clock size={18} color="var(--primary-orange)" /> Aberto Hoje: 11:30 - 23:00
            </p>
          </div>

          {/* Seção de Premiações */}
          {restaurant.awards && restaurant.awards.length > 0 && (
            <div className="card" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} color="var(--primary-orange)" /> Premiações e Reconhecimentos
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {restaurant.awards.map(award => (
                  <div key={award.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px', background: award.type.startsWith('michelin') ? '#fff1f1' : '#f9fafb', borderRadius: '12px', border: award.type.startsWith('michelin') ? '1px solid #fee2e2' : '1px solid var(--border-color)' }}>
                    <div style={{ 
                      width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                      background: award.type === 'michelin-star' || award.type === 'michelin-bib' ? '#da291c' : award.type === 'michelin-green' ? '#22c55e' : '#f59e0b',
                      color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {award.type.includes('star') || award.type.includes('green') ? <Star fill="currentColor" strokeWidth={0} size={24} /> : <Award size={24} />}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: '0 0 4px' }}>
                        {award.name} {award.year && <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>• {award.year}</span>}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 8px', fontWeight: 600 }}>{award.organization}</p>
                      {award.description && <p style={{ fontSize: '14px', color: '#4b5563', margin: 0, lineHeight: 1.5 }}>{award.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} restaurantName={restaurant.name} />
      <ReservationModal 
        isOpen={isReservaOpen} 
        onClose={() => setIsReservaOpen(false)} 
        restaurantName={restaurant.name} 
        onConfirm={(res) => onReserve && onReserve({ ...res, restaurantId, image: restaurant.image, restaurantName: restaurant.name })}
      />
      <RestaurantPostModal
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
        restaurant={restaurant}
      />
      <EditRestaurantProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
        restaurantData={restaurant}
        onSave={(data) => {
          setIsEditProfileOpen(false);
          setProfileSaveSuccess(true);
          setTimeout(() => setProfileSaveSuccess(false), 3000);
        }}
      />
      <EditMenuModal 
        isOpen={isEditMenuOpen} 
        onClose={() => setIsEditMenuOpen(false)} 
        restaurantName={restaurant.name}
      />

      {/* ═══ MODAL: ENTRAR NA FILA ══════════════════════════════════════════ */}
      {isQueueModalOpen && queue && (
        <div
          onClick={() => { setIsQueueModalOpen(false); setShowCustomPartyInput(false); setCustomPartyInputText('8'); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', animation: 'fadeIn .2s ease' }}
        >
          <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '28px 24px 36px', width: '100%', maxWidth: '520px', animation: 'slideUp .3s ease', boxShadow: '0 -8px 40px rgba(0,0,0,.15)' }}
          >
            {/* Handle */}
            <div style={{ width: 40, height: 4, borderRadius: '99px', background: '#e5e7eb', margin: '0 auto 24px' }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Users size={22} color="#fff" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontWeight: 800, fontSize: '18px' }}>Entrar na Fila</h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>{restaurant.name}</p>
              </div>
            </div>

            {/* Status + stats — reage ao tamanho do grupo selecionado */}
            {(() => {
              const avgMin = queue.queueHistory?.length
                ? Math.round(queue.queueHistory.reduce((a,b)=>a+b,0)/queue.queueHistory.length) : 12;
              const baseWait = queue.entries?.length > 0
                ? Math.ceil(Math.round(queue.entries.length * avgMin * 0.6) / 5) * 5 : 0;
              // Fator por tamanho de grupo: grupos maiores esperam mais
              // (mesas grandes são escassas e demoram mais para liberar)
              const sizeFactor =
                queuePartySize <= 2 ? 1.0 :
                queuePartySize <= 4 ? 1.2 :
                queuePartySize <= 6 ? 1.5 : 1.8;
              const adjustedWait = baseWait > 0 ? Math.ceil(Math.round(baseWait * sizeFactor) / 5) * 5 : 0;
              return (
                <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '16px', marginBottom: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#16a34a' }}>Fila Aberta</span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', marginLeft: 'auto', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#6366f1' }}>{queue.entries?.length ?? 0}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>na fila</div>
                    </div>
                    {queuePartySize > 0 && (
                      <div style={{ textAlign: 'center' }}>
                        {adjustedWait > 0 ? (
                          <>
                            <div style={{ fontSize: '22px', fontWeight: 900, color: '#f59e0b', transition: 'all .3s' }}>~{adjustedWait}min</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                              para {queuePartySize}p
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: '#16a34a' }}>Imediato</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>sem espera</div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Party size */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px' }}>QUANTAS PESSOAS NO SEU GRUPO?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: showCustomPartyInput ? '10px' : 0 }}>
                {[1,2,3,4,5,6,7].map(n => (
                  <button key={n} onClick={() => { setQueuePartySize(n); setShowCustomPartyInput(false); }} style={{
                    padding: '14px 8px', borderRadius: '12px', fontWeight: queuePartySize === n && !showCustomPartyInput ? 800 : 600,
                    border: queuePartySize === n && !showCustomPartyInput ? '2px solid var(--primary-orange)' : '1.5px solid #e5e7eb',
                    background: queuePartySize === n && !showCustomPartyInput ? '#fff7ed' : '#fff',
                    color: queuePartySize === n && !showCustomPartyInput ? 'var(--primary-orange)' : 'var(--text-primary)',
                    cursor: 'pointer', fontSize: '16px', transition: 'all .15s',
                    transform: queuePartySize === n && !showCustomPartyInput ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: queuePartySize === n && !showCustomPartyInput ? '0 4px 12px rgba(249,115,22,.2)' : 'none'
                  }}>{n}</button>
                ))}
                {/* Botão 8+ */}
                <button
                  onClick={() => { 
                    setShowCustomPartyInput(s => !s); 
                    if (!showCustomPartyInput) {
                      setQueuePartySize(parseInt(customPartyInputText, 10) || 0);
                    } else {
                      // fallback to preset if toggled off while empty
                      if (queuePartySize === 0) setQueuePartySize(2);
                    }
                  }}
                  style={{
                    padding: '14px 8px', borderRadius: '12px', fontWeight: showCustomPartyInput ? 800 : 600,
                    border: showCustomPartyInput ? '2px solid var(--primary-orange)' : '1.5px solid #e5e7eb',
                    background: showCustomPartyInput ? '#fff7ed' : '#fff',
                    color: showCustomPartyInput ? 'var(--primary-orange)' : 'var(--text-primary)',
                    cursor: 'pointer', fontSize: '15px', transition: 'all .15s',
                    transform: showCustomPartyInput ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: showCustomPartyInput ? '0 4px 12px rgba(249,115,22,.2)' : 'none'
                  }}
                >8+</button>
              </div>
              {showCustomPartyInput && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={customPartyInputText}
                    onChange={e => {
                      let val = e.target.value;
                      // Limite de 2 dígitos:
                      if (val.length > 2) val = val.slice(0, 2);
                      setCustomPartyInputText(val);
                      const parsed = parseInt(val, 10);
                      setQueuePartySize(isNaN(parsed) ? 0 : parsed);
                    }}
                    autoFocus
                    style={{
                      flex: 1, height: 48, borderRadius: '12px',
                      border: '2px solid var(--primary-orange)',
                      padding: '0 16px', fontSize: '18px', fontWeight: 800,
                      color: 'var(--primary-orange)', outline: 'none', textAlign: 'center'
                    }}
                  />
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>pessoas</span>
                </div>
              )}
            </div>

            {/* Confirm */}
            <button
              onClick={() => {
                if (!onJoinQueueAndNavigate) return;
                setJoiningQueue(true);
                setTimeout(() => {
                  onJoinQueueAndNavigate({ partySize: queuePartySize, restaurantId, restaurantName: restaurant.name });
                }, 600);
              }}
              disabled={joiningQueue || queuePartySize <= 0}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
                background: joiningQueue || queuePartySize <= 0 ? '#e5e7eb' : 'linear-gradient(135deg,#f97316,#ea580c)',
                color: joiningQueue || queuePartySize <= 0 ? '#9ca3af' : '#fff', fontWeight: 800, fontSize: '16px',
                cursor: joiningQueue || queuePartySize <= 0 ? 'not-allowed' : 'pointer',
                boxShadow: joiningQueue || queuePartySize <= 0 ? 'none' : '0 6px 20px rgba(249,115,22,.35)',
                transition: 'all .2s'
              }}
            >
              <Zap size={20} />
              {joiningQueue ? 'Entrando na fila...' : 
                queuePartySize > 0 ? `Confirmar — ${queuePartySize} pessoa${queuePartySize > 1 ? 's' : ''}` : 'Digite um valor válido'}
            </button>
          </div>
        </div>
      )}

      {profileSaveSuccess && (
        <div style={{
          position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          background: '#10b981', color: 'white', padding: '16px 24px', borderRadius: '30px',
          display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: '15px',
          boxShadow: '0 10px 30px rgba(16,185,129,0.3)', zIndex: 1100,
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          <CheckCircle size={20} /> Perfil salvo com sucesso!
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translate(-50%, 20px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
