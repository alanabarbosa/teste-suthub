import { ref } from 'vue';

interface Recipe {
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
  
  // Função para buscar todas as receitas da API
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

  // Função para buscar receitas por tag específica
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

  // Função para buscar receitas por múltiplas tags
 /* const fetchRecipesByTags = async (tags: string[]): Promise<ApiResponse> => {
    if (tags.length === 0) {
      return fetchRecipes(1, 100); // Se não houver tags, retorna todas as receitas
    }
    
    if (tags.length === 1) {
      return fetchRecipesByTag(tags[0], 1, 100); // Se houver apenas uma tag, usa a API diretamente
    }
    
    try {
      // Para múltiplas tags, precisamos buscar por cada tag e depois fazer a interseção
      const tagPromises = tags.map(tag => fetchRecipesByTag(tag, 1, 100));
      const tagResults = await Promise.all(tagPromises);
      
      // Verifica se todas as consultas foram bem-sucedidas
      if (tagResults.some(result => !result.success)) {
        const errors = tagResults
          .filter(result => !result.success)
          .map(result => result.error)
          .join(', ');
        return { success: false, error: `Erro ao buscar receitas: ${errors}` };
      }
      
      // Pega as receitas da primeira tag
      const firstTagRecipes = tagResults[0].data?.recipes || [];
      
      // Encontra a interseção com as receitas das outras tags
      const recipesWithAllTags = firstTagRecipes.filter(recipe => {
        // Uma receita só é incluída se estiver presente em todos os resultados de tags
        return tagResults.every(tagResult => {
          const tagRecipes = tagResult.data?.recipes || [];
          return tagRecipes.some(tagRecipe => tagRecipe.id === recipe.id);
        });
      });
      
      return {
        success: true,
        data: {
          recipes: recipesWithAllTags,
          total: recipesWithAllTags.length,
          skip: 0,
          limit: recipesWithAllTags.length
        }
      };
    } catch (error) {
      return { 
        success: false, 
        error: `Erro ao buscar receitas com múltiplas tags: ${error instanceof Error ? error.message : 'Desconhecido'}`
      };
    }
  };*/

  return {
    fetchRecipes,
    fetchRecipesByTag,
   // fetchRecipesByTags,
    totalRecipes,
    recipes
  };
};