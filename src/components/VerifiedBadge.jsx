import { BadgeCheck } from 'lucide-react';

export default function VerifiedBadge({ size = 16, style = {}, className = '' }) {
  return (
    <BadgeCheck 
      size={size} 
      color="#ffffff" 
      fill="#3b82f6" 
      className={className}
      style={{ marginLeft: '4px', verticalAlign: 'text-bottom', ...style }} 
    />
  );
}
