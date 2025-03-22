import { ref } from 'vue';

interface UserForm {
  firstName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  postalCode: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  income: string;
  car: boolean;
  pet: boolean;
  petBreed: { id: number | null, name: string };
  other?: string;
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const useUserService = (form: UserForm, v$?: Ref<any>) => {
  /**
   * Envia os dados do formulário para API
   * @returns Objeto com o resultado da operação
   */
  const submitUserData = async (): Promise<ApiResponse> => {    
    
    /*if (v$) {
      const isValid = await v$.value.$validate();
      if (!isValid) {
        console.log("Formulário inválido!");
        return { success: false, error: 'Formulário inválido' };
      }
    }*/
      
    try {
      const userData = { ...form };

      console.log('klsdjf')
          
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuário cadastrado com sucesso:', data);
        return { success: true, data };
      } else {
        console.error('Erro ao cadastrar o usuário:', response.status);
        return { 
          success: false, 
          error: `Erro ao cadastrar usuário: ${response.status}` 
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
    submitUserData
  };
};