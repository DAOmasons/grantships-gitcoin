import {
  Avatar,
  Box,
  Button,
  Group,
  Stack,
  Stepper,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layout/Page';
import { ReactNode, useState } from 'react';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconCheck,
  IconLink,
  IconMail,
  IconPhoto,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useChews } from '../hooks/useChews';
import { QUESTION_DESCRIPTIONS } from '../constants/rubric';

export const SubmitApplicationAlt = () => {
  const [step, setStep] = useState(0);
  const { applicationRound } = useChews();
  const form = useForm({
    initialValues: {
      roundName: '',
      address: '',
      imgUrl: '',
      responses: [],
      email: '',
      x: '',
      discord: '',
      github: '',
      telegram: '',
    },
  });
  const { colors } = useMantineTheme();

  const appCopy = applicationRound?.rubric;

  return (
    <PageLayout title="Submit Application">
      <Stepper
        active={step}
        completedIcon={<IconCheck color={colors.dark[6]} />}
      >
        <Stepper.Step>
          <StepLayout
            sectionName="Applicant Details"
            step={step}
            setStep={setStep}
          >
            <ApplicantDetails />
          </StepLayout>
        </Stepper.Step>
        {appCopy?.sections.map((section, index) => (
          <Stepper.Step key={section.sectionName}>
            <StepLayout
              sectionName={section.sectionName}
              step={step}
              setStep={setStep}
            >
              {section.questions.map((question) => (
                <Box key={question.title}>
                  <Text fw={600} mb={8}>
                    {question.title}
                  </Text>
                  <Text c="subtle" mb="sm">
                    {QUESTION_DESCRIPTIONS[question.title]}
                  </Text>
                  <Textarea
                    required
                    placeholder={'Answer here'}
                    rows={3}
                    autosize={false}
                    mb="lg"
                  />
                </Box>
              ))}
            </StepLayout>
          </Stepper.Step>
        ))}
      </Stepper>
    </PageLayout>
  );
};

const StepLayout = ({
  sectionName,
  children,
  step,
  disabled,
  setStep,
  onSubmit,
}: {
  step: number;
  sectionName: string;
  children: ReactNode;
  disabled?: boolean;
  setStep: (step: number) => void;
  onSubmit?: () => void;
}) => {
  const totalSteps = 5;

  return (
    <Box mt="xl">
      <Title order={3} fz="h3" mb="sm">
        {sectionName}
      </Title>
      {step !== 0 && (
        <Text mb={'lg'}>Please provide an answer for each question</Text>
      )}
      {children}
      <Box mt={70}>
        <Group justify="center" gap="xl">
          <Button
            variant="secondary"
            disabled={step === 0}
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

const ApplicantDetails = () => {
  const { colors } = useMantineTheme();

  return (
    <Stack gap="lg" mb={100}>
      <Group justify="center">
        <Avatar src={''} bg={colors.dark[2]} size={171} mb="xl">
          <IconPhoto size={72} color={colors.dark[5]} />
        </Avatar>
      </Group>
      <Group wrap="nowrap" gap="sm">
        <TextInput
          label="Name"
          required
          w={'50%'}
          placeholder="Grant Program Name"
        />
        <TextInput label="Account" required w={'50%'} placeholder="0x1234..." />
      </Group>
      <TextInput
        label="Profile Photo URL"
        required
        leftSection={<IconLink color={colors.dark[4]} />}
        placeholder="https://example.com/profile.jpg"
      />
      {/* <Text fw={700} fz="xl">
        Socials
      </Text> */}
      <Group wrap="nowrap" gap="sm">
        <TextInput
          label="Email"
          required
          w={'50%'}
          placeholder="example@yesmail.xyz"
          leftSection={<IconMail color={colors.dark[4]} />}
        />
        <TextInput
          label="X"
          required
          w={'50%'}
          placeholder="@example"
          leftSection={<IconBrandX color={colors.dark[4]} />}
        />
      </Group>
      <Group wrap="nowrap" gap="sm">
        <TextInput
          label="Discord"
          w={'50%'}
          placeholder="https://discord.gg/example"
          leftSection={<IconBrandDiscord color={colors.dark[4]} />}
        />
        <TextInput
          label="GitHub"
          w={'50%'}
          placeholder="@example"
          leftSection={<IconBrandGithub color={colors.dark[4]} />}
        />
      </Group>
      <TextInput
        label="Telegram"
        w={'50%'}
        placeholder="https://t.me/"
        leftSection={<IconBrandTelegram color={colors.dark[4]} />}
      />
    </Stack>
  );
};
