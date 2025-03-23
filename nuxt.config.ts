import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@vesp/nuxt-fontawesome',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },
  plugins: [
    '@/plugins/mask',
  ],
  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faStar', 'faClock', 'faPizzaSlice'],
    },
  },
});
