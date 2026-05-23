// shared/lib/useFilters.ts
import { useBatchUpdateQuery, useQueryParam } from './useQueryParam';

export interface QuestionFilters {
    specializationSlug?: string;
    skills?: number[];
    difficulties?: string[];
}

export function useQuestionFilters() {
    const [specializationSlug, setSpecializationSlug] = useQueryParam('specialization');
    const [skillsStr, setSkillsStr] = useQueryParam('skills');
    const [difficultiesStr, setDifficultiesStr] = useQueryParam('difficulties');

    const batchUpdate = useBatchUpdateQuery();
    
    // Преобразуем строку в массив чисел
    const skills = skillsStr
        ?.split(',')
        .filter(Boolean)
        .map(Number)
        .filter(id => !isNaN(id)) || [];
    
    const difficulties = difficultiesStr?.split(',')?.filter(Boolean) || [];
    
    const setSpecialization = (slug: string) => {
        setSpecializationSlug(slug);
    };
    
    // Принимаем массив чисел
    const setSkills = (newSkillIds: number[]) => {
        setSkillsStr(newSkillIds.length ? newSkillIds.join(',') : "");
    };

    const setDifficulties = (newDifficulties: string[]) => {
        setDifficultiesStr(newDifficulties.length ? newDifficulties.join(",") : "");
    }
    
    // toggle принимает number (id навыка)
    const toggleSkill = (skillId: number) => {
        const current = skills;
        const updated = current.includes(skillId)
            ? current.filter(id => id !== skillId)
            : [...current, skillId];
        setSkills(updated);
    };

    const toggleDifficulty = (diffToToggle: string) => {
        const current = difficulties;
        const updated = current.includes(diffToToggle)
            ? current.filter(d => d !== diffToToggle)
            : [...current, diffToToggle];
        setDifficulties(updated);
    };
    
    const clearFilters = () => {
        batchUpdate({ 
            difficulties: null, 
            specialization: null,
            skills: null 
        });
    };
    
    return {
        filters: { specializationSlug, skills, difficulties },
        setSpecialization,
        setSkills,
        toggleSkill,
        toggleDifficulty,
        clearFilters,
    };
}