import { z } from 'astro/zod';
import data from './works.json';

const mediaPath = z.string().trim().min(1).refine(
  value => /^https?:\/\//i.test(value) || /^\/uploads\//.test(value),
  'Use an HTTP(S) media URL or a file uploaded under /uploads/',
);
const workSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1),
  category: z.enum(['Photography', 'Design', 'Video']),
  type: z.enum(['image', 'video']),
  src: mediaPath,
  videoUrl: z.preprocess(value => value || undefined, mediaPath.optional()),
  alt: z.string().nullish().transform(value => value || ''),
  span: z.enum(['normal', 'wide', 'tall']).default('normal'),
  visible: z.boolean().default(true),
}).superRefine((work, context) => {
  if (work.type === 'video' && !work.videoUrl) {
    context.addIssue({ code: 'custom', path: ['videoUrl'], message: `Video work "${work.title}" needs a video file or URL` });
  }
});

export type Work = z.infer<typeof workSchema>;
export const WORKS = z.object({ works: z.array(workSchema) }).parse(data).works
  .filter(work => import.meta.env.DEV || work.visible);
export const CATEGORIES = ['All', 'Photography', 'Design', 'Video'] as const;
