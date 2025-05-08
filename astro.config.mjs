// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import astroIcon from 'astro-icon';
import netlify from '@astrojs/netlify';
// https://astro.build/config
export default defineConfig({
    devToolbar: {
        enabled: false
    },
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        astroIcon(),
    ],
    output: 'server',
    adapter: netlify(),
    experimental: {
        session: true
    }
});
