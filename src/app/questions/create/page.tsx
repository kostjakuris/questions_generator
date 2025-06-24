import React from 'react';
import { Metadata } from 'next';
import CreateQuestionPage from '@/components/createQuestionPage/CreateQuestionPage';
import styles from '../../root.module.scss'

export async function generateMetadata() {
  const metadata: Metadata = {
    title: 'Sign up',
    description: 'Create your account',
    keywords: 'sign up, account, email,password',
    alternates: {
      canonical: '/register',
    },
    openGraph: {
      title: 'Sign up',
      description: '',
      url: '/register',
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