import { PageLayout } from '../layout/Page';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
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
  Tooltip,
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
import { useEffect, useState } from 'react';
import { useApplicationForm } from '../hooks/formHooks/useApplicationForm';
import { IconPencil } from '@tabler/icons-react';
import { useAccount } from 'wagmi';
import { pinJSONToIPFS } from '../utils/ipfs';
import { TAG } from '../constants/tags';
import { encodeAbiParameters, parseAbiParameters } from 'viem';
import { useTx } from '../contexts/useTx';
import SayethAbi from '../abi/Sayeth.json';
import { ADDR } from '../constants/addresses';

export const AppDraft = () => {
  const { id } = useParams();
  const { address } = useAccount();

  const {
    data: draft,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['app-draft', id],
    queryFn: () => getAppDraft(id as string),
    enabled: !!id,
  });

  const [isEdit, setIsEdit] = useState(false);

  const { colors } = useMantineTheme();
  const { copy } = useClipboard();
  const isTablet = useTablet();
  const { tx } = useTx();

  const { form, formSchema, hasErrors } = useApplicationForm();

  console.log('hasErrors', hasErrors);

  const userIsApplicant = address === draft?.userAddress;

  useEffect(() => {
    if (draft) {
      form.setValues({
        name: draft.parsedJSON.name,
        imgUrl: draft.parsedJSON.imgUrl,
        socialLink: draft.parsedJSON.socialLink,
        description: draft.parsedJSON.description,
        typeOfProjects: draft.parsedJSON.typeOfProjects,
        roundHistory: draft.parsedJSON.roundHistory,

        // Step 2: Round Operator and Team

        'Identified Round Operator':
          draft.parsedJSON['Identified Round Operator'],
        'Team Members': draft.parsedJSON['Team Members'],
        advisors: draft.parsedJSON.advisors,

        // Step 3: Round Strategy

        eligibilityCriteria: draft.parsedJSON.eligibilityCriteria,
        marketingPlanURL: draft.parsedJSON.marketingPlanURL,
        fundingMechanism: draft.parsedJSON.fundingMechanism,

        // Step 4: Impact and Intents

        'Mission Alignment': draft.parsedJSON['Mission Alignment'],
        'Impact Assessment Plan': draft.parsedJSON['Impact Assessment Plan'],

        // Step 5: Community Engagement

        'Community Size and Engagement':
          draft.parsedJSON['Community Size and Engagement'],
        granteeEstimate: draft.parsedJSON.granteeEstimate,
        'Matching Pool Impact': draft.parsedJSON['Matching Pool Impact'],

        // Step 6: Final Notes

        COI: draft.parsedJSON.COI,
        considerations: draft.parsedJSON.considerations,
        moreInfo: draft.parsedJSON.moreInfo,
      });
    }
  }, [draft]);

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

  const handleEdit = async () => {
    const valid = formSchema.safeParse(form.values);

    const onChainJson = JSON.stringify({
      name: form.values.name,
      socialLink: form.values.socialLink,
      id,
      imgUrl: form.values.imgUrl,
    });

    if (!valid.success) {
      notifications.show({
        title: 'Error',
        message: 'Failed to validate form values',
        color: 'red',
      });
      return;
    }

    const pinRes = await pinJSONToIPFS({ ...form.values });

    if (!pinRes.IpfsHash) {
      notifications.show({
        title: 'Error',
        message: 'Failed to pin content to IPFS',
        color: 'red',
      });
      return;
    }

    const tag = `${TAG.APPLICATION_EDIT}:${id}`;

    const bytes = encodeAbiParameters(
      parseAbiParameters('string, string, (uint256, string)'),
      [tag, onChainJson, [1n, pinRes.IpfsHash]]
    );

    tx({
      writeContractParams: {
        abi: SayethAbi,
        address: ADDR.SAYETH,
        functionName: 'sayeth',
        args: [ADDR.REFERRER, bytes, false],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetch();
          // navigate(`/view-draft/${id}`);
        },
      },
    });
  };

  return (
    <PageLayout title="GG Round Application">
      <Group justify="center">
        <Avatar
          src={form.values.imgUrl || draft?.parsedJSON.imgUrl}
          bg="white"
          size={171}
          mb="xl"
        />
      </Group>
      <Stack gap="lg" mb={100}>
        <Group mb="sm" justify="space-between">
          <Title fz="h3" order={3}>
            Round Info
          </Title>
          {userIsApplicant ? (
            <ActionIcon onClick={() => setIsEdit(!isEdit)}>
              <IconPencil />
            </ActionIcon>
          ) : (
            <Tooltip label="Only applicant address wallet can edit this application">
              <IconPencil
                color={colors.dark[5]}
                style={{
                  cursor: 'not-allowed',
                }}
              />
            </Tooltip>
          )}
        </Group>
        <Flex wrap="nowrap" gap="sm" direction={isTablet ? 'column' : 'row'}>
          <Box w={isTablet ? '100%' : '50%'}>
            {isEdit ? (
              <>
                <InputLabel fw={600} mb={10}>
                  Name
                </InputLabel>
                <TextInput
                  value={draft?.parsedJSON.name}
                  {...form.getInputProps('name')}
                />
              </>
            ) : (
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
            )}
          </Box>
          <Box w={isTablet ? '100%' : '50%'}>
            {isEdit ? (
              <Tooltip label="Address for application cannot be edited">
                <Box>
                  <InputLabel fw={600} mb={10}>
                    Address
                  </InputLabel>
                  <TextInput
                    value={draft?.userAddress}
                    disabled
                    onChange={() => {}}
                  />
                </Box>
              </Tooltip>
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
        {isEdit && (
          <ResponseLink
            label="Avatar Image URL"
            href={draft.parsedJSON.imgUrl}
            isEdit={isEdit}
            id={'imgUrl'}
            form={form}
          />
        )}
        <ResponseBlock
          label="Round Description"
          response={draft.parsedJSON.description}
          isEdit={isEdit}
          id={'description'}
          form={form}
        />
        <ResponseLink
          label="Social Link"
          href={draft.parsedJSON.socialLink}
          isEdit={isEdit}
          id={'socialLink'}
          form={form}
        />
        <ResponseBlock
          label="Type of Projects Funded"
          response={draft.parsedJSON.typeOfProjects}
          isEdit={isEdit}
          id={'typeOfProjects'}
          form={form}
        />
        <ResponseBlock
          label="Round History"
          response={draft.parsedJSON.roundHistory}
          isEdit={isEdit}
          id={'roundHistory'}
          form={form}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />
        <Title fz="h3" order={3} mb="sm">
          Round Operator and Team
        </Title>
        <ResponseBlock
          label="Round Operator"
          response={draft.parsedJSON['Identified Round Operator']}
          isEdit={isEdit}
          id={'Identified Round Operator'}
          form={form}
        />
        <ResponseBlock
          label="Team Members"
          response={draft.parsedJSON['Team Members']}
          isEdit={isEdit}
          id={'Team Members'}
          form={form}
        />
        <ResponseBlock
          label="Advisors"
          response={draft.parsedJSON.advisors}
          isEdit={isEdit}
          id={'advisors'}
          form={form}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />
        <Title fz="h3" order={3} mb="sm">
          Round Strategy
        </Title>
        <ResponseBlock
          label="Round Eligibility Criteria"
          response={draft.parsedJSON.eligibilityCriteria}
          isEdit={isEdit}
          id={'eligibilityCriteria'}
          form={form}
        />
        <ResponseBlock
          label="Round Mechanism"
          response={draft.parsedJSON.fundingMechanism}
          isEdit={isEdit}
          id={'fundingMechanism'}
          form={form}
        />
        <ResponseLink
          label="Marketing Strategy Link"
          href={draft.parsedJSON.marketingPlanURL}
          isEdit={isEdit}
          id={'marketingPlanURL'}
          form={form}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />
        <Title fz="h3" order={3} mb="sm">
          Impact & Intents
        </Title>
        <ResponseBlock
          label="Alignment with Gitcoin DAO Intents"
          response={draft.parsedJSON['Mission Alignment']}
          isEdit={isEdit}
          id={'Mission Alignment'}
          form={form}
        />
        <ResponseBlock
          label="Impact Assessment Plan"
          response={draft.parsedJSON['Impact Assessment Plan']}
          isEdit={isEdit}
          id={'Impact Assessment Plan'}
          form={form}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />

        <Title fz="h3" order={3} mb="sm">
          Community Engagement
        </Title>
        <ResponseBlock
          label="Community Size and Engagement"
          isEdit={isEdit}
          response={draft.parsedJSON['Community Size and Engagement']}
          id={'Community Size and Engagement'}
          form={form}
        />
        <ResponseBlock
          label="Estimated Number of Grantees"
          isEdit={isEdit}
          response={draft.parsedJSON.granteeEstimate}
          id={'granteeEstimate'}
          form={form}
        />
        <ResponseBlock
          label="Anticipated Matching Pool"
          isEdit={isEdit}
          response={draft.parsedJSON['Matching Pool Impact']}
          id={'Matching Pool Impact'}
          form={form}
        />
        <Divider color={colors.dark[6]} mt="lg" mb="xs" />
        <Title fz="h3" order={3} mb="sm">
          Conclusion
        </Title>
        <ResponseBlock
          label="Stated Conflicts of Interest"
          isEdit={isEdit}
          response={draft.parsedJSON.COI}
          id={'COI'}
          form={form}
        />
        <ResponseBlock
          label="Additional Considerations"
          isEdit={isEdit}
          response={draft.parsedJSON.considerations}
          id={'considerations'}
          form={form}
        />
        <ResponseBlock
          label="More Information"
          isEdit={isEdit}
          response={draft.parsedJSON.moreInfo}
          id={'moreInfo'}
          form={form}
        />
        {isEdit && (
          <Group justify="center">
            <Button onClick={() => handleEdit()}>Edit Application</Button>
          </Group>
        )}
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

const ResponseLink = ({
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
