import { ref } from 'vue';

interface Recipe {
  id: number,
  image: string;
  name: string;
  ingredients: [];
  instructions: [];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  rating: number;
  tags: string[];
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  data?: {
    recipes: Recipe[];
    total: number;
    skip: number;
    limit: number;
  };
  error?: string;
}

export const useRecipeService = () => {
  const totalRecipes = ref(0);
  const recipes = ref<Recipe[]>([]);
  
  const fetchRecipes = async (
    page: number = 1, 
    limit: number = 10): Promise<ApiResponse> => {    
    try {
      const skip = (page - 1) * limit;
      const response = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        totalRecipes.value = data.total || 0;

        return { 
          success: true, 
          data: {
            recipes: data.recipes || [],
            total: data.total || 0,
            skip: data.skip || 0,
            limit: data.limit || 10
          }
        };
      } else {
        return { 
          success: false, 
          error: `Erro ao buscar as receitas: ${response.status}` 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: `Erro na requisição: ${error instanceof Error ? error.message : 'Desconhecido'}`
      };
    }
  };

  const fetchRecipesByTag = async (
    tag: string, 
    page: number = 1, 
    limit: number = 10): 
    Promise<ApiResponse> => {
    try {
      const skip = (page - 1) * limit;
      const response = await fetch(`https://dummyjson.com/recipes/tag/${tag}?limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log("recipes for tag: " + response)
        const data = await response.json();
        return { 
          success: true, 
          data: {
            recipes: data.recipes || [],
            total: data.total || 0,
            skip: data.skip || 0,
            limit: data.limit || 10
          }
        };
      } else {
        return { 
          success: false, 
          error: `Erro ao buscar receitas com a tag ${tag}: ${response.status}` 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: `Erro na requisição: ${error instanceof Error ? error.message : 'Desconhecido'}`
      };
    }
  };

 

  return {
    fetchRecipes,
    fetchRecipesByTag,
    totalRecipes,
    recipes
  };
};