import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
            tags: z.array(z.string()).nullish().transform(value => value ?? []),
            draft: z.boolean().default(false),
            coverImage: z.string().nullish().transform(value => value || undefined).refine(value => !value || /^https?:\/\//.test(value) || /^\/uploads\//.test(value), 'Use an HTTP(S) URL or /uploads/ image path'),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.preprocess(value => value === '' || value === null ? undefined : value, z.coerce.date().optional()),
			heroImage: z.preprocess(value => value === '' || value === null ? undefined : value, image().optional()),
		}),
});

export const collections = { blog };
