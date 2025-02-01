import { z } from 'zod';

export const submitApplicationSchema = z.object({
  // Step 1: Round Info
  name: z.string().min(1, 'Round name is required'),
  imgUrl: z.string().url('Please enter a valid URL'),
  socialLink: z.string().url('Please enter a valid URL'),
  description: z.string().min(1, 'Description is required'),
  typeOfProjects: z.string().min(1, 'Type of projects is required'),
  roundHistory: z.string().min(1, 'Round history is required'),

  // Step 2: Round Operator and Team
  'Identified Round Operator': z
    .string()
    .min(1, 'Round operator information is required'),
  'Team Members': z.string().min(1, 'Team member information is required'),
  advisors: z.string().min(1, 'Advisor information is required'),

  // Step 3: Round Strategy
  eligibilityCriteria: z.string().min(1, 'Eligibility criteria is required'),
  marketingPlanURL: z.string().url('Please enter a valid URL'),
  fundingMechanism: z.string().min(1, 'Funding mechanism is required'),

  // Step 4: Impact and Intents
  'Mission Alignment': z.string().min(1, 'Mission alignment is required'),
  'Impact Assessment Plan': z
    .string()
    .min(1, 'Impact assessment plan is required'),

  // Step 5: Community Engagement
  'Community Size and Engagement': z
    .string()
    .min(1, 'Community size information is required'),
  granteeEstimate: z.string().min(1, 'Grantee estimate is required'),
  'Matching Pool Impact': z
    .string()
    .min(1, 'Matching pool information is required'),

  // Step 6: Final Notes
  COI: z.string().min(1, 'Conflict of interest information is required'),
  considerations: z.string().min(1, 'Additional considerations are required'),
  moreInfo: z.string().min(1, 'Additional information is required'),

  // Additional fields from your original schema
  autoEnroll: z.boolean(),
});
