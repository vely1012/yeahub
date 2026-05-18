import { type MouseEvent, type Ref } from 'react'

import './Filters.css'

function Filters({ ref }: { ref: Ref<HTMLElement>}) {
    // make api hooks to fetch all filters from back. apply them to get all filters
    return(
        <div className="filters" ref={ref as Ref<HTMLDivElement>}>
            <button type="button" className="filters__close-btn" onClick={(e: MouseEvent) => { (e.target as HTMLElement).parentElement?.classList.remove('filters_active')}} />
            <div className="filters__section filters__section_unfolded">
                <h3 className="filters__section-title">Специализация</h3>
                <button type="button" className="filters__toggle-filter">UI/UX designe</button>
                <button type="button" className="filters__toggle-filter">Frontend developer</button>
                <button type="button" className="filters__toggle-filter">Backed developer</button>
                <button type="button" className="filters__toggle-filter">Fullstack</button>
                <button type="button" className="filters__toggle-filter filters__toggle-filter_active">Figma</button>
                <button type="button" className="filters__unfold-btn">Посмотреть все</button>
            </div>
            <div className="filters__section">
                <h3 className="filters__section-title">Навыки</h3>
                <button type="button" className="filters__toggle-filter">Figma</button>
                <button type="button" className="filters__toggle-filter">Wireframing</button>
                <button type="button" className="filters__toggle-filter">CSS</button>
                <button type="button" className="filters__toggle-filter">Wireframing</button>
                <button type="button" className="filters__toggle-filter filters__toggle-filter_active">React.js</button>
                <button type="button" className="filters__toggle-filter">HTML</button>
                <button type="button" className="filters__toggle-filter">Figma</button>
                <button type="button" className="filters__toggle-filter">Wireframing</button>
                <button type="button" className="filters__unfold-btn">Посмотреть все</button>
            </div>
            <div className="filters__section">
                <h3 className="filters__section-title">Уровень сложности</h3>
                <button type="button" className="filters__toggle-filter">0-3</button>
                <button type="button" className="filters__toggle-filter">4-6</button>
                <button type="button" className="filters__toggle-filter">7-8</button>
                <button type="button" className="filters__toggle-filter filters__toggle-filter_active">9-10</button>
            </div>
            <div className="filters__section">
                <h3 className="filters__section-title">Статус</h3>
                <button type="button" className="filters__toggle-filter">Изученные</button>
                <button type="button" className="filters__toggle-filter">Неизученные</button>
                <button type="button" className="filters__toggle-filter filters__toggle-filter_active">Все</button>
            </div>
        </div>
    )
}

export default Filters