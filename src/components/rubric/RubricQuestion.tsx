import {
  Avatar,
  Box,
  Card,
  Collapse,
  Group,
  InputLabel,
  Radio,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Question } from '../../constants/rubric';
import { useDisclosure } from '@mantine/hooks';
import { useMemo } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { ApplicationMetadata } from '../../queries/getMetadata';

export const RubricQuestion = ({
  question,
  setScores,
  scores,
  imgUrl,
  appCopy,
  roundName,
  registrar,
}: {
  scores: Record<string, number>;
  question: Question;
  imgUrl: string;
  setScores: (key: string, value: number) => void;
  appCopy: ApplicationMetadata;
  roundName: string;
  registrar?: string;
}) => {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  const applicantResponse = appCopy[question.title];

  return (
    <Box mb="xxl">
      <InputLabel
        fw={600}
        fz="lg"
        mb={24}
        key={question.title}
        c={colors.dark[2]}
        required
      >
        {question.title}
      </InputLabel>
      {question.options.map((option) => {
        const isChecked = scores[question.title] === option.optionScore;

        return (
          <Radio
            key={option.optionText}
            size="md"
            checked={isChecked}
            onChange={() => {
              setScores(question.title, option.optionScore);
            }}
            mb={22}
            c={isChecked ? colors.dark[1] : colors.dark[4]}
            label={`${option.optionText} (${option.optionScore} points)`}
          />
        );
      })}
      <Group gap={8} mt={24}>
        <Text fz="lg" c={'subtle'}>
          Response from
        </Text>
        <Avatar src={imgUrl} size={24} bg="white" />
        <Text fz="lg" c={'subtle'}>
          {roundName}
        </Text>
        <Group gap={4} style={{ cursor: 'pointer' }} onClick={() => toggle()}>
          <Text c={'subtle'} fz="lg" td="underline" fw={500}>
            Expand
          </Text>
          {opened ? <IconChevronUp /> : <IconChevronDown />}
        </Group>
      </Group>
      <Collapse in={opened}>
        <Card variant="inner" mt={'md'} bg={colors.dark[6]}>
          <Text c={colors.dark[2]}>{applicantResponse}</Text>
        </Card>
      </Collapse>
    </Box>
  );
};
