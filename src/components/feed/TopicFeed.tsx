import {
  Avatar,
  Box,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconPencil, IconStar } from '@tabler/icons-react';

export const TopicFeed = ({
  topicId,
  title,
}: {
  topicId: string;
  title: string;
}) => {
  // const {} = useQuery({})

  return (
    <Box>
      <Title fz="h3" order={3} mb="xl">
        {title}
      </Title>
      <Stack>
        <Edited />
        <Divider my="sm" />
        <Comment />
        <Divider my="sm" />
        <Comment />
        <Divider my="sm" />
        <Comment />
        <Divider my="sm" />
        <Comment />
        <Divider my="sm" />
        <Created />
        <Divider my="sm" />
      </Stack>
    </Box>
  );
};

const Edited = () => {
  const { colors } = useMantineTheme();
  return (
    <Box>
      <Box mx="xs">
        <Group wrap="nowrap" align="center" mb="xs">
          <IconPencil stroke={1.2} size={40} color={colors.purple[6]} />
          <Group gap="xs">
            <Text fw={600}>Application Edited</Text>
            <Text c="subtle" fz="sm">
              ·
            </Text>
            <Text c="subtle" fz="sm">
              Jan 1, 2025
            </Text>
          </Group>
        </Group>
        <Box ml={62}>
          <Text c="subtle" className={'ws-pre-wrap'}>
            Application edited by 0x2w3...3l4. To view the previous version of
            this application, click here.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const Created = () => {
  const { colors } = useMantineTheme();
  return (
    <Box>
      <Box mx="xs">
        <Group wrap="nowrap" align="center" mb="xs">
          <IconStar size={40} color={colors.purple[6]} />
          <Group gap="xs">
            <Text fw={600}>Application Created</Text>
            <Text c="subtle" fz="sm">
              ·
            </Text>
            <Text c="subtle" fz="sm">
              Jan 1, 2025
            </Text>
          </Group>
        </Group>
        {/* <Box ml={62}>
          <Text c="subtle" className={'ws-pre-wrap'}>
            Application created by 0x2w3...3l4
          </Text>
        </Box> */}
      </Box>
    </Box>
  );
};

const Comment = () => {
  return (
    <Box>
      <Box mx="xs">
        <Group wrap="nowrap" align="center" mb="xs">
          <Avatar size={40} bg="blue" />
          <Group gap="xs">
            <Text fw={600}>0x2w3...3l4</Text>
            <Text c="subtle" fz="sm">
              ·
            </Text>
            <Text c="subtle" fz="sm">
              Jan 1, 2025
            </Text>
          </Group>
        </Group>
        <Box ml={64}>
          <Text c="subtle" className={'ws-pre-wrap'}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
