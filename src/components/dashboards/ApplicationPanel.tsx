import { useQuery } from '@tanstack/react-query';
import { useTablet } from '../../hooks/useBreakpoints';
import { getAppDrafts } from '../../queries/getAppDrafts';
import { useChews } from '../../hooks/useChews';
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useTx } from '../../contexts/useTx';
import { useMemo } from 'react';
import { CURRENT_ROUND } from '../../constants/tags';
import { notifications } from '@mantine/notifications';
import { ContestStatus } from '../../constants/enum';
import { encodeAbiParameters, isAddress, parseAbiParameters } from 'viem';
import { secondsToLongDate } from '../../utils/time';
import { IconCheck, IconChevronRight, IconRocket } from '@tabler/icons-react';
import { InfoBanner } from '../InfoBanner';
import HalChoicesABI from '../../abi/HALChoices.json';

export const ApplicationPanel = () => {
  const isTablet = useTablet();
  const {
    data: drafts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['applications'],
    queryFn: getAppDrafts,
  });
  const { applicationRound, isLoadingAppRound } = useChews();
  const { colors } = useMantineTheme();
  const navigate = useNavigate();
  const { tx } = useTx();

  const { approved, pending } = useMemo(() => {
    if (!drafts) return { approved: [], pending: [] };

    const approved = drafts.filter((draft) =>
      draft.approvedRounds.includes(CURRENT_ROUND)
    );
    const pending = drafts.filter(
      (draft) => !draft.approvedRounds.includes(CURRENT_ROUND)
    );

    return { approved, pending };
  }, [drafts]);

  if (isLoading || isLoadingAppRound) return null;

  const approveApplication = async (applicationId: string) => {
    const choicesAddress = applicationRound?.choicesParams_id;

    if (!applicationRound || !choicesAddress) {
      notifications.show({
        title: 'Error',
        message: 'Rubric voting round not found',
        color: 'red',
      });
      return;
    }

    if (
      Number(applicationRound.round?.contestStatus) !== ContestStatus.Populating
    ) {
      notifications.show({
        title: 'Error',
        message: 'Rubric voting round is not in Populating state',
        color: 'red',
      });
      return;
    }

    const selectedApplication = drafts?.find(
      (draft) => draft.id === applicationId
    );
    const contentHash = selectedApplication?.ipfsHash;

    if (!contentHash) {
      notifications.show({
        title: 'Error',
        message: 'Content hash not found',
        color: 'red',
      });
      return;
    }

    if (!selectedApplication) {
      notifications.show({
        title: 'Error',
        message: 'Application not found',
        color: 'red',
      });
      return;
    }

    const applicantAddress = selectedApplication.userAddress;

    if (!isAddress(applicantAddress)) {
      notifications.show({
        title: 'Error',
        message: 'Invalid applicant address',
        color: 'red',
      });
      return;
    }

    if (!isAddress(choicesAddress)) {
      notifications.show({
        title: 'Error',
        message: 'Invalid choices address',
        color: 'red',
      });
      return;
    }

    const choiceData = encodeAbiParameters(
      parseAbiParameters('bytes, (uint256, string)'),
      [applicantAddress, [999999n, contentHash]]
    );

    tx({
      writeContractParams: {
        address: choicesAddress,
        functionName: 'registerChoice',
        abi: HalChoicesABI,
        args: [selectedApplication.rootId, choiceData],
      },
      writeContractOptions: {
        onPollSuccess() {
          notifications.show({
            title: 'Success',
            message: 'Application approved',
            color: 'green',
          });

          refetch();
        },
      },
    });
  };

  return (
    <Box>
      <Title fz="h3" order={3} mb="sm">
        GG23 Applications
      </Title>
      <Text c={'subtle'} mb="xl">
        Applications wishing to compete in the current round
      </Text>
      <Text fz="lg" fw={600} mb="xs">
        Approved Ships
      </Text>
      <Box mb="xxl">
        {approved?.length ? (
          approved?.map((draft) => {
            return (
              <Flex
                px={isTablet ? 'sm' : 'lg'}
                py="sm"
                mb={32}
                key={draft.id}
                justify="space-between"
                direction={isTablet ? 'column' : 'row'}
              >
                <Group mb={isTablet ? 'md' : undefined}>
                  <Avatar size={56} bg={colors.dark[2]} src={draft.imgUrl} />
                  <Box>
                    <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                      {draft.name}
                    </Text>
                    <Text c="subtle">
                      {secondsToLongDate(draft.lastUpdated)}
                    </Text>
                  </Box>
                </Group>
                <Group gap="sm">
                  <Tooltip label="View Application">
                    <ActionIcon
                      onClick={() => navigate(`/ship/${draft.rootId}`)}
                    >
                      <IconRocket
                        size={24}
                        stroke={1.2}
                        color={colors.purple[6]}
                      />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="View Application">
                    <ActionIcon
                      onClick={() => navigate(`/view-draft/${draft.id}`)}
                    >
                      <IconChevronRight size={24} stroke={1.5} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Flex>
            );
          })
        ) : (
          <Box mt="md">
            <InfoBanner
              title="No Ships"
              description="No applications have been approved yet."
            />
          </Box>
        )}
      </Box>
      <Text fz="lg" fw={600} mb="xs">
        Applications In Review
      </Text>
      <Box>
        {pending?.length ? (
          pending?.map((draft) => {
            return (
              <Flex
                px={isTablet ? 'sm' : 'lg'}
                py="sm"
                mb={32}
                key={draft.id}
                justify="space-between"
                direction={isTablet ? 'column' : 'row'}
              >
                <Group mb={isTablet ? 'md' : undefined}>
                  <Avatar size={56} bg={colors.dark[2]} src={draft.imgUrl} />
                  <Box>
                    <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                      {draft.name}
                    </Text>
                    <Text c="subtle">
                      {secondsToLongDate(draft.lastUpdated)}
                    </Text>
                  </Box>
                </Group>

                <Group gap="sm">
                  <Tooltip label="Approve Application">
                    <ActionIcon onClick={() => approveApplication(draft.id)}>
                      <IconCheck
                        size={24}
                        color={colors.kelp[6]}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="View Application">
                    <ActionIcon
                      onClick={() => navigate(`/view-draft/${draft.id}`)}
                    >
                      <IconChevronRight size={24} stroke={1.5} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Flex>
            );
          })
        ) : (
          <Box mt="md">
            <InfoBanner
              title="No Applications"
              description="No applications have been submitted yet."
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
