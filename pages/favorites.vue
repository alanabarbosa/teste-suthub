<template>
    <div class="container px-4 lg:px-0 lg:py-0 md:px-8 sm:px-8 container flex justify-center flex-col mt-8 w-full my-0 mx-auto mb-10">
      
        <div class="mb-6 grid flex-col items-center gap-4 justify-center">
        <CustomTitle title="Meus Favoritos" />
      </div>

      <div v-if="!loaded">
        <Loading />
      </div> 
       
      <div v-if="loaded && favoriteRecipes.length === 0" class="text-center">
        <p>Você ainda não possui receitas favoritas.</p>
      </div>  

      <div v-if="favoriteRecipes.length > 0" class="mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2
       lg:grid-cols-4 xl-grid-cols-3 gap-4">
            <TransitionGroup 
                name="card-fade" 
                tag="div" 
                class="contents"  
            >
                <div v-for="recipe in favoriteRecipes" :key="recipe.id" class="card-item">
                <Card 
                    :recipe="recipe" 
                    :toggleFavorite="handleToggleFavorite" 
                    :isFavorite="isFavorite"
                />
                </div>
            </TransitionGroup>
        </div>        
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import CustomTitle from "@/components/Title.vue";
  import Card from "@/components/Card.vue";
  import Loading from "@/components/Loading.vue";
  import { useRecipeFavoritesService } from '@/composables/useRecipeFavoritesService';
  
  const { fetchRecipesFavorites, favoriteRecipes, totalRecipes, setupFavoritesListener } = useRecipeFavoritesService();
  const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();
  const loaded = ref(false);
  const localFavorites = ref<number[]>([]);
  
  // Inicializa os favoritos do localStorage
  const initFavorites = () => {
    try {
      localFavorites.value = JSON.parse(getFromLocalStorage("recipesFavorites", "[]"));
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
      localFavorites.value = [];
    }
  };
  
  // Função que lida com o toggle do favorito
  const handleToggleFavorite = async (recipeId: number): Promise<void> => {
    console.log("Removendo favorito:", recipeId);
    
    // Atualiza localFavorites
    if (localFavorites.value.includes(recipeId)) {
      localFavorites.value = localFavorites.value.filter(id => id !== recipeId);
    } else {
      localFavorites.value = [...localFavorites.value, recipeId];
    }
    
    // Salva no localStorage
    saveToLocalStorage("recipesFavorites", JSON.stringify(localFavorites.value));
    
    // Atualiza a lista de receitas favoritas (com um leve atraso para a animação ser visível)
    if (localFavorites.value.includes(recipeId)) {
      // Se adicionou, atualiza imediatamente
      await fetchRecipesFavorites();
    } else {
      // Se removeu, aplica a animação antes de remover
      setTimeout(() => {
        favoriteRecipes.value = favoriteRecipes.value.filter(recipe => localFavorites.value.includes(recipe.id));
      }, 50); // Pequeno atraso para garantir que a animação seja iniciada
    }
    
    // Dispara o evento para atualizar o contador no cabeçalho
    window.dispatchEvent(new CustomEvent('favorites-updated'));
  };
  
  const isFavorite = (recipeId: number): boolean => {
    return localFavorites.value.includes(recipeId);
  };
  
  onMounted(async () => {
    initFavorites();
    await fetchRecipesFavorites();
    loaded.value = true;
    
    // Configura o listener para atualizar os favoritos quando mudanças ocorrerem
    const cleanupListener = setupFavoritesListener();
    
    // Quando o componente for desmontado, remove o listener
    onUnmounted(() => {
      cleanupListener();
    });
  });
  </script>
  
  <style scoped>
  /* Estilos para a animação de transição */
  .card-fade-enter-active,
  .card-fade-leave-active {
    transition: all 0.5s ease;
  }
  
  .card-fade-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .card-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  
  /* Garante que o layout da grid se ajuste suavemente */
  .card-item {
    transition: all 0.5s ease;
  }
  </style>