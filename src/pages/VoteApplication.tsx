import { useState } from 'react';
import { PageLayout } from '../layout/Page';
import { Stepper, Text } from '@mantine/core';
import { RUBRIC_COPY } from '../constants/rubric';
import { useChews } from '../hooks/useChews';
import { useParams } from 'react-router-dom';
import { RoundApplicationContent } from '../constants/dummyApplications';
import { RubricStep } from '../components/rubric/RubricStep';

export const VoteApplication = () => {
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const { applicationRound, isLoadingAppRound } = useChews();

  const currentApplication = applicationRound?.applications.find(
    (app) => app.id === id
  );

  const appCopy = currentApplication?.copy;
  const registrar = currentApplication?.registrar;

  if (isLoadingAppRound) {
    return null;
  }

  if (!appCopy) {
    return (
      <PageLayout title="Application Vote">
        <Text>Application not found</Text>
      </PageLayout>
    );
  }

  const handleChangeScore = (key: string, value: number) => {
    setScores({ ...scores, [key]: value });
  };

  const handleChangeFeedback = (key: string, value: string) => {
    setFeedback({ ...feedback, [key]: value });
  };

  return (
    <PageLayout title="Application Vote">
      <Stepper active={step}>
        {RUBRIC_COPY.sections.map((section, index) => {
          return (
            <Stepper.Step
              key={index}
              label={section.sectionLabel}
              completedIcon={index + 1}
            >
              <RubricStep
                section={section}
                scores={scores}
                setScores={handleChangeScore}
                setFeedback={handleChangeFeedback}
                feedback={feedback[section.sectionName]}
                setStep={setStep}
                index={index}
                totalSteps={RUBRIC_COPY.sections.length}
                appCopy={appCopy as RoundApplicationContent}
                registrar={registrar}
              />
            </Stepper.Step>
          );
        })}
      </Stepper>
    </PageLayout>
  );
};
