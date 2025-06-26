'use client';
import React, { FC, useEffect } from 'react';
import { useEditQuestionMutation, useGetQuestionInfoQuery } from '@/lib/questionApi';
import styles from './question.module.scss';
import { FadeLoader } from 'react-spinners';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextArea from '@/components/textArea/TextArea';
import { AnswerVariant, answerVariantConfig } from '@/components/questionItem/config/AnswerConfig';
import { useAppDispatch } from '@/lib/hooks';
import { setQuestionId } from '@/lib/slice';

interface ItemProps {
  questionId: string;
}

const QuestionItem: FC<ItemProps> = ({questionId}) => {
  const {data: questionData, isLoading: isGetLoading} = useGetQuestionInfoQuery(questionId ? questionId : '');
  const {register, handleSubmit} = useForm();
  const [editQuestion, {isLoading: isEditLoading}] = useEditQuestionMutation();
  const dispatch = useAppDispatch();
  const variant = questionData?.answerVariant as AnswerVariant;
  const AnswerComponent = variant ? answerVariantConfig[variant] : null;
  
  const submitHandler: SubmitHandler<any> = async(data) => {
    const modifiedArray = Array.isArray(data.answer) ? data.answer.map((element: string) => {
      return {
        text: element,
      };
    }) : null;
    await editQuestion({
      id: Number(questionId),
      text: questionData.questionText,
      questionKind: questionData.kind,
      answerVariant: questionData.answerVariant,
      questionOptions: questionData.options,
      answers: Array.isArray(data.answer) ? modifiedArray : [{text: data.answer}],
    });
  };
  
  useEffect(() => {
    if (questionId) {
      dispatch(setQuestionId(questionId));
    }
  }, [questionId]);
  
  
  if (isEditLoading || isGetLoading) {
    return (
      <div className={styles.question}>
        <FadeLoader color={'black'} loading={true} />
      </div>
    );
  }
  return (
    <div className={styles.question}>
      <p className={styles.question__text}>{questionData?.questionText}</p>
      <form className={'flex flex-col items-center w-full'} onSubmit={handleSubmit(submitHandler)}>
        <div className={variant === 'checkbox' ? 'flex mx-auto items-center mt-6' :
          'flex justify-between items-center mt-6 w-full'}>
          {AnswerComponent && questionData?.kind === 'multiple' ?
            AnswerComponent({options: questionData?.options, register: register('answer')}) :
            <TextArea
              class_name={styles.question__field}
              register={register('answer')}
              placeholder={'Enter answer text'}
            />
          }
        </div>
        <button className={styles.question__submit} type={'submit'}>Answer</button>
      </form>
    </div>
  );
};

export default QuestionItem;