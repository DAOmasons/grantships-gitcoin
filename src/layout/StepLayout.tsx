import { Box, Button, Group, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';

export const StepLayout = ({
  title,
  children,
  description,
  step,
  disabled,
  setStep,
  onSubmit,
  requiredFeilds,
}: {
  step: number;
  description?: string;
  title: string;
  children?: ReactNode;
  disabled?: boolean;
  setStep: (step: number) => void;
  onSubmit?: () => void;
  requiredFeilds?: [string | undefined];
}) => {
  const totalSteps = 6;

  //   const hasAllRequiredFields = requiredFeilds?.every((field) => !!field);

  return (
    <Box mt="xl">
      <Title order={3} fz="h3" mb="sm">
        {title}
      </Title>
      {description && <Text mb={'lg'}>{description}</Text>}
      <Box mx="32">{children}</Box>
      <Box mt={70}>
        <Group justify="center" gap="xl">
          <Button
            variant="secondary"
            // disabled={step === 0}
            onClick={step === 0 ? undefined : () => setStep(step - 1)}
          >
            Back
          </Button>
          {step === totalSteps - 1 ? (
            <Button disabled={disabled} onClick={onSubmit}>
              Submit
            </Button>
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
