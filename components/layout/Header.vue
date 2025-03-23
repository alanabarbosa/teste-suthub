<template>
  <header :class="[
    'bg-sky-700 py-3 px-2 transition-all duration-300',
    isFixed ? 'fixed w-full top-0 left-0 z-50 shadow-md' : 'relative'
  ]">
    <nav class="container flex justify-between items-center 
    text-stone-50 my-0 mx-auto">
      <NuxtLink to="/" alt="botão para ir para o inicio" 
      class="cursor-pointer uppercase lg:text-xl hover:underline text-md">
        Teste Shuthub
      </NuxtLink>
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
        <li v-for="(link, index) in menuLinks" :key="index">
          <NuxtLink
            :to="link.path"
            class="cursor-pointer hover:bg-sky-800 px-5 py-2 rounded-sm hover:text-text-10 block"
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
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import MenuMobile from '~/components/layout/MenuMobile.vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

const isClient = ref<boolean>(false);
const isMenuOpen = ref<boolean>(false);
const isFixed = ref<boolean>(false);
const { getFromLocalStorage } = useLocalStorage();

const favoritesCount = ref<number>(0);

const menuLinks = computed(() => [
  { path: '/', label: 'Home' },
  { path: '/register', label: 'Cadastro de usuários' },
  { path: '/recipes', label: 'Galeria de receitas' },
  { path: '/users', label: 'Lista de usuários' },
  { path: '/favorites', label: `Receitas favoritas (${favoritesCount.value})` },
]);

const getFavoritesCount = () => {
  try {
    const favorites = JSON.parse(getFromLocalStorage("recipesFavorites", "[]"));
    return favorites.length;
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    return 0;
  }
};

const setupFavoritesListener = () => {
  window.addEventListener('favorites-updated', () => {
    favoritesCount.value = getFavoritesCount();
  });
};

const handleScroll = () => {
  if (window.scrollY > 100) {
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
};

onMounted(() => {
  isClient.value = true;
  isMenuOpen.value = false;
  
  favoritesCount.value = getFavoritesCount();
  
  setupFavoritesListener();
  
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

