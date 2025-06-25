import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateQuestionFields } from '@/interfaces/question.interface';

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  }),
  tagTypes: ['Question'],
  endpoints: (build) => ({
    createQuestion: build.mutation({
      query: ({text, questionKind, answerVariant, questionOptions}: CreateQuestionFields) => ({
        url: '/question/create',
        method: 'POST',
        body: {text, questionKind, answerVariant, questionOptions}
      }),
      invalidatesTags: ['Question']
    }),
    getAllQuestions: build.query({
      query: () => ({
        url: '/question/all',
      }),
      providesTags: ['Question']
    }),
    getQuestionInfo: build.query({
      query: (id: string) => ({
        url: `/question/info?id=${id}`,
      }),
      providesTags: ['Question']
    }),
  })
});
export const {useGetAllQuestionsQuery, useCreateQuestionMutation, useGetQuestionInfoQuery} = questionApi;