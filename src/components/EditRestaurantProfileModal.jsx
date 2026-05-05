import { X, Camera, MapPin, Globe, Phone, Mail, Award, Star, Trash2, Plus, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function EditRestaurantProfileModal({ isOpen, onClose, restaurantData, onSave }) {
  const [formData, setFormData] = useState({ ...restaurantData, awards: restaurantData.awards || [] });
  const [activeTab, setActiveTab] = useState('perfil');
  const [newMichelin, setNewMichelin] = useState({ type: 'michelin-star', value: 1, year: new Date().getFullYear().toString(), description: '' });
  const [newStandard, setNewStandard] = useState({ name: '', year: '', organization: '' });
  const [successMessage, setSuccessMessage] = useState(null);

  if (!isOpen) return null;

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleAddMichelin = () => {
    const id = Date.now();
    let finalName = '';
    if (newMichelin.type === 'michelin-star') finalName = `${newMichelin.value} Estrela${newMichelin.value > 1 ? 's' : ''} Michelin`;
    if (newMichelin.type === 'michelin-green') finalName = `Estrela Verde Michelin`;
    if (newMichelin.type === 'michelin-bib') finalName = `Bib Gourmand`;
    
    setFormData({
      ...formData,
      awards: [...(formData.awards || []), { ...newMichelin, id, name: finalName, organization: 'Guia Michelin' }]
    });
    setNewMichelin({ type: 'michelin-star', value: 1, year: new Date().getFullYear().toString(), description: '' });
    showSuccess('Reconhecimento Michelin adicionado com sucesso!');
  };

  const handleAddStandard = () => {
    if (!newStandard.name.trim()) return;
    const id = Date.now();
    setFormData({
      ...formData,
      awards: [...(formData.awards || []), { ...newStandard, id, type: 'standard' }]
    });
    setNewStandard({ name: '', year: '', organization: '' });
    showSuccess('Premiação adicionada com sucesso!');
  };

  const handleDeleteAward = (id) => {
    setFormData({
      ...formData,
      awards: formData.awards.filter(a => a.id !== id)
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: 'white', padding: '32px', borderRadius: '24px',
        width: '100%', maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#111827' }}>Editar Perfil do Restaurante</h2>
          <button onClick={onClose} style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', color: '#6b7280' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #e5e7eb', marginBottom: '20px', overflowX: 'auto' }}>
          <button onClick={() => setActiveTab('perfil')} style={{ padding: '8px 16px', background: 'none', border: 'none', borderBottom: activeTab === 'perfil' ? '2px solid var(--primary-orange)' : '2px solid transparent', color: activeTab === 'perfil' ? 'var(--primary-orange)' : '#6b7280', fontWeight: activeTab === 'perfil' ? 700 : 500, cursor: 'pointer', fontSize: '15px', whiteSpace: 'nowrap' }}>Dados do Perfil</button>
          <button onClick={() => setActiveTab('michelin')} style={{ padding: '8px 16px', background: 'none', border: 'none', borderBottom: activeTab === 'michelin' ? '2px solid #da291c' : '2px solid transparent', color: activeTab === 'michelin' ? '#da291c' : '#6b7280', fontWeight: activeTab === 'michelin' ? 700 : 500, cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}><Star size={16} fill={activeTab === 'michelin' ? 'currentColor' : 'transparent'} /> Guia Michelin</button>
          <button onClick={() => setActiveTab('premiacoes')} style={{ padding: '8px 16px', background: 'none', border: 'none', borderBottom: activeTab === 'premiacoes' ? '2px solid var(--primary-orange)' : '2px solid transparent', color: activeTab === 'premiacoes' ? 'var(--primary-orange)' : '#6b7280', fontWeight: activeTab === 'premiacoes' ? 700 : 500, cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}><Award size={16} /> Outras Premiações</button>
        </div>

        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '4px', flex: 1 }}>
          {activeTab === 'perfil' && (
            <>
              {/* Cover Photo Placeholder */}
              <div style={{ position: 'relative', width: '100%', height: '120px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #d1d5db' }}>
                <div style={{ textAlign: 'center', color: '#6b7280' }}>
                  <Camera size={24} style={{ marginBottom: '4px' }} />
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Alterar Capa</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Nome do Estabelecimento</label>
                  <input 
                    type="text" 
                    className="search-input" 
                    value={formData.name || ''} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ paddingLeft: '12px', height: '44px' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Username (@handle)</label>
                  <input 
                    type="text" 
                    className="search-input" 
                    value={formData.handle || ''} 
                    onChange={e => setFormData({ ...formData, handle: e.target.value })}
                    style={{ paddingLeft: '12px', height: '44px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Endereço Completo</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '13px', color: '#9ca3af' }} />
                  <input 
                    type="text" 
                    className="search-input" 
                    value={formData.location || ''} 
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    style={{ paddingLeft: '40px', height: '44px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Categoria Principal</label>
                  <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Ex: Italiana, Burger..."
                    value={formData.category || ''} 
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    style={{ paddingLeft: '12px', height: '44px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '13px', color: '#374151', textTransform: 'uppercase' }}>Links de Contato</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ position: 'relative' }}>
                    <Globe size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#9ca3af' }} />
                    <input type="text" className="search-input" placeholder="Website" style={{ paddingLeft: '36px', height: '40px', fontSize: '13px' }} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#9ca3af' }} />
                    <input type="text" className="search-input" placeholder="WhatsApp" style={{ paddingLeft: '36px', height: '40px', fontSize: '13px' }} />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'michelin' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#fff1f1', padding: '20px', borderRadius: '16px', border: '1px solid #fee2e2' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', color: '#da291c', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Star size={18} fill="currentColor" /> Adicionar Reconhecimento Michelin
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px', display: 'block' }}>Tipo de Reconhecimento</label>
                    <select className="search-input" style={{ width: '100%', padding: '10px', background: 'white' }} value={newMichelin.type} onChange={e => setNewMichelin({...newMichelin, type: e.target.value})}>
                      <option value="michelin-star">Estrela Michelin</option>
                      <option value="michelin-green">Estrela Verde Michelin</option>
                      <option value="michelin-bib">Bib Gourmand Michelin</option>
                    </select>
                  </div>
                  
                  {newMichelin.type === 'michelin-star' ? (
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px', display: 'block' }}>Quantidade</label>
                      <select className="search-input" style={{ width: '100%', padding: '10px', background: 'white' }} value={newMichelin.value} onChange={e => setNewMichelin({...newMichelin, value: parseInt(e.target.value)})}>
                        <option value={1}>1 Estrela</option>
                        <option value={2}>2 Estrelas</option>
                        <option value={3}>3 Estrelas</option>
                      </select>
                    </div>
                  ) : (
                    <div className="form-group">
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px', display: 'block' }}>Ano</label>
                      <input type="text" className="search-input" style={{ width: '100%', padding: '10px', background: 'white' }} value={newMichelin.year} onChange={e => setNewMichelin({...newMichelin, year: e.target.value})} />
                    </div>
                  )}

                  {newMichelin.type === 'michelin-star' && (
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px', display: 'block' }}>Ano</label>
                      <input type="text" className="search-input" style={{ width: '100%', padding: '10px', background: 'white' }} value={newMichelin.year} onChange={e => setNewMichelin({...newMichelin, year: e.target.value})} />
                    </div>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px', display: 'block' }}>Descrição (Opcional)</label>
                  <textarea className="search-input" rows="2" style={{ width: '100%', padding: '10px', background: 'white' }} value={newMichelin.description} onChange={e => setNewMichelin({...newMichelin, description: e.target.value})} placeholder="Ex: Cozinha excelente..." />
                </div>

                <button onClick={handleAddMichelin} style={{ width: '100%', background: '#da291c', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Plus size={18} /> Adicionar Michelin
                </button>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '12px', color: '#111827' }}>Selo Michelin ({formData.awards?.filter(a => a.type.startsWith('michelin')).length || 0})</h3>
                {formData.awards?.filter(a => a.type.startsWith('michelin')).length === 0 ? (
                  <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '20px', background: '#f9fafb', borderRadius: '12px' }}>Nenhum selo Michelin cadastrado.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.awards?.filter(a => a.type.startsWith('michelin')).map(award => (
                      <div key={award.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'white', border: '1px solid #fee2e2', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: award.type === 'michelin-green' ? '#22c55e' : '#da291c', color: 'white'
                          }}>
                            <Star size={16} fill="currentColor" strokeWidth={0} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{award.name}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>{award.year}</div>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteAward(award.id)} style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'premiacoes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} /> Adicionar Outra Premiação
                </h3>
                
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px', display: 'block' }}>Nome da Premiação *</label>
                  <input type="text" className="search-input" style={{ width: '100%', padding: '10px', background: 'white' }} value={newStandard.name} onChange={e => setNewStandard({...newStandard, name: e.target.value})} placeholder="Digite qualquer prêmio (Ex: Melhor Hambúrguer 2023)" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px', display: 'block' }}>Organização (Opcional)</label>
                    <input type="text" className="search-input" style={{ width: '100%', padding: '10px', background: 'white' }} value={newStandard.organization} onChange={e => setNewStandard({...newStandard, organization: e.target.value})} placeholder="Ex: Revista Veja" />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '4px', display: 'block' }}>Ano (Opcional)</label>
                    <input type="text" className="search-input" style={{ width: '100%', padding: '10px', background: 'white' }} value={newStandard.year} onChange={e => setNewStandard({...newStandard, year: e.target.value})} placeholder="Ex: 2024" />
                  </div>
                </div>

                <button onClick={handleAddStandard} style={{ width: '100%', background: '#111827', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', opacity: newStandard.name.trim() ? 1 : 0.5 }}>
                  <Plus size={18} /> Adicionar Premiação
                </button>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '12px', color: '#111827' }}>Outras Premiações ({formData.awards?.filter(a => a.type === 'standard').length || 0})</h3>
                {formData.awards?.filter(a => a.type === 'standard').length === 0 ? (
                  <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '20px', background: '#f9fafb', borderRadius: '12px' }}>Nenhuma outra premiação cadastrada.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formData.awards?.filter(a => a.type === 'standard').map(award => (
                      <div key={award.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f59e0b', color: 'white' }}>
                            <Award size={16} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{award.name}</div>
                            {award.organization && <div style={{ fontSize: '12px', color: '#6b7280' }}>{award.organization} {award.year ? `• ${award.year}` : ''}</div>}
                          </div>
                        </div>
                        <button onClick={() => handleDeleteAward(award.id)} style={{ background: '#fee2e2', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid #e5e7eb', background: 'white', fontWeight: 700, cursor: 'pointer', color: '#6b7280' }}
          >
            Descartar
          </button>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', margin: 0, padding: '12px 32px', borderRadius: '12px' }}
            onClick={() => {
              onSave(formData);
              onClose();
            }}
          >
            Salvar Perfil
          </button>
        </div>

        {/* Custom Success Toast */}
        {successMessage && (
          <div style={{
            position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)',
            background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '30px',
            display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '14px',
            boxShadow: '0 10px 25px rgba(16,185,129,0.3)', zIndex: 1010,
            animation: 'fadeInDown 0.3s ease-out'
          }}>
            <CheckCircle size={18} /> {successMessage}
            <style>{`
              @keyframes fadeInDown {
                from { opacity: 0; transform: translate(-50%, -20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
