import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaProps {
  register: UseFormRegisterReturn<string>;
  placeholder: string;
  class_name?: string;
  error?: string;
  isError?: boolean;
}

const TextArea: FC<TextAreaProps> = ({class_name, placeholder, error, isError, register}) => {
  return (
    <>
      <textarea
        {...register}
        className={class_name}
        placeholder={placeholder}
      />
      {isError && <p className={'text-red-500 mb-3 ml-3 text-left'}>{error}</p>}
    </>
  );
};

export default TextArea;