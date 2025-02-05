import { Box, Button, Group, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';
import { TxButton } from '../components/TxButton';
import { useMobile } from '../hooks/useBreakpoints';

export const StepLayout = ({
  title,
  children,
  description,
  step,
  disabled,
  setStep,
  onSubmit,
}: {
  step: number;
  description?: string;
  title: string;
  children?: ReactNode;
  disabled?: boolean;
  setStep: (step: number) => void;
  onSubmit?: () => void;
}) => {
  const totalSteps = 6;

  const isMobile = useMobile();

  return (
    <Box mt={isMobile ? 'sm' : 'xl'}>
      <Title order={3} fz={isMobile ? 'h4' : 'h3'} mb="sm">
        {title}
      </Title>
      {description && <Text mb={'lg'}>{description}</Text>}
      <Box mx={isMobile ? '10' : '32'}>{children}</Box>
      <Box mt={70}>
        <Group
          justify="center"
          gap={isMobile ? 'md' : 'xl'}
          wrap={isMobile ? 'wrap-reverse' : 'wrap'}
        >
          <Button
            variant="secondary"
            disabled={step === 0}
            onClick={step === 0 ? undefined : () => setStep(step - 1)}
          >
            Back
          </Button>
          {step === totalSteps - 1 ? (
            <TxButton disabled={disabled} onClick={onSubmit}>
              Submit
            </TxButton>
          ) : (
            <Button disabled={disabled} onClick={() => setStep(step + 1)}>
              Next
            </Button>
          )}
        </Group>
      </Box>
    </Box>
  );
};
