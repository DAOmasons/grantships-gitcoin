import { Address } from 'viem';

export type RoundApplicationContent = {
  roundName: string;
  address: Address;
  imgUrl: string;
  responses: {
    title: string;
    response: string;
  }[];
};

export const dummyApplications: RoundApplicationContent[] = [
  {
    roundName: 'Climate Solutions Round',
    address: '0x7A3d05C70498b43FB8BB426A4165A4bD03842891',
    imgUrl: 'https://i.imgur.com/uNOWyOY.jpeg',
    responses: [
      {
        title: 'Identified Round Operator',
        response:
          "I've been a climate tech researcher and community builder for 5 years, previously coordinating ReFi DAO's grant program which distributed $150k to 12 regenerative finance projects. As the founder of Climate Builders collective, I managed our community treasury of 120 ETH and established frameworks for evaluating carbon credit projects. I also serve as an advisor to three environmental DAOs, helping them structure their governance and grant distribution mechanisms.",
      },
      {
        title: 'Team Members',
        response:
          'Our core team includes Dr. Elena Martinez, an environmental scientist with three years of experience managing climate-focused DAOs and grant programs. She previously led impact assessment at Toucan Protocol. Alex Kim joins us from Regenerative Finance Labs, where he coordinated a $300k grant pool for carbon measurement projects. Both have direct experience evaluating and monitoring environmental impact projects in web3.',
      },
      {
        title: 'Matching Pool Impact',
        response:
          "We've raised 45 ETH (~$112,500) specifically for climate tech projects, with a focus on measurement and verification tools. Given our target to fund 8-12 early-stage climate projects with grants between $10k-$20k each, this pool size aligns with our goals. We have partnerships with three major ReFi protocols who have committed to quarterly contributions to our matching pool, and we're implementing a carbon credit revenue sharing model where 2% of verified credits flow back to future rounds.",
      },
      {
        title: 'Mission Alignment',
        response:
          "Our round aligns with GG22's focus on funding climate solutions and regenerative projects. We specifically target projects developing open-source tools for carbon credit verification, biodiversity monitoring, and environmental data collection. Our selection criteria emphasizes projects that contribute to public environmental goods and maintain transparent impact metrics, directly supporting Gitcoin's mission of funding sustainable solutions.",
      },
      {
        title: 'Community Size and Engagement',
        response:
          'The Climate Builders collective has grown to 250 members, including 60 active developers and 40 environmental scientists. Our bi-weekly climate tech calls average 90 participants, and our technical working groups focus on specific areas like carbon measurement and biodiversity tracking. We coordinate with 15 other environmental DAOs, reaching a broader network of over 1000 climate-focused builders.',
      },
      {
        title: 'Impact Assessment Plan',
        response:
          'We use a scientific approach to impact measurement, tracking metrics like tons of carbon sequestered, hectares of land monitored, and accuracy rates of verification tools. Each project must establish clear environmental KPIs at the outset. We conduct monthly technical reviews with environmental scientists and require quarterly reports including both technical progress and ecological impact. All data is published through our transparent impact dashboard.',
      },
    ],
  },
  {
    roundName: 'Education & Public Goods Round',
    address: '0xF24c923f7a8F31BAb5d4C3F4772b4D2e1923D882',
    imgUrl: 'https://i.imgur.com/EWIHSxI.jpeg',
    responses: [
      {
        title: 'Identified Round Operator',
        response:
          "With 4 years in education technology, I've led EduDAO's grant program, distributing $250k across 25 educational initiatives. I developed our open education resource platform that's now used by 30+ DAOs for community learning. Previously, I coordinated with Protocol Labs to create educational content distribution systems, managing a budget of 100 ETH for content creators and educational tooling.",
      },
      {
        title: 'Team Members',
        response:
          "Our team includes Professor James Wright, who ran Stanford's blockchain education initiative and has coordinated multiple web3 education grants programs. Maria Delgado brings her experience as former head of DeveloperDAO's learning program, where she managed $180k in educational grants. Both have extensive experience in curriculum development and educational impact assessment.",
      },
      {
        title: 'Matching Pool Impact',
        response:
          "We've secured 60 ETH ($150,000) for our education round, aiming to support 15-25 projects focused on web3 education and learning tools. Our funding model targets smaller grants of $5k-$12k to encourage diverse educational initiatives. We've partnered with five major protocols who will contribute 1% of their treasury annually to educational initiatives, ensuring sustainable funding for future rounds.",
      },
      {
        title: 'Mission Alignment',
        response:
          "Our round directly supports GG22's commitment to education and public goods. We focus on funding open-source educational content, learning management systems, and tools that make web3 more accessible to newcomers. Our evaluation framework prioritizes projects that create freely available educational resources and tools that can be used by the broader web3 community.",
      },
      {
        title: 'Community Size and Engagement',
        response:
          "Our education collective includes 150 active educators and content creators, with a broader network of 500 members. Weekly education working groups attract 40-50 participants, and our monthly education summit brings together 120+ people. We've built relationships with 25 educational institutions and DAOs, creating a robust network for knowledge sharing and resource distribution.",
      },
      {
        title: 'Impact Assessment Plan',
        response:
          "Our impact framework measures both reach and effectiveness of educational initiatives. We track metrics like student engagement, completion rates, and knowledge retention through standardized assessments. Projects must provide monthly learning analytics and student feedback. We've partnered with LearnWeb3 DAO to develop standardized impact metrics for web3 education, ensuring consistent evaluation across projects.",
      },
    ],
  },
  {
    roundName: 'Web3 Gaming & Interactive Media Round',
    address: '0x2B5AD5c4795c026514f8317c7a215E218DcCD6c3',
    imgUrl: 'https://i.imgur.com/jyk2qRp.jpeg',
    responses: [
      {
        title: 'Identified Round Operator',
        response:
          "I come from six years in game development, including three years running GamersDAO's pilot grant program where we allocated 200 ETH to gaming projects. As the former ecosystem lead at Immutable X, I coordinated their developer grants, distributing over $300k to gaming studios. I've also built our Gaming Grants Framework which has been adopted by three other gaming DAOs for their funding programs.",
      },
      {
        title: 'Team Members',
        response:
          "Our team features Lisa Park, former grants lead at Decentraland, who managed their $500k creator fund and developed their project evaluation framework. Ryan Torres joins us from Unity's web3 division, where he coordinated their blockchain gaming accelerator program. Both bring deep technical expertise in gaming and experience evaluating early-stage projects.",
      },
      {
        title: 'Matching Pool Impact',
        response:
          "We've gathered 100 ETH ($250,000) for our gaming round, strategically sized to support 10-15 game development teams with grants ranging from $15k-$30k. We've secured partnerships with major gaming guilds and NFT marketplaces who have committed to matching funds for future rounds. Additionally, we're implementing a revenue-sharing model where successful funded games contribute 3% of their initial revenue back to the matching pool.",
      },
      {
        title: 'Mission Alignment',
        response:
          "Our round aligns with GG22's goal of fostering open and participatory systems. We're focusing on funding open-source gaming infrastructure, modding tools, and community-owned gaming platforms. We prioritize projects that contribute to the public good through open APIs, shared asset libraries, and developer tools that can benefit the entire web3 gaming ecosystem.",
      },
      {
        title: 'Community Size and Engagement',
        response:
          "Our gaming community has grown to 400 members, including 120 active developers and 80 game designers. Our Discord hosts daily technical discussions averaging 100 participants, and our weekly game dev workshops attract 60-70 regular attendees. We've built strong connections with 20 gaming guilds and 15 gaming DAOs, creating a vibrant ecosystem for knowledge sharing and collaboration.",
      },
      {
        title: 'Impact Assessment Plan',
        response:
          'We evaluate impact through both technical and community metrics. Projects are assessed on code quality, documentation, and contribution to shared infrastructure. We track user engagement metrics, community growth, and adoption of shared tools. Monthly technical reviews are conducted with experienced game developers, and we require regular playtesting sessions with our community. All projects must open-source their development tooling and contribute to our shared asset library.',
      },
    ],
  },
  {
    roundName: 'DeFi Financial Inclusion Round',
    address: '0x9E8f7aE8b2c1D5E3c8E4e8D1c2B3A4f5D6e7F8a9',
    imgUrl: 'https://i.imgur.com/5ET1Xzz.jpeg',
    responses: [
      {
        title: 'Identified Round Operator',
        response:
          "Having spent 4 years in microfinance before web3, I've dedicated the last 2 years to running InclusionDAO's grant program, where we distributed 150 ETH to projects focusing on financial inclusion. I previously coordinated Aave's grants program in Latin America, managing relationships with 25 projects building local DeFi solutions. As lead at DeFi Education Network, I've developed frameworks for evaluating financial inclusion metrics in web3 projects.",
      },
      {
        title: 'Team Members',
        response:
          "Our core team includes Diana Pinto, who spent three years at Mercy Corps' crypto initiatives and managed their $400k DeFi pilot program across Southeast Asia. Wei Chen joins us from MakerDAO, where he coordinated their Real World Assets program and managed relationships with emerging market fintech projects. Both bring extensive experience in evaluating DeFi projects with a focus on accessibility and real-world impact.",
      },
      {
        title: 'Matching Pool Impact',
        response:
          "We've raised 75 ETH ($187,500) specifically for financial inclusion projects. Our funding targets 12-18 projects with grants between $8k-$20k, focusing on solutions for underserved markets. Three major DeFi protocols have committed to matching our pool with additional funds based on project success metrics. We're implementing a sustainable funding model where 1.5% of all transaction fees from funded projects feed back into future rounds.",
      },
      {
        title: 'Mission Alignment',
        response:
          "Our round aligns perfectly with GG22's focus on expanding access to financial services. We specifically target projects building user-friendly DeFi interfaces, local fiat on-ramps, and financial education tools for emerging markets. Our selection criteria emphasizes solutions that can demonstrate concrete impact on financial inclusion metrics while maintaining the decentralized ethos of web3.",
      },
      {
        title: 'Community Size and Engagement',
        response:
          "We've built a community of 320 members, including 80 DeFi developers and 60 financial inclusion experts. Our bi-weekly community calls average 85 participants, with dedicated working groups for different regions. We maintain active partnerships with 12 microfinance institutions and 8 regional crypto associations, reaching over 2000 potential users in underserved markets.",
      },
      {
        title: 'Impact Assessment Plan',
        response:
          "We measure impact through user adoption metrics, transaction volumes, and accessibility improvements. Each project must establish baseline metrics for their target market and track progress monthly. We conduct quarterly audits of user demographics and usage patterns, requiring projects to demonstrate how they're reaching underserved populations. Our impact dashboard publicly tracks all metrics, from user onboarding to average transaction costs saved.",
      },
    ],
  },
  {
    roundName: 'Developer Tools & Infrastructure Round',
    address: '0x4D3c2B1A0f9E8d7c6B5a4E3F2D1C0B9A8F7E6D5',
    imgUrl: 'https://i.imgur.com/suuAgK5.jpeg',
    responses: [
      {
        title: 'Identified Round Operator',
        response:
          "As a senior developer advocate with 8 years of experience, I've spent the last 3 years managing DevDAO's infrastructure grants, allocating 300 ETH across 40 developer tooling projects. I created the Open Source Sustainability Framework now used by multiple DAOs for evaluating developer tools. Previously, I led technical grant reviews at Ethereum Foundation, focusing on developer experience and infrastructure scalability.",
      },
      {
        title: 'Team Members',
        response:
          "Dr. Samantha Wu brings her experience as the former lead of Protocol Labs' developer grants program, where she managed $1M in technical grants. Jorge Ramirez, previously at Hardhat, coordinated their ecosystem grants and developer relations program. Both have extensive experience in evaluating technical infrastructure projects and maintaining relationships with developer communities.",
      },
      {
        title: 'Matching Pool Impact',
        response:
          "We've secured 120 ETH ($300,000) for funding critical developer infrastructure. Our funding strategy targets 15-20 projects with grants ranging from $10k-$25k, focusing on tooling gaps identified by our developer survey. Five major protocols have committed to sustainably funding future rounds through a consortium model, with each contributing based on the usage metrics of funded tools.",
      },
      {
        title: 'Mission Alignment',
        response:
          "Our round directly supports GG22's commitment to building robust web3 infrastructure. We focus on funding foundational tools that improve developer experience: testing frameworks, debugging tools, deployment solutions, and documentation platforms. Our evaluation framework prioritizes projects that demonstrate potential for broad ecosystem impact and strong open-source practices.",
      },
      {
        title: 'Community Size and Engagement',
        response:
          "Our developer community includes 600 active contributors across various projects, with 150 regular participants in our technical working groups. Weekly developer calls attract 100+ attendees, and our monthly hackathons engage over 200 developers. We've established partnerships with 25 technical DAOs and development teams, creating a robust feedback loop for tool development.",
      },
      {
        title: 'Impact Assessment Plan',
        response:
          "Impact is measured through concrete metrics including GitHub stars, daily active developers, integration count, and tool adoption rates. Projects must provide monthly technical progress reports and usage analytics. We've partnered with DevStats DAO to create standardized metrics for developer tools, ensuring consistent evaluation across projects. All funded projects undergo quarterly technical audits and community reviews.",
      },
    ],
  },
  {
    roundName: 'Digital Identity & Privacy Round',
    address: '0x8B7c6D5E4F3A2B1C0D9E8F7A6B5C4D3E2F1A0B9',
    imgUrl: 'https://i.imgur.com/rxtbemD.jpeg',
    responses: [
      {
        title: 'Identified Round Operator',
        response:
          "With 5 years in privacy-focused development, I've managed PrivacyDAO's grant program, distributing 180 ETH to projects building privacy-preserving identity solutions. As former technical lead at Self-Sovereign Identity Foundation, I coordinated their pilot grants program across 20 projects. I've developed standardized evaluation frameworks for assessing both the technical robustness and privacy guarantees of identity solutions.",
      },
      {
        title: 'Team Members',
        response:
          "Our team includes Dr. Fatima Al-Rashid, cryptography researcher and former grants coordinator at Aztec Protocol, where she managed their ZK-focused grants program. Thomas Ngyuen joins us from MetaMask's Privacy and Identity team, where he evaluated and integrated various identity solutions. Both bring deep technical expertise in privacy-preserving technologies and identity standards.",
      },
      {
        title: 'Matching Pool Impact',
        response:
          "We've raised 90 ETH ($225,000) dedicated to privacy and identity projects. Our funding strategy aims to support 10-15 projects with grants between $12k-$25k each. We've secured partnerships with privacy-focused protocols who will match our pool 1:1 for projects that meet specific technical criteria. Additionally, we're implementing a sustainability model where successful projects contribute privacy-preserving technologies back to a shared library.",
      },
      {
        title: 'Mission Alignment',
        response:
          "Our round aligns with GG22's emphasis on user empowerment and privacy. We specifically target projects building self-sovereign identity solutions, zero-knowledge proof implementations, and privacy-preserving authentication systems. Our selection criteria prioritizes solutions that balance user privacy with practical usability, while contributing to the broader ecosystem of privacy-preserving technologies.",
      },
      {
        title: 'Community Size and Engagement',
        response:
          'Our privacy and identity community consists of 280 members, including 70 privacy researchers and 90 developers. Weekly privacy tech calls attract 60-80 participants, and our specialized working groups on topics like ZK-proofs and key management have 40+ regular contributors. We collaborate with 15 privacy-focused DAOs and 10 research institutions.',
      },
      {
        title: 'Impact Assessment Plan',
        response:
          "We evaluate projects through both technical and adoption metrics, including code audits, security assessments, and user privacy guarantees. Each project must undergo regular security reviews and privacy assessments. We've developed a comprehensive framework for measuring privacy preservation while tracking user adoption. Monthly technical reviews focus on both security improvements and usability enhancements.",
      },
    ],
  },
  {
    roundName: 'Arts & Culture Round',
    address: '0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0',
    imgUrl: 'https://i.imgur.com/AAbXEtB.jpeg',
    responses: [
      {
        title: 'Identified Round Operator',
        response:
          "Coming from 6 years in traditional arts curation, I've spent the last 2 years running CultureDAO's grants program, allocating 130 ETH to creative projects bridging traditional and digital art. I previously coordinated SuperRare's emerging artists program, managing a 200 ETH fund for digital artists. I've developed frameworks for evaluating both artistic merit and technological innovation in web3 creative projects.",
      },
      {
        title: 'Team Members',
        response:
          "Our team features Maya Wong, former head of Foundation's artist grants program, where she managed their $300k creator fund. Robert Chen brings experience from MOMA's digital art initiative, where he coordinated blockchain art acquisitions and artist residencies. Both have extensive experience evaluating digital art projects and building bridges between traditional and crypto art communities.",
      },
      {
        title: 'Matching Pool Impact',
        response:
          "We've secured 70 ETH ($175,000) for our arts and culture round. We plan to support 20-30 projects with grants ranging from $5k-$15k, focusing on diverse artistic expressions and cultural preservation initiatives. We've partnered with three major NFT platforms who have committed to supporting future rounds through revenue sharing from successful projects. Our sustainability model includes a 2% royalty pool from funded projects.",
      },
      {
        title: 'Mission Alignment',
        response:
          "Our round supports GG22's goal of fostering creative commons and cultural preservation. We focus on funding artists and projects that explore the intersection of traditional culture and web3 technology, emphasizing open-source creative tools, community-owned cultural spaces, and innovative approaches to cultural preservation through blockchain technology.",
      },
      {
        title: 'Community Size and Engagement',
        response:
          "Our creative community has grown to 450 members, including 200 artists, 50 technologists, and 100 cultural practitioners. Weekly artist showcases attract 120+ participants, and our monthly cultural innovation workshops engage 80-100 community members. We've built connections with 30 traditional art institutions and 20 digital art platforms.",
      },
      {
        title: 'Impact Assessment Plan',
        response:
          "We evaluate impact through both artistic and community metrics, including audience engagement, cultural preservation outcomes, and technological innovation. Projects must demonstrate how they're advancing cultural expression or preservation through web3 technologies. Monthly reviews include community feedback sessions and documentation of cultural impact. We maintain a public registry of all funded works and their cultural significance.",
      },
    ],
  },
  {
    roundName: 'Healthcare & Biotech Round',
    address: '0xC5D4E3F2A1B0C9D8E7F6A5B4C3D2E1F0A9B8C7',
    imgUrl: 'https://i.imgur.com/g0vFEDo.jpeg',
    responses: [
      {
        title: 'Identified Round Operator',
        response:
          "With a PhD in Biomedical Engineering and 3 years managing HealthDAO's grant program, I've coordinated the distribution of 200 ETH to projects advancing healthcare data solutions. Previously, I led the Blockchain in Healthcare Alliance's pilot grants program, funding 15 projects focused on medical data privacy and interoperability. I've developed specialized frameworks for evaluating healthcare projects in the web3 space.",
      },
      {
        title: 'Team Members',
        response:
          "Dr. Rachel Martinez brings her experience as former director of Mount Sinai's blockchain initiatives, where she managed their digital health grants program. Dr. Kevin Patel joins us from MedicalDAO, where he coordinated their technical grants for healthcare interoperability projects. Both have extensive experience in healthcare technology evaluation and regulatory compliance.",
      },
      {
        title: 'Matching Pool Impact',
        response:
          "We've raised 110 ETH ($275,000) specifically for healthcare and biotech innovation. Our funding targets 12-15 projects with grants between $15k-$30k, focusing on privacy-preserving health data solutions and decentralized research tools. We've secured matching commitments from three major healthcare technology providers and implemented a sustainable funding model where successful projects contribute 2% of future revenue to the ecosystem.",
      },
      {
        title: 'Mission Alignment',
        response:
          "Our round aligns with GG22's focus on impactful technology that serves humanity. We specifically target projects building secure health data management systems, decentralized clinical trial platforms, and patient-centric healthcare solutions. Our selection criteria emphasizes both technical innovation and practical healthcare applications while maintaining strict privacy and regulatory compliance.",
      },
      {
        title: 'Community Size and Engagement',
        response:
          'Our healthcare innovation community includes 220 members, comprising 80 healthcare professionals, 60 developers, and 40 research scientists. Bi-weekly healthcare tech calls attract 70+ participants, and our specialized working groups on topics like health data privacy have 30 regular contributors. We maintain active partnerships with 10 healthcare institutions and 8 biotech research organizations.',
      },
      {
        title: 'Impact Assessment Plan',
        response:
          "We measure impact through both healthcare outcomes and technical metrics, including data security assessments, clinical utility evaluations, and user adoption rates. Projects must meet strict regulatory compliance standards and undergo regular security audits. We've developed a comprehensive framework for measuring healthcare impact while ensuring patient privacy. Quarterly reviews include both technical assessments and healthcare professional feedback.",
      },
    ],
  },
  {
    roundName: 'Local Communities Crypto Adoption Round',
    address: '0x6B5C4D3E2F1A0B9C8D7E6F5A4B3C2D1E0F9A8B',
    imgUrl: 'https://i.imgur.com/XgwcnwL.jpeg',
    responses: [
      {
        title: 'Identified Round Operator',
        response:
          "Over 4 years, I've led grassroots crypto education programs across Southeast Asia, managing LocalDAO's grant program that distributed 160 ETH to community-driven projects. I developed the Local Adoption Metrics Framework now used by multiple regional DAOs. Previously, I coordinated with Binance Charity to implement crypto payment solutions in underserved communities, managing projects across five countries.",
      },
      {
        title: 'Team Members',
        response:
          'Our team includes Maria Santos, who managed local crypto initiatives across Latin America, coordinating $250k in community grants. Arun Patel joins us from IndiaStack, where he led blockchain integration projects for local communities. Both bring extensive experience in grassroots organization and implementing crypto solutions in diverse cultural contexts.',
      },
      {
        title: 'Matching Pool Impact',
        response:
          "We've secured 65 ETH ($162,500) for our local adoption round. We plan to fund 20-25 community projects with grants between $5k-$10k, focusing on grassroots initiatives and local merchant adoption. We've partnered with regional crypto exchanges who will match our pool based on local adoption metrics. Our sustainability model includes a community treasury funded by successful local projects.",
      },
      {
        title: 'Mission Alignment',
        response:
          "Our round directly supports GG22's vision of expanding crypto adoption through local empowerment. We focus on funding community-led initiatives that increase crypto literacy, merchant adoption, and local use cases. Our selection criteria emphasizes projects that demonstrate strong community engagement and practical implementation strategies tailored to local needs.",
      },
      {
        title: 'Community Size and Engagement',
        response:
          "We coordinate with 40 local communities totaling over 800 active members. Our network includes 150 local merchants, 100 community educators, and 50 regional coordinators. Weekly community calls in multiple languages attract 200+ participants, and our local workshops reach 50-60 people per session. We've established partnerships with 25 local business associations and 15 educational institutions.",
      },
      {
        title: 'Impact Assessment Plan',
        response:
          'Impact is measured through concrete adoption metrics: number of active wallets, local transaction volumes, merchant participation rates, and community engagement levels. Projects must provide monthly reports on local adoption progress and community feedback. We track both quantitative metrics and qualitative community stories. Our impact dashboard displays real-time local adoption rates and success stories from different regions.',
      },
    ],
  },
];
