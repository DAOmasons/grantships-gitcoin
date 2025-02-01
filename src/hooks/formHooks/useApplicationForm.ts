import { useForm, zodResolver } from '@mantine/form';
import { submitApplicationSchema } from '../../schemas/submitApplicationSchema';

export const useApplicationForm = () => {
  const form = useForm({
    initialValues: {
      // Step 1: Round Info
      name: '',
      imgUrl: '',
      socialLink: '',
      description: '',
      typeOfProjects: '',
      roundHistory: '',

      // Step 2: Round Operator and Team
      'Identified Round Operator': '',
      'Team Members': '',
      advisors: '',

      // Step 3: Round Strategy
      eligibilityCriteria: '',
      marketingPlanURL: '',
      fundingMechanism: '',

      // Step 4: Impact and Intents
      'Mission Alignment': '',
      'Impact Assessment Plan': '',

      // Step 5: Community Engagement
      'Community Size and Engagement': '',
      granteeEstimate: '',
      'Matching Pool Impact': '',

      // Step 6: Final Notes
      COI: '',
      considerations: '',
      moreInfo: '',

      // Additional fields from your original schema
      autoEnroll: true,
    },
    validateInputOnBlur: true,
    validate: zodResolver(submitApplicationSchema),
  });

  return { form, formSchema: submitApplicationSchema };
};
