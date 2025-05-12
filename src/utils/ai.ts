import { z } from 'zod';

const API = 'https://claude-service-api.vercel.app';
const API_LOCAL = 'http://localhost:8008';

const ROUTE = '/api/complete';

const promptSchema = z.object({
  new_funding_mechanism: z.number().min(1).max(5),
  matching_donations: z.number().min(1).max(5),
  participation_count: z.number().min(1).max(5),
  community_events: z.number().min(1).max(5),
  project_completion_rate: z.number().min(1).max(5),
  context: z.string(),
});

export type PromptSchema = z.infer<typeof promptSchema>;

const DUMMY_PROMPT: PromptSchema = {
  new_funding_mechanism: 1,
  matching_donations: 4,
  participation_count: 2,
  community_events: 3,
  project_completion_rate: 4,
  context: 'I prefer projects that fund local communities in the global south',
};

export const testAIServer = async (promptSeed: PromptSchema) => {
  try {
    const validated = promptSchema.parse(promptSeed);

    if (!validated) {
      console.error('Validation failed');
      return;
    }

    const response = await fetch(`${API_LOCAL}${ROUTE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        voterPrefs: validated,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('error', error);
  }
};
