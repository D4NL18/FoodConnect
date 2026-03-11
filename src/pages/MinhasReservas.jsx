import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function MinhasReservas({ reservations, onRestaurantClick }) {
  return (
    <div className="card" style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Minhas Reservas</h1>
      
      {reservations.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px 0' }}>
          <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <p>Você ainda não possui reservas.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reservations.map((res, i) => (
            <div key={i} className="card" style={{ padding: '16px', display: 'flex', gap: '16px', cursor: 'pointer' }} onClick={() => onRestaurantClick(res.restaurantId)}>
              <img src={res.image} alt={res.restaurantName} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{res.restaurantName}</h3>
                <div style={{ display: 'flex', gap: '16px', color: '#6b7280', fontSize: '13px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {res.date || 'Hoje'}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {res.time || 'A definir'}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {res.partySize || '2 pessoas'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
