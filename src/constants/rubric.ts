import { Address } from 'viem';

export const RUBRIC_COPY = {
  type: 'application_rubric',
  sections: [
    {
      sectionName: 'Round Operators and Team',
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

export const fakeAddress: Address[] = [
  '0x7A3d05C70498b43FB8BB426A4165A4bD03842891',
  '0xF24c923f7a8F31BAb5d4C3F4772b4D2e1923D882',
  '0x2B5AD5c4795c026514f8317c7a215E218DcCD6c3',
  '0x9E8f7aE8b2c1D5E3c8E4e8D1c2B3A4f5D6e7F8a9',
  '0x4D3c2B1A0f9E8d7c6B5a4E3F2D1C0B9A8F7E6D5',
  '0x8B7c6D5E4F3A2B1C0D9E8F7A6B5C4D3E2F1A0B9',
  '0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0',
  '0xC5D4E3F2A1B0C9D8E7F6A5B4C3D2E1F0A9B8C7',
  '0x6B5C4D3E2F1A0B9C8D7E6F5A4B3C2D1E0F9A8B',
  '0xE8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6',
];
