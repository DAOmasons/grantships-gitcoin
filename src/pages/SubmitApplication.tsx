import { PageLayout } from '../layout/Page';
import {
  Avatar,
  Group,
  Stack,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconLink,
  IconMail,
  IconPhoto,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

export const SubmitApplication = () => {
  const { colors } = useMantineTheme();
  const [opened, { open, close }] = useDisclosure();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      imgUrl: '',
    },
  });

  return (
    <PageLayout title="Submit Application">
      <Group justify="center">
        <Avatar
          src={form.values['imgUrl'] || ''}
          bg={colors.dark[2]}
          size={171}
          mb="xl"
        >
          <IconPhoto
            size={72}
            color={colors.dark[5]}
            style={{ cursor: 'pointer' }}
            onClick={() => open()}
          />
        </Avatar>
      </Group>
      <Stack gap="lg" mb={100}>
        <Group wrap="nowrap" gap="sm">
          <TextInput
            label="Name"
            required
            w={'50%'}
            placeholder="Grant Program Name"
          />
          <TextInput
            label="Account"
            required
            w={'50%'}
            placeholder="0x1234..."
          />
        </Group>
        <TextInput
          label="Profile Photo URL"
          required
          leftSection={<IconLink color={colors.dark[4]} />}
          placeholder="https://example.com/profile.jpg"
        />
        <Textarea
          label="Identified Round Operator"
          required
          placeholder={
            'Please share your experience with past experience of running a round'
          }
          rows={3}
          autosize={false}
        />
        <Textarea
          label="Team members with previous experience to run a round"
          required
          placeholder={
            'Please share your team experience with previous experience to run a round'
          }
          rows={3}
          autosize={false}
        />
        <Textarea
          label="Mission Alignment"
          required
          placeholder={
            'How does your program align with the core Gitcoin DAO intents'
          }
          rows={3}
          autosize={false}
        />
        <Textarea
          label="Matching Pool Impact"
          required
          placeholder={'Please share your experience'}
          rows={3}
          autosize={false}
        />
        <Textarea
          label="Community Size and Engagement"
          required
          placeholder={'Please share your experience'}
          rows={3}
          autosize={false}
        />
        <Textarea
          label="Impact Assessment Plan"
          required
          placeholder={'Please share your shit'}
          rows={3}
          autosize={false}
        />
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
    </PageLayout>
  );
};

const ImageLinkModal = () => {};
