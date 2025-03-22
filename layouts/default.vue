<template>
    <Header />
    <main class="min-h-screen flex flex-col justify-between bg-sky-100">
      <NuxtPage />
    </main>
    <Footer />
  </template>
  
  <script lang="ts">
  import Header from "../components/Header.vue";
  import Footer from "../components/Footer.vue";
  
  export default {
    name: 'Layout'
  };
  </script>
  