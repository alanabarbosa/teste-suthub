<template>
  <div class="container flex justify-center flex-col mt-8 w-full my-0 mx-auto">
    <h2 class="text-base/11 font-semibold text-gray-900">Cadastro de Usuário</h2>
    <form @submit.prevent="submitForm">
      <Input v-model="form.firstName" 
        label="Nome" 
        id="firstName" 
        placeholder="Digite seu nome" 
      />

      <Input v-model="form.lastName" 
        label="Sobrenome" 
        id="lastName" 
        placeholder="Digite seu sobrenome" 
      />

      <Input v-model="form.cpf" 
        label="CPF" 
        id="cpf" 
        placeholder="000.000.000-00" 
        v-mask="'###.###.###-##'"
      />

      <Input v-model="form.birthDate" 
        label="Data de Aniversário" 
        id="birthDate" 
        placeholder="99/99/9999" 
        v-mask="'##/##/####'"
      />

      <Input v-model="form.phone" 
        label="Telefone celular" 
        id="phone" 
        placeholder="(99) 99999-9999"
        v-mask="'(##) #####-####'"
      />

      <Input v-model="form.postalCode" 
        label="CEP" 
        id="cep" 
        placeholder="99999999"
        v-mask="'#####-###'"
        @input="fetchAddress"
      />

      <Input v-model="form.address" 
        label="Endereço" 
        id="address" 
        placeholder="Rua" 
      />

      <Input v-model="form.bairro" 
        label="Bairro" 
        id="bairro" 
        placeholder="" 
      />

      <Input v-model="form.city" 
        label="Cidade" 
        id="city" 
        placeholder="" 
      />

      <Input v-model="form.state" 
        label="Estado" 
        id="state" 
        placeholder="" 
      />

      <Input v-model="form.income" 
        label="Renda Mensal" 
        id="income" 
        placeholder="" 
      />

      <Toggle v-model="form.car" label="Possui carro?" id="car"/>
      <a href="">Porque precisamos dessa informação?</a>

      <Toggle v-model="form.pet" label="Espécie do pet?" id="pet" yesLabel="cão" noLabel="gato"/>
   
      <button class="text-white px-4 rounded-sm 
        sm:px-8 py-2 sm:py-3 bg-sky-700 cursor-pointer mt-3 mb-3
        hover:bg-sky-800">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Input from '@/components/Input.vue';
import Toggle from '@/components/toggle.vue';
import { ref, watch } from 'vue';
import { mask } from 'vue-the-mask';

export default {
  components: { Input, Toggle },
  directives: { mask },
  setup() {
    const form = ref({
      firstName: '',
      lastName: '',
      cpf: '',
      birthDate: '',
      phone: '',
      postalCode: '',
      address: '',
      bairro: '',
      city: '',
      state: '',
      income: '',
      car: true,
      pet: ''
    });

    const fetchAddress = async (event: Event) => {
      const postalCode = (event.target as HTMLInputElement).value;
      const postCodeClean = postalCode.replace("-","")
      if (postCodeClean.length === 8) {
        try {
          console.log('Iniciando busca do CEP:', postCodeClean);
          const response = await fetch(`https://viacep.com.br/ws/${postCodeClean}/json/`);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Resposta da API:', data);
            
            if (!data.erro) {
              form.value.postalCode = postalCode;
              form.value.address = data.logradouro || '';
              form.value.bairro = data.bairro || '';
              form.value.city = data.localidade || '';
              form.value.state = data.uf || '';
              console.log('Campos preenchidos com sucesso!');
            } else {
              console.error('CEP não encontrado na base de dados');
              console.log('CEP não encontrado. Verifique o número informado.');
            }
          } else {
            console.error('Erro na resposta da API:', response.status);
            console.log('Erro ao buscar o CEP. Tente novamente mais tarde.');
          }
        } catch (error) {
          console.error('Exceção ao buscar o CEP:', error);
          console.log('Erro ao conectar com o serviço de CEP. Verifique sua conexão.');
        }
      } else {
        console.log('CEP incompleto. É necessário ter 8 dígitos.');
      }
    };

    const submitForm = async () => {
      try {
        const userData = {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          birthDate: form.value.birthDate,
          phone: form.value.phone,
          address: form.value.address,
          cpf: form.value.cpf,
          cep: form.value.postalCode,
          city: form.value.city,
          state: form.value.state,
          income: form.value.income,
          car: form.value.car ? "Sim" : "Não",
          pet: form.value.pet
        };

        const response = await fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Usuário cadastrado com sucesso:', data);
        } else {
          console.error('Erro ao cadastrar o usuário:', response.status);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    return { form, submitForm, fetchAddress };
  }
};
</script>
