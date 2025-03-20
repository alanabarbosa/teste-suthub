import { ref } from 'vue';

export const useAddress = () => {
  const addressForm = ref({
    postalCode: '',
    address: '',
    bairro: '',
    city: '',
    state: '',
  });

  const fetchAddress = async (postalCode: string) => {
    const postCodeClean = postalCode.replace("-", "");
    if (postCodeClean.length === 8) {
      try {
        console.log('Iniciando busca do CEP:', postCodeClean);
        const response = await fetch(`https://viacep.com.br/ws/${postCodeClean}/json/`);

        if (response.ok) {
          const data = await response.json();
          console.log('Resposta da API:', data);

          if (!data.erro) {
            addressForm.value.postalCode = postalCode;
            addressForm.value.address = data.logradouro || '';
            addressForm.value.bairro = data.bairro || '';
            addressForm.value.city = data.localidade || '';
            addressForm.value.state = data.uf || '';
            console.log('Campos preenchidos com sucesso!');
          } else {
            console.error('CEP não encontrado na base de dados');
          }
        } else {
          console.error('Erro na resposta da API:', response.status);
        }
      } catch (error) {
        console.error('Exceção ao buscar o CEP:', error);
      }
    } else {
      console.log('CEP incompleto. É necessário ter 8 dígitos.');
    }
  };

  return { addressForm, fetchAddress };
};
