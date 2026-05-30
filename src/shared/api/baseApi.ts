import type { Skill, Specialization } from '@/widgets/Filters/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IQuestion {
  id: number,
  title: string,
  description: string,
  rate: number,
  complexity: number,
  shortAnswer: string,
  longAnswer: string,
  imageSrc?: string,
  slug: string,
  questionSpecializations: Specialization[]
  questionSkills: Skill[]
  keywords: string[]
}

const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return '/api/';
  }

  return 'https://api.yeatwork.ru';
};


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: (build) => ({
    getQuestions: build.query({
      query: (params) => {
        const paramsProxy = { ...params };

        // Переименовываем difficulties → complexity
        if (paramsProxy.difficulties) {
          paramsProxy.complexity = [...paramsProxy.difficulties];
          delete paramsProxy.difficulties;
        }

        // Очищаем пустые значения
        const cleanedParams: Record<string, any> = {};
        for (const [key, value] of Object.entries(paramsProxy)) {
          if (value === undefined || value === null) continue;
          if (typeof value === 'string' && value === '') continue;
          if (Array.isArray(value) && value.length === 0) continue;

          cleanedParams[key] = value;
        }

        return {
          url: "questions/public-questions",
          params: cleanedParams,
        };
      },
    }),
    getQuestionById: build.query<IQuestion, string>({
      query: (id) => `questions/public-questions/${id}`,
    }),
    getQuestionBySlug: build.query<IQuestion, string>({
      query: (slug) => `questions/by-slug/${slug}`
    }),
    getSpecializations: build.query({
      query: () => 'specializations'
    }),
    getSpecializationsSlugs: build.query({
      query: () => 'specializations/slugs'
    }),
    getSkills: build.query({
      query: () => 'skills'
    }),

  }),
});

export type { IQuestion };
export const {
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useGetQuestionBySlugQuery,
  useGetSpecializationsQuery,
  useGetSpecializationsSlugsQuery,
  useGetSkillsQuery
} = baseApi;