import { z } from 'zod';
import { API } from './config';

const ROUTE = '/api/claude/complete';

const votePrefSchema = z.object({
  new_funding_mechanism: z.number().min(1).max(5),
  donations_received: z.number().min(1).max(5),
  additional_funds_raised: z.number().min(1).max(5),
  unique_donors: z.number().min(1).max(5),
  unique_projects: z.number().min(1).max(5),
  total_donations: z.number().min(1).max(5),
  context: z.string(),
});

export type PromptSchema = z.infer<typeof votePrefSchema>;

export const searchPrefs = async (promptSeed: PromptSchema) => {
  try {
    const validated = votePrefSchema.safeParse(promptSeed);

    if (!validated.success) {
      throw new Error('Validation failed');
    }

    const response = await fetch(`${API}${ROUTE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({
        voterPrefs: validated.data,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid response from server');
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};
