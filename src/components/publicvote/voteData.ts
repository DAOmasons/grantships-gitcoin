export const vectors = [
  {
    key: 'new_funding_mechanism',
    label: 'Innovating new allocation mechanisms is important',
    rating: 1,
  },
  {
    key: 'donations_received',
    label: 'Community donations received are important',
    rating: 1,
  },
  {
    key: 'additional_funds_raised',
    label: 'Additional matching funds raised are important',
    rating: 1,
  },
  {
    key: 'unique_donors',
    label: 'The number of unique donors is important',
    rating: 1,
  },
  {
    key: 'unique_projects',
    label: 'The number of unique projects funded is important',
    rating: 1,
  },
  {
    key: 'total_donations',
    label: 'Total donations received is important',
    rating: 1,
  },
];

export type SliderData = {
  name: string;
  id: string;
  imgUrl: string;
  value: number;
  roundLink: string;
  reportLink: string;
};

export const fakeSliderData = [
  {
    id: '0x2377bfa0777c385f4d3fdee97d1a65228f836da67ea6f0db96235870ac5cdc82',
    imgUrl:
      'https://www.regencoordination.xyz/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F4514bed5-d3e3-402c-b4e4-5aa68faa39ff%2F65e941b3-a87e-4054-b665-2b194bf1ba44%2FGroup_5551008.png?table=block&id=11a2e725-1f2f-8091-bcc9-fd0caf288e72&spaceId=4514bed5-d3e3-402c-b4e4-5aa68faa39ff&width=250&userId=&cache=v2',
    name: 'Regen Coordination ImpactQF',
    value: 22,
  },
  {
    id: '0xd18608a33ecfd6b9c08a6c8fd99fd934199dff54ae53515e159b195b2cce770c',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUyEe2kfJf8ShHARPQph24tuzPHOhuz7tzWA&s',
    name: 'GoodDollar GoodBuilders Kickoff Round ',
    value: 8,
  },
  {
    id: '0xae3add0277ad57036fb34714bdd96872dc971915636e3cafab9aa08e2632b8cf',
    imgUrl:
      'https://github.com/CommonsBuild/tec-branding-assets/blob/main/Logo/Icon/TEC%20Icon%20Color%403x.png',
    name: 'Token Engineering the Superchain Retro Round',
    value: 34,
  },
  {
    id: '0x22ed83fde1924b615d904ccb2259c3ab42e72ec0870242399cda94743503682e',
    imgUrl:
      "https://cdn.charmverse.io/user-content/ac22a202-547a-4ee0-96b5-5b50858e5ab3/069a8d51-d841-4fef-96d3-0f4f3922dbff/DALL%C2%B7E-2025-03-01-16.30.39---A-minimalist-conceptual-icon-for-'Regen-Rio-de-Janeiro,'-designed-for-a-Gitcoin-Funding-Round-avatar.-The-icon-features_-__--A-stylized-outline-of-Sug.webp",
    name: 'Regen Rio de Janeiro',
    value: 12,
  },
  {
    id: '0x781ce54b73730667e7390caa0e52d4d585b574f274f780c4e0bb96a18a996c30',
    imgUrl: 'https://imgur.com/8jwrl00.png',
    name: 'Gitcoin Grants Garden 🌱',
    value: 24,
  },
  {
    id: '0x559f71a3559444c0e12205b095cbecd784199ab4caa271fcddf67b293318eb0f',
    imgUrl: 'https://ibb.co/Wdrg0ph',
    name: 'Web3 for Universities',
    value: 0,
  },
];

export const dummyData = [
  {
    id: '1',
    voter: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
    timestamp: 1747112117,
    // write a paragraph of dummy data for the metadata
    comment:
      "This ship is amazing! I love the design and the speed. It's perfect for my playstyle.",
    votes: [
      {
        choice_id:
          '0x2377bfa0777c385f4d3fdee97d1a65228f836da67ea6f0db96235870ac5cdc82',
        amount: BigInt(23e16),
      },
      {
        choice_id:
          '0xd18608a33ecfd6b9c08a6c8fd99fd934199dff54ae53515e159b195b2cce770c',
        amount: BigInt(17e16),
      },
      {
        choice_id:
          '0xae3add0277ad57036fb34714bdd96872dc971915636e3cafab9aa08e2632b8cf',
        amount: BigInt(20e16),
      },
      {
        choice_id:
          '0x22ed83fde1924b615d904ccb2259c3ab42e72ec0870242399cda94743503682e',
        amount: BigInt(20e16),
      },
      {
        choice_id:
          '0x781ce54b73730667e7390caa0e52d4d585b574f274f780c4e0bb96a18a996c30',
        amount: BigInt(15e16),
      },
      {
        choice_id:
          '0x559f71a3559444c0e12205b095cbecd784199ab4caa271fcddf67b293318eb0f',
        amount: BigInt(5e16),
      },
    ],
    prefs: [
      {
        key: 'new_funding_mechanism',
        label: 'Innovating new allocation mechanisms is very important',
        rating: 1,
      },
      {
        key: 'matching_donations',
        label: 'Total matching donations are a very important metric',
        rating: 4,
      },
      {
        key: 'participation_count',
        label: 'The amount of participating addresses is an important metric',
        rating: 4,
      },
      {
        key: 'community_events',
        label: 'The quantity of community events and engagement is important',
        rating: 2,
      },
      {
        key: 'project_completion_rate',
        label:
          'The amount of completed or mature projects funded is an important metric',
        rating: 3,
      },
    ],
  },
  {
    id: '2',
    voter: '0x1234567890abcdef1234567890abcdef12345678',
    timestamp: 1747112117,
    // write a paragraph of dummy data for the metadata
    comment:
      "This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle.",
    votes: [
      {
        choice_id:
          '0x2377bfa0777c385f4d3fdee97d1a65228f836da67ea6f0db96235870ac5cdc82',
        amount: BigInt(20e16),
      },
      {
        choice_id:
          '0xd18608a33ecfd6b9c08a6c8fd99fd934199dff54ae53515e159b195b2cce770c',
        amount: BigInt(12e16),
      },
      {
        choice_id:
          '0xae3add0277ad57036fb34714bdd96872dc971915636e3cafab9aa08e2632b8cf',
        amount: BigInt(18e16),
      },
      {
        choice_id:
          '0x22ed83fde1924b615d904ccb2259c3ab42e72ec0870242399cda94743503682e',
        amount: BigInt(18e16),
      },
      {
        choice_id:
          '0x781ce54b73730667e7390caa0e52d4d585b574f274f780c4e0bb96a18a996c30',
        amount: BigInt(32e16),
      },
    ],
    prefs: [
      {
        key: 'new_funding_mechanism',
        label: 'Innovating new allocation mechanisms is very important',
        rating: 3,
      },
      {
        key: 'matching_donations',
        label: 'Total matching donations are a very important metric',
        rating: 4,
      },
      {
        key: 'participation_count',
        label: 'The amount of participating addresses is an important metric',
        rating: 1,
      },
      {
        key: 'community_events',
        label: 'The quantity of community events and engagement is important',
        rating: 3,
      },
      {
        key: 'project_completion_rate',
        label:
          'The amount of completed or mature projects funded is an important metric',
        rating: 2,
      },
    ],
  },
];
