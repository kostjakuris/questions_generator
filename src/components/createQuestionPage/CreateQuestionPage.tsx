'use client';
import React from 'react';
import styles from './create.module.scss';
import QuestionList from '@/components/questionList/QuestionList';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextArea from '@/components/textArea/TextArea';

interface QuestionFields {
  questionText: string;
  answerFormat: string;
}

const createQuestionSchema = z.object({
  questionText: z.string().nonempty('Question text is required'),
  answerFormat: z.string().nonempty('Answer variant is required'),
});

const CreateQuestionPage = () => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<QuestionFields>({
    resolver: zodResolver(createQuestionSchema)
  });
  const currentValues = watch();
  const submitHandler: SubmitHandler<QuestionFields> = (data) => {
    console.log(data);
  };
  return (
    <div className={styles.create}>
      <QuestionList />
      <div className={'flex flex-col items-center w-[70%]'}>
        <h1 className={styles.create__title}>Let's create your question</h1>
        <form className={'flex flex-col items-center w-full'} onSubmit={handleSubmit(submitHandler)}>
          <TextArea
            class_name={styles.create__field}
            register={register('questionText')}
            placeholder={'Enter question text'}
            error={String(errors.questionText?.message)}
            isError={Boolean(errors.questionText)}
          />
          <div className={'flex items-center h-[50px] w-[800px] mt-5'}>
            <p className={`${styles.create__text} mr-5`}>Answer variants</p>
            <div className={'flex flex-col items-center justify-center h-[60px] mr-5'}>
              <select
                {...register('answerFormat')}
                className={styles.create__select}
              >
                <option className={'text-black'} value=''></option>
                <option className={'text-black'} value='multiple answer'>multiple answer</option>
                <option className={'text-black'} value='single answer'> single answer</option>
              </select>
            </div>
            {
              currentValues.answerFormat === 'multiple answer' ?
                <>
                  <p className={`${styles.create__text} mr-5`}>Multiple answer variants</p>
                  <div className={'flex flex-col items-center justify-center h-[60px]'}>
                    <select
                      {...register('answerFormat')}
                      className={styles.create__select}
                    >
                      <option className={'text-black'} value=''></option>
                      <option className={'text-black'} value='checkbox'>checkbox</option>
                      <option className={'text-black'} value='select'>select</option>
                      <option className={'text-black'} value='radio'>radio</option>
                    </select>
                  </div>
                </>
                : null
            }
          </div>
          {
            currentValues.answerFormat === 'multiple answer' ?
            <div className={'flex items-center h-[50px] w-[800px] mt-5'}>
              <button className={styles.create__button}>Add answer</button>
              <button className={styles.create__button}>Remove answer</button>
            </div>
              : null
          }
         
          <button className={styles.create__submit} type={'submit'}> Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestionPage;