// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import astroIcon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
export default defineConfig({
    site: 'https://nova-solutions.us/',

    devToolbar: {
        enabled: false
    },
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        astroIcon(),
        sitemap()
    ]
});
