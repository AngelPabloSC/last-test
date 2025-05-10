// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import astroIcon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
export default defineConfig({
        site: 'http://3.215.5.204',

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
