import React, { useState } from 'react';
import { PageLayout } from '../layout/Page';
import {
  Avatar,
  Box,
  Group,
  InputLabel,
  List,
  ListItem,
  Stack,
  Stepper,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconLink, IconPhoto } from '@tabler/icons-react';
import { StepLayout } from '../layout/StepLayout';
import { Bold, ExternalLink } from '../components/typography';

export const SubmitApplicationAlt2 = () => {
  const { colors } = useMantineTheme();
  const [step, setStep] = useState(0);
  return (
    <PageLayout title="Submit Application">
      <Stepper
        active={step}
        completedIcon={<IconCheck color={colors.dark[6]} />}
      >
        <Stepper.Step>
          <StepLayout
            title="Round Info"
            step={0}
            setStep={setStep}
            description="Base information about the round."
          >
            <Stack gap="lg" mb={100}>
              <Group w="100%" justify="center">
                <Avatar
                  //   src={form.values.imgUrl || ''}
                  bg={colors.dark[2]}
                  size={171}
                  //   mb="s"
                >
                  <IconPhoto size={72} color={colors.dark[5]} />
                </Avatar>
              </Group>
              <TextInput
                label="Name"
                required
                placeholder="Grant Program Name"
                // {...form.getInputProps('roundName')}
              />
              <Group wrap="nowrap" gap="sm" align="start">
                <TextInput
                  w="50%"
                  label="Round Avatar URL"
                  required
                  leftSection={<IconLink color={colors.dark[4]} />}
                  placeholder="https://example.com/profile.jpg"
                  //   {...form.getInputProps('imgUrl')}
                />
                <TextInput
                  w="50%"
                  label="Social Link"
                  required
                  leftSection={<IconLink color={colors.dark[4]} />}
                  placeholder="https://platform.com/profile"
                  //   {...form.getInputProps('imgUrl')}
                />
              </Group>
              <Textarea
                label="Round Description"
                required
                placeholder={'Provide a brief description of your round.'}
                rows={3}
                autosize={false}

                //
              />
              <Box>
                <InputLabel fz="md" fw={600} mb={12} required>
                  Type of Projects to Fund
                </InputLabel>
                <Box mx="md">
                  <Text c="subtle" fw={600} fz="sm">
                    Example
                  </Text>
                  <List c="subtle" fz="sm" fs="italic" mb="sm">
                    <List.Item>
                      We aim to fund projects that [description of the type of
                      projects].
                    </List.Item>
                  </List>
                </Box>
                <TextInput
                  required
                  placeholder="Type of Projects to Fund"
                  //
                />
              </Box>
              <Box>
                <InputLabel fz="md" fw={600} mb={12} required>
                  Round History
                </InputLabel>
                <Text c="subtle" mb="xs">
                  Clearly identify the round history.
                </Text>
                <Box mx="md">
                  <Text c="subtle" fw={600} fz="sm">
                    Example
                  </Text>
                  <List c="subtle" fz="sm" fs="italic" mb="sm">
                    <List.Item>
                      This round has been run [number of times] during Gitcoin
                      Grants rounds. If running a new version of an old round,
                      specify details. If unsure, indicate lack of historical
                      context.
                    </List.Item>
                  </List>
                </Box>
                <Textarea
                  required
                  placeholder="Type of Projects to Fund"
                  rows={3}
                  autosize={false}
                  //
                />
              </Box>
            </Stack>
          </StepLayout>
        </Stepper.Step>
        <Stepper.Step>
          <StepLayout
            title="Round Operator and Team"
            step={1}
            setStep={setStep}
            description="Information about the team running this round."
          >
            <Stack gap="lg" mb={100}>
              <Box>
                <InputLabel fz="md" fw={600} mb={12} required>
                  Identified Round Operator
                </InputLabel>
                <Text c="subtle" mb="xs">
                  Identify the round operator with relevant experience, and
                  provide detailed bios and social handle links.
                </Text>
                <Box mx="md">
                  <Text c="subtle" fw={600} fz="sm">
                    Example
                  </Text>
                  <List c="subtle" fz="sm" fs="italic" mb="sm">
                    <List.Item>
                      Round Operator: [Name], [Relevant Experience], [Bio],
                      [Social Handle]
                    </List.Item>
                  </List>
                </Box>
                <Textarea
                  required
                  placeholder="Please share your experience"
                  rows={3}
                  autosize={false}
                  //
                />
              </Box>
              <Box>
                <InputLabel fz="md" fw={600} mb={12} required>
                  Team members with previous experience to run a round
                </InputLabel>
                <Text c="subtle" mb="xs">
                  At least two additional team members, emphasizing their
                  relevant experience.
                </Text>
                <Box mx="md">
                  <Text c="subtle" fw={600} fz="sm">
                    Example
                  </Text>
                  <List c="subtle" fz="sm" fs="italic" mb="sm">
                    <List.Item>
                      Team Member 1: [Name], [Relevant Experience], [Bio],
                      [Social Handle]
                    </List.Item>
                    <List.Item>
                      Team Member 2: [Name], [Relevant Experience], [Bio],
                      [Social Handle]
                    </List.Item>
                    <List.Item>Additional team members if applicable</List.Item>
                  </List>
                </Box>
                <Textarea
                  required
                  placeholder="Please share team member experience"
                  rows={3}
                  autosize={false}
                />
              </Box>
              <Box>
                <InputLabel fz="md" fw={600} mb={12} required>
                  Advisors for This Round:
                </InputLabel>
                <Text c="subtle" mb="xs">
                  Clearly identify any advisors and their relevant experience.
                  Indicate if any have run a round for Gitcoin or participated
                  in running a round in the past. List any advisors and their
                  relevant experience.
                </Text>
                <Textarea
                  required
                  placeholder="Please share advisor information"
                  rows={3}
                  autosize={false}
                  //
                />
              </Box>
            </Stack>
          </StepLayout>
        </Stepper.Step>
        <Stepper.Step>
          <StepLayout
            title="Round Strategy"
            step={2}
            setStep={setStep}
            description="Your strategy for determining eligibility, marketing."
          >
            <Stack gap="lg" mb={100}>
              <Box>
                <InputLabel fw={600} mb={12} required>
                  Eligibility Criteria
                </InputLabel>
                <Box>
                  <Text c="subtle" mb={'xs'}>
                    What are the eligibility criteria for your round? Projects
                    must primarily focus on [specific focus]. Additional
                    criteria include [detailed eligibility criteria]. All rounds
                    must comply with{' '}
                    <ExternalLink href="https://support.gitcoin.co/gitcoin-knowledge-base/about-gitcoin/code-of-conduct">
                      Gitcoin’s core rules
                    </ExternalLink>
                  </Text>
                  <Text c="subtle" mb="xs">
                    For example: to be in the Climate Solutions Round, your
                    project must primarily focus on climate action.{' '}
                    <ExternalLink href="https://gitcoin.notion.site/GG19-Eligibility-1-1968887099b24530a9df9fd378d724fe">
                      See this example of past eligibility criteria{' '}
                    </ExternalLink>
                  </Text>
                  <Text c="subtle" mb="sm">
                    Reminder: All rounds must comply with{' '}
                    <ExternalLink href="https://support.gitcoin.co/gitcoin-knowledge-base/about-gitcoin/code-of-conduct">
                      Gitcoin’s core rules{' '}
                    </ExternalLink>
                    , which include no fraudulent activity, quid pro quo, hate
                    speech, or other activities out of alignment with Gitcoin’s
                    essential intents. Please include all additional eligibility
                    criteria specific to this proposed grants round.
                  </Text>
                </Box>
                <Textarea
                  required
                  placeholder="Please share eligibility criteria"
                  rows={3}
                  autosize={false}
                  //
                />
              </Box>
              <Box>
                <InputLabel fz="md" fw={600} mb={12} required>
                  Marketing Plan
                </InputLabel>
                <Text c="subtle" mb={'xs'}>
                  Clearly outline your marketing plan, including channels
                  utilized and ways you plan on engaging your community and
                  target audience.
                </Text>
                <Text c="subtle" mb="xs">
                  [Include a link to a document that has channels, audience, and
                  team who will be executing on promotion of your round.] Please
                  include as much detail as you can at this stage of the
                  application.
                </Text>
                <TextInput
                  leftSection={<IconLink color={colors.dark[4]} />}
                  placeholder="https://doc.com/your-marketing-plan"
                />
              </Box>
              <Box>
                <InputLabel fz="md" fw={600} mb={12} required>
                  Funding Mechanism
                </InputLabel>
                <Box mx="md">
                  <Text c="subtle" fw={600} fz="sm">
                    Example
                  </Text>
                  <List c="subtle" fz="sm" fs="italic" mb="sm">
                    <List.Item>
                      We are using [funding mechanism] because [reason why it is
                      the best option for your round]
                    </List.Item>
                  </List>
                </Box>
                <Textarea
                  placeholder="We are using [funding mechanism] because [reason why it is the best option for your round]"
                  rows={3}
                  autosize={false}
                />
              </Box>
            </Stack>
          </StepLayout>
        </Stepper.Step>
        <Stepper.Step>
          <StepLayout
            title="Impact and Intents"
            step={3}
            setStep={setStep}
            description="Demonstrating alignment and measuring impact"
          >
            <Stack gap="lg" mb={100}>
              <Box>
                <InputLabel fz="md" fw={600} mb={12} required>
                  Articulate how the round aligns with one of Gitcoin’s GG23
                  intents.
                </InputLabel>

                <List c="subtle" mb="xs">
                  <List.Item>
                    <Bold>Allo GMV</Bold> (A round needs to reach 20%
                    crowdfunding proportional to their matching pool. For
                    example, if Gitcoin provides $20k in matching but the amount
                    crowdfunded in a round is less than $4k).{' '}
                    <Bold>If not:</Bold>
                  </List.Item>

                  <List.Item>
                    Supporting builders building on top of Allo
                  </List.Item>
                  <List.Item>
                    Scaling and growing the Ethereum ecosystem
                  </List.Item>
                </List>
                <Box mx="md">
                  <Text c="subtle" fw={600} fz="sm">
                    Example
                  </Text>
                  <List fz="sm" fs="italic" mb="sm" c="subtle">
                    <ListItem>
                      "This round aligns with [insert intent] by [insert
                      explanation]""
                    </ListItem>
                  </List>
                </Box>
                <Textarea
                  placeholder="This round aligns with [insert intent] by [insert explanation]"
                  rows={3}
                  autosize={false}
                />
              </Box>
              <Box>
                <InputLabel fz="md" fw={600} mb={12} required>
                  Impact Assessment Plan
                </InputLabel>

                <Text c="subtle" mb="xs">
                  Describe how you intend to assess grantee impact through
                  methods such as Hypercerts, GAP, Deresy, etc., and provide
                  details of the plan, including how you will measure and
                  evaluate the success and impact of the grantees over
                  successive rounds.
                </Text>
                <Box mx="md">
                  <Text c="subtle" fw={600} fz="sm">
                    Example
                  </Text>
                  <List fz="sm" fs="italic" mb="sm" c="subtle">
                    <ListItem>
                      We intend to assess grantee impact through [methods such
                      as Hypercerts, GAP, Deresy, etc.]. Our detailed plan
                      includes [details of the plan].
                    </ListItem>
                  </List>
                </Box>
                <Textarea
                  placeholder="We intend to assess grantee impact through [methods such as Hypercerts, GAP, Deresy, etc.]. Our detailed plan includes [details of the plan]."
                  rows={3}
                  autosize={false}
                />
              </Box>
            </Stack>
          </StepLayout>
        </Stepper.Step>
        <Stepper.Step>
          <StepLayout
            title="Round Info"
            step={4}
            setStep={setStep}
          ></StepLayout>
        </Stepper.Step>
        <Stepper.Step>
          <StepLayout
            title="Round Info"
            step={5}
            setStep={setStep}
          ></StepLayout>
        </Stepper.Step>
      </Stepper>
    </PageLayout>
  );
};
