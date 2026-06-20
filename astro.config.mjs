// @ts-check
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import tailwindcss from "@tailwindcss/vite";

const siteUrl =
    process.env.PUBLIC_SITE_URL || "https://franklin-ikeh.vercel.app";

// https://astro.build/config
export default defineConfig({
    site: siteUrl,
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        mermaid({
            autoTheme: true,
        }),
    ],
    markdown: {
        shikiConfig: {
            theme: "ayu-dark",
        },
    },
});
