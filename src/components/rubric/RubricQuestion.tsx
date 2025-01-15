import {
  Box,
  Card,
  Collapse,
  Group,
  InputLabel,
  Radio,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { RoundApplicationContent } from '../../constants/dummyApplications';
import { Question } from '../../constants/rubric';
import { useDisclosure } from '@mantine/hooks';
import { useMemo } from 'react';
import { AddressAvatar } from '../AddressAvatar';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Address } from 'viem';

export const RubricQuestion = ({
  question,
  setScores,
  scores,
  appCopy,
  registrar,
}: {
  scores: Record<string, number>;
  question: Question;
  setScores: (key: string, value: number) => void;
  appCopy: RoundApplicationContent;
  registrar?: string;
}) => {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  const applicantResponse = useMemo(() => {
    return appCopy.responses.find(
      (response) => response.title === question.title
    );
  }, [appCopy, question.title]);

  return (
    <Box mb="xxl">
      <InputLabel fw={600} fz="lg" mb={24} key={question.title} required>
        {question.title}
      </InputLabel>
      {question.options.map((option) => {
        return (
          <Radio
            key={option.optionText}
            size="md"
            checked={scores[question.title] === option.optionScore}
            onChange={() => {
              setScores(question.title, option.optionScore);
            }}
            mb={22}
            label={`${option.optionText} (${option.optionScore} points)`}
          />
        );
      })}
      <Group gap={8} mt={24}>
        <Text fz="lg" c={colors.dark[4]}>
          Response from
        </Text>
        <AddressAvatar address={registrar as Address} fz={24} />
        <Text fz="lg" c={colors.dark[4]}>
          {appCopy.roundName}
        </Text>
        <Group gap={4} style={{ cursor: 'pointer' }} onClick={() => toggle()}>
          <Text c={colors.dark[4]} fz="lg" td="underline" fw={500}>
            Expand
          </Text>
          {opened ? <IconChevronUp /> : <IconChevronDown />}
        </Group>
      </Group>
      <Collapse in={opened}>
        <Card variant="inner" mt={'md'}>
          <Text c={colors.dark[4]}>{applicantResponse?.response}</Text>
        </Card>
      </Collapse>
    </Box>
  );
};
