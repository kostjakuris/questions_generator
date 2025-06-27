'use client';
import React, { useEffect } from 'react';
import styles from './create.module.scss';
import QuestionList from '@/components/questionList/QuestionList';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextArea from '@/components/textArea/TextArea';
import Input from '@/components/input/Input';
import { Delete } from '../../../public/images/Delete';
import AnswerVariantSelect from '@/components/answerVariantSelect/AnswerVariantSelect';
import { useCreateQuestionMutation, useEditQuestionMutation, useGetQuestionInfoQuery } from '@/lib/questionApi';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setIsEdit } from '@/lib/slice';


const createQuestionSchema = z.object({
  questionText: z.string().nonempty('Question text is required'),
  answerFormat: z.string().nonempty('Answer format is required'),
  answerVariant: z.string().optional(),
  answerOption: z.array(z.object({description: z.string().optional()})),
});

type formSchema = z.infer<typeof createQuestionSchema>;

const formsDefaultValues: formSchema = {
  questionText: '',
  answerFormat: '',
  answerVariant: '',
  answerOption: [{
    description: '',
  }]
};

const CreateQuestionPage = () => {
  const {register, handleSubmit, reset, control, watch, setValue, formState: {errors}} = useForm<formSchema>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: formsDefaultValues
  });
  const dispatch = useAppDispatch();
  const {isEdit, questionId} = useAppSelector(state => state.question);
  const {data: questionData} = useGetQuestionInfoQuery(questionId ? questionId : '');
  const [createQuestion] = useCreateQuestionMutation();
  const [editQuestion] = useEditQuestionMutation();
  const currentValues = watch();
  const submitHandler: SubmitHandler<formSchema> = async(data) => {
    if (!isEdit) {
      await createQuestion({
        text: data.questionText,
        questionKind: data.answerFormat,
        answerVariant: data.answerVariant ? data.answerVariant : 'textarea',
        questionOptions: data.answerOption[0].description ? data.answerOption : [],
      });
      reset();
    } else {
      await editQuestion({
        id: Number(questionId),
        text: data.questionText,
        questionKind: data.answerFormat,
        answerVariant: data.answerVariant ? data.answerVariant : 'textarea',
        questionOptions: data.answerOption[0]?.description ? data.answerOption : [],
        answers: questionData.answers
      });
      reset();
      dispatch(setIsEdit(false));
    }
  };
  
  const {fields, append, remove} = useFieldArray<any>({
    control,
    name: 'answerOption'
  });
  
  useEffect(() => {
    if (isEdit && questionData) {
      setValue('questionText', questionData.questionText);
      setValue('answerFormat', questionData.kind);
      setValue('answerVariant', questionData.answerVariant);
      setValue('answerOption', questionData.options);
    }
  }, [isEdit, questionData]);
  
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
          <div className={'flex items-center justify-start h-[80px] w-[800px] mt-5'}>
            <div>
              <div className={'flex items-center'}>
                <p className={`${styles.create__text} mr-5`}>Kind of answer</p>
                <div className={'flex flex-col items-center justify-center h-[50px] mr-5'}>
                  <select
                    {...register('answerFormat')}
                    className={styles.create__select}
                  >
                    <option className={'text-black'} value=''></option>
                    <option className={'text-black'} value='multiple'>multiple answer</option>
                    <option className={'text-black'} value='single'> single answer</option>
                  </select>
                </div>
              </div>
              {errors.answerFormat &&
                <p className={'text-red-500 mb-3 mr-3 text-right'}>{errors.answerFormat.message}</p>}
            </div>
            {
              currentValues.answerFormat === 'multiple' ?
                <AnswerVariantSelect register={register('answerVariant')} error={String(errors.answerVariant?.message)}
                  isError={Boolean(errors.answerVariant)} />
                : null
            }
          </div>
          {
            currentValues.answerFormat === 'multiple' && currentValues.answerVariant !== 'boolean' ?
              <div className={'flex items-center h-[50px] w-[800px] mt-5'}>
                <button
                  className={styles.create__button}
                  type={'button'}
                  onClick={() => append({option: ''})}>
                  Add answer
                </button>
              </div>
              : null
          }
          <div className={'w-full mx-auto mt-5'}>
            {
              currentValues.answerFormat === 'multiple' ?
                fields.map((field, index) =>
                  <div key={field.id} className={'flex justify-center items-center h-[40px] my-5'}>
                    <Input
                      class_name={styles.create__option}
                      register={register(`answerOption.${index}.description`)}
                      placeholder={'Enter answer option'}
                      type={'text'}
                      error={String(errors.answerOption?.[index]?.description?.message)}
                      isError={Boolean(errors.answerOption?.[index]?.description)}
                    />
                    <button className={'mt-3 cursor-pointer'} onClick={() => remove(index)}>
                      <Delete class_name={'h-[35px] w-[35px]'} />
                    </button>
                  </div>
                )
                : null
            }
          </div>
          {
            isEdit &&
            <button onClick={() => {
              dispatch(setIsEdit(false));
              reset();
            }} className={styles.create__submit}
              type={'button'}>Cancel</button>
          }
          <button className={styles.create__submit} type={'submit'}>{isEdit ? 'Edit' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestionPage;