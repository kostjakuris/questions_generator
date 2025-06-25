import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  register: UseFormRegisterReturn<string>;
  placeholder: string;
  type: string;
  class_name?: string;
  error: string;
  isError: boolean;
}

const Input: FC<InputProps> = ({class_name, placeholder, type, error, isError, register}) => {
  return (
    <div className={'flex flex-col items-center h-[60px] max-w-[600px] w-full'}>
      <input
        {...register}
        className={class_name}
        placeholder={placeholder}
        type={type}
      />
      {isError && <p className={'text-red-500 w-full mb-3 ml-3 text-left'}>{error}</p>}
    </div>
  );
};

export default Input;