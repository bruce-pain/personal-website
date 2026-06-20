// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";

// 4. Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        description: z.optional(z.string()),
        date: z.coerce.date(),
        draft: z.boolean().default(false),
        last_updated: z.optional(z.coerce.date()),
    }),
});

const projects = defineCollection({
    loader: glob({
        base: "./src/content/projects",
        pattern: "**/*.{md,mdx}",
    }),
    schema: z.object({
        name: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        live: z.boolean().default(false),
        wip: z.boolean().default(false),
    }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog, projects };
