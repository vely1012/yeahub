import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IQuestion {
  id: number,
  title: string,
  description: string,
  rate: number,
  complexity: number,
  shortAnswer: string,
  imageSrc?: string,
  slug: string
}

const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return '/api/';
  }
  
  // return 'https://localhost:3000/api/';
  return 'https://api.yeatwork.ru';
};


export const baseApi = createApi({
  reducerPath: 'api',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://api.yeatwork.ru/' }),
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: (build) => ({
    getQuestions: build.query({
      query: (params) => ({
        url: "questions/public-questions",
        params: {...params, complexity: params.difficulties}
      }),
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