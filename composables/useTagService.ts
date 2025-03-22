import { ref } from 'vue';

interface Tag {
  tags: string[];
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  data?: Tag[] | string[]; 
  error?: string;
}

export const useTagService = () => {
  /**
   * Envia os dados do formulário para API
   * @returns Objeto com o resultado da operação
   */
  const submitTagData = async (): Promise<ApiResponse> => {    
    try {
      const response = await fetch('https://dummyjson.com/recipes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();        

        const tags: Tag[] = data.recipes.map((recipe: any) => ({
          tags: recipe.tags || [],
        }));
        return { success: true, data: tags };
      } else {
        console.error('Erro ao pegar as receitas:', response.status);
        return { 
          success: false, 
          error: `Erro ao pegar as receitas: ${response.status}` 
        };
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      return { 
        success: false, 
        error: `Erro na requisição: ${error instanceof Error ? error.message : 'Desconhecido'}`
      };
    }
  };

  /**
   * Busca apenas as tags disponíveis na API
   * @returns Objeto com o resultado da operação contendo as tags
   */
  const fetchTags = async (): Promise<ApiResponse> => {
    try {
      const response = await fetch('https://dummyjson.com/recipes/tags', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data: data };
      } else {
        console.error('Erro ao buscar tags:', response.status);
        return { 
          success: false, 
          error: `Erro ao buscar tags: ${response.status}` 
        };
      }
    } catch (error) {
      console.error('Erro na requisição de tags:', error);
      return { 
        success: false, 
        error: `Erro na requisição: ${error instanceof Error ? error.message : 'Desconhecido'}`
      };
    }
  };

  return {
    submitTagData,
    fetchTags
  };
};