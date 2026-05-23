import { type TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { type BaseQueryFn, type FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface Specialization {
    slug: string;
    title: string;
}

export interface Skill {
    id: number;
    title: string;
}

export interface ApiListResponse<T> {
    data: T[];
}

export type FilterQueryResult<T, TQueryArg extends BaseQueryFn = BaseQueryFn> = TypedUseQueryHookResult<
    ApiListResponse<T>,
    FetchBaseQueryError,
    TQueryArg
>;

export interface Difficulty {
    id: string;
    label: string;
}