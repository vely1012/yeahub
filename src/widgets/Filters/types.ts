import { type TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { type BaseQueryFn, type FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface Specialization {
    id: number
    slug: string
    title: string
}

export interface Skill {
    id: number
    title: string
    imageSrc: string | null
}

export type FilterQueryResult<FilterItemType, TQueryArg extends BaseQueryFn = BaseQueryFn> = TypedUseQueryHookResult<
    { data: FilterItemType[] },
    FetchBaseQueryError,
    TQueryArg
>;

export interface DifficultyRange {
    from: number
    to: number
}