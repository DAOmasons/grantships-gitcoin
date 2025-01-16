import { Address } from 'viem';

export type Question = {
  title: string;
  options: {
    optionText: string;
    optionScore: number;
  }[];
};

export type RubricSection = {
  sectionName: string;
  sectionTotal: number;
  sectionLabel: string;
  sectionDescription: string;
  questions: Question[];
};

export type Rubric = {
  type: 'application_rubric';
  total: number;
  sections: RubricSection[];
};

export const RUBRIC_COPY: Rubric = {
  type: 'application_rubric',
  total: 40,
  sections: [
    {
      sectionName: 'Round Operators and Team',
      sectionLabel: 'Round Operators',
      sectionTotal: 10,
      sectionDescription: 'Select one choice for each vote (0-10 points)',
      questions: [
        {
          title: 'Identified Round Operator',
          options: [
            {
              optionText:
                'Clearly identified Round Operator with past experience of running a round',
              optionScore: 5,
            },
            {
              optionText: 'Qualified to run a round',
              optionScore: 3,
            },
            {
              optionText: 'Limited experience to run a round',
              optionScore: 1,
            },
            {
              optionText: 'Not clearly identified',
              optionScore: 0,
            },
          ],
        },
        {
          title: 'Team Members',
          options: [
            {
              optionText:
                'At least two additional team members with previous experience to run a round',
              optionScore: 5,
            },
            {
              optionText:
                'At least two additional team members qualified to run a round',
              optionScore: 3,
            },
            {
              optionText:
                'At least two additional team members with limited experience to run a round',
              optionScore: 1,
            },
            {
              optionText: 'Less than two additional team members',
              optionScore: 0,
            },
          ],
        },
      ],
    },
    {
      sectionName: 'Fundraising',
      sectionLabel: 'Fundraising',
      sectionTotal: 10,
      sectionDescription: 'Select one choice (0-10 points)',
      questions: [
        {
          title: 'Matching Pool Impact',
          options: [
            {
              optionText:
                'Matching pool size is proportional to what they are trying to achieve',
              optionScore: 10,
            },
            {
              optionText:
                'Matching pool size is proportional, but no clear plan in place for future',
              optionScore: 6,
            },
            {
              optionText:
                'Matching pool size not proportional, and no clear plan in place',
              optionScore: 3,
            },
            {
              optionText:
                'No pool raised or adequate ratios not in place for fundraising',
              optionScore: 0,
            },
          ],
        },
      ],
    },
    {
      sectionName: "Alignment with one of GG23's Intents",
      sectionLabel: 'Alignment',
      sectionTotal: 10,
      sectionDescription: `Does this round align with Gitcoin DAO's intents? Select one choice (0-10 points) `,
      questions: [
        {
          title: 'Mission Alignment',
          options: [
            {
              optionText: "Clearly aligns with one of GG23's intents",
              optionScore: 10,
            },
            {
              optionText: 'Some alignment but not fully clear',
              optionScore: 6,
            },
            {
              optionText: 'Very little alignment',
              optionScore: 3,
            },
            {
              optionText: 'No clear alignment',
              optionScore: 0,
            },
          ],
        },
      ],
    },
    {
      sectionName: 'Community and Impact',
      sectionLabel: 'Community and Impact',
      sectionTotal: 10,
      sectionDescription: 'Select one choice for each vote (0-10 points)',
      questions: [
        {
          title: 'Community Size and Engagement',
          options: [
            {
              optionText: 'Large and active community 100+',
              optionScore: 5,
            },
            {
              optionText: 'Moderate community size 50+',
              optionScore: 3,
            },
            {
              optionText: 'Small and active community 25+',
              optionScore: 1,
            },
            {
              optionText: 'Small and inactive community 0-25',
              optionScore: 0,
            },
          ],
        },
        {
          title: 'Impact Assessment Plan',
          options: [
            {
              optionText: 'Detailed plan for assessing grantee impact',
              optionScore: 5,
            },
            {
              optionText: 'Basic plan for assessing impact',
              optionScore: 3,
            },
            {
              optionText: 'Unclear plan for assessing impact',
              optionScore: 1,
            },
            {
              optionText: 'No plan for impact assessment',
              optionScore: 0,
            },
          ],
        },
      ],
    },
  ],
};
