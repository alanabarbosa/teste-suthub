<template>
  <header class="bg-sky-700 py-3 px-2">
    <nav class="container flex justify-between items-center text-stone-50 my-0 mx-auto">
      <h1>Teste Shuthub</h1>
      <MenuMobile
        v-if="isClient"
        :menuLinks="menuLinks"
        :isMenuOpen="isMenuOpen"
        buttonText="Options"
        class="sm:hidden"
      />
      <ul
        :class="{
          hidden: !isMenuOpen,
          'flex-col flex-wrap justify-end gap-3 bg-sky-800 rounded-lg sm:flex sm:flex-row sm:bg-transparent':
            true,
        }"
        class="hidden sm:flex"
      >
        <li v-for="(link, index) in menuLinks" 
        :key="index">
          <NuxtLink
            :to="link.path"
            class="cursor-pointer hover:bg-sky-800 px-5 py-2 
            rounded-sm hover:text-text-10 block"
            exact-active-class="bg-sky-800 text-gray-10"
            
          >
            {{ link.label }}
          </NuxtLink>
        </li>       
      </ul> 
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import MenuMobile from '~/components/MenuMobile.vue';

const isClient = ref<boolean>(false);
const isMenuOpen = ref<boolean>(false);

const menuLinks = ref<Array<{ path: string, label: string }>>([
  { path: '/', label: 'Home' },
  { path: '/register', label: 'Cadastro de usuários' },
  { path: '/recipes', label: 'Galeria de receitas' },
  { path: '/users', label: 'Lista de usuários' },
]);

onMounted(() => {
  isClient.value = true;
  isMenuOpen.value = false;
});
</script>
