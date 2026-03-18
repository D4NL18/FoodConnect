import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, ChevronLeft, ChevronRight, Info, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function GerenciarReservas({ reservations, onUpdateReservation }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeTab, setActiveTab] = useState('pendentes'); // pendentes, historico
  
  const [rejectingResId, setRejectingResId] = useState(null);
  const [proposedDate, setProposedDate] = useState('');
  const [proposedTime, setProposedTime] = useState('');

  const [historicoFilters, setHistoricoFilters] = useState({ date: '', time: '', partySize: '', status: '' });

  const handleStatusChange = (id, newStatus, extraData = {}) => {
    onUpdateReservation(id, newStatus, extraData);
  };

  const handleProposeAlternative = () => {
    if (proposedDate && proposedTime) {
      handleStatusChange(rejectingResId, 'Proposta Enviada', { proposedDate, proposedTime });
      setRejectingResId(null);
      setProposedDate('');
      setProposedTime('');
    }
  };

  const pendingReservations = reservations.filter(r => r.status === 'Pendente' || r.status === 'Proposta Modificada (Cliente)');
  
  const historicReservations = reservations.filter(r => {
    if (['Pendente', 'Proposta Modificada (Cliente)'].includes(r.status)) return false;
    if (historicoFilters.date && r.date !== historicoFilters.date) return false;
    if (historicoFilters.time && !r.time.includes(historicoFilters.time)) return false;
    if (historicoFilters.partySize && !r.partySize.includes(historicoFilters.partySize)) return false;
    if (historicoFilters.status && r.status !== historicoFilters.status) return false;
    return true;
  });

  const capacity = 80;

  // Lógica para gerar os dias da semana baseados no weekOffset
  const getWeekDates = (offset) => {
    const today = new Date();
    // Ajusta para o início da semana (Segunda-feira)
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1; 
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + (offset * 7));

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatShortDate = (date) => {
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${d}/${m}`;
    };

    const formatMonthList = (date) => {
      const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      return months[date.getMonth()];
    };

    const currentWeekLabel = `${startOfWeek.getDate()} ${formatMonthList(startOfWeek)} - ${endOfWeek.getDate()} ${formatMonthList(endOfWeek)}`;

    const days = [];
    const weekDaysNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      days.push(`${weekDaysNames[i]} ${formatShortDate(currentDay)}`);
    }

    return { label: currentWeekLabel, days };
  };

  const { label: currentWeek, days: weekDays } = getWeekDates(weekOffset);

  // Randomizamos os dados do placeholder para parecer que mudou a semana na interface
  const generateRandomAvailability = (offset) => {
    const baseMul = Math.abs(offset) % 3 + 1; // apenas para variação mockada
    return [
      { time: '18:00', bookCount: [20, 15, 30, 40, 70, 80, 40].map(v => Math.min(80, Math.floor(v / baseMul + (offset * 5)))) },
      { time: '19:00', bookCount: [30, 25, 45, 60, 80, 80, 60].map(v => Math.min(80, Math.floor(v / baseMul + (offset * 2)))) },
      { time: '20:00', bookCount: [40, 35, 50, 70, 80, 80, 70].map(v => Math.min(80, Math.floor(v / baseMul + (offset * -3)))) },
      { time: '21:00', bookCount: [25, 20, 35, 55, 75, 80, 50].map(v => Math.min(80, Math.floor(v / baseMul + (offset * 10)))) },
      { time: '22:00', bookCount: [10,  5, 10, 20, 40, 60, 20].map(v => Math.min(80, Math.floor(v / baseMul + (offset * 4)))) },
    ].map(slot => ({
      ...slot,
      bookCount: slot.bookCount.map(count => Math.max(0, count)) // não deixa ficar negativo
    }));
  };

  const weeklyAvailability = generateRandomAvailability(weekOffset);


  return (
    <div className="card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>Gerenciamento de Reservas</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f3f4f6', padding: '8px 16px', borderRadius: '8px' }}>
          <button onClick={() => setWeekOffset(prev => prev - 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}><ChevronLeft size={18} /></button>
          <span style={{ fontWeight: 600, minWidth: '130px', textAlign: 'center' }}>{currentWeek}</span>
          <button onClick={() => setWeekOffset(prev => prev + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}><ChevronRight size={18} /></button>
        </div>
      </div>
      
      {/* Visão de Ocupação Semanal */}
      <div className="card" style={{ padding: '20px', marginBottom: '32px', border: '1px solid var(--border-color)', boxShadow: 'none' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Disponibilidade Semanal da Lotação <Info size={16} color="var(--text-muted)" />
        </h3>
        <div>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '12px', width: '44px', paddingBottom: '8px' }}>Hora</th>
                {weekDays.map(day => {
                  const [dayName, dayDate] = day.split(' ');
                  return (
                    <th key={day} style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: 600, fontSize: '11px', paddingBottom: '8px' }}>
                      <div>{dayName}</div>
                      <div style={{ fontWeight: 400, fontSize: '10px', opacity: 0.7 }}>{dayDate}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {weeklyAvailability.map(slot => (
                <tr key={slot.time}>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12px', paddingRight: '4px' }}>{slot.time}</td>
                  {slot.bookCount.map((booked, idx) => {
                    const occupancyRate = booked / capacity;
                    let bgColor = '#dcfce7';
                    let textColor = '#16a34a';
                    if (occupancyRate >= 0.8) { bgColor = '#fee2e2'; textColor = '#dc2626'; }
                    else if (occupancyRate >= 0.5) { bgColor = '#fef3c7'; textColor = '#d97706'; }
                    return (
                      <td key={idx} style={{ background: bgColor, borderRadius: '6px', textAlign: 'center', padding: '6px 2px' }}>
                        <div style={{ fontWeight: 700, color: textColor, fontSize: '11px', whiteSpace: 'nowrap' }}>{booked}/{capacity}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="feed-tabs" style={{ marginBottom: '24px' }}>
        <button className={`tab ${activeTab === 'pendentes' ? 'active' : ''}`} onClick={() => setActiveTab('pendentes')}>Reservas Pendentes</button>
        <button className={`tab ${activeTab === 'historico' ? 'active' : ''}`} onClick={() => setActiveTab('historico')}>Histórico</button>
      </div>

      {activeTab === 'pendentes' && (
        <>
          {pendingReservations.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
              <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p>Não há solicitações de reservas pendentes.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pendingReservations.map((res) => (
                <div key={res.id} className="card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ width: '50px', height: '50px', background: 'var(--feed-active-bg)', color: 'var(--primary-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 700, flexShrink: 0 }}>
                    {res.customerName ? res.customerName.charAt(0) : 'C'}
                  </div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{res.customerName}</h3>
                    <div style={{ display: 'flex', gap: '16px', color: '#6b7280', fontSize: '13px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {res.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-orange)', fontWeight: 600 }}><Clock size={14} /> {res.time}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {res.partySize}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleStatusChange(res.id, 'Confirmada')} style={{ background: '#dcfce7', color: '#16a34a', border: '1px solid #16a34a', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '13px' }}>
                      <CheckCircle size={16} /> Aceitar
                    </button>
                    <button onClick={() => setRejectingResId(res.id)} style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #dc2626', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '13px' }}>
                      <XCircle size={16} /> Recusar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'historico' && (
        <div className="card" style={{ padding: '24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', background: '#f9fafb', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}><Filter size={18} color="var(--primary-orange)" /> Filtros:</span>
            <input 
              type="date" 
              style={{ flex: '1 1 auto', minWidth: '150px', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', color: 'var(--text-primary)' }}
              value={historicoFilters.date}
              onChange={(e) => setHistoricoFilters({ ...historicoFilters, date: e.target.value })}
            />
            <input 
              type="time" 
              style={{ flex: '1 1 auto', minWidth: '150px', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', color: 'var(--text-primary)' }}
              value={historicoFilters.time}
              onChange={(e) => setHistoricoFilters({ ...historicoFilters, time: e.target.value })}
            />
            <select 
              style={{ flex: '1 1 auto', minWidth: '150px', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', color: 'var(--text-primary)' }}
              value={historicoFilters.partySize}
              onChange={(e) => setHistoricoFilters({ ...historicoFilters, partySize: e.target.value })}
            >
              <option value="">Tamanho (Todos)</option>
              <option value="1">1 pessoa</option>
              <option value="2">2 pessoas</option>
              <option value="3">3 pessoas</option>
              <option value="4">4+ pessoas</option>
            </select>
            <select 
              style={{ flex: '1 1 auto', minWidth: '150px', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none', color: 'var(--text-primary)' }}
              value={historicoFilters.status}
              onChange={(e) => setHistoricoFilters({ ...historicoFilters, status: e.target.value })}
            >
              <option value="">Status (Todos)</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Recusada">Recusada</option>
              <option value="Proposta Enviada">Proposta Pendente</option>
              <option value="Proposta Aceita (Cliente)">Proposta Aceita</option>
              <option value="Proposta Recusada (Cliente)">Proposta Recusada</option>
            </select>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Cliente</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Data Original</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Horário</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Tamanho</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {historicReservations.map(res => {
                let statusColor = '#6b7280';
                let statusBg = '#f3f4f6';
                if (res.status === 'Confirmada' || res.status === 'Proposta Aceita (Cliente)') {
                  statusColor = '#16a34a'; statusBg = '#dcfce7';
                } else if (res.status === 'Recusada' || res.status === 'Proposta Recusada (Cliente)') {
                  statusColor = '#dc2626'; statusBg = '#fee2e2';
                } else if (res.status === 'Proposta Enviada') {
                  statusColor = '#d97706'; statusBg = '#fef3c7';
                }

                return (
                  <tr key={res.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>{res.customerName}</td>
                    <td style={{ padding: '12px 8px' }}>{res.date}</td>
                    <td style={{ padding: '12px 8px' }}>{res.time}</td>
                    <td style={{ padding: '12px 8px' }}>{res.partySize}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{ background: statusBg, color: statusColor, padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                        {res.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          {historicReservations.length === 0 && (
             <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)' }}>Nenhuma reserva encontrada no histórico com esses filtros.</p>
          )}
        </div>
      )}

      {/* Modal de Recusa / Proposta */}
      {rejectingResId && (
        <div className="modal-overlay" style={{ backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.4)', animation: 'fadeIn 0.2s ease-out' }}>
          <div className="modal-content" style={{ maxWidth: '480px', padding: '32px', borderRadius: '24px', boxShadow: '0 24px 48px rgba(0,0,0,0.15)', background: '#ffffff', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0', color: 'var(--text-primary)' }}>Gerenciar Solicitação</h2>
              </div>
              <button 
                onClick={() => setRejectingResId(null)} 
                style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', marginTop: '-4px', marginRight: '-4px' }}
                onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
              >
                <XCircle size={20} color="#6b7280" />
              </button>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                <Clock size={16} color="var(--primary-orange)" /> 
                Horários de Baixa Demanda (Hoje)
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['18:00', '21:00', '22:00'].map(time => {
                  const isSelected = proposedTime === time && !proposedDate;
                  
                  // Calcular a demanda de "Hoje" para este horário
                  const today = new Date();
                  const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
                  const todayAvailability = generateRandomAvailability(0);
                  const slotConfig = todayAvailability.find(s => s.time === time);
                  const booked = slotConfig ? slotConfig.bookCount[todayIndex] : 0;
                  const occupancyRate = booked / capacity;
                  
                  let demandColor = '#16a34a';
                  let demandBg = '#dcfce7';
                  if (occupancyRate >= 0.8) {
                    demandColor = '#dc2626'; demandBg = '#fee2e2';
                  } else if (occupancyRate >= 0.5) {
                    demandColor = '#d97706'; demandBg = '#fef3c7';
                  }

                  return (
                    <button
                      key={time}
                      onClick={() => { setProposedTime(time); setProposedDate(''); }}
                      style={{ 
                        flex: '1 0 calc(33.333% - 10px)',
                        padding: '12px', 
                        borderRadius: '12px', 
                        border: isSelected ? '2px solid var(--primary-orange)' : '1px solid var(--border-color)', 
                        background: isSelected ? '#fff7ed' : '#ffffff',
                        color: isSelected ? 'var(--primary-orange)' : 'var(--text-primary)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isSelected ? '0 4px 12px rgba(249, 115, 22, 0.15)' : '0 1px 3px rgba(0,0,0,0.02)',
                        transform: isSelected ? 'translateY(-1px)' : 'none'
                      }}
                      onMouseEnter={e => !isSelected && (e.currentTarget.style.borderColor = '#d1d5db')}
                      onMouseLeave={e => !isSelected && (e.currentTarget.style.borderColor = 'var(--border-color)')}
                    >
                      <span style={{ fontWeight: 800, fontSize: '16px' }}>{time}</span>
                      <div style={{ background: demandBg, color: demandColor, padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={12} /> {booked}/{capacity}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: '36px', padding: '20px', background: '#f9fafb', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                 <Calendar size={16} color="#6b7280" />
                 Outro Dia ou Horário Específico
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="date" 
                    value={proposedDate} 
                    onChange={e => { setProposedDate(e.target.value); setProposedTime(''); }} 
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', width: '100%', outline: 'none', background: '#fff', fontSize: '14px', transition: 'border-color 0.2s', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-primary)' }} 
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-orange)'}
                    onBlur={e => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input 
                    type="time" 
                    value={proposedTime} 
                    onChange={e => setProposedTime(e.target.value)} 
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', width: '100%', outline: 'none', background: '#fff', fontSize: '14px', transition: 'border-color 0.2s', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-primary)' }} 
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--primary-orange)'}
                    onBlur={e => e.currentTarget.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <button 
                onClick={() => { handleStatusChange(rejectingResId, 'Recusada'); setRejectingResId(null); }}
                style={{ flex: 1, minWidth: '140px', padding: '14px', borderRadius: '12px', border: '1px solid #fca5a5', background: '#fef2f2', color: '#b91c1c', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.borderColor = '#f87171'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fca5a5'; }}
              >
                Apenas Recusar
              </button>
              <button 
                disabled={!proposedTime}
                onClick={handleProposeAlternative}
                style={{ 
                  flex: 2, 
                  minWidth: '200px', 
                  padding: '14px', 
                  borderRadius: '12px', 
                  border: 'none', 
                  background: proposedTime ? 'linear-gradient(135deg, var(--primary-orange) 0%, #ea580c 100%)' : '#e5e7eb', 
                  color: proposedTime ? '#fff' : '#9ca3af', 
                  fontWeight: 700, 
                  fontSize: '15px',
                  cursor: proposedTime ? 'pointer' : 'not-allowed',
                  boxShadow: proposedTime ? '0 4px 12px rgba(234, 88, 12, 0.25)' : 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => proposedTime && (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={e => proposedTime && (e.currentTarget.style.transform = 'none')}
              >
                Sugerir a Mudança
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
