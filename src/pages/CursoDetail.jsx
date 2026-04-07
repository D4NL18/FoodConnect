import { useState } from 'react';
import { ArrowLeft, PlayCircle, CheckCircle, Circle, Ribbon, Star, X, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export default function CursoDetail({ course, onBack }) {
  const [activeVideo, setActiveVideo] = useState(course.modules?.[0]?.videos?.[0]);
  const [expandedModules, setExpandedModules] = useState({ [course.modules?.[0]?.id]: true });
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  
  // Modal states
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const toggleWatched = (e, videoId) => {
    e.stopPropagation();
    const newSet = new Set(watchedVideos);
    if (newSet.has(videoId)) newSet.delete(videoId);
    else newSet.add(videoId);
    setWatchedVideos(newSet);
  };

  const handleFinishCourse = () => {
    setShowRatingModal(true);
  };

  const handleSubmitRating = () => {
    setShowRatingModal(false);
    setIsCompleted(true);
  };

  return (
    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '24px 32px' }}>
      
      {/* ─── NAVEGAÇÃO SUPERIOR ────────────────────────────────────────────── */}
      <div style={{ marginBottom: '24px' }}>
        <button 
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 600, transition: 'color .2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={20} /> Voltar para Cursos
        </button>
      </div>

      {isCompleted && (
        <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', animation: 'fadeIn .4s ease' }}>
          <Ribbon size={32} />
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 800 }}>Curso Concluído com Sucesso!</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Você avaliou este curso com {rating} estrela(s). Obrigado pelo feedback.</p>
          </div>
        </div>
      )}

      {/* ─── LAYOUT LADO A LADO ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* PARTE ESQUERDA: PLAYER E INFOS (70%) */}
        <div style={{ flex: '1 1 600px' }}>
          
          {/* Player Fake */}
          <div style={{ 
            width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden', 
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 24px rgba(0,0,0,.15)'
          }}>
            <img src={course.image} alt="Background" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'blur(4px)' }} />
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', cursor: 'pointer', transition: 'transform .2s' }}
                 onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                 onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <PlayCircle size={80} color="var(--primary-orange)" style={{ filter: 'drop-shadow(0 4px 12px rgba(249,115,22,.5))', marginBottom: '16px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,.5)' }}>
                {activeVideo?.title || 'Selecione um vídeo'}
              </h2>
            </div>
            <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,.6)', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
              {activeVideo?.duration || '0m'}
            </div>
          </div>

          {/* Dados do Curso */}
          <div style={{ padding: '32px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ background: '#ffedd5', color: 'var(--primary-orange)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 800 }}>
                {course.category}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700, fontSize: '14px' }}>
                <Star size={16} fill="#f59e0b" /> {course.rating}
              </span>
            </div>
            
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.2 }}>
              {course.title}
            </h1>
            
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              {course.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#f9fafb', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-orange), #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '18px' }}>
                 {course.instructor.charAt(0)}
               </div>
               <div>
                 <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Instrutor do Curso</div>
                 <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{course.instructor}</div>
               </div>
            </div>
          </div>
        </div>

        {/* PARTE DIREITA: MÓDULOS E SYLLABUS (30%) */}
        <div style={{ flex: '0 0 400px', background: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', position: 'sticky', top: '24px' }}>
          
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', background: '#f9fafb' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Conteúdo do Curso</h3>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '4px' }}>
              {course.modules?.reduce((acc, m) => acc + (m.videos?.length || 0), 0)} aulas formativas
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }} className="hide-scrollbar">
            {course.modules?.map((mod, idx) => (
              <div key={mod.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                {/* Cabeçalho do Módulo */}
                <button 
                  onClick={() => toggleModule(mod.id)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: expandedModules[mod.id] ? '#fff' : '#f9fafb', transition: 'background .2s' }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>{mod.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{mod.videos?.length} aulas • {mod.duration}</div>
                  </div>
                  {expandedModules[mod.id] ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </button>

                {/* Lista de Aulas */}
                {expandedModules[mod.id] && (
                  <div style={{ padding: '8px 0' }}>
                    {mod.videos?.map((vid, vIdx) => {
                      const isActive = activeVideo?.id === vid.id;
                      const isWatched = watchedVideos.has(vid.id);

                      return (
                        <div 
                          key={vid.id} 
                          onClick={() => setActiveVideo(vid)}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 20px', cursor: 'pointer', background: isActive ? '#ffedd5' : 'transparent', transition: 'background .2s', borderLeft: isActive ? '3px solid var(--primary-orange)' : '3px solid transparent' }}
                          onMouseEnter={e => { if(!isActive) e.currentTarget.style.background = '#f3f4f6'; }}
                          onMouseLeave={e => { if(!isActive) e.currentTarget.style.background = 'transparent'; }}
                        >
                          <button onClick={(e) => toggleWatched(e, vid.id)} style={{ flexShrink: 0, marginTop: '2px', color: isWatched ? '#10b981' : 'var(--text-muted)', transition: 'color .2s' }}>
                            {isWatched ? <CheckCircle size={20} /> : <Circle size={20} />}
                          </button>
                          
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--primary-orange)' : 'var(--text-primary)', lineHeight: 1.4 }}>
                              {vIdx + 1}. {vid.title}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '4px' }}>
                              <PlayCircle size={12} /> {vid.duration}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Área de Conclusão */}
          <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: '#fff' }}>
             <button
               onClick={handleFinishCourse}
               disabled={isCompleted}
               style={{
                 width: '100%', padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '15px',
                 background: isCompleted ? '#e5e7eb' : 'linear-gradient(135deg, var(--primary-orange), #ea580c)',
                 color: isCompleted ? '#9ca3af' : '#fff',
                 border: 'none', cursor: isCompleted ? 'not-allowed' : 'pointer',
                 boxShadow: isCompleted ? 'none' : '0 4px 12px rgba(249,115,22,.3)',
                 transition: 'all .2s'
               }}
             >
               {isCompleted ? 'Curso Finalizado ✔' : 'Marcar Curso como Concluído'}
             </button>
          </div>
        </div>
      </div>

      {/* ─── MODAL DE AVALIAÇÃO ────────────────────────────────────────────── */}
      {showRatingModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)', animation: 'fadeIn .2s ease' }}>
          <div style={{ background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '440px', padding: '32px', position: 'relative', animation: 'slideUp .3s ease', boxShadow: '0 24px 48px rgba(0,0,0,.2)' }}>
            <button onClick={() => setShowRatingModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', background: '#d1fae5', borderRadius: '50%', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Ribbon size={32} />
              </div>
              <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 800 }}>Parabéns!</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.5 }}>
                Você acaba de concluir <strong>{course.title}</strong>. Que tal avaliar este curso e deixar um feedback?
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ transition: 'transform .1s', transform: (hoverRating || rating) >= star ? 'scale(1.2)' : 'scale(1)' }}
                >
                  <Star 
                    size={40} 
                    fill={(hoverRating || rating) >= star ? '#f59e0b' : 'transparent'}
                    stroke={(hoverRating || rating) >= star ? '#f59e0b' : '#d1d5db'}
                    strokeWidth={2}
                  />
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                <MessageSquare size={16} /> Comentário (opcional)
              </label>
              <textarea 
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="O que você achou do curso?"
                style={{ width: '100%', height: '100px', resize: 'none', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '14px' }}
              />
            </div>

            <button 
              onClick={handleSubmitRating}
              disabled={rating === 0}
              style={{
                width: '100%', padding: '14px', borderRadius: '12px', fontWeight: 700, fontSize: '16px',
                background: rating > 0 ? 'var(--primary-orange)' : '#f3f4f6',
                color: rating > 0 ? '#fff' : 'var(--text-muted)',
                cursor: rating > 0 ? 'pointer' : 'not-allowed',
                transition: 'all .2s'
              }}
            >
              Enviar Avaliação
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}
