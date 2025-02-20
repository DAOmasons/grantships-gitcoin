import { z } from 'zod';

export const systemNoticeSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export const commentSchema = z.object({
  body: z.string().min(1),
  roleType: z.number(),
});
