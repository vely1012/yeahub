// import { type MouseEvent } from 'react';
import { useGetSkillsQuery, useGetSpecializationsQuery } from '@/shared/api/baseApi';
import { useQuestionFilters } from '@/shared/lib/useFilters';
import type { FilterQueryResult, Specialization, Skill, Difficulty } from './types';

import './Filters.css';

interface FiltersProps {
    active: boolean,
    setActive: (newActive: boolean) => void
}

interface FilterRadioProps {
    title: string;
    query: FilterQueryResult<Specialization>;
    getItemValue: (item: Specialization) => string;
    getItemLabel: (item: Specialization) => string;
    selectedValue: string;
    onChange: (value: string) => void;
}

function FilterRadio({ 
    title, 
    query, 
    getItemValue, 
    getItemLabel, 
    selectedValue, 
    onChange 
}: FilterRadioProps) {
    const { data, isLoading, isError } = query;

    if (isLoading) {
        return (
            <div className="filters__section">
                <h3 className="filters__section-title">{title}</h3>
                <div className="filters__spinner">⏳ Загрузка...</div>
            </div>
        );
    }

    if (isError) {
        console.error(`Ошибка загрузки ${title.toLowerCase()}`);
        return null;
    }

    const items = data?.data ?? [];

    return (
        <div className="filters__section">
            <h3 className="filters__section-title">{title}</h3>
                {items.map((item) => (
                    <label key={getItemValue(item)} className="filters__radio-label">
                        <input
                            type="radio"
                            name={title}
                            value={getItemValue(item)}
                            checked={selectedValue === getItemValue(item)}
                            onChange={() => onChange(getItemValue(item))}
                            className="filters__radio"
                        />
                        <span className="filters__radio-text">{getItemLabel(item)}</span>
                    </label>
                ))}
        </div>
    );
}

// Компонент для toggle-кнопок (навыки)
interface FilterToggleProps {
    title: string;
    query: FilterQueryResult<Skill>;
    getItemId: (item: Skill) => number;
    getItemLabel: (item: Skill) => string;
    selectedValues: number[];
    onToggle: (item: Skill) => void;
}

function FilterToggle({ 
    title, 
    query, 
    getItemId, 
    getItemLabel, 
    selectedValues, 
    onToggle 
}: FilterToggleProps) {
    const { data, isLoading, isError } = query;

    if (isLoading) {
        return (
            <div className="filters__section">
                <h3 className="filters__section-title">{title}</h3>
                <div className="filters__spinner">⏳ Загрузка...</div>
            </div>
        );
    }

    if (isError) {
        console.error(`Ошибка загрузки ${title.toLowerCase()}`);
        return null;
    }

    const items = data?.data ?? [];

    return (
        <div className="filters__section">
            <h3 className="filters__section-title">{title}</h3>
                {items.map((item: any) => (
                    <button
                        key={getItemId(item)}
                        type="button"
                        className={`filters__toggle-filter ${selectedValues.includes(item.id) ? 'filters__toggle-filter_active' : ''}`}
                        onClick={() => onToggle(item)}
                    >
                        {getItemLabel(item)}
                    </button>
                ))}
        </div>
    );
}

// Компонент для статических данных (сложность)
interface FilterStaticToggleProps {
    title: string;
    items: Difficulty[];
    selectedValues: string[];
    onToggle: (value: string) => void;
}

function FilterStaticToggle({ title, items, selectedValues, onToggle }: FilterStaticToggleProps) {
    return (
        <div className="filters__section">
            <h3 className="filters__section-title">{title}</h3>
                {items.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className={`filters__toggle-filter ${selectedValues.includes(item.label) ? 'filters__toggle-filter_active' : ''}`}
                        onClick={() => onToggle(item.label)}
                    >
                        {item.label}
                    </button>
                ))}
        </div>
    );
}

// Основной компонент Filters
function Filters({ active, setActive }: FiltersProps) {
    const { filters, setSpecialization, toggleSkill, toggleDifficulty, clearFilters } = useQuestionFilters();

    const specializationsQuery = useGetSpecializationsQuery({});
    const skillsQuery = useGetSkillsQuery({});

    const difficulties: Difficulty[] = [
        { id: '0-3', label: '0-3' },
        { id: '4-6', label: '4-6' },
        { id: '7-8', label: '7-8' },
        { id: '9-10', label: '9-10' },
    ];

    return (
        <div className={"filters " + (active ? "filters_active" : "")}>
            <button
                type="button"
                className="filters__close-btn"
                onClick={(/*e: MouseEvent*/) => {
                    // (e.target as HTMLElement).parentElement?.classList.remove('filters_active');
                    setActive(false);
                }}
            />

            <FilterRadio
                title="Специализация"
                query={specializationsQuery}
                getItemValue={(item) => item.slug}
                getItemLabel={(item) => item.title}
                selectedValue={filters.specializationSlug ?? ''}
                onChange={setSpecialization}
            />

            <FilterToggle
                title="Навыки"
                query={skillsQuery}
                getItemId={(item) => item.id}
                getItemLabel={(item) => item.title}
                selectedValues={filters.skills ?? []}
                onToggle={(item) => toggleSkill(item.id)}
            />

            <FilterStaticToggle
                title="Уровень сложности"
                items={difficulties}
                selectedValues={filters.difficulties ?? []}
                onToggle={(value) => toggleDifficulty(value)}
            />

            <button type="button" className="filters__reset-btn" onClick={clearFilters}>
                Сбросить все фильтры
            </button>
        </div>
    );
}

// Присоединяем вложенные компоненты как статические свойства
Filters.FilterRadio = FilterRadio;
Filters.FilterToggle = FilterToggle;
Filters.FilterStaticToggle = FilterStaticToggle;

export default Filters;