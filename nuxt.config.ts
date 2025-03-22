import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  plugins: [
    "@/plugins/mask"
  ],

  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faStar', 'faClock', 'faPizzaSlice'],
    }
  },

  modules: ["@vesp/nuxt-fontawesome"],
});