import React, { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  register: UseFormRegisterReturn<string>;
  placeholder?: string;
  type: string;
  class_name?: string;
  value?: string;
  error?: string;
  isError?: boolean;
}

const Input: FC<InputProps> = ({class_name, placeholder, type, error, isError, register, value}) => {
  return (
    <div className={type === 'checkbox' || type === 'radio' ? 'flex flex-col items-center h-[60px]' :
      'flex flex-col items-center h-[60px] max-w-[600px] w-full'}>
      {
        value ?
          <div className={'flex'}>
            <input
              {...register}
              className={type === 'checkbox' || type === 'radio' ? `${class_name} mx-5` : `${class_name} mr-5`}
              placeholder={placeholder}
              type={type}
              value={value}
            />
            <label className={'text-black'} htmlFor={value}>{value}</label>
          </div>
          :
          <input
            {...register}
            className={class_name}
            placeholder={placeholder}
            type={type}
          />
      }
      {isError && <p className={'text-red-500 w-full mb-3 ml-3 text-left'}>{error}</p>}
    </div>
  );
};

export default Input;