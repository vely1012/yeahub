import { type PropsWithChildren, type MouseEvent } from "react"
import { useClickOutside } from '@/shared/lib/useClickOutside';

import './AsidePanel.css'

interface AsidePanelProps extends PropsWithChildren {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

function AsidePanel({ active, setActive, children }: AsidePanelProps) {
    const asidePanelRef = useClickOutside<HTMLDivElement>(() => { setActive(false) })
    
    return (
        <aside className={`aside-panel ${active ? "aside-panel_active" : ""}`} ref={asidePanelRef}>
            <button className="aside-panel__close-btn" type="button" onClick={(e: MouseEvent) => { e.stopPropagation(); setActive(false) }} />
            { children }
        </aside>
    )
}

export default AsidePanel