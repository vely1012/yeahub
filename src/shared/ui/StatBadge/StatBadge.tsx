import { type CSSProperties } from 'react';
import './StatBadge.css';

export interface StatBadgeProps {
    label: string,
    stat: string
}

function StatBadge({ label, stat }: StatBadgeProps) {
    return <span className="stat-badge" style={{ '--content': `"${stat}"` } as CSSProperties}>{label}</span>
}

export default StatBadge