import { useState } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';

export default function FullMenu({ restaurantId, onBack }) {
  const restaurant = mockRestaurants.find(r => r.id === restaurantId) || mockRestaurants[0];
  const [activeCategory, setActiveCategory] = useState('Entradas');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['Entradas', 'Prato Principal: Massas', 'Prato Principal: Carnes', 'Sobremesas', 'Drinks', 'Vinhos'];

  const menuItems = {
    'Entradas': [
      { name: 'Bruschetta Tradicional', price: 'R$ 28,00', desc: 'Tomates frescos, manjericão generoso e azeite extravirgem no pão rústico tostado. Simples e delicioso.', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&w=600&q=80' },
      { name: 'Carpaccio de Salmão', price: 'R$ 45,00', desc: 'Finas fatias de salmão fresco com molho de mostarda e mel, alcaparras e limão siciliano.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&w=600&q=80' },
      { name: 'Tábua de Frios', price: 'R$ 89,00', desc: 'Seleção especial de queijos importados e embutidos artesanais curados, com geleias e pão de fermentação natural (para 2 pessoas).', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&w=600&q=80' },
    ],
    'Prato Principal: Massas': [
      { name: 'Spaghetti Carbonara', price: 'R$ 58,00', desc: 'Receita original romana com guanciale curado, gema de ovo caipira, pecorino romano e pimenta-do-reino moída na hora.', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&w=600&q=80' },
      { name: 'Fettuccine Alfredo com Trufas', price: 'R$ 72,00', desc: 'Massa fresca artesanal ao molho de parmesão e manteiga com raspas de trufa negra e azeite trufado premium.', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&w=600&q=80' },
    ],
    'Prato Principal: Carnes': [
      { name: 'Filet Mignon ao Poivre', price: 'R$ 85,00', desc: 'Corte nobre de 250g grelhado na ponto certo, com molho clássico de pimentas-do-reino e batata gratinada com creme de alho.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&w=600&q=80' },
      { name: 'Bife Ancho Premium', price: 'R$ 110,00', desc: '300g de corte argentino grelhado em brasa, mal-passado a ponto-bem. Acompanha arroz biro-biro e farofa de bacon.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&w=600&q=80' },
    ],
    'Sobremesas': [
      { name: 'Tiramisù Clássico', price: 'R$ 32,00', desc: 'Receita original com camadas de mascarpone, biscoito champagne embebido em café espresso e cacau em pó belga.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&w=600&q=80' },
      { name: 'Cheesecake de Frutas Vermelhas', price: 'R$ 28,00', desc: 'Base de biscoito amanteigado, recheio cremoso de cream cheese e cobertura de geleia artesanal de frutas vermelhas.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&w=600&q=80' },
    ],
    'Drinks': [
      { name: 'Moscow Mule', price: 'R$ 35,00', desc: 'Vodka premium, ginger beer artesanal, suco de limão fresco e espuma de gengibre. Servido em caneco de cobre.', image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&w=600&q=80' },
      { name: 'Negroni Clássico', price: 'R$ 38,00', desc: 'Gin London Dry, Campari e Vermute tinto na proporção 1:1:1. Servido on the rocks com laranja desidratada.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&w=600&q=80' },
    ],
    'Vinhos': [
      { name: 'Malbec Reserva - Argentino', price: 'R$ 145,00', desc: 'Vinho tinto encorpado da região de Mendoza com notas de ameixa, cereja madura e especiarias. Garrafa 750ml.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&w=600&q=80' },
      { name: 'Cabernet Sauvignon - Chileno', price: 'R$ 120,00', desc: 'Clássico chileno com aromas de cassis, tabaco e cedro. Taninos macios e longa persistência. Garrafa 750ml.', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&w=600&q=80' },
    ]
  };

  const MenuItemCard = ({ item, showCategory }) => (
    <div
      className="card"
      onClick={() => setSelectedItem(item)}
      style={{ padding: 0, marginBottom: 0, overflow: 'hidden', display: 'flex', flexDirection: 'row', height: '120px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = ''; }}
    >
      <img src={item.image} alt={item.name} style={{ width: '120px', minWidth: '120px', height: '120px', objectFit: 'cover' }} />
      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
        <div>
          {showCategory && (
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary-orange)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
              {item.category}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>{item.name}</h3>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary-orange)', whiteSpace: 'nowrap' }}>{item.price}</span>
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {item.desc}
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom: '40px', backgroundColor: 'var(--bg-color)' }}>
      {/* Modal de Detalhe do Prato */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '16px' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', width: '100%', maxWidth: '480px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}
          >
            <div style={{ position: 'relative' }}>
              <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
              <button
                onClick={() => setSelectedItem(null)}
                style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} color="white" />
              </button>
              {selectedItem.category && (
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'var(--primary-orange)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  {selectedItem.category}
                </div>
              )}
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>{selectedItem.name}</h2>
                <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary-orange)', whiteSpace: 'nowrap' }}>{selectedItem.price}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{selectedItem.desc}</p>
            </div>
          </div>
        </div>
      )}

      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-secondary)', fontWeight: 600 }}>
        <ArrowLeft size={20} /> Voltar para o Perfil
      </button>

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Cardápio Completo</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{restaurant.name}</p>
      </div>

      <div className="search-input-wrapper" style={{ marginBottom: '24px' }}>
        <Search size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar prato ou bebida..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '16px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '10px 16px',
              background: activeCategory === cat ? 'var(--primary-orange)' : '#f3f4f6',
              color: activeCategory === cat ? '#fff' : 'var(--text-primary)',
              borderRadius: '24px', fontWeight: 600, whiteSpace: 'nowrap',
              transition: 'background 0.2s', border: 'none', cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {query.trim() ? (
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Resultados para "{query}"
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(menuItems)
              .flatMap(([cat, items]) =>
                items
                  .filter(item =>
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.desc.toLowerCase().includes(query.toLowerCase())
                  )
                  .map(item => ({ ...item, category: cat }))
              )
              .map((item, idx) => <MenuItemCard key={idx} item={item} showCategory={true} />)
            }
          </div>
          {Object.values(menuItems).flat().filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase())
          ).length === 0 && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '32px 0' }}>Nenhum prato encontrado para "{query}".</p>
          )}
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary-orange)' }}>
            {activeCategory}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {menuItems[activeCategory].map((item, idx) => (
              <MenuItemCard key={idx} item={item} showCategory={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
