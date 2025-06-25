import React from 'react';
import { Metadata } from 'next';
import CreateQuestionPage from '@/components/createQuestionPage/CreateQuestionPage';
import styles from '../../root.module.scss'

export async function generateMetadata() {
  const metadata: Metadata = {
    title: 'Create Question',
    description: 'Create new question',
    keywords: 'question, new',
    alternates: {
      canonical: '/questions/create',
    },
    openGraph: {
      title: 'Create Question',
      description: '',
      url: '/questions/create',
      locale: 'en_US',
      type: 'website',
      
    },
  };
  return metadata;
}

const CreatePage = () => {
  
  return (
    <div className={styles.root}>
      <CreateQuestionPage />
    </div>
  );
};

export default CreatePage;