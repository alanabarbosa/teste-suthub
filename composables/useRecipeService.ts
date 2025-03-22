import { ref } from 'vue';

interface Recipe {
  image: string;
  name: string;
  tags: string[];
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  data?: Recipe[]; // Usando a interface Recipe aqui para tipar os dados
  error?: string;
}

export const useRecipeService = () => {
  /**
   * Envia os dados do formulário para API
   * @returns Objeto com o resultado da operação
   */
  const submitRecipeData = async (): Promise<ApiResponse> => {    
    
    try {
      const response = await fetch('https://dummyjson.com/recipes?limit=10', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();        
  
        console.log('Receitas pegas:', data);
        return { success: true, data: data as Recipe[] }; 
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
    submitRecipeData
  };
};
