import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// The intended home. In CI, actions/configure-pages supplies the real Pages URL and path,
// so the absolute link-preview URLs in index.html always match where the site is served.
const DEFAULT_URL = 'https://alexwilder-dev.github.io/kurisu-omakase/';
const siteUrl = process.env.SITE_URL || DEFAULT_URL;
const base = process.env.BASE_PATH || '/kurisu-omakase/';

function siteUrlInHead(): Plugin {
  return {
    name: 'site-url-in-head',
    transformIndexHtml: (html) => html.replaceAll(DEFAULT_URL, siteUrl),
  };
}

export default defineConfig({
  base,
  plugins: [react(), siteUrlInHead()],
});
