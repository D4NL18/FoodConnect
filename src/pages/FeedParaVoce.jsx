import { useState } from 'react';
import { Star, Banknote, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { mockRestaurants, mockReviews } from '../data/mockData';
import ShareModal from '../components/ShareModal';

export default function FeedParaVoce({ onRestaurantClick }) {
  const restaurant = mockRestaurants[0];
  const secondRestaurant = mockRestaurants[1];

  // Pick a real review for the second card
  const featuredReview = mockReviews.find(r => r.restaurantId === 2) || mockReviews[0];

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
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
    <div>
      {/* First card — IA Highlight */}
      <div className="card" style={{ cursor: 'pointer' }} onClick={() => onRestaurantClick(restaurant.id)}>
        <img src={restaurant.image} alt={restaurant.name} className="review-image" />
        <div style={{ padding: '0 0 16px 0' }}>
          <div className="highlight-reason">{restaurant.highlightReason}</div>
          <div className="card-content" style={{ paddingBottom: '16px' }}>
            <h2 className="highlight-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {restaurant.name}
              {restaurant.handle && <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>{restaurant.handle}</span>}
            </h2>
            <p className="highlight-desc">{restaurant.highlightDesc}</p>
            <div style={{ padding: '0 16px' }}>
              <button className="btn-primary">Ver Cardápio Completo</button>
            </div>
          </div>
        </div>
      </div>

      {/* Second card — Social proof review */}
      <div className="card">
        {/* Social signal banner */}
        <div style={{ padding: '10px 16px', background: 'var(--feed-active-bg)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-orange)', fontSize: '13px', fontWeight: 600 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Pessoas com gostos semelhantes aos seus gostaram disso
        </div>

        {/* Author header */}
        <div className="review-header" onClick={() => onRestaurantClick(secondRestaurant.id)} style={{ cursor: 'pointer' }}>
          <img src={featuredReview.user.avatar} alt={featuredReview.user.name} />
          <div className="review-header-info">
            <div>
              <span className="review-author">{featuredReview.user.name}</span>{' '}
              {featuredReview.user.handle && (
                <span style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 400 }}>({featuredReview.user.handle})</span>
              )}{' '}
              <span className="review-action">{featuredReview.action}</span>
            </div>
            <div
              className="review-location"
              style={{ cursor: 'pointer', color: 'var(--primary-orange)' }}
            >
              {featuredReview.restaurant}
            </div>
          </div>
          <div className="review-time">{featuredReview.timeAgo}</div>
        </div>

        {/* Food image */}
        <img src={featuredReview.image} alt="Food" className="review-image" />

        {/* Actions + stats + text */}
        <div className="review-content">
          {/* Action buttons */}
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
            <button className="action-btn" onClick={() => setShareData(featuredReview)}>
              <Share2 size={20} />
            </button>
          </div>

          {/* Rating + Spent badges */}
          <div className="review-stats">
            <div className="stat-badge rating">
              <Star size={14} fill="currentColor" />
              {featuredReview.rating.toFixed(1)}
            </div>
            <div className="stat-badge">
              <Banknote size={14} />
              {featuredReview.spent}
            </div>
          </div>

          {/* Review text */}
          {featuredReview.text && (
            <p className="review-text" style={{ marginBottom: showComments ? '16px' : '0' }}>
              <span>{featuredReview.user.name}{featuredReview.user.handle ? ` (${featuredReview.user.handle})` : ''}:</span>{' '}
              {featuredReview.text}
            </p>
          )}

          {/* Comments section */}
          {showComments && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
              {comments.map((c, i) => (
                <div key={i} style={{ marginBottom: '12px', fontSize: '14px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--primary-orange)' }}>{c.author}: </span>
                  {c.text}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px' }}>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80"
                  style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                  alt="me"
                />
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
