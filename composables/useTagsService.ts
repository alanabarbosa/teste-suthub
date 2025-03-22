import { ref } from 'vue';

interface Tag {
  image: string;
  name: string;
  tags: string[];
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  data?: Tag[]; 
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
          image: recipe.image,
          name: recipe.name,
          tags: recipe.tags || [],
        }));
        
        console.log('Tags das receitas:', tags);
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

  return {
    submitTagData
  };
};
