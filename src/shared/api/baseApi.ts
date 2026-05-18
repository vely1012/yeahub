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
        params: params
      }),
    }),
    getQuestionById: build.query<IQuestion, string>({
      query: (id) => `questions/public-questions/${id}`,
    }),
  }),
});

export type { IQuestion };
export const { useGetQuestionsQuery, useGetQuestionByIdQuery } = baseApi;