import React from 'react';
import styles from './list.module.scss';
import { useGetAllQuestionsQuery } from '@/lib/questionApi';
import Link from 'next/link';

const QuestionList = () => {
  const {data} = useGetAllQuestionsQuery('');
  console.log(data);
  return (
    <div className={'flex flex-col items-center w-[400px] h-full overflow-y-auto bg-gray-300 px-5'}>
      <h2 className={styles.question__title}>Questions</h2>
      {
        data?.map((question: any, index: number) =>
          <Link href={`/question/${question.id}`} key={question.id} className={'w-full h-[120px] border-gray-500' +
            ' border' +
            ' rounded-2xl my-5'}>
            <div className={'flex items-center pt-3'}>
              <span className={'w-8 h-8 rounded-4xl bg-gray-400 ml-5 text-center pt-1'}>{index + 1}</span>
              <p className={styles.question__text}>{question.text}</p>
            </div>
            <div className={'w-40 h-7 rounded-2xl bg-gray-400 opacity-80 mt-8 ml-7'}>
              <p className={styles.question__text}>{question.variant}</p>
            </div>
          </Link>
        )
      }
    </div>
  );
};

export default QuestionList;