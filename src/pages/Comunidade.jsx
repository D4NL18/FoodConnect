import { mockGroups as initialGroups, mockLists } from '../data/mockData';
import { Users, BookmarkCheck, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import CommunityListModal from '../components/CommunityListModal';
import CreateGroupModal from '../components/CreateGroupModal';

export default function Comunidade({ onRestaurantClick, onGroupClick }) {
  const [activeList, setActiveList] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groupsList, setGroupsList] = useState(initialGroups);

  return (
    <div>
      <h1 className="section-header" style={{ marginBottom: '24px', fontSize: '24px' }}>Comunidade</h1>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} className="primary-color" /> Grupos e Fóruns
          </h2>
          <button 
            style={{ color: 'var(--primary-orange)', display: 'flex', gap: '8px', alignItems: 'center', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setIsCreateModalOpen(true)}
          >
            <PlusCircle size={20} /> Criar
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {groupsList.map(group => (
            <div key={group.id} className="card" style={{ marginBottom: 0, display: 'flex', padding: '16px', gap: '16px', alignItems: 'center' }}>
              <img src={group.image} alt={group.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{group.name}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  {group.description || `${group.members} membros abordando dicas e novidades.`}
                </p>
              </div>
              <button className="btn-primary" style={{ width: 'auto', marginTop: 0, padding: '8px 24px' }} onClick={() => onGroupClick(group)}>
                Entrar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookmarkCheck size={20} className="primary-color" /> Listas da Comunidade
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {mockLists.map(list => (
            <div 
              key={list.id} 
              className="card" 
              style={{ marginBottom: 0, padding: '16px', cursor: 'pointer' }}
              onClick={() => setActiveList(list)}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>{list.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#6b7280' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={list.avatar} style={{ width: '24px', height: '24px', borderRadius: '50%' }} alt="" />
                  {list.author} {list.handle && <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>({list.handle})</span>}
                </div>
                <div>{list.count} locais</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CommunityListModal 
        isOpen={!!activeList} 
        onClose={() => setActiveList(null)} 
        list={activeList} 
        onRestaurantClick={onRestaurantClick}
      />

      <CreateGroupModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={(newGroup) => setGroupsList([newGroup, ...groupsList])} 
      />
    </div>
  );
}
