import React from 'react';
import QuestionItem from '@/components/questionItem/QuestionItem';
import styles from '../../root.module.scss';

const TodoPage = async({params}: {params: {questionId: string}}) => {
  const {questionId} = await params;
  return (
    <div className={styles.root}>
      <QuestionItem questionId={questionId} />
    </div>
  );
};

export default TodoPage;