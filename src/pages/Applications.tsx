import React from 'react';
import { PageLayout } from '../layout/Page';
import { useQuery } from '@tanstack/react-query';
import { getAppDrafts } from '../queries/getAppDrafts';

export const Applications = () => {
  const { data } = useQuery({
    queryKey: ['applications'],
    queryFn: getAppDrafts,
  });
  console.log('data', data);
  return (
    <PageLayout title="Round Applications">
      <></>
    </PageLayout>
  );
};
