import {
  Avatar,
  Box,
  Divider,
  Group,
  Stack,
  Stepper,
  Text,
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

export const SubmitApplicationAlt = () => {
  const [step, setStep] = useState(0);
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

  return (
    <PageLayout title="Submit Application">
      <Stepper
        active={step}
        completedIcon={<IconCheck color={colors.dark[6]} />}
      >
        <Stepper.Step>
          <StepLayout sectionName="Applicant Details">
            <ApplicantDetails />
          </StepLayout>
        </Stepper.Step>
        <Stepper.Step>
          <StepLayout sectionName="Round Operators and Team"></StepLayout>
        </Stepper.Step>
        <Stepper.Step>
          <StepLayout sectionName="Fundraising"></StepLayout>
        </Stepper.Step>
        <Stepper.Step>
          <StepLayout sectionName="Alignment with one of the GG23's Intents"></StepLayout>
        </Stepper.Step>
        <Stepper.Step>
          <StepLayout sectionName="Community and Impact"></StepLayout>
        </Stepper.Step>
      </Stepper>
    </PageLayout>
  );
};

const StepLayout = ({
  sectionName,
  children,
}: {
  sectionName: string;
  children: ReactNode;
}) => {
  return (
    <Box mt="xl">
      <Title order={3} fz="h3" mb="sm">
        {sectionName}
      </Title>
      {children}
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
