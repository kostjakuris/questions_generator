import React from 'react';
import styles from './list.module.scss';
import { useDeleteQuestionMutation, useGetAllQuestionsQuery, useLazyGetQuestionInfoQuery } from '@/lib/questionApi';
import { Delete } from '../../../public/images/Delete';
import { Edit } from '../../../public/images/Edit';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { setIsEdit, setQuestionId } from '@/lib/slice';

const QuestionList = () => {
  const {data} = useGetAllQuestionsQuery('');
  const [deleteQuestion] = useDeleteQuestionMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleDeleteQuestion = async(event: any, id: number) => {
    event.stopPropagation();
    await deleteQuestion(id);
  };
  
  const handleEditQuestion = async(event: any, id: number) => {
    event.stopPropagation();
    dispatch(setIsEdit(true));
    dispatch(setQuestionId(id));
    // await getQuestionInfo(String(id));
  };
  return (
    <div className={'flex flex-col items-center w-[400px] h-full overflow-y-auto bg-gray-300 px-5'}>
      <h2 className={styles.question__title}>Questions</h2>
      {
        data?.map((question: any, index: number) =>
          <div onClick={() => router.push(`/question/${question.id}`)} key={question.id} className={'w-full' +
            ' border-gray-500 border rounded-2xl my-5 relative cursor-pointer'}>
            <div className={'flex items-center pt-3'}>
              <span className={'w-8 rounded-4xl bg-gray-400 ml-5 text-center py-0.5 mr-3'}>{index + 1}</span>
              <p className={`${styles.question__text} w-[200px]`}>{question.text}</p>
              <button className={'cursor-pointer mr-2.5 absolute top-1 right-10 z-4'}
                onClick={async(event) => await handleDeleteQuestion(event, question.id)}>
                <Delete class_name={'h-[35px] w-[35px]'} />
              </button>
              <button className={'cursor-pointer absolute top-2 right-3 z-4'}
                onClick={async(event) => await handleEditQuestion(event, question.id)}>
                <Edit class_name={'h-[25px] w-[25px]'} />
              </button>
            </div>
            <div className={'flex items-center'}>
              <div className={'w-24  rounded-2xl bg-gray-400 opacity-80 my-8 mx-7'}>
                <p className={styles.question__text}>{question.variant}</p>
              </div>
              <div className={'w-24 rounded-2xl bg-gray-400 opacity-80 my-8 ml-7'}>
                <p className={styles.question__text}>{question.answerVariant}</p>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default QuestionList;