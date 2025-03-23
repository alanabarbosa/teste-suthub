import { ref } from 'vue';

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
      const recipeData = await Promise.all(
        favorites.value.map(async (recipeId) => {
          const response = await fetch(`https://dummyjson.com/recipes/${recipeId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (response.ok) {
            const data = await response.json();
            return data; // Retorna o dado diretamente
          } else {
            console.error(`Erro ao buscar a receita: ${response.status}`);
            return null;
          }
        })
      );
      
      // Remove valores nulos e armazena as receitas
      favoriteRecipes.value = recipeData.filter(recipe => recipe !== null);
      totalRecipes.value = favoriteRecipes.value.length;
      
    } catch (error) {
      console.error(`Erro na requisição: ${error instanceof Error ? error.message : 'Desconhecido'}`);
    }
  };

  return {
    fetchRecipesFavorites,
    totalRecipes,
    favoriteRecipes, // Adicionando favoriteRecipes aqui
  };
};
