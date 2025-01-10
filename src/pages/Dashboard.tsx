import { InfoTimeline } from '../components/InfoTimeline';
import { PageLayout } from '../layout/Page';

export const Dashboard = () => {
  return (
    <PageLayout title="Judge Dashboard">
      <InfoTimeline
        events={[
          'Round Applications',
          'Judge Vote',
          'Rounds Live',
          'Round Review',
        ]}
        step={1}
      />
    </PageLayout>
  );
};
