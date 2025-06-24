import React from 'react';
import styles from './list.module.scss';

const QuestionList = () => {
  return (
    <div className={'flex flex-col items-center w-[400px] bg-gray-300 px-5'}>
      <h2 className={styles.question__title}>Questions</h2>
      <div className={'w-full h-[120px] border-gray-500 border rounded-2xl my-5'}>
        <div className={'flex items-center pt-3'}>
          <span className={'w-8 h-8 rounded-4xl bg-gray-400 ml-5 text-center pt-1'}>1</span>
          <p className={styles.question__text}>Question 1</p>
        </div>
        <div className={'w-40 h-7 rounded-2xl bg-gray-400 opacity-80 mt-8 ml-7'}>
          <p className={styles.question__text}>Multiple answer</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;