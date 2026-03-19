import { ArrowLeft, Star, MessageCircle, Heart, Share2, Banknote, Send, Eye } from 'lucide-react';
import { mockReviews, mockRestaurants, mockPeopleSearch } from '../data/mockData';
import { useState } from 'react';
import ShareModal from '../components/ShareModal';

export default function PostDetail({ postId, onBack, onRestaurantClick, activeUser, activePage, currentUser }) {
  const baseReview = mockReviews.find(r => r.id === postId) || mockReviews[0];
  let review = { ...baseReview, user: { ...baseReview.user } };

  if (activeUser) {
    const userObj = mockPeopleSearch.find(u => u.id === activeUser);
    if (userObj) {
      review.user = { name: userObj.name, avatar: userObj.avatar };
    }
  } else if (activePage === 'perfil') {
    review.user = { name: 'Ana Silva', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80' };
  }

  // Is the logged-in user the author of this post?
  const isOwnPost = (() => {
    if (!currentUser) return false;
    if (currentUser.type === 'restaurante') {
      return review.restaurantId === currentUser.id;
    }
    // For clients: own post when viewing from their own profile or when no other user is selected
    return activePage === 'perfil' || (!activeUser && currentUser.type === 'cliente');
  })();

  const mockViews = review.id * 317 + 412;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 50) + 5);
  const [showComments, setShowComments] = useState(true); // default open in detail
  const [comments, setComments] = useState([
    { author: 'Marcos Silva', text: 'Nossa, que prato lindo!' },
    { author: 'Ana Souza', text: 'Eu amo esse lugar, a comida é perfeita.' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [shareData, setShareData] = useState(null);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const submitComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { author: 'Você', text: newComment }]);
    setNewComment('');
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-secondary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="card">
        <div className="review-header">
          <img src={review.user.avatar} alt={review.user.name} />
          <div className="review-header-info">
            <div>
              <span className="review-author">{review.user.name}</span>{' '}
              {review.user.handle && <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 400 }}>({review.user.handle})</span>}{' '}
              <span className="review-action">{review.action}</span>
            </div>
            <div 
              className="review-location cursor-pointer" 
              style={{ cursor: 'pointer', color: 'var(--primary-orange)' }}
              onClick={() => onRestaurantClick(review.restaurantId || mockRestaurants[0].id)}
            >
              {review.restaurant}
            </div>
          </div>
          <div className="review-time">{review.timeAgo}</div>
        </div>
        
        {review.image && <img src={review.image} alt="Food" className="review-image" />}
        
        <div className="review-content">
          <div className="review-actions" style={{ marginBottom: '16px' }}>
            <button 
              className="action-btn" 
              style={{ color: liked ? 'var(--accent-red)' : 'var(--text-secondary)' }}
              onClick={handleLike}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span style={{ fontSize: '13px', marginLeft: '6px', fontWeight: 600 }}>{likesCount}</span>
            </button>
            <button className="action-btn" onClick={() => setShowComments(!showComments)}>
              <MessageCircle size={20} />
              <span style={{ fontSize: '13px', marginLeft: '6px', fontWeight: 600 }}>{comments.length}</span>
            </button>
            <button className="action-btn" onClick={() => setShareData(review)}><Share2 size={20} /></button>
          </div>
          
          <div className="review-stats">
            <div className="stat-badge rating">
              <Star size={14} fill="currentColor" />
              {review.rating.toFixed(1)}
            </div>
            <div className="stat-badge">
              <Banknote size={14} />
              {review.spent}
            </div>
            {isOwnPost && (
              <div className="stat-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                <Eye size={13} /> {mockViews.toLocaleString('pt-BR')} visualizações
              </div>
            )}
          </div>
          
          {review.text && (
            <p className="review-text" style={{ marginBottom: showComments ? '16px' : '0' }}>
              <span>{review.user.name}:</span> {review.text}
            </p>
          )}

          {showComments && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
              {comments.map((c, i) => (
                <div key={i} style={{ marginBottom: '12px', fontSize: '14px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--primary-orange)' }}>{c.author}: </span> 
                  {c.text}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px' }}>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                <input 
                  type="text" 
                  placeholder="Adicione um comentário..." 
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submitComment()}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '13px' }}
                />
                <button onClick={submitComment} style={{ color: 'var(--primary-orange)', padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ShareModal isOpen={!!shareData} onClose={() => setShareData(null)} review={shareData} />
    </div>
  );
}
