import { z } from 'zod';

export const batchVoteSchema = z.object({
  ratings: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      value: z.number(),
    })
  ),
  context: z.string(),
});
