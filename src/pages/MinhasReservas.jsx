import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import MinhaFila from './MinhaFila';

export default function MinhasReservas({ reservations, onRestaurantClick, onUpdateReservation, currentUser, queue, onJoinQueue, onLeaveQueue, currentUserQueue, initialTab, onInitialTabConsumed }) {
  const [activeTab, setActiveTab] = useState('reservas');

  // Aplica a tab inicial de forma segura (após montar), e sinaliza que foi consumida
  useEffect(() => {
    if (initialTab && initialTab !== 'reservas') {
      setActiveTab(initialTab);
    }
    onInitialTabConsumed?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // só na montagem

  const handleAcceptProposal = (res) => {
    onUpdateReservation(res.id, 'Proposta Aceita (Cliente)', { date: res.proposedDate || res.date, time: res.proposedTime });
  };

  const handleRejectProposal = (res) => {
    onUpdateReservation(res.id, 'Proposta Recusada (Cliente)');
  };

  return (
    <div className="card" style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Minhas Reservas &amp; Fila</h1>

      <div className="feed-tabs" style={{ marginBottom: '24px' }}>
        <button className={`tab ${activeTab === 'reservas' ? 'active' : ''}`} onClick={() => setActiveTab('reservas')}>Reservas</button>
        <button className={`tab ${activeTab === 'fila' ? 'active' : ''}`} onClick={() => setActiveTab('fila')}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            {queue?.isOpen && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0, animation: 'pulse 1.5s infinite' }} />}
            Fila Virtual
            {currentUserQueue && <span style={{ background: '#f97316', color: '#fff', borderRadius: '999px', padding: '1px 7px', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>#{queue?.entries?.findIndex(e => e.id === currentUserQueue?.id) + 1}</span>}
          </span>
        </button>
      </div>

      {activeTab === 'fila' && (
        <MinhaFila
          currentUserQueue={currentUserQueue}
          queue={queue}
          onJoinQueue={onJoinQueue}
          onLeaveQueue={onLeaveQueue}
          currentUser={currentUser}
          restaurantName={currentUserQueue?.restaurantName || null}
        />
      )}

      {activeTab === 'reservas' && (
        <>

      {reservations.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
          <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <p>Você ainda não possui reservas.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reservations.map((res) => {
            const hasProposal = res.status === 'Proposta Enviada';
            return (
              <div key={res.id} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '16px', cursor: 'pointer', alignItems: 'center' }} onClick={() => onRestaurantClick(res.restaurantId)}>
                  <img src={res.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=80&q=80'} alt={res.restaurantName} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{res.restaurantName}</h3>
                    <div style={{ display: 'flex', gap: '16px', color: '#6b7280', fontSize: '13px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {res.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {res.time}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {res.partySize}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                      background: res.status === 'Confirmada' || res.status === 'Proposta Aceita (Cliente)' ? '#dcfce7' : 
                                  res.status === 'Recusada' || res.status.includes('Recusada') ? '#fee2e2' : 
                                  res.status === 'Proposta Enviada' ? '#fef3c7' : '#f3f4f6',
                      color: res.status === 'Confirmada' || res.status === 'Proposta Aceita (Cliente)' ? '#16a34a' : 
                            res.status === 'Recusada' || res.status.includes('Recusada') ? '#dc2626' : 
                            res.status === 'Proposta Enviada' ? '#d97706' : '#6b7280'
                    }}>
                      {res.status}
                    </span>
                  </div>
                </div>

                {hasProposal && (
                  <div style={{ marginTop: '12px', padding: '16px', backgroundImage: 'linear-gradient(to right, #fffbeb, #fef3c7)', borderRadius: '12px', border: '1px solid #fde68a', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ background: '#f59e0b', color: '#fff', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                      <Clock size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#b45309', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Ação Necessária
                      </p>
                      <p style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#92400e', fontWeight: 500, lineHeight: 1.4 }}>
                        O restaurante não tem mesas para o horário original, mas <strong>sugeriu uma nova reserva</strong> para <strong>{res.proposedDate || res.date}</strong> às <strong>{res.proposedTime}</strong>.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => handleAcceptProposal(res)} 
                          style={{ background: '#10b981', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)', transition: 'all 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                        >
                          <CheckCircle size={18} /> Aceitar Nova Reserva
                        </button>
                        <button 
                          onClick={() => handleRejectProposal(res)} 
                          style={{ background: 'transparent', color: '#dc2626', border: '1px solid #fca5a5', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '14px', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.borderColor = '#f87171'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#fca5a5'; }}
                        >
                          <XCircle size={18} /> Rejeitar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
        </>
      )}
    </div>
  );
}
