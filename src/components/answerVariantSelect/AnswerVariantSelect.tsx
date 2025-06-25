import React, { FC } from 'react';
import styles from '@/components/createQuestionPage/create.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps {
  register: UseFormRegisterReturn<string>;
  error: string;
  isError: boolean;
}

const AnswerVariantSelect: FC<SelectProps> = ({register, error, isError}) => {
  return (
    <div>
      <div className={'flex items-center'}>
        <p className={`${styles.create__text} mr-5`}>Answer variants</p>
        <div className={'flex flex-col items-center justify-center h-[50px] mr-5'}>
          <select
            {...register}
            className={styles.create__select}
          >
            <option className={'text-black'} value=''></option>
            <option className={'text-black'} value='checkbox'>checkbox</option>
            <option className={'text-black'} value='select'>select</option>
            <option className={'text-black'} value='radio'>radio</option>
            <option className={'text-black'} value='boolean'>boolean</option>
          </select>
        </div>
      </div>
      {isError &&
        <p className={'text-red-500 mb-3 mr-3 text-right'}>{error}</p>}
    </div>
  );
};

export default AnswerVariantSelect;