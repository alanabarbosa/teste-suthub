<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow bg-sky-100">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import { useHead } from '#app';

useHead({
  title: 'Teste Suthub',
});
</script>