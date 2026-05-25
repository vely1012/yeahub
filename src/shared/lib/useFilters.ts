import { useBatchUpdateQuery, useQueryParam } from './useQueryParam';
import type { DifficultyRange } from '@/widgets/Filters/types';

export interface QuestionFilters {
    specializationSlug?: string;
    skills?: number[];
    difficulties?: number[];
}

export function useQuestionFilters() {
    const [specializationSlug, setSpecializationSlug] = useQueryParam('specialization');
    const [skillsStr, setSkillsStr] = useQueryParam('skills');
    const [difficultiesStr, setDifficultiesStr] = useQueryParam('difficulties');

    const batchUpdate = useBatchUpdateQuery();
    
    const skills = skillsStr
        ?.split(',')
        .filter(Boolean)
        .map(Number)
        .filter(id => !isNaN(id)) || [];
    
    const difficulties = difficultiesStr
        ?.split(',')
        .filter(Boolean)
        .map(Number)
        .filter(id => !isNaN(id)) || [];;
    
    const setSpecialization = (slug: string) => {
        setSpecializationSlug(slug);
    };
    
    const setSkills = (newSkillIds: number[]) => {
        setSkillsStr(newSkillIds.length ? newSkillIds.join(',') : "");
    };

    const setDifficulties = (newDifficulties: number[]) => {
        setDifficultiesStr(newDifficulties.length ? newDifficulties.join(",") : "");
    }
    
    const toggleSkill = (skillId: number) => {
        const current = skills;
        const updated = current.includes(skillId)
            ? current.filter(id => id !== skillId)
            : [...current, skillId];
        setSkills(updated);
    };
    
    const toggleDifficultyRange = ({ from, to }: DifficultyRange) => {
        const current = difficulties;
        const updated = current.includes(from) ?
        current.filter((d: number) => (d > to || d < from)) :
        current.concat(Array.from({ length: to - from + 1 }).map((_, i) => from + i))

        setDifficulties(updated);
    }
    
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
        toggleDifficultyRange,
        clearFilters,
    };
}