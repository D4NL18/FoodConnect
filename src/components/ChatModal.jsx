import { X, Send, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function ChatModal({ isOpen, onClose, restaurantName }) {
  const [messages, setMessages] = useState([
    { sender: 'local', text: `Olá! Bem vindo(a) ao canal de atendimento do ${restaurantName}. Como podemos ajudar?`, time: 'Agora' }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input, time: 'Agora' }]);
    setInput('');
    setTimeout(() => {
      setMessages(m => [...m, { sender: 'local', text: 'Nossos atendentes verificarão sua mensagem logo. 💛', time: 'Agora' }]);
    }, 1000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ display: 'flex', flexDirection: 'column', height: '80vh', maxHeight: '600px' }}>
        <div className="modal-header" style={{ padding: '16px 24px', background: 'var(--primary-orange)', color: '#fff' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Chat Direto</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Com: {restaurantName}</p>
          </div>
          <button onClick={onClose} style={{ color: '#fff', border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={24} /></button>
        </div>
        
        <div className="modal-body" style={{ flex: 1, overflowY: 'auto', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ 
                maxWidth: '75%', 
                padding: '12px 16px', 
                borderRadius: '16px',
                borderBottomLeftRadius: msg.sender === 'local' ? '4px' : '16px',
                borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                background: msg.sender === 'user' ? 'var(--primary-orange)' : '#fff',
                color: msg.sender === 'user' ? '#fff' : 'var(--text-primary)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '14px', lineHeight: 1.5 }}>{msg.text}</div>
                <div style={{ fontSize: '11px', marginTop: '4px', textAlign: 'right', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', background: '#fff', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button style={{ color: 'var(--text-secondary)' }}><ImageIcon size={20} /></button>
          <input 
            type="text" 
            placeholder="Escreva sua mensagem..." 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, padding: '10px 16px', borderRadius: '24px', border: '1px solid var(--border-color)', outline: 'none' }}
          />
          <button onClick={handleSend} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={18} style={{ marginLeft: '-2px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
