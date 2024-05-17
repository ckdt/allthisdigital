import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import basicSsl from '@vitejs/plugin-basic-ssl';
import vercel from "@astrojs/vercel/serverless";
const env = loadEnv('', process.cwd(), 'STORYBLOK');
 
// https://astro.build/config
export default defineConfig({
  integrations: [storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    bridge: env.STORYBLOK_IS_PREVIEW === 'yes',
    components: {
      page: 'storyblok/Page',
      config: 'storyblok/Config',
      feature: 'storyblok/Feature',
      grid: 'storyblok/Grid',
      teaser: 'storyblok/Teaser',
      article: 'storyblok/Article',
      'all-articles': 'storyblok/AllArticles',
      'featured-articles': 'storyblok/FeaturedArticles',
      work: 'storyblok/Work',
      'all-work': 'storyblok/AllWork',
    },
  }), tailwind()],
  output: env.STORYBLOK_IS_PREVIEW === 'yes' ? 'server' : 'static',
  ...(env.STORYBLOK_ENV === 'development' && {
    vite: {
      plugins: [basicSsl()],
      server: {
        https: true
      }
    }
  }),
  adapter: vercel()
});