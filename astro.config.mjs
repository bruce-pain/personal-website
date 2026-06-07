// @ts-check
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
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
