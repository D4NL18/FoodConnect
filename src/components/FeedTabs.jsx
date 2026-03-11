export default function FeedTabs({ activeTab, setActiveTab }) {
  return (
    <div className="feed-tabs">
      <button 
        className={`tab ${activeTab === 'amigos' ? 'active' : ''}`}
        onClick={() => setActiveTab('amigos')}
      >
        Amigos
      </button>
      <button 
        className={`tab ${activeTab === 'para_voce' ? 'active' : ''}`}
        onClick={() => setActiveTab('para_voce')}
      >
        Para você
      </button>
      <button 
        className={`tab ${activeTab === 'em_alta' ? 'active' : ''}`}
        onClick={() => setActiveTab('em_alta')}
      >
        Em Alta (SP)
      </button>
    </div>
  );
}
