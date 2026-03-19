import { X, Send, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

// Very basic global in-memory store for mock chats
export const chatStore = window.__chatStore || {};
window.__chatStore = chatStore;

export default function DirectMessageModal({ isOpen, onClose, person, onRestaurantClick, onPostClick }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (person && isOpen) {
      if (!chatStore[person.id]) {
        chatStore[person.id] = [
          { sender: 'friend', text: `Oi! Tudo bem?`, time: 'Hoje' }
        ];
      }
      setMessages([...chatStore[person.id]]);
    }
  }, [person, isOpen]);

  if (!isOpen || !person) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { sender: 'user', text: input, time: 'Agora' };
    const updated = [...messages, newMsg];
    setMessages(updated);
    chatStore[person.id] = updated;
    setInput('');
    
    // Auto-reply mock
    setTimeout(() => {
      const reply = { sender: 'friend', text: `Legal!`, time: 'Agora' };
      chatStore[person.id] = [...chatStore[person.id], reply];
      setMessages([...chatStore[person.id]]);
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ display: 'flex', flexDirection: 'column', height: '80vh', maxHeight: '600px' }}>
        <div className="modal-header" style={{ padding: '16px 24px', background: 'var(--primary-orange)', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={person.avatar || person.image} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{person.name}</h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Online</p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#fff', border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={24} /></button>
        </div>
        
        <div className="modal-body" style={{ flex: 1, overflowY: 'auto', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ 
                maxWidth: '85%', 
                padding: '12px 16px', 
                borderRadius: '16px',
                borderBottomLeftRadius: msg.sender === 'friend' ? '4px' : '16px',
                borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                background: msg.sender === 'user' ? 'var(--primary-orange)' : '#fff',
                color: msg.sender === 'user' ? '#fff' : 'var(--text-primary)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '14px', lineHeight: 1.5 }}>{msg.text}</div>
                
                {msg.isSharedPost && (
                  <div 
                    onClick={() => {
                      onPostClick(msg.postDetails.id);
                      onClose();
                    }}
                    style={{ cursor: 'pointer', background: msg.sender === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', padding: '12px', borderRadius: '8px', marginTop: '8px', border: '1px solid rgba(0,0,0,0.05)' }}
                  >
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                      <img src={msg.postDetails.image} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{msg.postDetails.restaurant}</div>
                        <div style={{ fontSize: '11px', opacity: 0.8 }}>{'⭐'.repeat(Math.round(msg.postDetails.rating))}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', fontStyle: 'italic' }}>"{msg.postDetails.text}"</div>
                  </div>
                )}

                <div style={{ fontSize: '11px', marginTop: '4px', textAlign: 'right', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', background: '#fff', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button style={{ color: 'var(--text-secondary)', background: 'transparent', border: 'none' }}><ImageIcon size={20} /></button>
          <input 
            type="text" 
            placeholder="Escreva sua mensagem..." 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, padding: '10px 16px', borderRadius: '24px', border: '1px solid var(--border-color)', outline: 'none' }}
          />
          <button onClick={handleSend} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
            <Send size={18} style={{ marginLeft: '-2px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
