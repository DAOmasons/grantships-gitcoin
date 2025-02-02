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

  const hasErrors = Object.keys(form.errors).length > 0;

  const step1Complete =
    !!form.values.name &&
    !!form.values.imgUrl &&
    !!form.values.socialLink &&
    !!form.values.description &&
    !!form.values.typeOfProjects &&
    !!form.values.roundHistory;

  const step2Complete =
    !!form.values['Identified Round Operator'] &&
    !!form.values['Team Members'] &&
    !!form.values.advisors;

  const step3Complete =
    !!form.values.eligibilityCriteria &&
    !!form.values.marketingPlanURL &&
    !!form.values.fundingMechanism;

  const step4Complete =
    !!form.values['Mission Alignment'] &&
    !!form.values['Impact Assessment Plan'];

  const step5Complete =
    !!form.values['Community Size and Engagement'] &&
    !!form.values.granteeEstimate &&
    !!form.values['Matching Pool Impact'];

  const step6Complete =
    !!form.values.COI && !!form.values.considerations && !!form.values.moreInfo;

  return {
    form,
    formSchema: submitApplicationSchema,
    step1Complete,
    step2Complete,
    step3Complete,
    step4Complete,
    step5Complete,
    step6Complete,
    hasErrors,
  };
};
