import React, { JSX } from 'react';
import Input from '@/components/input/Input';
import styles from '@/components/questionItem/question.module.scss';

export type AnswerVariant = 'checkbox' | 'radio' | 'boolean' | 'select';

interface AnswerComponentProps {
  options?: any[];
  register: any;
}

export const answerVariantConfig: Record<AnswerVariant, (props: AnswerComponentProps) => JSX.Element> = {
  checkbox: ({options = [], register}: AnswerComponentProps) => (
    <>
      {options.map((option: any) => (
        <Input
          key={option?.id}
          register={register}
          value={option?.description}
          type='checkbox'
        />
      ))}
    </>
  ),
  radio: ({options = [], register}) => (
    <div className={'flex justify-around w-full'}>
      {options.map((option) => (
        <Input
          key={option?.id}
          class_name={'ml-2'}
          register={register}
          value={option?.description}
          type='radio'
        />
      ))}
    </div>
  ),
  boolean: ({register}) => (
    <div className={'flex mx-auto'}>
      <Input
        class_name={'ml-2'}
        register={register}
        value={'Yes'}
        type='radio'
      />
      <Input
        class_name={styles.create__option}
        register={register}
        value={'No'}
        type='radio'
      />
    </div>
  ),
  select: ({options = [], register}) => (
    <>
      <div className={'flex mx-auto w-[300px]'}>
        <select
          className={styles.question__select}
          {...register}
        >
          <option className={'text-black'} value=''></option>
          {options.map((option) => (
            <option key={option?.id} className={'text-black'}
              value={option?.description}>{option?.description}</option>
          ))}
        </select>
      </div>
    </>
  ),
};