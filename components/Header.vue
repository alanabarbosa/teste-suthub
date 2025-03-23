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
import { ref, onMounted, inject, watch, computed } from "vue";
import MenuMobile from '~/components/MenuMobile.vue';

const isClient = ref<boolean>(false);
const isMenuOpen = ref<boolean>(false);
const { getFromLocalStorage } = useLocalStorage();

// Referência para a contagem de favoritos
const favoritesCount = ref<number>(0);

// Links do menu como um computed property para atualização reativa
const menuLinks = computed(() => [
  { path: '/', label: 'Home' },
  { path: '/register', label: 'Cadastro de usuários' },
  { path: '/recipes', label: 'Galeria de receitas' },
  { path: '/users', label: 'Lista de usuários' },
  { path: '/favorites', label: `Receitas favoritas (${favoritesCount.value})` },
]);

// Função para obter a contagem de favoritos do localStorage
const getFavoritesCount = () => {
  try {
    const favorites = JSON.parse(getFromLocalStorage("recipesFavorites", "[]"));
    return favorites.length;
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    return 0;
  }
};

// Função que escuta as mudanças nos favoritos usando um evento personalizado
const setupFavoritesListener = () => {
  window.addEventListener('favorites-updated', () => {
    favoritesCount.value = getFavoritesCount();
  });
};

// Inicialização ao montar o componente
onMounted(() => {
  isClient.value = true;
  isMenuOpen.value = false;
  
  // Configura a contagem inicial de favoritos
  favoritesCount.value = getFavoritesCount();
  
  // Configura o ouvinte de eventos para atualizações
  setupFavoritesListener();
});
</script>