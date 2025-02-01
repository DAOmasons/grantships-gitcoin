import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Group,
  InputLabel,
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
  IconExclamationCircle,
  IconLink,
  IconMail,
  IconPhoto,
} from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useChews } from '../hooks/useChews';
import { QUESTION_DESCRIPTIONS } from '../constants/rubric';
import { z } from 'zod';
import { useTx } from '../contexts/useTx';
import SayethAbi from '../abi/Sayeth.json';
import { ADDR } from '../constants/addresses';
import { generateRandomBytes32 } from '../utils/common';
import { ZER0_ADDRESS } from '../constants/setup';
import { encodeAbiParameters, parseAbiParameters } from 'viem';
import { StepLayout } from '../layout/StepLayout';

const formSchema = z.object({
  roundName: z.string().min(1, 'Round name is required'),
  imgUrl: z.string().url('Please enter a valid URL'),
  responses: z.record(z.string(), z.string()),
  email: z.string().email('Please enter a valid email'),
  x: z.string().min(1, 'X username is required'),
  discord: z.string().optional(),
  github: z.string().optional(),
  telegram: z.string().optional(),
  autoEnroll: z.boolean(),
});

export const SubmitApplicationAlt = () => {
  const [step, setStep] = useState(0);
  const { applicationRound } = useChews();
  const { tx } = useTx();
  const form = useForm({
    initialValues: {
      roundName: '',
      imgUrl: '',
      responses: {} as Record<string, string>,
      email: '',
      x: '',
      discord: '',
      github: '',
      telegram: '',
      autoEnroll: true,
    },
    validateInputOnBlur: true,
    validate: zodResolver(formSchema),
  });
  const { colors } = useMantineTheme();

  const appCopy = applicationRound?.rubric;

  const appDetailsAnswered =
    form.values.roundName &&
    form.values.imgUrl &&
    form.values.email &&
    form.values.x;

  const handlePost = () => {
    const id = generateRandomBytes32();

    const valid = formSchema.safeParse(form.values);

    if (!valid.success) {
      // todo - show error message
      console.log('Invalid form values');
      return;
    }

    const json = JSON.stringify({ ...form.values, id });

    const bytes = encodeAbiParameters(parseAbiParameters('string'), [json]);

    tx({
      writeContractParams: {
        abi: SayethAbi,
        address: ADDR.SAYETH,
        functionName: 'sayeth',
        args: [ZER0_ADDRESS, bytes, false],
      },
    });
  };

  return (
    <PageLayout title="Submit Application">
      <Stepper
        active={step}
        completedIcon={<IconCheck color={colors.dark[6]} />}
      >
        <Stepper.Step>
          <StepLayout
            title="Applicant Details"
            step={step}
            setStep={setStep}
            disabled={!appDetailsAnswered}
          >
            <Stack gap="lg" mb={100}>
              <Group justify="center">
                <Avatar
                  src={form.values.imgUrl || ''}
                  bg={colors.dark[2]}
                  size={171}
                  mb="xl"
                >
                  <IconPhoto size={72} color={colors.dark[5]} />
                </Avatar>
              </Group>
              <TextInput
                label="Name"
                required
                placeholder="Grant Program Name"
                {...form.getInputProps('roundName')}
              />
              <TextInput
                label="Profile Photo URL"
                required
                leftSection={<IconLink color={colors.dark[4]} />}
                placeholder="https://example.com/profile.jpg"
                {...form.getInputProps('imgUrl')}
              />
              <Group wrap="nowrap" gap="sm" align="start">
                <TextInput
                  label="Email"
                  required
                  w={'50%'}
                  placeholder="example@yesmail.xyz"
                  leftSection={<IconMail color={colors.dark[4]} />}
                  {...form.getInputProps('email')}
                />
                <TextInput
                  label="X"
                  required
                  w={'50%'}
                  placeholder="@example"
                  leftSection={<IconBrandX color={colors.dark[4]} />}
                  {...form.getInputProps('x')}
                />
              </Group>
              <Group wrap="nowrap" gap="sm" align="start">
                <TextInput
                  label="Discord"
                  w={'50%'}
                  placeholder="https://discord.gg/example"
                  leftSection={<IconBrandDiscord color={colors.dark[4]} />}
                  {...form.getInputProps('discord')}
                />
                <TextInput
                  label="GitHub"
                  w={'50%'}
                  placeholder="@example"
                  leftSection={<IconBrandGithub color={colors.dark[4]} />}
                  {...form.getInputProps('github')}
                />
              </Group>
              <TextInput
                label="Telegram"
                w={'50%'}
                placeholder="https://t.me/"
                leftSection={<IconBrandTelegram color={colors.dark[4]} />}
                {...form.getInputProps('telegram')}
              />
            </Stack>
          </StepLayout>
        </Stepper.Step>
        {appCopy?.sections.map((section, index) => (
          <Stepper.Step key={section.sectionName}>
            <StepLayout
              title={section.sectionName}
              step={step}
              setStep={setStep}
              onSubmit={
                index === appCopy.sections.length - 1 ? handlePost : undefined
              }
              disabled={
                !section.questions.every(
                  (question) => form.values.responses[question.title]
                )
              }
            >
              {section.questions.map((question) => (
                <Box key={question.title}>
                  <InputLabel fz="md" fw={600} mb={8} required>
                    {question.title}
                  </InputLabel>
                  <Text c="subtle" mb="sm">
                    {QUESTION_DESCRIPTIONS[question.title]}
                  </Text>
                  <Textarea
                    required
                    placeholder={'Answer here'}
                    rows={3}
                    autosize={false}
                    mb="lg"
                    {...form.getInputProps(`responses.${question.title}`)}
                  />
                </Box>
              ))}
              {index === appCopy.sections.length - 1 && (
                <Stack>
                  <Checkbox
                    label="Automatically enroll me for GG23"
                    color={colors.kelp[6]}
                    iconColor={colors.dark[6]}
                    checked={form.values.autoEnroll}
                    {...form.getInputProps('autoEnroll')}
                  />
                  <Card variant="solid">
                    <Group wrap="nowrap" gap={'xs'}>
                      <Box
                        component="span"
                        style={{ transform: 'translateY(-20px)' }}
                      >
                        <IconExclamationCircle
                          size={28}
                          stroke={1.5}
                          color={colors.kelp[6]}
                        />
                      </Box>
                      <Text fz="sm">
                        The wallet you are signing this transaction with will be
                        the primary address for your profile. Please ensure that
                        you are connected to a wallet that you plan to use and
                        access during the duration of the program.
                      </Text>
                    </Group>
                  </Card>
                </Stack>
              )}
            </StepLayout>
          </Stepper.Step>
        ))}
      </Stepper>
    </PageLayout>
  );
};
