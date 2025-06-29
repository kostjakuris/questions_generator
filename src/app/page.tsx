import styles from '@/app/root.module.scss';
import CreateQuestionPage from '@/components/createQuestionPage/CreateQuestionPage';
import React from 'react';
import { Metadata } from 'next';

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

export default function Home() {
  return (
    <div className={styles.root}>
      <CreateQuestionPage />
    </div>
  );
}
