import { z } from 'zod';

const API = 'https://claude-service-api.vercel.app';
const API_LOCAL = 'http://localhost:8008';

const ROUTE = '/api/complete';

const votePrefSchema = z.object({
  new_funding_mechanism: z.boolean(),
  donations_received: z.string(),
  additional_funds_raised: z.string(),
  unique_donors: z.number(),
  unique_projects: z.number(),
  total_donations: z.number(),
  context: z.string(),
});

export type PromptSchema = z.infer<typeof votePrefSchema>;

export const searchPrefs = async (promptSeed: PromptSchema) => {
  try {
    const validated = votePrefSchema.safeParse(promptSeed);

    if (!validated.success) {
      throw new Error('Validation failed');
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
  } catch (error: any) {
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};
