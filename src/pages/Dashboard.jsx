import { useState } from 'react';
import { TrendingUp, TrendingDown, Eye, Star, Heart, MessageCircle, Calendar, Clock, Users, Sparkles, ChevronDown, BookOpen, Utensils } from 'lucide-react';

// ─── dados mockados ────────────────────────────────────────────────
const reservasPorDiaSemana = [
  { label: 'Seg', value: 18 },
  { label: 'Ter', value: 22 },
  { label: 'Qua', value: 27 },
  { label: 'Qui', value: 35 },
  { label: 'Sex', value: 62 },
  { label: 'Sáb', value: 78 },
  { label: 'Dom', value: 44 },
];

const reservasPorMes = [
  { label: 'Jan', value: 120 }, { label: 'Fev', value: 98 },
  { label: 'Mar', value: 145 }, { label: 'Abr', value: 132 },
  { label: 'Mai', value: 160 }, { label: 'Jun', value: 178 },
  { label: 'Jul', value: 200 }, { label: 'Ago', value: 190 },
  { label: 'Set', value: 170 }, { label: 'Out', value: 155 },
  { label: 'Nov', value: 180 }, { label: 'Dez', value: 220 },
];

const reservasPorEstacao = [
  { label: 'Verão', value: 610, color: '#f59e0b' },
  { label: 'Outono', value: 455, color: '#ef4444' },
  { label: 'Inverno', value: 368, color: '#3b82f6' },
  { label: 'Primavera', value: 515, color: '#10b981' },
];

const reservasPorHorario = [
  { label: '17h', value: 5 }, { label: '18h', value: 20 },
  { label: '19h', value: 55 }, { label: '20h', value: 78 },
  { label: '21h', value: 65 }, { label: '22h', value: 30 },
  { label: '23h', value: 10 },
];

const progressaoAnual = [
  { label: '2022', value: 890 },
  { label: '2023', value: 1240 },
  { label: '2024', value: 1748 },
  { label: '2025 (proj.)', value: 2100, actualValue: 412, actualLabel: '2025 (atual)' },
];

const interacoesPosts = [
  { mes: 'Jan', curtidas: 340, comentarios: 89 },
  { mes: 'Fev', curtidas: 290, comentarios: 72 },
  { mes: 'Mar', curtidas: 420, comentarios: 115 },
  { mes: 'Abr', curtidas: 380, comentarios: 98 },
  { mes: 'Mai', curtidas: 510, comentarios: 140 },
  { mes: 'Jun', curtidas: 470, comentarios: 130 },
  { mes: 'Jul', curtidas: 530, comentarios: 155 },
  { mes: 'Ago', curtidas: 490, comentarios: 138 },
  { mes: 'Set', curtidas: 440, comentarios: 120 },
  { mes: 'Out', curtidas: 505, comentarios: 145 },
  { mes: 'Nov', curtidas: 560, comentarios: 162 },
  { mes: 'Dez', curtidas: 620, comentarios: 185 },
];

const aiInsights = [
  {
    icon: '🍹',
    title: 'Happy Hour Lucrativo',
    desc: 'Suas reservas caem 64% entre 17h–19h. Criar um Happy Hour com desconto de 20% nesses horários pode aumentar o faturamento em até R$ 3.200/mês.',
    type: 'oportunidade',
  },
  {
    icon: '📅',
    title: 'Promoção de Segunda e Terça',
    desc: 'Seg e Ter têm 3,5x menos reservas que Sex/Sáb. Um "menu executivo" com preço especial nesses dias pode aumentar a ocupação geral em ~22%.',
    type: 'oportunidade',
  },
  {
    icon: '❄️',
    title: 'Estratégia para o Inverno',
    desc: 'O inverno representa sua menor demanda anual (-40% vs. verão). Considere parceria com delivery e eventos temáticos para sustentar o faturamento.',
    type: 'alerta',
  },
  {
    icon: '🌟',
    title: 'Pico de Sábado: Gestão de Fila',
    desc: 'Sábados representam 27% das suas reservas semanais. Garanta escala extra de pessoal e considere sistema de lista de espera digital.',
    type: 'atencao',
  },
  {
    icon: '📸',
    title: 'Posts geram reservas',
    desc: 'Meses com mais posts no Instagram têm em média 18% mais reservas na semana seguinte. Manter pelo menos 3 posts/semana é recomendado.',
    type: 'oportunidade',
  },
  {
    icon: '👥',
    title: 'Crescimento de Favoritos',
    desc: 'Seus favoritos cresceram 34% nos últimos 6 meses. Usuários que favoritam têm 2,8x mais chance de fazer uma reserva — invista em notificações.',
    type: 'oportunidade',
  },
  {
    icon: '🚀',
    title: 'Turbinar posts aumenta alcance em ~4x',
    desc: 'Posts turbinados geram em média 3,9x mais visualizações do que posts normais. Priorize turbinar fotos de promoções e novidades, que apresentam o maior retorno.',
    type: 'oportunidade',
  },
];

// ─── componentes de gráfico ────────────────────────────────────────

// Tooltip flutuante reutilizável
function Tooltip({ tip }) {
  if (!tip) return null;
  return (
    <div style={{
      position: 'fixed',
      left: tip.x + 12,
      top: tip.y - 36,
      background: 'rgba(17,24,39,0.92)',
      color: '#fff',
      padding: '6px 10px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: 600,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    }}>
      {tip.text}
    </div>
  );
}

function BarChart({ data, color = 'var(--primary-orange)', height = 120, showValues = true }) {
  const [tip, setTip] = useState(null);
  const max = Math.max(...data.map(d => d.value));
  return (
    <>
      <Tooltip tip={tip} />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: height + 32 + 'px', paddingTop: '8px' }}>
        {data.map((d, i) => {
          const pct = (d.value / max) * height;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', position: 'relative' }}>
              {showValues && (
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '2px' }}>{d.value}</span>
              )}
              <div
                style={{
                  width: '100%',
                  height: pct + 'px',
                  background: color,
                  borderRadius: '5px 5px 0 0',
                  opacity: 0.85,
                  transition: 'opacity 0.15s, transform 0.15s',
                  cursor: 'crosshair',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scaleY(1.03)'; e.currentTarget.style.transformOrigin = 'bottom'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'none'; setTip(null); }}
                onMouseMove={e => setTip({ x: e.clientX, y: e.clientY, text: `${d.label}: ${d.value}` })}
              />
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>{d.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function LineChart({ data, color = 'var(--primary-orange)', height = 100 }) {
  const [tip, setTip] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const w = 420;
  const pad = 20;
  const pts = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (d.value - min) / (max - min || 1)) * (height - pad * 2);
    return { x, y, ...d };
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${path} L${pts[pts.length-1].x},${height} L${pts[0].x},${height} Z`;

  const gradId = `lineGrad-${color.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <>
      <Tooltip tip={tip} />
      <div style={{ width: '100%' }}>
        <svg viewBox={`0 0 ${w} ${height}`} style={{ width: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#${gradId})`} />
          <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x} cy={p.y}
                r={hoveredIdx === i ? 7 : 4}
                fill={color}
                style={{ transition: 'r 0.15s', cursor: 'crosshair' }}
                onMouseEnter={e => { setHoveredIdx(i); setTip({ x: e.clientX, y: e.clientY, text: `${p.label}: ${p.value}` }); }}
                onMouseLeave={() => { setHoveredIdx(null); setTip(null); }}
                onMouseMove={e => setTip({ x: e.clientX, y: e.clientY, text: `${p.label}: ${p.value}` })}
              />
              <text
                x={p.x} y={p.y - 10}
                textAnchor="middle"
                fontSize={hoveredIdx === i ? '12' : '10'}
                fontWeight="700"
                fill={color}
                style={{ transition: 'font-size 0.15s', pointerEvents: 'none' }}
              >{p.value}</text>
              <text x={p.x} y={height - 2} textAnchor="middle" fontSize="10" fill="#9ca3af">{p.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </>
  );
}

function DonutChart({ data }) {
  const [tip, setTip] = useState(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulAngle = 0;
  const r = 60, cx = 80, cy = 70;

  const slices = data.map(d => {
    const angle = (d.value / total) * 360;
    const startAngle = cumulAngle;
    cumulAngle += angle;
    const toRad = deg => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.sin(toRad(startAngle));
    const y1 = cy - r * Math.cos(toRad(startAngle));
    const x2 = cx + r * Math.sin(toRad(cumulAngle));
    const y2 = cy - r * Math.cos(toRad(cumulAngle));
    const large = angle > 180 ? 1 : 0;
    return { ...d, path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z` };
  });

  return (
    <>
      <Tooltip tip={tip} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <svg viewBox="0 0 160 140" style={{ width: '140px', flexShrink: 0 }}>
          {slices.map((s, i) => {
            // Calcular posição do centroide da fatia para o label
            let cumStart = 0;
            for (let j = 0; j < i; j++) cumStart += (data[j].value / total) * 360;
            const midAngle = cumStart + (s.value / total) * 180;
            const toRad = deg => (deg * Math.PI) / 180;
            const labelR = r * 0.65;
            const lx = cx + labelR * Math.sin(toRad(midAngle));
            const ly = cy - labelR * Math.cos(toRad(midAngle));
            return (
              <g key={i}>
                <path
                  d={s.path} fill={s.color} opacity="0.9"
                  style={{ cursor: 'crosshair', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0.9'; setTip(null); }}
                  onMouseMove={e => setTip({ x: e.clientX, y: e.clientY, text: `${s.label}: ${s.value} (${Math.round(s.value / total * 100)}%)` })}
                />
                {(s.value / total) > 0.08 && (
                  <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="700" fill="white" style={{ pointerEvents: 'none' }}>
                    {Math.round(s.value / total * 100)}%
                  </text>
                )}
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="32" fill="#fff" />
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">{total}</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#9ca3af">total</text>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: d.color, flexShrink: 0 }} />
              <span style={{ color: 'var(--text-secondary)' }}>{d.label}</span>
              <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--text-primary)' }}>{d.value}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>({Math.round(d.value / total * 100)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function GroupedBar({ data, height = 100 }) {
  const [tip, setTip] = useState(null);
  const max = Math.max(...data.flatMap(d => [d.curtidas, d.comentarios]));
  return (
    <>
      <Tooltip tip={tip} />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: height + 36 + 'px', paddingTop: '8px' }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <div style={{ display: 'flex', gap: '3px', fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '2px' }}>
              <span style={{ color: 'var(--primary-orange)' }}>{d.curtidas}</span>
              <span>/</span>
              <span style={{ color: '#3b82f6' }}>{d.comentarios}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', width: '100%' }}>
              <div
                style={{ flex: 1, height: (d.curtidas / max) * height + 'px', background: 'var(--primary-orange)', borderRadius: '4px 4px 0 0', opacity: 0.85, cursor: 'crosshair', transition: 'opacity 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; setTip(null); }}
                onMouseMove={e => setTip({ x: e.clientX, y: e.clientY, text: `Curtidas — ${d.mes}: ${d.curtidas}` })}
              />
              <div
                style={{ flex: 1, height: (d.comentarios / max) * height + 'px', background: '#3b82f6', borderRadius: '4px 4px 0 0', opacity: 0.85, cursor: 'crosshair', transition: 'opacity 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.85'; setTip(null); }}
                onMouseMove={e => setTip({ x: e.clientX, y: e.clientY, text: `Comentários — ${d.mes}: ${d.comentarios}` })}
              />
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>{d.mes}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── card de métrica ───────────────────────────────────────────────
function MetricCard({ icon, label, value, sublabel, trend, color = '#f97316' }) {
  const isUp = trend > 0;
  return (
    <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ background: color + '18', padding: '10px', borderRadius: '12px', color: color }}>
          {icon}
        </div>
        {trend !== undefined && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 700, color: isUp ? '#16a34a' : '#dc2626', background: isUp ? '#f0fdf4' : '#fef2f2', padding: '4px 8px', borderRadius: '6px' }}>
            {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '4px' }}>{label}</div>
        {sublabel && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{sublabel}</div>}
      </div>
    </div>
  );
}

// ─── card de gráfico ────────────────────────────────────────────────
function ChartCard({ title, subtitle, extraHeader, children }) {
  return (
    <div className="card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
          {subtitle && <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>{subtitle}</p>}
        </div>
        {extraHeader}
      </div>
      {children}
    </div>
  );
}

// ─── card de insight ────────────────────────────────────────────────
function InsightCard({ insight }) {
  const typeConfig = {
    oportunidade: { bg: '#f0fdf4', border: '#86efac', label: 'Oportunidade', labelColor: '#16a34a' },
    alerta: { bg: '#fef2f2', border: '#fca5a5', label: 'Atenção', labelColor: '#dc2626' },
    atencao: { bg: '#fefce8', border: '#fde68a', label: 'Observação', labelColor: '#d97706' },
  };
  const cfg = typeConfig[insight.type];
  return (
    <div style={{ padding: '16px', background: cfg.bg, borderRadius: '12px', border: `1px solid ${cfg.border}`, display: 'flex', gap: '14px' }}>
      <span style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }}>{insight.icon}</span>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{insight.title}</h4>
          <span style={{ fontSize: '11px', fontWeight: 700, color: cfg.labelColor, background: 'white', padding: '2px 8px', borderRadius: '20px', border: `1px solid ${cfg.border}` }}>{cfg.label}</span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{insight.desc}</p>
      </div>
    </div>
  );
}

// ─── componente principal ──────────────────────────────────────────
export default function Dashboard() {
  const [anoSelecionado, setAnoSelecionado] = useState('2024');
  const [showProjection, setShowProjection] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>Dashboard Analítico</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Visão completa do desempenho do seu restaurante</p>
        </div>
        <select
          value={anoSelecionado}
          onChange={e => setAnoSelecionado(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', fontWeight: 600, cursor: 'pointer', background: '#fff', color: 'var(--text-primary)' }}
        >
          {['2022', '2023', '2024', '2025'].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
        <MetricCard icon={<Calendar size={20} />} label="Reservas este mês" value="178" sublabel="+12% vs mês anterior" trend={12} color="#f97316" />
        <MetricCard icon={<Eye size={20} />} label="Visualizações no perfil" value="4.820" sublabel="últimos 30 dias" trend={8} color="#3b82f6" />
        <MetricCard icon={<BookOpen size={20} />} label="Vis. no cardápio" value="2.140" sublabel="últimos 30 dias" trend={5} color="#8b5cf6" />
        <MetricCard icon={<Heart size={20} />} label="Favoritos" value="312" sublabel="total acumulado" trend={34} color="#ec4899" />
        <MetricCard icon={<MessageCircle size={20} />} label="Interações em posts" value="1.870" sublabel="curtidas + comentários" trend={22} color="#10b981" />
        <MetricCard icon={<Star size={20} />} label="Avaliação média" value="4,7" sublabel="com base em 218 avaliações" trend={3} color="#f59e0b" />
        <MetricCard icon={<Utensils size={20} />} label="Boost médio com Turbo" value="+291%" sublabel="visualizações extras por post" trend={18} color="#f97316" />
      </div>

      {/* Linha 1 de gráficos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <ChartCard title="Reservas por Dia da Semana" subtitle="Frequência média semanal">
          <BarChart data={reservasPorDiaSemana} color="var(--primary-orange)" height={160} />
        </ChartCard>
        <ChartCard title="Reservas por Horário" subtitle="Distribuição do movimento diário">
          <BarChart data={reservasPorHorario} color="#8b5cf6" height={160} />
        </ChartCard>
        <ChartCard title="Reservas por Estação" subtitle="Comparativo anual">
          <DonutChart data={reservasPorEstacao} />
        </ChartCard>
      </div>

      {/* Linha 2 de gráficos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <ChartCard title="Reservas por Mês" subtitle={`Evolução mensal — ${anoSelecionado}`} >
          <LineChart data={reservasPorMes} color="var(--primary-orange)" height={140} />
        </ChartCard>
        <div className="card" style={{ padding: '20px' }}>
          {/* Header do card com checkbox embutido */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Progressão Anual de Reservas</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                {showProjection ? 'Crescimento histórico + projeção' : 'Crescimento histórico (sem projeção)'}
              </p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none', fontSize: '12px', fontWeight: 600, color: showProjection ? '#3b82f6' : 'var(--text-muted)', background: showProjection ? '#eff6ff' : '#f3f4f6', border: `1px solid ${showProjection ? '#bfdbfe' : 'var(--border-color)'}`, padding: '5px 10px', borderRadius: '8px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              <input
                type="checkbox"
                checked={showProjection}
                onChange={e => setShowProjection(e.target.checked)}
                style={{ accentColor: '#3b82f6', width: '14px', height: '14px', cursor: 'pointer' }}
              />
              Mostrar projeção
            </label>
          </div>
          <BarChart
            data={
              showProjection
                ? progressaoAnual
                : progressaoAnual.map(d =>
                    d.actualValue !== undefined
                      ? { label: d.actualLabel, value: d.actualValue }
                      : d
                  )
            }
            color="#3b82f6"
            height={160}
          />
        </div>
      </div>

      {/* Interações em Posts + Favoritos — lado a lado */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <ChartCard 
          title="Interações em Posts por Mês" 
          subtitle="Comparativo de curtidas e comentários — últimos 12 meses"
          extraHeader={
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--primary-orange)' }} /> Curtidas</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#3b82f6' }} /> Comentários</span>
            </div>
          }
        >
          <GroupedBar data={interacoesPosts} height={120} />
        </ChartCard>

        <ChartCard title="Evolução de Favoritos" subtitle="Crescimento de seguidores que marcaram como favorito — 12 meses">
          <LineChart data={[
            { label: 'Jan', value: 190 }, { label: 'Fev', value: 205 }, { label: 'Mar', value: 218 },
            { label: 'Abr', value: 240 }, { label: 'Mai', value: 275 }, { label: 'Jun', value: 312 },
            { label: 'Jul', value: 345 }, { label: 'Ago', value: 360 }, { label: 'Set', value: 375 },
            { label: 'Out', value: 392 }, { label: 'Nov', value: 410 }, { label: 'Dez', value: 438 },
          ]} color="#ec4899" height={120} />
        </ChartCard>
      </div>

      {/* Turbo: comparativo de métricas em dias com vs sem posts turbinados */}
      <ChartCard
        title="🚀 Impacto dos Posts Turbinados"
        subtitle="Comparativo de métricas diárias: dias com posts turbinados vs. dias sem"
        extraHeader={
          <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 700 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'linear-gradient(135deg,#f97316,#ea580c)' }} />
              🚀 Com Turbo
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#e5e7eb', border: '1px solid #d1d5db' }} />
              📝 Sem Turbo
            </span>
          </div>
        }
      >
        {(() => {
          const grupos = [
            {
              titulo: 'Viz. por Post',
              icon: '👁',
              turbo: 3446,
              normal: 852,
              unit: 'views',
            },
            {
              titulo: 'Visitas ao Perfil',
              icon: '👤',
              turbo: 618,
              normal: 187,
              unit: 'visitas',
            },
            {
              titulo: 'Visitas ao Cardápio',
              icon: '📖',
              turbo: 294,
              normal: 81,
              unit: 'visitas',
            },
          ];
          const maxH = 140;
          return (
            <>
              {/* Grupos de barras */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderBottom: '2px solid var(--border-color)', paddingBottom: '16px', marginTop: '8px' }}>
                {grupos.map((g, gi) => {
                  const globalMax = Math.max(...grupos.map(x => x.turbo));
                  const hT = Math.round((g.turbo / globalMax) * maxH);
                  const hN = Math.round((g.normal / globalMax) * maxH);
                  const lift = Math.round((g.turbo / g.normal - 1) * 100);
                  return (
                    <div key={gi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', textAlign: 'center' }}>
                        {g.icon} {g.titulo}
                      </div>
                      {/* Par de barras - Adicionado paddingTop para dar espaço aos números que flutuam sobre as barras */}
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: (maxH + 30) + 'px', paddingTop: '30px' }}>
                        {/* Barra turbinado */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#f97316' }}>
                            {g.turbo.toLocaleString('pt-BR')}
                          </span>
                          <div style={{ width: '48px', height: hT + 'px', background: 'linear-gradient(180deg,#f97316,#ea580c)', borderRadius: '6px 6px 0 0' }} />
                        </div>
                        {/* Barra normal */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)' }}>
                            {g.normal.toLocaleString('pt-BR')}
                          </span>
                          <div style={{ width: '48px', height: hN + 'px', background: '#e5e7eb', border: '1px solid #d1d5db', borderRadius: '6px 6px 0 0' }} />
                        </div>
                      </div>
                      {/* Badge de lift */}
                      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '20px', padding: '3px 10px', fontSize: '12px', fontWeight: 700, color: '#c2410c', marginTop: '4px' }}>
                        +{lift}% com Turbo
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Resumo */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
                {[
                  { label: 'Mais visualizações por post', value: '4,0×', color: '#f97316' },
                  { label: 'Mais visitas ao perfil no dia', value: '3,3×', color: '#3b82f6' },
                  { label: 'Mais visitas ao cardápio', value: '3,6×', color: '#8b5cf6' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '12px', background: 'var(--feed-active-bg)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
      </ChartCard>


      {/* Insights de IA */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #f97316, #8b5cf6)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Insights da IA</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>Análise automática dos seus dados para maximizar resultados</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {aiInsights.map((insight, i) => (
            <InsightCard key={i} insight={insight} />
          ))}
        </div>
      </div>

    </div>
  );
}
