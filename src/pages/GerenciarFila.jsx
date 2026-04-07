import { useState, useEffect } from 'react';
import {
  Users, Clock, TrendingUp, Settings, Bell,
  Play, Pause, ChevronUp, ChevronDown, Zap, Timer, AlertTriangle,
  ArrowRight, BarChart2, Brain, Trash2, History,
  CheckCircle2, XCircle, TableProperties, Sparkles, ChevronRight,
  UserX, RefreshCw
} from 'lucide-react';

// ─── IA helpers ───────────────────────────────────────────────────────────────
function computeAvgFromHistory(history) {
  if (!history || history.length === 0) return 12;
  const sum = history.reduce((a, b) => a + b, 0);
  return Math.round(sum / history.length);
}

function predictWaitTime(queueLength, avgServiceMinutes) {
  if (queueLength <= 0) return 0;
  const predicted = Math.round(queueLength * avgServiceMinutes * 0.6);
  return Math.ceil(predicted / 5) * 5;
}

function timeToMinutes(str) {
  if (!str) return 0;
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

// ─── Smart Match: busca recursiva de combinações ─────────────────────────────
// Regras:
//   • Sempre retorna a melhor opção possível (sem piso de utilização)
//   • Se o total de pessoas elegíveis ≤ tableSize → sugere "chamar todos"
//   • Busca combinações de 1-4 grupos; ordena por utilização desc, depois menos grupos
function suggestForTable(entries, tableSize) {
  if (!entries || entries.length === 0) return [];

  const eligible = entries.filter(e => e.partySize <= tableSize);
  if (eligible.length === 0) return []; // nenhum grupo cabe (partySize > tableSize)

  const candidates = eligible.slice(0, 8);
  const totalCandidatePeople = candidates.reduce((s, g) => s + g.partySize, 0);

  const found = [];
  const seen  = new Set();
  const MAX_GROUPS = 4;

  const addResult = (groups, total) => {
    const key = groups.map(g => g.id).sort().join(',');
    if (!seen.has(key)) {
      seen.add(key);
      found.push({ groups: [...groups], totalPeople: total, utilization: total / tableSize });
    }
  };

  // Caso especial: total de elegíveis <= mesa → sugere chamar todos
  if (totalCandidatePeople <= tableSize) {
    addResult(candidates, totalCandidatePeople);
  }

  // Backtracking: combinações de 1-4 grupos
  function search(start, current, total) {
    if (total > tableSize) return;
    if (current.length > 0) addResult(current, total);
    if (current.length >= MAX_GROUPS) return;
    for (let i = start; i < candidates.length; i++) {
      const g = candidates[i];
      if (total + g.partySize <= tableSize) {
        current.push(g);
        search(i + 1, current, total + g.partySize);
        current.pop();
      }
    }
  }
  search(0, [], 0);

  // Ordena: maior utilização → menos grupos
  found.sort((a, b) => {
    if (b.utilization !== a.utilization) return b.utilization - a.utilization;
    return a.groups.length - b.groups.length;
  });

  return found.slice(0, 4).map((s, idx) => {
    const isExact = s.utilization >= 0.9999;
    const isAll   = totalCandidatePeople <= tableSize && s.groups.length === candidates.length && candidates.length > 1;
    const isMulti = s.groups.length > 1;
    const type    = isAll ? 'all' : isExact ? 'exact' : isMulti ? 'combo' : 'single';
    const color   = isAll ? '#8b5cf6' : isExact ? '#16a34a' : isMulti ? '#f59e0b' : '#6366f1';
    const nGrp    = s.groups.length;
    const label   =
      isAll    ? `Chamar todos disponíveis (${s.totalPeople}/${tableSize} lugares)` :
      isExact  ? 'Encaixe perfeito' :
      isMulti  ? `Combinar ${nGrp} grupo${nGrp > 1 ? 's' : ''} (${s.totalPeople}/${tableSize} lugares)` :
                 `Grupo único (${s.totalPeople}/${tableSize} lugares)`;
    return {
      id: `s${idx}-${s.groups.map(g => g.id).join('-')}`,
      type, groups: s.groups, totalPeople: s.totalPeople,
      utilization: s.utilization, label, labelColor: color, priority: idx,
    };
  });
}

// ─── Componentes auxiliares ───────────────────────────────────────────────────
function WaitTimeBadge({ minutes }) {
  const color =
    minutes <= 15 ? { bg: '#dcfce7', text: '#16a34a', pulse: '#22c55e' } :
    minutes <= 30 ? { bg: '#fef3c7', text: '#d97706', pulse: '#f59e0b' } :
                   { bg: '#fee2e2', text: '#dc2626', pulse: '#ef4444' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: color.bg, color: color.text, padding: '4px 10px', borderRadius: '999px', fontWeight: 700, fontSize: '13px' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color.pulse, animation: 'pulse 1.5s infinite', display: 'inline-block' }} />
      ~{minutes} min
    </span>
  );
}

function UtilBar({ value }) {
  const pct = Math.round(value * 100);
  const color = pct === 100 ? '#16a34a' : pct >= 80 ? '#f59e0b' : '#6366f1';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ flex: 1, height: 5, borderRadius: '99px', background: '#e5e7eb', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '99px', transition: 'width .4s ease' }} />
      </div>
      <span style={{ fontSize: '11px', fontWeight: 700, color, minWidth: 28 }}>{pct}%</span>
    </div>
  );
}

function ConfirmationCountdown({ calledAt, timeoutMs = 5 * 60 * 1000 }) {
  const [remaining, setRemaining] = useState(timeoutMs);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - calledAt;
      setRemaining(Math.max(0, timeoutMs - elapsed));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [calledAt, timeoutMs]);

  const secs = Math.ceil(remaining / 1000);
  const mins = Math.floor(secs / 60);
  const s = secs % 60;
  const pct = (remaining / timeoutMs) * 100;
  const expired = remaining === 0;
  const color = expired ? '#dc2626' : pct > 50 ? '#16a34a' : '#f59e0b';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
        <svg width={36} height={36} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={18} cy={18} r={14} fill="none" stroke="#e5e7eb" strokeWidth={3} />
          <circle cx={18} cy={18} r={14} fill="none" stroke={color} strokeWidth={3}
            strokeDasharray={`${87.96 * pct / 100} 87.96`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s linear' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Timer size={14} color={color} />
        </div>
      </div>
      <span style={{ fontSize: '13px', fontWeight: 700, color, fontVariantNumeric: 'tabular-nums' }}>
        {expired ? 'Expirado' : `${mins}:${String(s).padStart(2, '0')}`}
      </span>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function GerenciarFila({ queue, onQueueUpdate }) {
  const { isOpen, entries, maxSize, autoCloseTime, queueHistory = [], calledEntries = [] } = queue;
  const avgServiceMinutes = computeAvgFromHistory(queueHistory);

  const [settingsOpen, setSettingsOpen]   = useState(false);
  const [newMaxSize, setNewMaxSize]       = useState(maxSize);
  const [newAutoTime, setNewAutoTime]     = useState(autoCloseTime || '');
  const [notifyMsg, setNotifyMsg]         = useState('');

  // Estado do painel "Liberar Mesa"
  const [tablePanelOpen, setTablePanelOpen] = useState(false);
  const [tableSize, setTableSize]           = useState(2);
  const [customSize, setCustomSize]         = useState('');
  const [showCustom, setShowCustom]         = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const suggestions = suggestForTable(entries, tableSize);

  // Auto-seleciona a primeira sugestão ao mudar o tamanho da mesa
  useEffect(() => {
    setSelectedSuggestion(suggestions[0]?.id ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableSize, entries.length]);

  // Auto-close por horário
  useEffect(() => {
    if (!autoCloseTime || !isOpen) return;
    const check = () => {
      const now = new Date();
      const [h, m] = autoCloseTime.split(':').map(Number);
      if (now.getHours() === h && now.getMinutes() >= m) onQueueUpdate({ isOpen: false });
    };
    const interval = setInterval(check, 30000);
    check();
    return () => clearInterval(interval);
  }, [autoCloseTime, isOpen, onQueueUpdate]);

  // Auto-close por teto
  useEffect(() => {
    if (maxSize > 0 && entries.length >= maxSize && isOpen) {
      onQueueUpdate({ isOpen: false });
      notify(`Fila fechada automaticamente! Teto de ${maxSize} pessoas atingido.`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries.length, maxSize, isOpen]);

  const notify = (msg) => {
    setNotifyMsg(msg);
    setTimeout(() => setNotifyMsg(''), 4000);
  };

  const toggleQueue = () => onQueueUpdate({ isOpen: !isOpen });

  const removeEntry = (id) => {
    onQueueUpdate({
      entries: entries.filter(e => e.id !== id),
      calledEntries: calledEntries.filter(c => !c.groups.some(g => g.id === id)),
    });
  };

  // ── Chamar seleção ────────────────────────────────────────────────────────
  const callSelected = () => {
    const suggestion = suggestions.find(s => s.id === selectedSuggestion);
    if (!suggestion) return;

    const calledIds = suggestion.groups.map(g => g.id);
    const now = new Date();
    const calledAt = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Adiciona ao bloco de confirmação
    const newCalled = {
      callId: Date.now(),
      groups: suggestion.groups,
      tableSize,
      calledAt: Date.now(),
      calledAtStr: calledAt,
      totalPeople: suggestion.totalPeople,
    };

    onQueueUpdate({
      entries: entries.filter(e => !calledIds.includes(e.id)),
      calledEntries: [...calledEntries, newCalled],
    });

    setTablePanelOpen(false);
    notify(`📣 ${suggestion.groups.map(g => g.name).join(' + ')} foram chamados! Aguardando confirmação.`);
  };

  // ── Confirmar aparecimento ────────────────────────────────────────────────
  const confirmArrival = (callId) => {
    const called = calledEntries.find(c => c.callId === callId);
    if (!called) return;
    const now = Date.now();
    const calledAtMs = called.calledAt;
    const duration = Math.max(1, Math.round((now - calledAtMs) / 60000));

    onQueueUpdate({
      calledEntries: calledEntries.filter(c => c.callId !== callId),
      queueHistory: [...queueHistory, duration],
    });
    notify(`✅ Mesa confirmada! ${called.groups.map(g => g.name).join(' + ')} estão sendo acomodados.`);
  };

  // ── Marcar como não apareceu → redireciona para liberar a mesma mesa ────────
  const markNoShow = (callId) => {
    const called = calledEntries.find(c => c.callId === callId);
    if (!called) return;
    onQueueUpdate({
      calledEntries: calledEntries.filter(c => c.callId !== callId),
    });
    // Reabre o painel com o mesmo tamanho de mesa para chamar o próximo
    setTableSize(called.tableSize);
    if (called.tableSize > 10) {
      setCustomSize(String(called.tableSize));
      setShowCustom(true);
    } else {
      setShowCustom(false);
      setCustomSize('');
    }
    setTablePanelOpen(true);
    notify(`⚠️ ${called.groups.map(g => g.name).join(' + ')} não apareceram — escolha quem chamar para a mesa de ${called.tableSize}.`);
  };

  const saveSettings = () => {
    onQueueUpdate({ maxSize: parseInt(newMaxSize) || 0, autoCloseTime: newAutoTime || null });
    setSettingsOpen(false);
  };

  const predictedWait = predictWaitTime(entries.length, avgServiceMinutes);
  const fillPercent   = maxSize > 0 ? Math.min(100, (entries.length / maxSize) * 100) : null;

  const statCards = [
    { label: 'Na fila agora',   value: entries.length,         icon: Users,      color: '#6366f1' },
    { label: 'Espera estimada', value: `~${predictedWait}min`, icon: Clock,      color: '#f59e0b' },
    { label: 'Capacidade máx.', value: maxSize || '∞',          icon: TrendingUp, color: '#10b981' },
  ];

  return (
    <div style={{ padding: '0' }}>
      <style>{`
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes slideIn { from{transform:translateY(-10px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes shake   { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
      `}</style>

      {/* CABEÇALHO */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={22} color="#fff" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>Gerenciar Fila</h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Controle em tempo real</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => setSettingsOpen(s => !s)} style={btnOutline}>
            <Settings size={16} /> Configurações
          </button>
          {isOpen && entries.length > 0 && (
            <button
              onClick={() => { setTablePanelOpen(s => !s); setSelectedSuggestion(suggestions[0]?.id ?? null); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 12px rgba(99,102,241,.3)', transition: 'all .2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <TableProperties size={18} /> Liberar Mesa
            </button>
          )}
          <button onClick={toggleQueue} style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', border: 'none',
            background: isOpen ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#22c55e,#16a34a)',
            color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '14px',
            boxShadow: isOpen ? '0 4px 12px rgba(239,68,68,.3)' : '0 4px 12px rgba(34,197,94,.3)', transition: 'all .2s'
          }}>
            {isOpen ? <><Pause size={18} /> Fechar Fila</> : <><Play size={18} /> Abrir Fila</>}
          </button>
        </div>
      </div>

      {/* NOTIFICAÇÃO */}
      {notifyMsg && (
        <div style={{ animation: 'slideIn .3s ease', background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', padding: '12px 20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 16px rgba(249,115,22,.3)' }}>
          <Bell size={18} /> {notifyMsg}
        </div>
      )}

      {/* STATUS BANNER */}
      <div style={{ padding: '16px 20px', borderRadius: '14px', marginBottom: '24px',
        background: isOpen ? 'linear-gradient(135deg,rgba(34,197,94,.1),rgba(16,163,74,.05))' : 'linear-gradient(135deg,rgba(239,68,68,.1),rgba(220,38,38,.05))',
        border: `1.5px solid ${isOpen ? '#86efac' : '#fca5a5'}`,
        display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap'
      }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: isOpen ? '#22c55e' : '#ef4444', flexShrink: 0, animation: isOpen ? 'pulse 1.5s infinite' : 'none' }} />
        <span style={{ fontWeight: 700, fontSize: '15px', color: isOpen ? '#16a34a' : '#dc2626' }}>Fila {isOpen ? 'ABERTA' : 'FECHADA'}</span>
        {autoCloseTime && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-muted)', marginLeft: 'auto' }}><Timer size={14} /> Fecha às {autoCloseTime}</span>}
        {maxSize > 0 && fillPercent !== null && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: fillPercent >= 80 ? '#dc2626' : 'var(--text-muted)' }}>
            <AlertTriangle size={14} /> {entries.length}/{maxSize} ({fillPercent.toFixed(0)}%)
          </span>
        )}
      </div>

      {/* PAINEL CONFIGURAÇÕES */}
      {settingsOpen && (
        <div style={{ animation: 'slideIn .25s ease', background: '#f9fafb', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={18} color="var(--primary-orange)" /> Configurações da Fila
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
            <div>
              <label style={labelStyle}><Users size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Teto da Fila (0 = ilimitado)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setNewMaxSize(v => Math.max(0, v - 5))} style={btnSmall}><ChevronDown size={14} /></button>
                <input type="number" value={newMaxSize} min={0} onChange={e => setNewMaxSize(Number(e.target.value))} style={inputStyle} />
                <button onClick={() => setNewMaxSize(v => v + 5)} style={btnSmall}><ChevronUp size={14} /></button>
              </div>
            </div>
            <div>
              <label style={labelStyle}><Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Fechar automaticamente às</label>
              <input type="time" value={newAutoTime} onChange={e => setNewAutoTime(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <button onClick={() => setSettingsOpen(false)} style={btnOutline}>Cancelar</button>
            <button onClick={saveSettings} style={btnPrimary}>Salvar</button>
          </div>
        </div>
      )}

      {/* ═══ PAINEL: LIBERAR MESA ═══════════════════════════════════════════ */}
      {tablePanelOpen && (
        <div style={{ animation: 'slideIn .3s ease', background: '#fff', borderRadius: '20px', padding: '24px', marginBottom: '24px', border: '2px solid #e0e7ff', boxShadow: '0 8px 32px rgba(99,102,241,.12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 38, height: 38, borderRadius: '10px', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TableProperties size={18} color="#fff" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontWeight: 800, fontSize: '16px' }}>Liberar Mesa</h3>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Quantos lugares tem a mesa disponível?</p>
              </div>
            </div>
            <button onClick={() => setTablePanelOpen(false)} style={{ width: 32, height: 32, borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f9fafb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XCircle size={16} color="#6b7280" />
            </button>
          </div>

          {/* Seletor de capacidade */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>CAPACIDADE DA MESA</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <button key={n} onClick={() => { setTableSize(n); setShowCustom(false); setCustomSize(''); }} style={{
                  width: 48, height: 48, borderRadius: '12px',
                  border: tableSize === n && !showCustom ? '2px solid #6366f1' : '1.5px solid #e5e7eb',
                  background: tableSize === n && !showCustom ? '#eef2ff' : '#fff',
                  color: tableSize === n && !showCustom ? '#4f46e5' : 'var(--text-primary)',
                  fontWeight: tableSize === n && !showCustom ? 800 : 600, cursor: 'pointer', fontSize: '16px',
                  transition: 'all .15s',
                  boxShadow: tableSize === n && !showCustom ? '0 4px 12px rgba(99,102,241,.2)' : 'none',
                  transform: tableSize === n && !showCustom ? 'scale(1.08)' : 'scale(1)'
                }}>
                  {n}
                </button>
              ))}
              {/* Botão customizado > 10 */}
              <button
                onClick={() => setShowCustom(s => !s)}
                style={{
                  height: 48, padding: '0 14px', borderRadius: '12px',
                  border: showCustom ? '2px solid #6366f1' : '1.5px solid #e5e7eb',
                  background: showCustom ? '#eef2ff' : '#fff',
                  color: showCustom ? '#4f46e5' : 'var(--text-muted)',
                  fontWeight: 700, cursor: 'pointer', fontSize: '13px', transition: 'all .15s'
                }}
              >
                +10
              </button>
              {showCustom && (
                <input
                  type="number"
                  min={11}
                  max={100}
                  placeholder="Ex: 12"
                  value={customSize}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setCustomSize(e.target.value);
                    if (v >= 11) setTableSize(v);
                  }}
                  style={{
                    width: 80, height: 48, borderRadius: '12px', border: '2px solid #6366f1',
                    padding: '0 12px', fontSize: '16px', fontWeight: 700, outline: 'none',
                    color: '#4f46e5', textAlign: 'center'
                  }}
                  autoFocus
                />
              )}
            </div>
          </div>

          {/* Sugestões da IA */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles size={15} color="#6366f1" />
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#6366f1', margin: 0 }}>SUGESTÕES DA IA</p>
            </div>

            {suggestions.length === 0 ? (
              <div style={{ padding: '20px', borderRadius: '14px', background: '#f9fafb', border: '1.5px dashed #e5e7eb', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Users size={32} strokeWidth={1.5} style={{ margin: '0 auto 8px', opacity: .4 }} />
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Nenhum grupo cabe nesta mesa.</p>
                <p style={{ margin: '4px 0 0', fontSize: '12px' }}>Todos os grupos na fila têm mais de {tableSize} pessoas.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {suggestions.map((s, idx) => {
                  const isSelected = selectedSuggestion === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSuggestion(s.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                        borderRadius: '14px',
                        border: isSelected ? `2px solid ${s.labelColor}` : '1.5px solid #e5e7eb',
                        background: isSelected
                          ? s.type === 'exact' ? '#f0fdf4'
                          : s.type === 'all'   ? '#f5f3ff'
                          : s.type === 'combo' ? '#fffbeb'
                          : '#eef2ff'
                          : '#f9fafb',
                        cursor: 'pointer', textAlign: 'left', transition: 'all .2s',
                        boxShadow: isSelected ? `0 4px 16px ${s.labelColor}22` : 'none',
                      }}
                    >
                      {/* Selecionar */}
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${isSelected ? s.labelColor : '#d1d5db'}`, background: isSelected ? s.labelColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
                        {isSelected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Badge tipo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: s.labelColor, background: `${s.labelColor}18`, padding: '2px 8px', borderRadius: '999px' }}>{s.label}</span>
                          {idx === 0 && <span style={{ fontSize: '10px', fontWeight: 800, color: '#f97316', background: '#fff7ed', padding: '2px 8px', borderRadius: '999px' }}>IA recomenda</span>}
                        </div>

                        {/* Grupos */}
                        {s.groups.map((g, gi) => (
                          <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: gi > 0 ? '4px' : 0 }}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: `hsl(${(g.id * 47) % 360},60%,75%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                              {g.name?.charAt(0)}
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 700 }}>{g.name}</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>· {g.partySize} pessoa{g.partySize > 1 ? 's' : ''} · entrou às {g.joinedAt}</span>
                          </div>
                        ))}

                        {/* Barra de utilização */}
                        <div style={{ marginTop: '8px' }}>
                          <UtilBar value={s.utilization} />
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: s.labelColor }}>{s.totalPeople}/{tableSize}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>lugares</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Botão confirmar chamada */}
          {selectedSuggestion && suggestions.length > 0 && (
            <button
              onClick={callSelected}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '15px', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff', fontWeight: 800, fontSize: '15px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(99,102,241,.35)', transition: 'all .2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <Zap size={20} />
              {(() => {
                const s = suggestions.find(sg => sg.id === selectedSuggestion);
                return `Chamar ${s?.groups.map(g => g.name).join(' + ')}`;
              })()}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      )}

      {/* ═══ AGUARDANDO CONFIRMAÇÃO ══════════════════════════════════════════ */}
      {calledEntries.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', animation: 'pulse 1s infinite' }} />
            <span style={{ fontWeight: 700, fontSize: '15px' }}>Aguardando Confirmação</span>
            <span style={{ background: '#fef3c7', color: '#d97706', borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: 700 }}>{calledEntries.length}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {calledEntries.map(called => (
              <div key={called.callId} style={{
                background: '#fffbeb', borderRadius: '16px', padding: '16px 20px',
                border: '1.5px solid #fde68a', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
                animation: 'fadeIn .3s ease'
              }}>
                {/* Countdown */}
                <ConfirmationCountdown calledAt={called.calledAt} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '15px', color: '#92400e', marginBottom: '4px' }}>
                    {called.groups.map(g => g.name).join(' + ')}
                  </div>
                  <div style={{ fontSize: '12px', color: '#b45309', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> {called.totalPeople} pessoa{called.totalPeople > 1 ? 's' : ''}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TableProperties size={12} /> Mesa para {called.tableSize}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Chamados às {called.calledAtStr}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => confirmArrival(called.callId)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '10px', border: 'none', background: '#22c55e', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
                    onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}
                  >
                    <CheckCircle2 size={16} /> Chegou
                  </button>
                  <button
                    onClick={() => markNoShow(called.callId)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', borderRadius: '10px', border: '1.5px solid #fca5a5', background: '#fef2f2', color: '#dc2626', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                  >
                    <UserX size={16} /> Não Apareceu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '16px', marginBottom: '24px' }}>
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} style={{ background: '#fff', borderRadius: '16px', padding: '20px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '10px', background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={card.color} />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{card.label}</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)' }}>{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* IA BANNER */}
      <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Brain size={22} color="#a5b4fc" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#a5b4fc', fontWeight: 600 }}>
            Previsão de IA · {avgServiceMinutes}min/atendimento (média do histórico)
          </p>
          <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '15px' }}>
            {entries.length === 0 ? 'Fila vazia — atendimento imediato!' : `${entries.length} grupo${entries.length > 1 ? 's' : ''} na fila`}
          </p>
        </div>
        {entries.length > 0 && <WaitTimeBadge minutes={predictedWait} />}
      </div>

      {/* HISTÓRICO */}
      {queueHistory.length > 0 && (
        <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <History size={16} color="var(--text-muted)" />
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Últimos atendimentos:</span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {queueHistory.slice(-8).map((d, i) => (
              <span key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>{d}min</span>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: 700, color: 'var(--primary-orange)' }}>Média: {avgServiceMinutes}min</span>
        </div>
      )}

      {/* BARRA DE PROGRESSO */}
      {maxSize > 0 && fillPercent !== null && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Ocupação da Fila</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: fillPercent >= 80 ? '#dc2626' : 'var(--text-primary)' }}>{entries.length}/{maxSize}</span>
          </div>
          <div style={{ height: 8, borderRadius: '99px', background: '#e5e7eb', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '99px', width: `${fillPercent}%`, background: fillPercent >= 80 ? 'linear-gradient(90deg,#ef4444,#dc2626)' : 'linear-gradient(90deg,#22c55e,#16a34a)', transition: 'width .4s ease' }} />
          </div>
        </div>
      )}

      {/* LISTA DA FILA */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart2 size={18} color="var(--primary-orange)" />
          <span style={{ fontWeight: 700, fontSize: '15px' }}>Fila Atual</span>
          {entries.length > 0 && (
            <span style={{ marginLeft: 'auto', background: '#f97316', color: '#fff', borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: 700 }}>
              {entries.length} na fila
            </span>
          )}
        </div>

        {entries.length === 0 ? (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Users size={48} strokeWidth={1.5} style={{ margin: '0 auto 16px', opacity: .4 }} />
            <p style={{ margin: 0, fontWeight: 600 }}>Nenhuma pessoa na fila agora.</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px' }}>{isOpen ? 'Aguarde clientes entrarem na fila.' : 'A fila está fechada.'}</p>
          </div>
        ) : (
          <div>
            {entries.map((entry, idx) => {
              const waitMin = predictWaitTime(idx, avgServiceMinutes);
              return (
                <div key={entry.id} style={{
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px',
                  borderBottom: idx < entries.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: idx === 0 ? 'linear-gradient(90deg,rgba(249,115,22,.06),transparent)' : 'transparent'
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '13px', background: idx === 0 ? 'linear-gradient(135deg,#f97316,#ea580c)' : '#f3f4f6', color: idx === 0 ? '#fff' : 'var(--text-muted)' }}>
                    {idx + 1}
                  </div>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: `hsl(${(entry.id * 47) % 360},60%,75%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '15px', color: '#fff', flexShrink: 0 }}>
                    {entry.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      {entry.name}
                      {idx === 0 && <span style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>PRÓXIMO</span>}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '10px', marginTop: '2px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Users size={11} /> {entry.partySize} pessoa{entry.partySize > 1 ? 's' : ''}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={11} /> Entrou às {entry.joinedAt}</span>
                    </div>
                  </div>
                  <WaitTimeBadge minutes={waitMin} />
                  <button onClick={() => removeEntry(entry.id)} title="Remover" style={{ width: 30, height: 30, borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fecaca'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fee2e2'}>
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Estilos reutilizáveis ────────────────────────────────────────────────────
const btnSmall = { width: 32, height: 36, border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--text-primary)' };
const inputStyle = { flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '15px', fontWeight: 600, textAlign: 'center', outline: 'none', color: 'var(--text-primary)', background: '#fff', width: '100%' };
const labelStyle = { fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' };
const btnOutline = { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)', transition: 'all .2s' };
const btnPrimary = { padding: '10px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,var(--primary-orange),#ea580c)', color: '#fff', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 12px rgba(249,115,22,.3)' };
