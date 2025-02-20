import {
  Box,
  Card,
  InputLabel,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { ExternalLink } from '../typography';
import { urlRegex } from '../../utils/common';

const renderWithLinks = (text: string) => {
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <ExternalLink key={`${part}-${index}`} href={part}>
          {part}
        </ExternalLink>
      );
    }
    return part;
  });
};

export const ResponseBlock = ({
  label,
  response,
  isEdit,
  id,
  form,
}: {
  label: string;
  response: string;
  isEdit?: boolean;
  id: string;
  form: any;
}) => {
  if (isEdit) {
    return (
      <Box>
        <InputLabel fw={600} mb={10}>
          {label}
        </InputLabel>
        <Textarea
          c="subtle"
          className={'ws-pre-wrap'}
          value={response}
          size="sm"
          {...form.getInputProps(id)}
        />
      </Box>
    );
  }
  return (
    <Box>
      <Text fw={600} mb={10}>
        {label}
      </Text>
      <Card variant="inner">
        <Text c="subtle" className={'ws-pre-wrap'}>
          {renderWithLinks(response)}
        </Text>
      </Card>
    </Box>
  );
};

export const ResponseLink = ({
  label,
  href,
  isEdit,
  id,
  form,
}: {
  label: string;
  href: string;
  isEdit?: boolean;
  id: string;
  form;
}) => {
  if (isEdit) {
    return (
      <Box>
        <InputLabel fw={600} mb={10}>
          {label}
        </InputLabel>
        <TextInput value={href} {...form.getInputProps(id)} />
      </Box>
    );
  }

  return (
    <Box>
      <Text fw={600} mb={10}>
        {label}
      </Text>
      <Card variant="inner">
        <ExternalLink href={href}>{href}</ExternalLink>
      </Card>
    </Box>
  );
};
