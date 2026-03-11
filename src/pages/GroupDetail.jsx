import { ArrowLeft, Users, MessageSquare, Plus, Send } from 'lucide-react';
import { useState } from 'react';

export default function GroupDetail({ group, onBack }) {
  const [posts, setPosts] = useState([
    { id: 1, author: 'Carlos Andrade', text: 'Alguém recomenda uma boa hamburgueria vegana no centro?', time: '2h', comments: 4, likes: 12, liked: false, commentList: [], showComments: false, newComment: '' },
    { id: 2, author: 'Marina Costa', text: 'Pessoal, fui na Trattoria Bella ontem. Vale cada centavo! Postei as fotos no meu perfil.', time: '5h', comments: 8, likes: 35, liked: true, commentList: [{author: 'Ana Silva', text: 'Sensacional lá mesmo!'}], showComments: false, newComment: '' },
  ]);
  const [newPost, setNewPost] = useState('');

  if (!group) return <div>Grupo não encontrado.</div>;

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([{ id: Date.now(), author: 'Você', text: newPost, time: 'Agora', comments: 0, likes: 0, liked: false, commentList: [], showComments: false, newComment: '' }, ...posts]);
    setNewPost('');
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const toggleComments = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, showComments: !p.showComments } : p));
  };

  const handleCommentChange = (postId, text) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, newComment: text } : p));
  };

  const submitComment = (postId) => {
    setPosts(posts.map(p => {
      if (p.id === postId && p.newComment.trim()) {
        return { 
          ...p, 
          commentList: [...p.commentList, { author: 'Você', text: p.newComment }], 
          comments: p.comments + 1,
          newComment: '',
        };
      }
      return p;
    }));
  };

  return (
    <div>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-secondary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
        <ArrowLeft size={20} /> Voltar aos Grupos
      </button>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <img src={group.image} alt={group.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
        <div style={{ padding: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{group.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>
            <Users size={16} /> {group.members} membros
          </div>
          <p style={{ marginTop: '16px', color: '#4b5563', fontSize: '15px' }}>
            {group.description || 'Um espaço para trocar dicas, avaliações e experiências sobre o seu tema favorito com a comunidade.'}
          </p>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', gap: '12px', padding: '16px', marginBottom: '24px', alignItems: 'flex-start' }}>
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80" style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="You" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea 
            placeholder="Comece uma nova discussão no grupo..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', height: '60px', fontSize: '15px', color: '#374151' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" style={{ width: 'auto', padding: '6px 16px', borderRadius: '20px' }} onClick={handlePost}>
              Postar
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {posts.map(post => (
          <div key={post.id} className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#6b7280' }}>
                {post.author.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{post.author}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Há {post.time}</div>
              </div>
            </div>
            <p style={{ fontSize: '15px', marginBottom: '16px', color: '#374151', lineHeight: 1.5 }}>
              {post.text}
            </p>
            <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <button 
                onClick={() => toggleLike(post.id)}
                style={{ background: 'none', border: 'none', color: post.liked ? 'var(--accent-red)' : '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
              >
                <span style={{ fontSize: '16px' }}>👍</span> {post.likes}
              </button>
              <button 
                onClick={() => toggleComments(post.id)}
                style={{ background: 'none', border: 'none', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
              >
                <MessageSquare size={16} /> {post.comments} comentários
              </button>
            </div>
            
            {post.showComments && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
                {post.commentList.map((c, i) => (
                  <div key={i} style={{ marginBottom: '12px', fontSize: '14px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--primary-orange)' }}>{c.author}: </span> 
                    {c.text}
                  </div>
                ))}
                
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px' }}>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80" style={{ width: '28px', height: '28px', borderRadius: '50%' }} alt="You" />
                  <input 
                    type="text" 
                    placeholder="Adicione um comentário..." 
                    value={post.newComment}
                    onChange={e => handleCommentChange(post.id, e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && submitComment(post.id)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '13px' }}
                  />
                  <button onClick={() => submitComment(post.id)} style={{ color: 'var(--primary-orange)', padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <Send size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
