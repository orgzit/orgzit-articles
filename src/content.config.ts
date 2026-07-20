import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    summary: z.string(),
    author: z.string(),
    authorAvatar: z.string(),
    date: z.string(),
    featured: z.boolean(),
  }),
});

export const collections = { articles };
