import { useState, useEffect } from 'react';
import { Users, Clock, Brain, XCircle, MapPin, AlertTriangle } from 'lucide-react';

// ─── IA ───────────────────────────────────────────────────────────────────────
function computeAvgFromHistory(history) {
  if (!history || history.length === 0) return 12;
  return Math.round(history.reduce((a, b) => a + b, 0) / history.length);
}
function predictWaitTime(pos, avg) {
  if (pos <= 0) return 0;
  return Math.ceil(Math.round(pos * avg * 0.6) / 5) * 5;
}

// ─── Position Ring ─────────────────────────────────────────────────────────
function PositionRing({ position, total }) {
  const colors = ['#f97316', '#6366f1', '#10b981', '#f59e0b'];
  const color = colors[(position - 1) % colors.length];
  const progress = total > 1 ? (total - position) / (total - 1) : 1;
  return (
    <div style={{ position: 'relative', width: 92, height: 92, flexShrink: 0 }}>
      <svg width={92} height={92} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={46} cy={46} r={40} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth={6} />
        <circle cx={46} cy={46} r={40} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={`${251.2 * progress} 251.2`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '28px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{position}</span>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>na fila</span>
      </div>
    </div>
  );
}

// ─── Modal de confirmação ────────────────────────────────────────────────────
function LeaveConfirmModal({ restaurantName, onConfirm, onCancel }) {
  return (
    <div
      onClick={onCancel}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'fadeIn .2s ease' }}
    >
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes popIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}`}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: '20px', padding: '28px 24px', maxWidth: '360px', width: '100%', animation: 'popIn .25s ease', boxShadow: '0 20px 60px rgba(0,0,0,.2)' }}
      >
        {/* Ícone */}
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <AlertTriangle size={26} color="#dc2626" />
        </div>

        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, textAlign: 'center' }}>Sair da Fila?</h3>
        <p style={{ margin: '10px 0 24px', color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', lineHeight: 1.6 }}>
          Tem certeza que deseja sair da fila de <strong>{restaurantName}</strong>? Você perderá sua posição atual.
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', color: 'var(--text-primary)', transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239,68,68,.3)', transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Sair da Fila
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function MinhaFila({ currentUserQueue, queue, onLeaveQueue, restaurantName }) {
  const { isOpen, entries, queueHistory = [] } = queue;
  const avg = computeAvgFromHistory(queueHistory);
  const myEntry = currentUserQueue;
  const myPosition = myEntry ? entries.findIndex(e => e.id === myEntry.id) + 1 : null;
  const waitMin = myPosition ? predictWaitTime(myPosition - 1, avg) : null;
  const isNext = myPosition === 1;

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [notified, setNotified] = useState(false);
  useEffect(() => {
    if (isNext && !notified) setNotified(true);
  }, [isNext, notified]);

  const displayRestaurant = restaurantName || myEntry?.restaurantName || 'Restaurante';

  // ── Não está na fila ───────────────────────────────────────────────────────
  if (!myEntry) {
    return (
      <div>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ animation: 'fadeIn .4s ease', textAlign: 'center', padding: '60px 24px', background: '#f9fafb', borderRadius: '20px', border: '2px dashed #e5e7eb' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🍽️</div>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>Nenhuma fila ativa</h3>
          <p style={{ margin: '10px 0 0', color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
            Para entrar na fila de um restaurante,<br />
            acesse o perfil do restaurante<br />
            e clique em <strong>"Entrar na Fila"</strong>.
          </p>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', color: '#6366f1', fontWeight: 600 }}>
            <MapPin size={14} /> Vá em Explorar → selecione um restaurante
          </div>
        </div>
      </div>
    );
  }

  // ── Está na fila → acompanhamento ─────────────────────────────────────────
  return (
    <div>
      <style>{`
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes slideIn { from{transform:translateY(-10px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
      `}</style>

      {/* Modal de confirmação de saída */}
      {showLeaveModal && (
        <LeaveConfirmModal
          restaurantName={displayRestaurant}
          onConfirm={() => { setShowLeaveModal(false); onLeaveQueue(); }}
          onCancel={() => setShowLeaveModal(false)}
        />
      )}

      {/* Banner "você é o próximo" */}
      {isNext && (
        <div style={{ animation: 'slideIn .4s ease', background: 'linear-gradient(135deg,#f97316,#ea580c)', borderRadius: '16px', padding: '18px 22px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 8px 24px rgba(249,115,22,.35)' }}>
          <div style={{ animation: 'float 2s infinite', fontSize: '34px', flexShrink: 0 }}>🎉</div>
          <div>
            <p style={{ margin: 0, fontWeight: 900, fontSize: '17px', color: '#fff' }}>Você é o próximo!</p>
            <p style={{ margin: '3px 0 0', color: 'rgba(255,255,255,.85)', fontSize: '13px' }}>Dirija-se ao {displayRestaurant} — sua mesa está sendo preparada.</p>
          </div>
        </div>
      )}

      {/* Card principal */}
      <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,.06)' }}>
        {/* Header indigo */}
        <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', padding: '22px 24px' }}>
          {/* Restaurante */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <MapPin size={14} color="#a5b4fc" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#a5b4fc' }}>{displayRestaurant}</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite', display: 'inline-block', marginLeft: 'auto' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#86efac' }}>AO VIVO</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <PositionRing position={myPosition} total={entries.length} />
            <div style={{ color: '#fff', flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#a5b4fc', fontWeight: 700 }}>SUA POSIÇÃO</p>
              <p style={{ margin: '3px 0 6px', fontSize: '32px', fontWeight: 900, lineHeight: 1 }}>#{myPosition}</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#c7d2fe' }}>
                {myPosition === 1
                  ? 'Você é o próximo!'
                  : `${myPosition - 1} grupo${myPosition > 2 ? 's' : ''} à sua frente`}
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#a5b4fc', fontWeight: 700 }}>ESPERA EST.</p>
              <p style={{ margin: '3px 0 0', fontSize: '30px', fontWeight: 900, color: waitMin === 0 ? '#86efac' : '#fde68a', lineHeight: 1 }}>
                {waitMin === 0 ? 'Agora!' : `~${waitMin}m`}
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 24px' }}>
          {/* Info cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={18} color="#6366f1" />
              <div>
                <p style={{ margin: 0, fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SEU GRUPO</p>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>{myEntry.partySize} pessoa{myEntry.partySize > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#f59e0b" />
              <div>
                <p style={{ margin: 0, fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>ENTROU ÀS</p>
                <p style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>{myEntry.joinedAt}</p>
              </div>
            </div>
          </div>

          {/* Barra de progresso */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Progresso na fila</span>
              <span style={{ fontSize: '12px', fontWeight: 700 }}>
                {entries.length > 0
                  ? `${entries.length - myPosition} grupo${entries.length - myPosition !== 1 ? 's' : ''} passaram`
                  : 'último da fila'}
              </span>
            </div>
            <div style={{ height: 7, borderRadius: '99px', background: '#e5e7eb', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '99px',
                width: `${entries.length > 1 ? Math.round(((entries.length - myPosition) / (entries.length - 1)) * 100) : 100}%`,
                background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', transition: 'width .6s ease'
              }} />
            </div>
          </div>

          {/* Previsão IA */}
          <div style={{ background: 'linear-gradient(135deg,rgba(99,102,241,.08),rgba(139,92,246,.05))', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Brain size={20} color="#6366f1" />
            <div>
              <p style={{ margin: 0, fontSize: '11px', color: '#6366f1', fontWeight: 700 }}>PREVISÃO DE IA</p>
              <p style={{ margin: '2px 0 0', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {waitMin === 0
                  ? 'Prepare-se! Você será chamado a qualquer momento.'
                  : `Estimativa de ${waitMin} min baseada no histórico de atendimentos.`}
              </p>
            </div>
          </div>

          {/* Sair da fila */}
          <button
            onClick={() => setShowLeaveModal(true)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '13px', borderRadius: '12px', border: '1.5px solid #fca5a5', background: '#fef2f2', color: '#dc2626', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
            onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
          >
            <XCircle size={18} /> Sair da Fila
          </button>
        </div>
      </div>
    </div>
  );
}
