import { useState } from 'react';
import { PlayCircle, Star, Clock, Award, BookOpen, Search, Filter } from 'lucide-react';
import CursoDetail from './CursoDetail';

const CATEGORIES = ['Todos', 'Gestão & Finanças', 'Marketing & Redes Sociais', 'Culinária & Cozinha', 'Atendimento & Experiência', 'Ambiente & Design'];

const MOCK_COURSES = [
  // Gestão & Finanças
  { id: 1, title: 'Gestão Financeira para Restaurantes', category: 'Gestão & Finanças', rating: 4.8, students: 1240, duration: '4h 30m', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80', instructor: 'Carla Dias', isNew: true },
  { id: 2, title: 'Precificação de Cardápio na Prática', category: 'Gestão & Finanças', rating: 4.9, students: 3820, duration: '2h 15m', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop&q=80', instructor: 'Roberto Almeida' },
  { id: 3, title: 'Controle de Estoque Anti-Desperdício', category: 'Gestão & Finanças', rating: 4.7, students: 2150, duration: '3h 00m', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&h=400&fit=crop&q=80', instructor: 'Fábio Mendes' },
  
  // Marketing & Redes Sociais
  { id: 4, title: 'Marketing Digital para Gastronomia', category: 'Marketing & Redes Sociais', rating: 4.9, students: 5600, duration: '5h 45m', image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&h=400&fit=crop&q=80', instructor: 'Juliana Silva', isNew: true },
  { id: 5, title: 'Fotografia de Pratos com Celular', category: 'Marketing & Redes Sociais', rating: 4.8, students: 8900, duration: '1h 50m', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&q=80', instructor: 'Marcos Vasconcelos' },
  { id: 6, title: 'Captação de Clientes no Instagram', category: 'Marketing & Redes Sociais', rating: 4.6, students: 4300, duration: '2h 30m', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&h=400&fit=crop&q=80', instructor: 'Ana Paula' },

  // Culinária & Cozinha
  { id: 7, title: 'Técnicas Sous-Vide Acadêmicas', category: 'Culinária & Cozinha', rating: 4.9, students: 1800, duration: '6h 20m', image: 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=600&h=400&fit=crop&q=80', instructor: 'Chef Claude', isNew: true },
  { id: 8, title: 'Hambúrguer Artesanal Perfeito', category: 'Culinária & Cozinha', rating: 4.7, students: 10240, duration: '3h 10m', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&q=80', instructor: 'Chef Tiago' },
  { id: 9, title: 'Cozinha Vegana para Alta Gastronomia', category: 'Culinária & Cozinha', rating: 4.8, students: 3100, duration: '4h 00m', image: '/curso_vegan.png', instructor: 'Chef Bela' },

  // Atendimento & Experiência
  { id: 10, title: 'Excelência no Atendimento de Salão', category: 'Atendimento & Experiência', rating: 4.9, students: 7800, duration: '2h 45m', image: '/curso_atendimento.png', instructor: 'Lucia Barros' },
  { id: 11, title: 'Resolução de Conflitos com Clientes', category: 'Atendimento & Experiência', rating: 4.7, students: 2900, duration: '1h 30m', image: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?w=600&h=400&fit=crop&q=80', instructor: 'Ricardo Nogueira' },

  // Ambiente & Design
  { id: 12, title: 'Design de Interiores para Restaurantes', category: 'Ambiente & Design', rating: 4.8, students: 1540, duration: '3h 40m', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&q=80', instructor: 'Camila Rossi', isNew: true },
  { id: 13, title: 'Psicologia das Cores e Iluminação', category: 'Ambiente & Design', rating: 4.6, students: 980, duration: '2h 10m', image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=400&fit=crop&q=80', instructor: 'Pedro Torres' },
];

const ENRICHED_MOCK_COURSES = MOCK_COURSES.map(c => ({
  ...c,
  description: 'Este curso completo foi estruturado para resolver os problemas cruciais associados a esta competência no dia a dia do seu restaurante. Através de módulos práticos e casos reais, você e sua equipe aprenderão técnicas definitivas que geram impacto imediato no faturamento, controle e na experiência inesquecível dos seus clientes.',
  modules: [
    {
      id: 1, title: 'Sessão 1: Fundamentos e Introdução', duration: '45m', 
      videos: [
        { id: 101, title: 'Bem-vindo ao Curso (Visão Geral)', duration: '08m' },
        { id: 102, title: 'O Mindset de um Restaurante de Sucesso', duration: '12m' },
        { id: 103, title: 'Conhecendo seu Público-Alvo', duration: '15m' },
        { id: 104, title: 'Como aproveitar este material ao máximo', duration: '10m' }
      ]
    },
    {
      id: 2, title: 'Sessão 2: Planejamento Estratégico', duration: '1h 15m', 
      videos: [
        { id: 201, title: 'Análise de Concorrência Local', duration: '20m' },
        { id: 202, title: 'Mapeamento de Custos Invisíveis', duration: '25m' },
        { id: 203, title: 'Criando um Plano de Ação 30 Dias', duration: '15m' },
        { id: 204, title: 'Exercício Prático de Planejamento', duration: '15m' }
      ]
    },
    {
      id: 3, title: 'Sessão 3: Operação e Eficiência', duration: '1h 40m', 
      videos: [
        { id: 301, title: 'O layout perfeito para produtividade', duration: '25m' },
        { id: 302, title: 'Reduzindo o tempo de entrega de pratos', duration: '30m' },
        { id: 303, title: 'Gestão de Fila e Espera de Clientes', duration: '20m' },
        { id: 304, title: 'Comunicação Salão x Cozinha', duration: '25m' }
      ]
    },
    {
      id: 4, title: 'Sessão 4: Atração e Marketing', duration: '2h 10m', 
      videos: [
        { id: 401, title: 'Técnicas de Fotografia de Pratos', duration: '35m' },
        { id: 402, title: 'Como engajar no Instagram', duration: '30m' },
        { id: 403, title: 'Programas de Fidelidade Magnéticos', duration: '40m' },
        { id: 404, title: 'Parcerias Locais e Influencers', duration: '25m' }
      ]
    },
    {
      id: 5, title: 'Sessão 5: Experiência do Cliente UAU', duration: '1h 35m', 
      videos: [
        { id: 501, title: 'A Jornada do Cliente', duration: '20m' },
        { id: 502, title: 'O que fazer quando houver Reclamações', duration: '30m' },
        { id: 503, title: 'Surpresas e Mimos que convertem', duration: '25m' },
        { id: 504, title: 'Coletando Avaliações 5 Estrelas', duration: '20m' }
      ]
    },
    {
      id: 6, title: 'Sessão 6: Encerramento e Escala', duration: '1h 00m', 
      videos: [
        { id: 601, title: 'Como treinar seus próximos gerentes', duration: '25m' },
        { id: 602, title: 'Pensando em Franquias ou Filiais', duration: '15m' },
        { id: 603, title: 'Mensagem Final do Instrutor', duration: '20m' }
      ]
    }
  ]
}));

export default function Cursos() {
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = ENRICHED_MOCK_COURSES.filter(course => {
    const matchesCategory = activeCategory === 'Todos' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (activeCourse) {
    return <CursoDetail course={activeCourse} onBack={() => setActiveCourse(null)} />;
  }

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '24px 32px' }}>
      {/* Header Premium */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', borderRadius: '24px', padding: '40px', color: '#fff', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -40, opacity: 0.1 }}>
          <Award size={240} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Award color="#f59e0b" size={28} />
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#fcd34d', letterSpacing: '1px', textTransform: 'uppercase' }}>Conteúdo Premium</span>
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '16px', lineHeight: 1.2 }}>
            Universidade Gastronomy
          </h1>
          <p style={{ fontSize: '16px', color: '#c7d2fe', maxWidth: '600px', lineHeight: 1.6, marginBottom: '24px' }}>
            Eleve o nível do seu restaurante com cursos focados no mercado gastronômico. Aprenda com os maiores especialistas em gestão, marketing e culinária do Brasil.
          </p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Buscar por curso ou instrutor..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '15px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 20px', borderRadius: '99px', whiteSpace: 'nowrap', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer', transition: 'all .2s',
                background: activeCategory === cat ? 'linear-gradient(135deg, var(--primary-orange), #ea580c)' : '#f3f4f6',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(249,115,22,.25)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cursos */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '28px',
        width: '100%'
      }}>
        {filteredCourses.map(course => (
          <div key={course.id} onClick={() => setActiveCourse(course)} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', transition: 'transform .2s, box-shadow .2s', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
               onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,.08)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ position: 'relative', height: '160px' }}>
              <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity .2s' }}
                   onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                <PlayCircle size={48} color="#fff" />
              </div>
              {course.isNew && (
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#22c55e', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Novo
                </div>
              )}
            </div>
            
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-orange)', marginBottom: '8px' }}>
                {course.category}
              </div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 800, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                {course.title}
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                <BookOpen size={14} /> {course.instructor}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#f59e0b' }}>
                  <Star size={14} fill="#f59e0b" /> {course.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '12px' }}>({course.students})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  <Clock size={14} /> {course.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Filter size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
          <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Nenhum curso encontrado</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>Tente buscar com outros termos ou mude a categoria de filtro.</p>
        </div>
      )}
    </div>
  );
}
