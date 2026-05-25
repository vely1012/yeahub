import { useGetSkillsQuery, useGetSpecializationsQuery } from '@/shared/api/baseApi';
import { useQuestionFilters } from '@/shared/lib/useFilters';
import type { FilterQueryResult, Specialization, Skill, DifficultyRange } from './types';
import SearchIcon from '@/assets/icons/search-icon.svg?react'
import { useEffect, useState, type ChangeEvent } from 'react';

import './Filters.css';
import useQuestionSearch from '@/shared/lib/useQuestionSearch';

interface FilterRowProps<ItemType> {
    title: string
    items: ItemType[]
    itemsLimit?: number
    renderItem?: (item: ItemType) => React.ReactNode
    children?: (item: ItemType) => React.ReactNode
}

function FilterRow<ItemType>({ title, items, renderItem, children, itemsLimit }: FilterRowProps<ItemType>) {
    const [folded, setFolded] = useState(true);
    
    if(!children && !renderItem) {
        console.error('Rendering error: FilterRow has no renderItem nor children')
        return null
    }

    const mapCallback = (item: ItemType, i: number) => !folded || !itemsLimit || i < itemsLimit ? (children ?? renderItem)!(item): null

    return (
        <div className="filters__section">
            <h3 className="filters__section-title">{title}</h3>
            {
                items.map(mapCallback)
            }
            {
                itemsLimit ? <button type="button" className="filters__unfold-btn" onClick={() => setFolded((prev: boolean) => !prev)}>{folded ? "Посмотреть все" : "Свернуть"}</button> : null
            }
        </div>
    )
}

interface QueryFilterRowProps<ItemType> extends Omit<FilterRowProps<ItemType>, "items"> {
    query: FilterQueryResult<ItemType>
    getItems: (query: FilterQueryResult<ItemType>) => ItemType[]
    Fallback?: () => React.ReactNode
    onError?: (error: any) => void
}

function QueryFilterRow<ItemType>({ query, getItems, Fallback, onError, ...nativeProps }: QueryFilterRowProps<ItemType>) {
    const { isLoading, isError } = query;

    if (isLoading) {
        return (
            Fallback ? <Fallback /> : null
        );
    }

    if (isError) {
        onError?.(query.error);
    }

    const items = getItems(query);
    
    return <FilterRow<ItemType> items={items} {...nativeProps} />
}

interface FiltersProps {
    setActive: (newActive: boolean) => void
    setSkills: (skills: string[]) => void
}

function Filters({ setActive, setSkills }: FiltersProps) {
    const { filters, setSpecialization, toggleSkill, toggleDifficultyRange, clearFilters } = useQuestionFilters();
    const { questionSearch, setQuestionSearch } = useQuestionSearch();
    const [skillNames, setSkillNames] = useState<string[]>([]);
    const toggleSkillName = (skillName: string) => {
        const current = skillNames;
        const updated = current.includes(skillName) ? current.filter(sn => sn === skillName) : [...current, skillName];

        setSkillNames(updated);
    }

    useEffect(() => {
        setSkills(skillNames)
    })

    const specializationsQuery = useGetSpecializationsQuery({});
    const skillsQuery = useGetSkillsQuery({});

    const difficulties: DifficultyRange[] = [
        { from: 0, to: 3 },
        { from: 4, to: 6 },
        { from: 7, to: 8 },
        { from: 9, to: 10 },
        
    ];

    return (
        <div className="filters">
            <button
                type="button"
                className="filters__close-btn"
                onClick={() => setActive(false)}
            />
            <div className="filters__search-wrapper">
                <SearchIcon />
                <input type="text" value={ questionSearch ?? "" } onChange={(e: ChangeEvent) => { setQuestionSearch((e.target as HTMLInputElement).value) }} placeholder="Введите запрос..." className='filters__search' />
            </div>

            <QueryFilterRow<Specialization>
                title="Специализация"
                query={specializationsQuery}
                getItems={(query) => query.data?.data ?? []}
                itemsLimit={5}
            >
                {
                    (item) => (
                        <label
                            key={item.id}
                            className={`filters__radio-label ${filters.specializationSlug === item.slug ? 'filters__toggle-filter_active' : ""}`}>
                            <input
                                type="radio"
                                name={"Специализация"}
                                value={item.slug}
                                checked={filters.specializationSlug === item.slug}
                                onChange={() => setSpecialization(item.slug)}
                                className="filters__radio"
                            />
                            <span className="filters__radio-text">{item.title}</span>
                        </label>
                    )
                }
            </QueryFilterRow>

            <QueryFilterRow<Skill>
                title="Категории вопросов"
                query={skillsQuery}
                getItems={(query) => query.data?.data ?? []}
                itemsLimit={5}
            >
                {
                    (item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={`filters__toggle-filter ${filters.skills.includes(item.id) ? 'filters__toggle-filter_active' : ''} filters__icon-filter`}
                            onClick={() => { toggleSkill(item.id); toggleSkillName(item.title) } }
                        >
                            <img
                                src={item.imageSrc ?? "/icons/skill-fallback-icon.svg"}
                                onError={(e) => { (e.target as HTMLImageElement).src = "/icons/skill-fallback-icon.svg" }}
                            />
                            <p>{item.title}</p>
                        </button>
                    )
                }
            </QueryFilterRow>

            <FilterRow
            title="Уровень сложности"
            items={difficulties}
            >
                {
                    ({from, to}: DifficultyRange) => (
                        <button
                            key={`toggle-diffs--${from}-${to}`}
                            type="button"
                            className={`filters__toggle-filter ${filters.difficulties.includes(from) ? 'filters__toggle-filter_active' : ''}`}
                            onClick={() => toggleDifficultyRange({from, to})}
                        >
                            {`${from}-${to}`}
                        </button>
                    )
                }
            </FilterRow>

            <button type="button" className="filters__reset-btn" onClick={clearFilters}>
                Сбросить все фильтры
            </button>
        </div>
    );
}

export default Filters;