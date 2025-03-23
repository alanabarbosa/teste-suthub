<template>
    <div class="px-4 lg:px-0 lg:py-0 md:px-8 sm:px-8 container flex justify-center flex-col mt-8 w-full my-0 mx-auto">
      <CustomTitle title="Receitas Favoritas" />
  
      <div v-if="!loaded">
        <Loading />
      </div>
  
      <div v-if="loaded && favoriteRecipes.length === 0" class="text-center">
        <p>Você ainda não possui receitas favoritas.</p>
      </div>
  
      <div v-if="favoriteRecipes.length > 0" class="mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl-grid-cols-3 gap-4">
        <div v-for="recipe in favoriteRecipes" :key="recipe.id">
          <Card 
            :recipe="recipe" 
            :toggleFavorite="toggleFavorite" 
            :isFavorite="isFavorite"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  import CustomTitle from "@/components/Title.vue";
  import Card from "@/components/Card.vue";
  import Loading from "@/components/Loading.vue";
  import { useRecipeFavoritesService } from '@/composables/useRecipeFavoritesService';
  
  export default {
    components: {
      Card,
      CustomTitle,
      Loading
    },
    setup() {
      const { fetchRecipesFavorites, favoriteRecipes, totalRecipes } = useRecipeFavoritesService();
      const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();
      const loaded = ref(false);
  
      const toggleFavorite = (recipeId: number): void => {
        const favorites = JSON.parse(getFromLocalStorage("recipesFavorites", "[]")) as number[];

        if (favorites.includes(recipeId)) {
            saveToLocalStorage("recipesFavorites", JSON.stringify(favorites.filter((id: number) => id !== recipeId)));
            } else {
                favorites.push(recipeId);
                saveToLocalStorage("recipesFavorites", JSON.stringify(favorites));
            }
        };

        const isFavorite = (recipeId: number): boolean => {
            const favorites = JSON.parse(getFromLocalStorage("recipesFavorites", "[]")) as number[];
            return favorites.includes(recipeId);
        };

  
      onMounted(async () => {
        await fetchRecipesFavorites(); 
        loaded.value = true;
      });
  
      return {
        favoriteRecipes,
        toggleFavorite,
        isFavorite,
        loaded,
        totalRecipes
      };
    }
  };
  </script>
  