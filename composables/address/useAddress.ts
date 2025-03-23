import { ref } from 'vue';

interface UserForm {
  postalCode: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  [key: string]: any;
}

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export const useAddress = (form: UserForm, v$?: Ref<any>) => {
  /**
   * Busca o endereço a partir do CEP informado
   * @param event Evento do input ou valor do CEP
   */
  const fetchAddress = async (event: Event | string) => {    
    const postalCode = typeof event === 'string' 
      ? event 
      : (event.target as HTMLInputElement).value;
    
    const postCodeClean = postalCode.replace("-", "");
    
    if (postCodeClean.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${postCodeClean}/json/`);
        
        if (response.ok) {
          const data: ViaCEPResponse = await response.json();
          
          if (!data.erro) {
            form.postalCode = postalCode;
            form.address = data.logradouro || '';
            form.neighborhood = data.bairro || '';
            form.city = data.localidade || '';
            form.state = data.uf || '';
            
            if (v$) {
              v$.value.postalCode.$touch(); 
              v$.value.address.$touch();
              v$.value.neighborhood.$touch();
              v$.value.city.$touch();
              v$.value.state.$touch();
            }
            
            return { success: true, data };
          } else {
            console.error('CEP não encontrado na base de dados');
            return { success: false, error: 'CEP não encontrado' };
          }
        } else {
          console.error('Erro na resposta da API:', response.status);
          return { success: false, error: `Erro ${response.status}` };
        }
      } catch (error) {
        console.error('Erro ao conectar com o serviço de CEP:', error);
        return { success: false, error: 'Erro de conexão' };
      }
    }
    
    return { success: false, error: 'CEP inválido' };
  };

  return {
    fetchAddress
  };
};