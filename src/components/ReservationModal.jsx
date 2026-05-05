import { Calendar, Clock, Users, X } from 'lucide-react';
import { useState } from 'react';

export default function ReservationModal({ isOpen, onClose, restaurantName, onConfirm }) {
  const [step, setStep] = useState(1);
  const [partySize, setPartySize] = useState('2 pessoas');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [donate, setDonate] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Reservar Mesa</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{restaurantName}</p>
          </div>
          <button onClick={onClose} className="close-btn"><X size={24} /></button>
        </div>
        
        <div className="modal-body">
          {step === 1 ? (
            <>
              <div className="form-group">
                <label><Users size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Número de Pessoas</label>
                <select className="search-input" style={{ width: '100%', paddingLeft: '12px' }} value={partySize} onChange={e => setPartySize(e.target.value)}>
                  <option>2 pessoas</option>
                  <option>3 pessoas</option>
                  <option>4 pessoas</option>
                  <option>5+ pessoas (Contatar local)</option>
                </select>
              </div>

              <div className="form-group">
                <label><Calendar size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Data</label>
                <input type="date" className="search-input" style={{ paddingLeft: '12px' }} value={date} onChange={e => setDate(e.target.value)} />
              </div>

              <div className="form-group">
                <label><Clock size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Horário Recomendado</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(t => (
                    <button 
                      key={t} 
                      onClick={() => setTime(t)}
                      style={{ 
                        padding: '8px', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '8px', 
                        background: time === t ? 'var(--primary-orange)' : '#fff',
                        color: time === t ? '#fff' : 'inherit'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '24px', padding: '16px', background: '#fff1f2', borderRadius: '12px', border: '1px solid #fecdd3', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <input 
                  type="checkbox" 
                  id="donate-check" 
                  checked={donate} 
                  onChange={e => setDonate(e.target.checked)} 
                  style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: '#e11d48', cursor: 'pointer' }} 
                />
                <label htmlFor="donate-check" style={{ cursor: 'pointer', flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#be123c', fontSize: '15px', marginBottom: '4px' }}>
                    Deseja adicionar +R$ 1,00 para doar uma refeição?
                  </div>
                  <div style={{ fontSize: '13px', color: '#9f1239', lineHeight: 1.4 }}>
                    Sua doação será direcionada para a ONG <strong>Ação da Cidadania</strong> e o restaurante receberá o selo de parceiro.
                  </div>
                </label>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: '64px', height: '64px', background: 'var(--accent-green-bg)', color: 'var(--accent-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Reserva Confirmada!</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Um SMS de confirmação foi enviado para o seu número registrado. Te esperamos!</p>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          {step === 1 ? (
            <button className="btn-primary" onClick={() => {
              if (onConfirm) onConfirm({ partySize, date, time, willDonate: donate });
              setStep(2);
            }}>Confirmar Reserva</button>
          ) : (
            <button className="btn-primary" onClick={() => {
              setStep(1);
              onClose();
            }}>Voltar ao Aplicativo</button>
          )}
        </div>
      </div>
    </div>
  );
}
