// @ts-check

import localCms from './cms/integration.mjs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://xkonohax.github.io',
	integrations: [mdx(), sitemap(), localCms()],
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
});

