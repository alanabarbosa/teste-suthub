export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@vesp/nuxt-fontawesome',
  ],

  plugins: [
    '@/plugins/mask',
  ],

  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faStar', 'faClock', 'faPizzaSlice'],
    },
  },

  compatibilityDate: '2025-03-23',
});