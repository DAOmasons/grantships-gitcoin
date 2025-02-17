import { PageLayout } from '../layout/Page';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Group,
  InputLabel,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAppDraft } from '../queries/getAppDrafts';
import { ExternalLink } from '../components/typography';
import { useTablet } from '../hooks/useBreakpoints';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { urlRegex } from '../utils/common';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useApplicationForm } from '../hooks/formHooks/useApplicationForm';

export const AppDraft = () => {
  const { id } = useParams();

  const {
    data: draft,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['app-draft', id],
    queryFn: () => getAppDraft(id as string),
    enabled: !!id,
  });

  const [isEdit, setIsEdit] = useState(true);

  const { colors } = useMantineTheme();
  const { copy } = useClipboard();
  const isTablet = useTablet();

  const { form } = useApplicationForm();

  if (isLoading) {
    return (
      <PageLayout title="GG Round Application">
        <></>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="GG Round Application">
        <>Error</>
      </PageLayout>
    );
  }

  if (!draft) {
    return <PageLayout title="GG Round Application">No data</PageLayout>;
  }

  return (
    <PageLayout title="GG Round Application">
      <Group justify="center">
        <Avatar src={draft?.parsedJSON.imgUrl} bg="white" size={171} mb="xl" />
      </Group>
      <Stack gap="lg" mb={100}>
        <Title fz="h3" order={3} mb="sm">
          Round Info
        </Title>
        <Flex wrap="nowrap" gap="sm" direction={isTablet ? 'column' : 'row'}>
          <Box w={isTablet ? '100%' : '50%'}>
            {!isEdit ? (
              <>
                <Text fw={600} mb={10}>
                  Name
                </Text>

                <Card variant="inner">
                  <Text c="subtle" lineClamp={1}>
                    {draft?.parsedJSON.name}
                  </Text>
                </Card>
              </>
            ) : (
              <>
                <InputLabel fw={600} mb={10}>
                  Name
                </InputLabel>
                <TextInput value={draft?.parsedJSON.name} />
              </>
            )}
          </Box>
          <Box w={isTablet ? '100%' : '50%'}>
            {isEdit ? (
              <>
                <InputLabel fw={600} mb={10}>
                  Address
                </InputLabel>
                <TextInput value={draft?.userAddress} />
              </>
            ) : (
              <>
                <Text fw={600} mb={10}>
                  Address
                </Text>
                <Card
                  variant="inner"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    copy(draft.userAddress);
                    notifications.show({
                      title: 'Copied to clipboard',
                      message: draft.userAddress,
                      color: colors.kelp[6],
                    });
                  }}
                >
                  <Text c="subtle" lineClamp={1}>
                    {draft.userAddress}
                  </Text>
                </Card>
              </>
            )}
          </Box>
        </Flex>
        <ResponseBlock
          label="Round Description"
          response={draft.parsedJSON.description}
          isEdit={isEdit}
        />
        <ResponseLink
          label="Social Link"
          href={draft.parsedJSON.socialLink}
          isEdit={isEdit}
        />
        <ResponseBlock
          label="Type of Projects Funded"
          response={draft.parsedJSON.typeOfProjects}
          isEdit={isEdit}
        />
        <ResponseBlock
          label="Round History"
          response={draft.parsedJSON.roundHistory}
          isEdit={isEdit}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />
        <Title fz="h3" order={3} mb="sm">
          Round Operator and Team
        </Title>
        <ResponseBlock
          label="Round Operator"
          response={draft.parsedJSON['Identified Round Operator']}
          isEdit={isEdit}
        />
        <ResponseBlock
          label="Team Members"
          response={draft.parsedJSON['Team Members']}
          isEdit={isEdit}
        />
        <ResponseBlock
          label="Advisors"
          response={draft.parsedJSON.advisors}
          isEdit={isEdit}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />
        <Title fz="h3" order={3} mb="sm">
          Round Strategy
        </Title>
        <ResponseBlock
          label="Round Eligibility Criteria"
          response={draft.parsedJSON.eligibilityCriteria}
          isEdit={isEdit}
        />
        <ResponseBlock
          label="Round Mechanism"
          response={draft.parsedJSON.fundingMechanism}
          isEdit={isEdit}
        />
        <ResponseLink
          label="Marketing Strategy Link"
          href={draft.parsedJSON.marketingPlanURL}
          isEdit={isEdit}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />
        <Title fz="h3" order={3} mb="sm">
          Impact & Intents
        </Title>
        <ResponseBlock
          label="Alignment with Gitcoin DAO Intents"
          response={draft.parsedJSON['Mission Alignment']}
          isEdit={isEdit}
        />
        <ResponseBlock
          label="Impact Assessment Plan"
          response={draft.parsedJSON['Impact Assessment Plan']}
          isEdit={isEdit}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />

        <Title fz="h3" order={3} mb="sm">
          Community Engagement
        </Title>
        <ResponseBlock
          label="Community Size and Engagement"
          isEdit={isEdit}
          response={draft.parsedJSON['Community Size and Engagement']}
        />
        <ResponseBlock
          label="Estimated Number of Grantees"
          isEdit={isEdit}
          response={draft.parsedJSON.granteeEstimate}
        />
        <ResponseBlock
          label="Anticipated Matching Pool"
          isEdit={isEdit}
          response={draft.parsedJSON['Matching Pool Impact']}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />
        <Title fz="h3" order={3} mb="sm">
          Conclusion
        </Title>
        <ResponseBlock
          label="Stated Conflicts of Interest"
          isEdit={isEdit}
          response={draft.parsedJSON.COI}
        />
        <ResponseBlock
          label="Additional Considerations"
          isEdit={isEdit}
          response={draft.parsedJSON.considerations}
        />
        <ResponseBlock
          label="More Information"
          isEdit={isEdit}
          response={draft.parsedJSON.moreInfo}
        />
      </Stack>
    </PageLayout>
  );
};
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

const ResponseBlock = ({
  label,
  response,
  isEdit,
  form,
}: {
  label: string;
  response: string;
  isEdit?: boolean;
  form?: any;
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

const ResponseLink = ({
  label,
  href,
  isEdit,
}: {
  label: string;
  href: string;
  isEdit?: boolean;
}) => {
  if (isEdit) {
    return (
      <Box>
        <InputLabel fw={600} mb={10}>
          {label}
        </InputLabel>

        <TextInput value={href} />
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
