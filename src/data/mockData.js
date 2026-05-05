export const mockRestaurants = [
  {
    id: 1,
    name: 'Oásis Veggie Gourmet',
    handle: '@oasisveggiegourmet',
    verified: true,
    location: 'Centro • Restaurante Vegano',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    priceRange: 'R$ ~50,00',
    distance: 'A 5km',
    highlightReason: 'Porque gosta de comida vegana',
    highlightDesc: 'A IA detectou que este restaurante tem o prato "Bowl de Quinoa" mais elogiado por utilizadores com perfil semelhante ao seu.',
    features: ['Pet Friendly', 'Vegano', 'Ar Livre'],
    isSocialPartner: true,
    awards: [
      { id: 101, type: 'michelin-green', value: 1, year: '2024', name: 'Estrela Verde Michelin', organization: 'Guia Michelin', description: 'Gastronomia e Sustentabilidade.' },
      { id: 102, type: 'standard', name: 'Melhor Restaurante Vegano', year: '2023', organization: 'Veja Comer & Beber', description: 'Prêmio de melhor escolha sustentável e vegana.' }
    ]
  },
  {
    id: 2,
    name: 'Burger House - Pinheiros',
    handle: '@burgerhouse',
    verified: true,
    location: 'Pinheiros • Hamburgueria',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    priceRange: 'R$ ~65,00',
    distance: 'A 800m',
    status: 'Fila (20m)',
    highlightReason: 'Em Alta na Região',
    highlightDesc: 'A melhor hamburgueria da região segundo avaliações recentes.',
    features: ['Benefício de Aniversário', 'Estacionamento']
  },
  {
    id: 3,
    name: 'La Trattoria Bella',
    handle: '@latrattoriabella',
    verified: true,
    location: 'Jardins • Italiana',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    priceRange: 'R$ ~120,00',
    distance: 'A 2.5km',
    status: 'Reserva Necessária',
    highlightReason: 'Excelente para Casais',
    highlightDesc: 'Massa fresca artesanal e a melhor carta de vinhos tintos da zona sul.',
    features: ['Estacionamento', 'Carta de Vinhos', 'Música ao Vivo'],
    isSocialPartner: true,
    awards: [
      { id: 3, type: 'michelin-bib', value: 1, year: '2024', name: 'Bib Gourmand', organization: 'Guia Michelin', description: 'Excelente custo-benefício.' }
    ]
  },
  {
    id: 4,
    name: 'Sushi Master do Japa',
    handle: '@sushimasterdojapa',
    location: 'Liberdade • Japonês',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    priceRange: 'R$ ~90,00',
    distance: 'A 4km',
    status: 'Vazio',
    highlightReason: 'Recomendação de Amigos',
    highlightDesc: 'Seu amigo Pedro esteve aqui ontem e avaliou com 5 estrelas o rodízio premium.',
    features: ['Rodízio', 'Eventos', 'Acessibilidade']
  },
  {
    id: 5,
    name: 'El Mexicano Loco',
    handle: '@elmexicanoloco',
    location: 'Vila Madalena • Mexicana',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    priceRange: 'R$ ~60,00',
    distance: 'A 1.2km',
    status: 'Fila (10m)',
    highlightReason: 'Ideal para Happy Hour',
    highlightDesc: 'Rodada dupla de margaritas até as 20h. Perfeito para ir com a galera.',
    features: ['Espaço Kids', 'Happy Hour', 'Pet Friendly']
  },
  {
    id: 6,
    name: 'Churrascaria Gaúcha do Sul',
    handle: '@churrascariagauchadosul',
    location: 'Moema • Churrascaria',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    priceRange: 'R$ ~110,00',
    distance: 'A 3km',
    status: 'Vazio',
    highlightReason: 'Famoso na Região',
    highlightDesc: 'Rodízio completo de carnes nobres com buffet de saladas premium.',
    features: ['Estacionamento', 'Acessibilidade', 'Espaço Kids']
  },
  {
    id: 7,
    name: 'Café Poético',
    handle: '@cafepoetico',
    location: 'Vila Mariana • Cafeteria',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    priceRange: 'R$ ~35,00',
    distance: 'A 600m',
    status: 'Vazio',
    highlightReason: 'Para Trabalhar e Relaxar',
    highlightDesc: 'Wi-Fi rápido, música ao vivo nas sextas e os melhores blends de café da região.',
    features: ['Ar Livre', 'Pet Friendly', 'Música ao Vivo']
  },
  {
    id: 8,
    name: 'Frutos do Mar do Seu Zé',
    handle: '@frutosdomardoseuze',
    location: 'Santos • Frutos do Mar',
    image: 'https://images.unsplash.com/photo-1559909441-3d30fa31e275?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    priceRange: 'R$ ~140,00',
    distance: 'A 8km',
    status: 'Fila (30m)',
    highlightReason: 'Imperdível no Litoral',
    highlightDesc: 'Camarão e lagosta fresquíssimos direto do barco para o prato.',
    features: ['Ar Livre', 'Estacionamento']
  },
  {
    id: 9,
    name: 'Bistrô do Parque',
    handle: '@bistrodoparque',
    location: 'Ibirapuera • Bistrô Francês',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    priceRange: 'R$ ~130,00',
    distance: 'A 1.8km',
    status: 'Reserva Necessária',
    highlightReason: 'Indicado pelo Guia Michelin',
    highlightDesc: 'Alta gastronomia com vista para o parque. Chef premiado pela terceira vez consecutiva.',
    features: ['Carta de Vinhos', 'Estacionamento', 'Acessibilidade'],
    awards: [
      { id: 1, type: 'michelin-star', value: 2, year: '2025', name: 'Duas Estrelas Michelin', organization: 'Guia Michelin', description: 'Cozinha excelente, vale o desvio.' },
      { id: 2, type: 'michelin-green', value: 1, year: '2025', name: 'Estrela Verde Michelin', organization: 'Guia Michelin', description: 'Gastronomia e Sustentabilidade.' }
    ]
  },
  {
    id: 10,
    name: 'Padaria Imperial',
    handle: '@padariaimperial',
    location: 'Higienópolis • Padaria Artesanal',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    priceRange: 'R$ ~25,00',
    distance: 'A 400m',
    status: 'Vazio',
    highlightReason: 'Queridinha do Bairro',
    highlightDesc: 'Pães de fermentação natural assados toda manhã. Croissant melhor de SP.',
    features: ['Pet Friendly']
  },
  {
    id: 11,
    name: 'Pizzaria Napolitana Vera',
    handle: '@pizzarianapolitanavera',
    location: 'Mooca • Pizzaria Italiana',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    priceRange: 'R$ ~80,00',
    distance: 'A 3.2km',
    status: 'Fila (35m)',
    highlightReason: 'Melhor Pizza de SP',
    highlightDesc: 'Forno a lenha trazido de Nápoles, massa de fermentação 72h e burrata importada.',
    features: ['Carta de Vinhos', 'Pet Friendly']
  },
  {
    id: 12,
    name: 'Ramen do Sensei',
    handle: '@ramendosensei',
    location: 'Liberdade • Japonesa',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    priceRange: 'R$ ~55,00',
    distance: 'A 3.8km',
    status: 'Fila (50m)',
    highlightReason: 'Cult Favorite',
    highlightDesc: 'Caldo de tonkotsu cozido por 18 horas. Fila que vale cada minuto.',
    features: ['Acessibilidade']
  },
  {
    id: 13,
    name: 'Cozinha da Vó Benedita',
    handle: '@cozinhadavobenedita',
    location: 'Penha • Comida Caseira',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    priceRange: 'R$ ~35,00',
    distance: 'A 6km',
    status: 'Vazio',
    highlightReason: 'Custo-Benefício Imbatível',
    highlightDesc: 'PF do dia a R$18 com suco incluso. Feijão com goiabada pra sobremesa.',
    features: ['Espaço Kids', 'Acessibilidade']
  },
  {
    id: 14,
    name: 'Speakeasy Cocktail Bar',
    handle: '@speakeasycocktailbar',
    location: 'Bela Vista • Bar & Petiscos',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    priceRange: 'R$ ~85,00',
    distance: 'A 1.5km',
    status: 'Vazio',
    highlightReason: 'Noite Perfeita',
    highlightDesc: 'Bar secreto no subsolo com carta de drinks exclusivos e jazz ao vivo na sexta.',
    features: ['Música ao Vivo', 'Carta de Vinhos']
  },
  {
    id: 15,
    name: 'Terapia Grill & Bar',
    handle: '@terapiagrillbar',
    location: 'Itaim Bibi • Americana',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    priceRange: 'R$ ~75,00',
    distance: 'A 2km',
    status: 'Vazio',
    highlightReason: 'Happy Hour Legìdario',
    highlightDesc: 'Choperias de craft beer e petiscos gigantes. Ping-pong e sinuca pra animar.',
    features: ['Happy Hour', 'Estacionamento', 'Espaço Kids']
  },
  {
    id: 16,
    name: 'María Bonita Taquería',
    handle: '@mariabonitataqueria',
    location: 'Pinheiros • Mexicana',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    priceRange: 'R$ ~50,00',
    distance: 'A 900m',
    status: 'Fila (15m)',
    highlightReason: 'Autêntico Sabor Mexicano',
    highlightDesc: 'Tortilhas feitas na hora, guacamole na pedra e mais de 20 tipos de tequila.',
    features: ['Pet Friendly', 'Happy Hour']
  },
  {
    id: 17,
    name: 'Osteria del Borgo',
    handle: '@osteriadelborgo',
    location: 'São Caetano • Italiana',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    priceRange: 'R$ ~95,00',
    distance: 'A 5.5km',
    status: 'Reserva Necessária',
    highlightReason: 'Degustação de Vinhos',
    highlightDesc: 'Menu degustação de 7 tempos com harmonização de vinhos italianos toda quinta.',
    features: ['Carta de Vinhos', 'Estacionamento', 'Música ao Vivo']
  },
  {
    id: 18,
    name: "Thank God It's Falafel",
    handle: '@thankgoditsfalafel',
    location: 'Consolação • Árabe & Vegano',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    priceRange: 'R$ ~40,00',
    distance: 'A 1.1km',
    status: 'Vazio',
    highlightReason: 'Amado pelos Veganos',
    highlightDesc: 'O melhor falafel de SP, feito com grão-de-bico orgânico. Hummus de tirar o chapéu.',
    features: ['Vegano', 'Pet Friendly', 'Ar Livre']
  },
  {
    id: 19,
    name: 'Don Sushi & Ceviche',
    handle: '@donsushiceviche',
    location: 'Brooklin • Fusion Nikkei',
    image: 'https://images.unsplash.com/photo-1617611413010-1e3167d5e0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    priceRange: 'R$ ~100,00',
    distance: 'A 4.5km',
    status: 'Vazio',
    highlightReason: 'Fusion Sensacional',
    highlightDesc: 'Cozinha nikkei perfeita: Tiradito de atum e uramaki de camarão agridoce lado a lado.',
    features: ['Acessibilidade', 'Estacionamento']
  },
  {
    id: 20,
    name: 'Assado & Bem-Passado',
    handle: '@assadobempassado',
    location: 'Santo André • Churrasco Premium',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    priceRange: 'R$ ~130,00',
    distance: 'A 7km',
    status: 'Fila (25m)',
    highlightReason: 'Carne de Prime Quality',
    highlightDesc: 'Black angus importado, dry-aged 30 dias. Cortes raros e acomp. gourmet exclusivos.',
    features: ['Estacionamento', 'Espaço Kids', 'Acessibilidade']
  }
];

export const mockNearby = [
  { id: 101, name: 'Taco Point', details: 'A 300m • Mexicana', statusType: 'vazio', statusLabel: 'Vazio' },
  { id: 102, name: 'Café do Brejo', details: 'A 450m • Cafeteria', statusType: 'vazio', statusLabel: 'Vazio' },
  { id: 103, name: 'Burger House - Pinheiros', details: 'A 800m • Hamburgueria', statusType: 'fila', statusLabel: 'Fila (20m)' },
  { id: 104, name: 'Pizza do Baiano', details: 'A 1.1km • Pizzaria', statusType: 'fila', statusLabel: 'Fila (45m)' },
  { id: 105, name: 'Pato Loko', details: 'A 1.2km • Brasileira', statusType: 'vazio', statusLabel: 'Vazio' },
  { id: 106, name: 'La Trattoria Bella', details: 'A 2.5km • Italiana', statusType: 'reserva', statusLabel: 'Lotado' },
  { id: 107, name: 'Padaria Imperial', details: 'A 400m • Padaria', statusType: 'vazio', statusLabel: 'Vazio' },
  { id: 108, name: 'Café Poético', details: 'A 600m • Cafeteria', statusType: 'vazio', statusLabel: 'Vazio' },
  { id: 109, name: 'Sushi Master do Japa', details: 'A 4km • Japonês', statusType: 'fila', statusLabel: 'Fila (15m)' },
  { id: 110, name: 'Bistrô do Parque', details: 'A 1.8km • Bistrô', statusType: 'reserva', statusLabel: 'Reserva' },
  { id: 111, name: 'Ramen do Sensei', details: 'A 3.8km • Japonês', statusType: 'fila', statusLabel: 'Fila (50m)' },
  { id: 112, name: 'Pizzaria Napolitana Vera', details: 'A 3.2km • Pizzaria', statusType: 'fila', statusLabel: 'Fila (35m)' },
  { id: 113, name: 'Speakeasy Cocktail Bar', details: 'A 1.5km • Bar', statusType: 'vazio', statusLabel: 'Vazio' },
  { id: 114, name: "Thank God It's Falafel", details: 'A 1.1km • Vegano', statusType: 'vazio', statusLabel: 'Vazio' },
  { id: 115, name: 'María Bonita Taquería', details: 'A 900m • Mexicana', statusType: 'fila', statusLabel: 'Fila (15m)' },
  { id: 116, name: 'Cozinha da Vó Benedita', details: 'A 6km • Comida Caseira', statusType: 'vazio', statusLabel: 'Vazio' },
];

export const mockPeopleSearch = [
  {
    id: 201,
    name: 'Ana Silva',
    handle: '@anitta_s',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 12500,
    isFamous: true,
    donationsCount: 5,
    tastes: ['Vegetariano', 'Vinhos', 'Doces Artesanais'],
    followersList: [
      { id: 202, name: 'Pedro Henrique', handle: '@pedro.h', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 203, name: 'Lucas Costa', handle: '@lucasc_99', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 204, name: 'Mariana Santos', handle: '@mari_santos', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 206, name: 'Fernanda Lima', handle: '@fernan_lima', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 207, name: 'Rafael Souza', handle: '@rafasouza', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 1, name: 'Lugares para ir a Dois', restaurants: [3, 9] },
      { id: 2, name: 'O Mundo Vegan', restaurants: [1, 7] },
      { id: 6, name: 'Cafés Especiais', restaurants: [7, 10] }
    ]
  },
  {
    id: 202,
    name: 'Pedro Henrique',
    handle: '@pedro.h',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 450,
    isFamous: false,
    tastes: ['Hamburguer', 'Japonês'],
    followersList: [
      { id: 201, name: 'Ana Silva', handle: '@anitta_s', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 204, name: 'Mariana Santos', handle: '@mari_santos', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 205, name: 'João Mendes', handle: '@jmendes', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 3, name: 'Melhores Hambúrgueres', restaurants: [2] },
      { id: 7, name: 'Japonês Top SP', restaurants: [4] }
    ]
  },
  {
    id: 203,
    name: 'Lucas Costa',
    handle: '@lucasc_99',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 89000,
    isFamous: true,
    tastes: ['Churrasco', 'Cerveja Artesanal', 'Japonês'],
    followersList: [
      { id: 204, name: 'Mariana Santos', handle: '@mari_santos', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 205, name: 'João Mendes', handle: '@jmendes', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 201, name: 'Ana Silva', handle: '@anitta_s', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 208, name: 'Thiago Rocha', handle: '@thiago.r', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 4, name: 'Rolezão em SP', restaurants: [2, 5, 6] },
      { id: 8, name: 'Carnívoros Assumidos', restaurants: [6, 2] }
    ]
  },
  {
    id: 204,
    name: 'Mariana Santos',
    handle: '@mari_santos',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 10200,
    isFamous: true,
    tastes: ['Italiana', 'Vinhos', 'Doces Finos'],
    followersList: [
      { id: 201, name: 'Ana Silva', handle: '@anitta_s', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 205, name: 'João Mendes', handle: '@jmendes', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 206, name: 'Fernanda Lima', handle: '@fernan_lima', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 207, name: 'Rafael Souza', handle: '@rafasouza', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 9, name: 'Alta Gastronomia SP', restaurants: [3, 9, 8] },
      { id: 10, name: 'Vinhos e Queijos', restaurants: [3, 9] }
    ]
  },
  {
    id: 205,
    name: 'João Mendes',
    handle: '@jmendes',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 300,
    isFamous: false,
    tastes: ['Japonês', 'Frutos do Mar'],
    followersList: [
      { id: 202, name: 'Pedro Henrique', handle: '@pedro.h', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 203, name: 'Lucas Costa', handle: '@lucasc_99', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 5, name: 'Melhores Sakes', restaurants: [4] },
      { id: 11, name: 'Frutos do Mar Incríveis', restaurants: [8] }
    ]
  },
  {
    id: 206,
    name: 'Fernanda Lima',
    handle: '@fernan_lima',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 5800,
    isFamous: true,
    tastes: ['Vegetariano', 'Doces Artesanais', 'Cafés Especiais'],
    followersList: [
      { id: 201, name: 'Ana Silva', handle: '@anitta_s', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 207, name: 'Rafael Souza', handle: '@rafasouza', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 12, name: 'Cafés que Mudam Sua Vida', restaurants: [7, 10] }
    ]
  },
  {
    id: 207,
    name: 'Rafael Souza',
    handle: '@rafasouza',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 1100,
    isFamous: false,
    tastes: ['Brasileira', 'Churrasco', 'Cerveja Artesanal'],
    followersList: [
      { id: 203, name: 'Lucas Costa', handle: '@lucasc_99', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 208, name: 'Thiago Rocha', handle: '@thiago.r', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 13, name: 'Puro Brasão', restaurants: [6] }
    ]
  },
  {
    id: 208,
    name: 'Thiago Rocha',
    handle: '@thiago.r',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 670,
    isFamous: false,
    tastes: ['Mexicana', 'Hamburguer', 'Churrasco'],
    followersList: [
      { id: 203, name: 'Lucas Costa', handle: '@lucasc_99', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 207, name: 'Rafael Souza', handle: '@rafasouza', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 14, name: 'Aqui o Negócio É Comer', restaurants: [2, 5, 6] }
    ]
  },
  {
    id: 209,
    name: 'Beatriz Almeida',
    handle: '@bea.almeida',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 34200,
    isFamous: true,
    tastes: ['Italiana', 'Vinhos', 'Frutos do Mar', 'Alta Gastronomia'],
    followersList: [
      { id: 201, name: 'Ana Silva', handle: '@anitta_s', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 204, name: 'Mariana Santos', handle: '@mari_santos', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 206, name: 'Fernanda Lima', handle: '@fernan_lima', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 15, name: 'Experiências Michelin', restaurants: [9, 3, 17] },
      { id: 16, name: 'Ostras e Borbulhas', restaurants: [8, 9] }
    ]
  },
  {
    id: 210,
    name: 'Diego Martins',
    handle: '@diegomartins',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 2100,
    isFamous: false,
    tastes: ['Ramen', 'Japonês', 'Fusion'],
    followersList: [
      { id: 205, name: 'João Mendes', handle: '@jmendes', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 202, name: 'Pedro Henrique', handle: '@pedro.h', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 17, name: 'Ramen Ranking SP', restaurants: [12, 4] },
      { id: 18, name: 'Nikkei Experience', restaurants: [19, 4] }
    ]
  },
  {
    id: 211,
    name: 'Camila Freitas',
    handle: '@camilafreitas',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 18700,
    isFamous: true,
    tastes: ['Vegetariano', 'Vegano', 'Árabe', 'Cafés Especiais'],
    followersList: [
      { id: 201, name: 'Ana Silva', handle: '@anitta_s', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 206, name: 'Fernanda Lima', handle: '@fernan_lima', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 209, name: 'Beatriz Almeida', handle: '@bea.almeida', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 19, name: 'Plant-Based SP', restaurants: [1, 18, 7] },
      { id: 20, name: 'Cafés que Vão te Mudar', restaurants: [7, 10] }
    ]
  },
  {
    id: 212,
    name: 'Felipe Nobre',
    handle: '@felipecooks',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 52000,
    isFamous: true,
    tastes: ['Molecular', 'Alta Gastronomia', 'Hamburguer', 'Churrasco'],
    followersList: [
      { id: 203, name: 'Lucas Costa', handle: '@lucasc_99', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 207, name: 'Rafael Souza', handle: '@rafasouza', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 208, name: 'Thiago Rocha', handle: '@thiago.r', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 21, name: 'Top Cortes SP', restaurants: [20, 6] },
      { id: 22, name: 'Próximo Restaurante que Vou', restaurants: [9, 19, 12] }
    ]
  },
  {
    id: 213,
    name: 'Larissa Vaz',
    handle: '@larissavaz',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 890,
    isFamous: false,
    tastes: ['Italiana', 'Pizza', 'Vinhos'],
    followersList: [
      { id: 204, name: 'Mariana Santos', handle: '@mari_santos', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 209, name: 'Beatriz Almeida', handle: '@bea.almeida', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 23, name: 'Pizzas Que Mudam Sua Vida', restaurants: [11, 3] }
    ]
  },
  {
    id: 214,
    name: 'Bruno Cardoso',
    handle: '@brunocardoso',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 5400,
    isFamous: true,
    tastes: ['Cerveja Artesanal', 'Bar', 'Hamburguer', 'Mexicana'],
    followersList: [
      { id: 208, name: 'Thiago Rocha', handle: '@thiago.r', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 207, name: 'Rafael Souza', handle: '@rafasouza', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 24, name: 'Noite Épica em SP', restaurants: [14, 15, 5] },
      { id: 25, name: 'Craft Beer Tour', restaurants: [14, 15] }
    ]
  },
  {
    id: 215,
    name: 'Isabela Torres',
    handle: '@isatorres',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    followersCount: 7300,
    isFamous: true,
    tastes: ['Comida Caseira', 'Brasileira', 'Nordestina'],
    followersList: [
      { id: 201, name: 'Ana Silva', handle: '@anitta_s', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 211, name: 'Camila Freitas', handle: '@camilafreitas', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ],
    userLists: [
      { id: 26, name: 'Comida de Mãe em SP', restaurants: [13] },
      { id: 27, name: 'O Brasil que Alimenta', restaurants: [13, 6] }
    ]
  }
];

export const mockReviews = [
  {
    id: 301,
    user: {
      name: 'João Mendes',
      handle: '@jmendes',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Burger House - Pinheiros',
    restaurantId: 2,
    timeAgo: 'Há 1 hora',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    spent: 'R$ 65,00',
    text: 'O melhor hambúrguer artesanal que já comi! A maionese da casa é surreal. Recomendo pedir a batata rústica de acompanhamento. 🍔🔥',
  },
  {
    id: 302,
    user: {
      name: 'Ana Silva',
      handle: '@anitta_s',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'visitou e avaliou com',
    restaurant: 'La Trattoria Bella',
    restaurantId: 3,
    timeAgo: 'Ontem às 20h',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    spent: 'R$ 150,00',
    text: 'Ambiente super romântico e a comida estava impecável. Achei a carta de vinhos um pouco cara, mas a experiência vale muito a pena! 🍷🍝',
  },
  {
    id: 303,
    user: {
      name: 'Pedro Henrique',
      handle: '@pedro.h',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'recomendou',
    restaurant: 'Sushi Master do Japa',
    restaurantId: 4,
    timeAgo: 'Há 3 dias',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    spent: 'R$ 90,00',
    text: 'O peixe estava super fresco e o atendimento foi rápido apesar de estar lotado. Ótimo custo-benefício!',
  },
  {
    id: 304,
    user: {
      name: 'Mariana Santos',
      handle: '@mari_santos',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Bistrô do Parque',
    restaurantId: 9,
    timeAgo: 'Há 5 horas',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    spent: 'R$ 180,00',
    text: 'Uma experiência gastronômica inesquecível! O chef veio à mesa, a vista é de tirar o fôlego e cada prato é uma obra de arte. 🌟',
  },
  {
    id: 305,
    user: {
      name: 'Lucas Costa',
      handle: '@lucasc_99',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Churrascaria Gaúcha do Sul',
    restaurantId: 6,
    timeAgo: 'Há 2 dias',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    spent: 'R$ 115,00',
    text: 'Picanha na brasa impecável, corte perfeito! A vinagrete caseira e a farofa de bacon elevam o nível. Fui num sábado e mesmo lotado o serviço foi rápido.',
  },
  {
    id: 306,
    user: {
      name: 'Fernanda Lima',
      handle: '@fernan_lima',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'recomendou',
    restaurant: 'Café Poético',
    restaurantId: 7,
    timeAgo: 'Há 6 horas',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    spent: 'R$ 38,00',
    text: 'O flat white deles é o melhor que já tomei em SP. Ambiente perfeito pra trabalhar ou ler um livro. Quinta tem jazz ao vivo! ☕🎷',
  },
  {
    id: 307,
    user: {
      name: 'Rafael Souza',
      handle: '@rafasouza',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'El Mexicano Loco',
    restaurantId: 5,
    timeAgo: 'Há 1 dia',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    spent: 'R$ 72,00',
    text: 'Tacos de costela e margarita de maracujá! Combinação perfeita. Fila rápida e atendimento simpático. Ambiente super animado. 🌮🍹',
  },
  {
    id: 308,
    user: {
      name: 'Thiago Rocha',
      handle: '@thiago.r',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'visitou e avaliou com',
    restaurant: 'Oásis Veggie Gourmet',
    restaurantId: 1,
    timeAgo: 'Há 4 horas',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.2,
    spent: 'R$ 55,00',
    text: 'Fui levado pela namorada, não sou vegano mas saí impressionado! O bowl de lentilhas com tahine foi surpreendente. Voltaria sim! 🥗',
  },
  {
    id: 309,
    user: {
      name: 'Beatriz Almeida',
      handle: '@bea.almeida',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Pizzaria Napolitana Vera',
    restaurantId: 11,
    timeAgo: 'Há 2 horas',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    spent: 'R$ 85,00',
    text: 'A margherita deles é perfeita. Massa fininha e crocante por fora, fofinha por dentro. Burrata importada que derrete na boca. Valeu cada minuto de fila! 🍕🤌',
  },
  {
    id: 310,
    user: {
      name: 'Diego Martins',
      handle: '@diegomartins',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Ramen do Sensei',
    restaurantId: 12,
    timeAgo: 'Há 8 horas',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    spent: 'R$ 58,00',
    text: 'Melhor tonkotsu de São Paulo, sem discussão. Caldo untuoso com 18h de cozimento, chashu perfeito e egg marinado no ponto. A fila de 50min lá fora? Conta como cardio! 🍜💪',
  },
  {
    id: 311,
    user: {
      name: 'Camila Freitas',
      handle: '@camilafreitas',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'recomendou',
    restaurant: "Thank God It's Falafel",
    restaurantId: 18,
    timeAgo: 'Há 1 dia',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    spent: 'R$ 42,00',
    text: 'Falafel crocante, hummus cremoso e pão pita fresquinho. O ambiente ao ar livre é perfeito e eles aceitam pets! Meu almoço favorito da semana. 🧆🌿',
  },
  {
    id: 312,
    user: {
      name: 'Felipe Nobre',
      handle: '@felipecooks',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Assado & Bem-Passado',
    restaurantId: 20,
    timeAgo: 'Há 3 horas',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    spent: 'R$ 140,00',
    text: 'O dry-aged deles é sensacional. 30 dias de maturação e você percebe cada dia no sabor. Acompanhamento de trufas negras elevou o nível ainda mais. Destaque absoluto da temporada! 🥩🔥',
  },
  {
    id: 313,
    user: {
      name: 'Larissa Vaz',
      handle: '@larissavaz',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Osteria del Borgo',
    restaurantId: 17,
    timeAgo: 'Há 2 dias',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    spent: 'R$ 120,00',
    text: 'Menu degustação de 7 tempos com harmonização italiana foi uma aula de gastronomia. O Barolo que elegeram pro cordeiro... extraordinário. Já reservei para o mês que vem! 🍷🍝',
  },
  {
    id: 314,
    user: {
      name: 'Bruno Cardoso',
      handle: '@brunocardoso',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Speakeasy Cocktail Bar',
    restaurantId: 14,
    timeAgo: 'Há 10 horas',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    spent: 'R$ 95,00',
    text: 'Encontrei esse lugar por acaso e mudou minha vida! Ambiente secreto incrível, o barman é um artista — o Old Fashioned com defumação de cereja é obra de arte. Jazz ao vivo completou. 🎷🥃',
  },
  {
    id: 315,
    user: {
      name: 'Isabela Torres',
      handle: '@isatorres',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'recomendou',
    restaurant: 'Cozinha da Vó Benedita',
    restaurantId: 13,
    timeAgo: 'Há 5 horas',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    spent: 'R$ 32,00',
    text: 'Feijão tropeiro como o da minha avó, frango ao molho pardo e arroz com pequi. Tudo no capricho e por menos de R$35! Isso sim é gastronomia brasileira de verdade 🇧🇷🍲',
  },
  {
    id: 316,
    user: {
      name: 'Ana Silva',
      handle: '@anitta_s',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Café Poético',
    restaurantId: 7,
    timeAgo: 'Há 3 dias',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    spent: 'R$ 40,00',
    text: 'Passei a tarde toda aqui trabalhando no meu projeto. O flat white é um sonho e o bolo de cenoura com cobertura de chocolate é pecaminoso. Wi-fi ótimo e ambiente acolhedor. ☕💻',
  },
  {
    id: 317,
    user: {
      name: 'Lucas Costa',
      handle: '@lucasc_99',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Terapia Grill & Bar',
    restaurantId: 15,
    timeAgo: 'Há 6 horas',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    spent: 'R$ 80,00',
    text: 'Happy hour com a galera do trabalho aqui é garantia! Costela defumada de fazer choro, a IPA deles é encorpada e gelada. Até jogamos sinuca depois. Recomendo demais! 🍺🎱',
  },
  {
    id: 318,
    user: {
      name: 'Mariana Santos',
      handle: '@mari_santos',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'visitou e avaliou com',
    restaurant: 'Frutos do Mar do Seu Zé',
    restaurantId: 8,
    timeAgo: 'Ontem às 19h',
    image: 'https://images.unsplash.com/photo-1559909441-3d30fa31e275?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    spent: 'R$ 160,00',
    text: 'Lagosta thermidor com manteiga de ervas foi o ponto alto da noite. A vista para o mar ao entardecer tornou tudo ainda mais mágico. Sim, vale cada centavo! 🦞🌊',
  },
  {
    id: 319,
    user: {
      name: 'Pedro Henrique',
      handle: '@pedro.h',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Don Sushi & Ceviche',
    restaurantId: 19,
    timeAgo: 'Há 4 dias',
    image: 'https://images.unsplash.com/photo-1617611413010-1e3167d5e0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    spent: 'R$ 105,00',
    text: 'Combinação inusitada de sushi e ceviche que simplesmente funciona. O tiradito de salmão com leche de tigre e gengibre é extraordinário. Autoral e delicioso! 🐟🍋',
  },
  {
    id: 320,
    user: {
      name: 'Thiago Rocha',
      handle: '@thiago.r',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'recomendou',
    restaurant: 'María Bonita Taquería',
    restaurantId: 16,
    timeAgo: 'Há 1 dia',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    spent: 'R$ 55,00',
    text: 'Tortilha feita na hora, carne de costela desfiada marinada 12h e habanero artesanal. Pedi dois! A margarita de hibisco foi o complemento perfeito. 🌮🌺',
  },
  {
    id: 321,
    user: {
      name: 'Fernanda Lima',
      handle: '@fernan_lima',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Padaria Imperial',
    restaurantId: 10,
    timeAgo: 'Hoje às 8h',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    spent: 'R$ 28,00',
    text: 'Croissant de manteiga que saiu do forno quando eu cheguei às 7h30. Folhado na medida certa, amanteigado, crocante. O flat white combinou perfeitamente. Início de dia perfeito! 🥐☕',
  },
  {
    id: 322,
    user: {
      name: 'Rafael Souza',
      handle: '@rafasouza',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'avaliou',
    restaurant: 'Churrascaria Gaúcha do Sul',
    restaurantId: 6,
    timeAgo: 'Há 2 dias',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    spent: 'R$ 118,00',
    text: 'Fui no aniversário do meu pai e foi uma escolha certeira. A costela bovina desmanchando no garfo, o cupim na brasa e o buffet de saladas com opções que envergonham restaurante gourmet. 🥩👨‍👧',
  },
  {
    id: 323,
    user: {
      name: 'João Mendes',
      handle: '@jmendes',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    action: 'recomendou',
    restaurant: 'Don Sushi & Ceviche',
    restaurantId: 19,
    timeAgo: 'Há 1 semana',
    image: 'https://images.unsplash.com/photo-1617611413010-1e3167d5e0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    spent: 'R$ 98,00',
    text: 'O omakase nikkei deles é uma viagem gastronômica. Cada peça chegou na temperatura e corte certos. O ceviche de camarão com ponzu era acidez e umami perfeitos. Vou voltar com certeza!',
  }
];

export const mockLists = [
  { id: 1, name: 'Veganos Incríveis SP', author: 'Ana Silva', handle: '@anitta_s', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=150&q=80', count: 2, restaurants: [1, 7] },
  { id: 2, name: 'Para ir com a Galera', author: 'Lucas Costa', handle: '@lucasc_99', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80', count: 3, restaurants: [2, 4, 5] },
  { id: 3, name: 'Burgers Raiz', author: 'João Mendes', handle: '@jmendes', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=150&q=80', count: 1, restaurants: [2] },
  { id: 4, name: 'Alta Gastronomia SP', author: 'Mariana Santos', handle: '@mari_santos', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80', count: 3, restaurants: [3, 9, 8] },
  { id: 5, name: 'Frutos do Mar Imperdíveis', author: 'João Mendes', handle: '@jmendes', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=150&q=80', count: 1, restaurants: [8] },
  { id: 6, name: 'Cafés Especiais SP', author: 'Fernanda Lima', handle: '@fernan_lima', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=150&q=80', count: 2, restaurants: [7, 10] },
  { id: 7, name: 'Carnívoros Assumidos', author: 'Lucas Costa', handle: '@lucasc_99', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80', count: 2, restaurants: [6, 2] },
  { id: 8, name: 'Romantismo Puro', author: 'Mariana Santos', handle: '@mari_santos', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80', count: 2, restaurants: [3, 9] },
];

export const mockGroups = [
  { id: 1, name: 'Caçadores de Hambúrguer SP', members: '12k', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&w=200&q=80', description: 'A maior comunidade de hambúrguer artesanal do estado. Dicas, reviews e rolês toda semana.' },
  { id: 2, name: 'Vegan Life Brasil', members: '45k', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=200&q=80', description: 'Culinária plant-based, dicas de restaurantes veganos e receitas saudáveis para o dia a dia.' },
  { id: 3, name: 'Vinhos & Massas', members: '8k', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&w=200&q=80', description: 'Para os apreciadores da boa mesa italiana. Harmonizações, resenhas e visitas guiadas a restaurantes.' },
  { id: 4, name: 'Sushi Lovers São Paulo', members: '22k', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&w=200&q=80', description: 'Rodízios, temakis e omakase: tudo sobre culinária japonesa para os fãs de SP.' },
  { id: 5, name: 'Churrasqueiros de Plantão', members: '31k', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&w=200&q=80', description: 'Churrasco é religião! Técnicas, cortes nobres e os melhores restaurantes gaúchos do Brasil.' },
  { id: 6, name: 'Cafés Especiais Brasil', members: '16k', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&w=200&q=80', description: 'Do grain to cup: as melhores cafeterias, métodos de preparo e novidades do mundo do café.' },
];

export const mockReservations = [
  {
    restaurantId: 3,
    restaurantName: 'La Trattoria Bella',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2026-03-15',
    time: '20:00',
    partySize: '2 pessoas'
  },
  {
    restaurantId: 1,
    restaurantName: 'Oásis Veggie Gourmet',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2026-03-18',
    time: '19:30',
    partySize: '4 pessoas'
  },
  {
    restaurantId: 9,
    restaurantName: 'Bistrô do Parque',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2026-03-22',
    time: '21:00',
    partySize: '2 pessoas'
  },
  {
    restaurantId: 4,
    restaurantName: 'Sushi Master do Japa',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: '2026-03-25',
    time: '19:00',
    partySize: '6 pessoas'
  }
];
