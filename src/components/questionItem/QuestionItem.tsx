'use client';
import React, { FC } from 'react';
import { useGetQuestionInfoQuery } from '@/lib/questionApi';

interface ItemProps {
  questionId: string;
}

const QuestionItem: FC<ItemProps> = ({questionId}) => {
  const {data} = useGetQuestionInfoQuery(questionId ? questionId : '');
  console.log(data);
  return (
    <div>
      <p>{questionId}</p>
    </div>
  );
};

export default QuestionItem;