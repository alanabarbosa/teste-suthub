import { ref, onMounted, onUnmounted } from 'vue';

interface Recipe {
  id: number;
  image: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  rating: number;
  tags: string[];
}

export const useRecipeFavoritesService = () => {
  const { getFromLocalStorage } = useLocalStorage();
  const favorites = ref<number[]>(JSON.parse(getFromLocalStorage("recipesFavorites", "[]")));
  const favoriteRecipes = ref<Recipe[]>([]);
  const totalRecipes = ref(0);

  const fetchRecipesFavorites = async () => {    
    try {
      favorites.value = JSON.parse(getFromLocalStorage("recipesFavorites", "[]"));
      
      const recipeData = await Promise.all(
        favorites.value.map(async (recipeId) => {
          const response = await fetch(`https://dummyjson.com/recipes/${recipeId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            console.error(`Erro ao buscar a receita: ${response.status}`);
            return null;
          }
        })
      );
      
      favoriteRecipes.value = recipeData.filter(recipe => recipe !== null);
      totalRecipes.value = favoriteRecipes.value.length;
      
    } catch (error) {
      console.error(`Erro na requisição: ${error instanceof Error ? error.message : 'Desconhecido'}`);
    }
  };

  const updateFavoritesFromLocalStorage = () => {
    const currentFavorites = JSON.parse(getFromLocalStorage("recipesFavorites", "[]"));
    favoriteRecipes.value = favoriteRecipes.value.filter(recipe => 
      currentFavorites.includes(recipe.id)
    );
    totalRecipes.value = favoriteRecipes.value.length;
  };

  const setupFavoritesListener = () => {
    window.addEventListener('favorites-updated', updateFavoritesFromLocalStorage);
    
    return () => {
      window.removeEventListener('favorites-updated', updateFavoritesFromLocalStorage);
    };
  };

  return {
    fetchRecipesFavorites,
    totalRecipes,
    favoriteRecipes,
    setupFavoritesListener
  };
};