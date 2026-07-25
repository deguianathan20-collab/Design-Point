import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function siteMetaPlugin(siteUrl) {
  return {
    name: 'designpoint-site-meta',
    transformIndexHtml(html) {
      if (!siteUrl) {
        return html.replace('<!-- SITE_META -->', '');
      }

      const origin = siteUrl.replace(/\/+$/, '');
      return html.replace(
        '<!-- SITE_META -->',
        [
          `<meta property="og:url" content="${origin}/" />`,
          `<meta property="og:image" content="${origin}/assets/hero-person.webp" />`,
          '<meta property="og:image:alt" content="Design Point web design team" />',
          `<link rel="canonical" href="${origin}/" />`,
        ].join('\n    '),
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), siteMetaPlugin(env.VITE_SITE_URL)],
  };
});
