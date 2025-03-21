<template>
  <div class="container flex justify-center flex-col mt-8 w-full my-0 mx-auto">
    <h2 class="text-base/11 font-semibold text-gray-900">Cadastro de Usuário</h2>
    <form @submit.prevent="submitForm">     

      <div :class="{ error: v$.firstName.$errors.length }">
        <Input v-model="form.firstName"         
            label="Nome Completo" 
            :errorClass="v$.firstName.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
            id="firstName" 
            placeholder="Digite seu nome completo" 
            @input="remove"
          />
        <div class="input-errors" v-for="error of v$.firstName.$errors" :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>
      
      <div :class="{ error: v$.cpf.$errors.length }">
        <Input v-model="form.cpf" 
          label="CPF" 
          :errorClass="v$.cpf.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
          id="cpf" 
          placeholder="000.000.000-00"
          v-mask="'###.###.###-##'"
          @input="remove"
        />
        <div class="input-errors" 
        v-for="error of v$.cpf.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>

      <div :class="{ error: v$.birthDate.$errors.length }">
        <Input v-model="form.birthDate" 
          label="Data de Aniversário" 
          :errorClass="v$.birthDate.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
          id="birthDate" 
          placeholder="99/99/9999" 
          v-mask="'##/##/####'"
          @input="remove"
        />
        <div class="input-errors" 
        v-for="error of v$.birthDate.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div> 
      
      
      <div :class="{ error: v$.phone.$errors.length }">
        <Input v-model="form.phone"
          label="Telefone celular" 
          id="phone" 
          :errorClass="v$.phone.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
          placeholder="(00) 00000-0000"
          v-mask="'(##) #####-####'"
          @input="remove"
        />        
        <div class="input-errors" 
        v-for="error of v$.phone.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>       

     <div :class="{ error: v$.postalCode.$errors.length }">  
        <Input v-model="form.postalCode"
          label="CEP" 
          id="cep" 
          :errorClass="v$.postalCode.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
          placeholder="00000-000"
          @input="fetchAddress"
          v-mask="'#####-###'"
        />     
        <div class="input-errors" 
        v-for="error of v$.postalCode.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>

      <div :class="{ error: v$.address.$errors.length }">  
        <Input v-model="form.address"
          label="Endereço" 
          id="address" 
          :errorClass="v$.address.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
          @input="remove"
          placeholder="Digite o seu endereço"
        />     
        <div class="input-errors" 
        v-for="error of v$.address.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>

      <div :class="{ error: v$.neighborhood.$errors.length }">  
        <Input v-model="form.neighborhood"
            label="Bairro" 
            id="neighborhood" 
            :errorClass="v$.neighborhood.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
            placeholder="Digite o seu bairro" 
            @input="remove"
          />
        <div class="input-errors" 
        v-for="error of v$.neighborhood.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>

      <div :class="{ error: v$.city.$errors.length }">  
        <Input v-model="form.city"
            label="Cidade" 
            id="city" 
            :errorClass="v$.city.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
            placeholder="Digite o sua cidade" 
            @input="remove"
          />
        <div class="input-errors" 
        v-for="error of v$.city.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>

      <div :class="{ error: v$.state.$errors.length }">  
        <Input v-model="form.state"
            label="Estado" 
            id="state" 
            :errorClass="v$.state.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
            placeholder="Digite o seu estado" 
            @input="remove"
            v-mask="'AA'"
          />
        <div class="input-errors" 
        v-for="error of v$.state.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>

      <div :class="{ error: v$.income.$errors.length }">  
        <Input v-model="form.income"
            label="Renda Mensal" 
            id="income" 
            :errorClass="v$.income.$errors.length ? 'border-3 border-red-500 rounded-md' : 'border-2 border-green-500 rounded-md'"
            placeholder="Digite o sua renda mensal" 
            v-mask="'R$ #######,##'"

             @input="remove"
          />
        <div class="input-errors" 
        v-for="error of v$.income.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>

      <div class="flex gap-2 justify-between items-center w-100">
        <Toggle v-model="form.car" label="Possui carro?" id="car"/>
        <a class="hover:text-cyan-800" href="#" @click.prevent="openModal = true">Porque precisamos dessa informação?</a>
      </div>

      <Modal :open="openModal" @close="openModal = false" />

      <Toggle v-model="form.pet" label="Espécie do pet?" id="pet" yesLabel="cão" noLabel="gato"/>

      <Select label="Raça do pet" />
   
      <button class="text-white px-4 rounded-sm 
        sm:px-8 py-2 sm:py-3 bg-sky-700 cursor-pointer mt-3 mb-3
        hover:bg-sky-800">
        Cadastrar
      </button>
    </form>
  </div>
</template>


<script lang="ts">
import Input from '@/components/Input.vue';
import Toggle from '@/components/toggle.vue';
import Modal from '@/components/modal.vue';
import Select from '@/components/select.vue';
import { ref } from 'vue';
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import {mask} from 'vue-the-mask'

export default {
  components: { Input, Toggle, Modal, Select },
  directives: {mask},
  setup() {
    const form = reactive({
      firstName: '',
      cpf: '',
      birthDate: '',
      phone: '',
      postalCode: '',
      address: '',
      neighborhood: '',
      city: '',
      state: '',
      income: '',
      car: true,
      pet: ''
    });


    const nameRegex = helpers.withMessage(
      'O nome completo deve ter pelo menos duas palavras.',
        (value: string) => {
          const words = value.trim().split(/\s+/);          
          const validWords = words.filter(word => word.length > 0);
          return validWords.length >= 2;
        }
    );

    const cpfRegex = helpers.withMessage(
      'Digite um cpf valido: 000.000.000-00',
      (value: string) => {
        const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfPattern.test(value);
      }
    );

    const dateRegex = helpers.withMessage(
      'Digite uma data de aniversário valida: 00/00/0000',
      (value: string) => {
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        return datePattern.test(value);
      }
    );  
    
    
    const phoneRegex = helpers.withMessage(
      'Digite um formato de telefone válido: (00) 00000-0000',
      (value: string) => {
        const phonePattern = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        return phonePattern.test(value);
      }
    );


    const postalRegex = helpers.withMessage(
      'Digite um cep válido: 000000-000',
      (value: string) => {
        const postalPattern = /^\d{5}-\d{3}$/;
        return postalPattern.test(value);
      }
    ); 

    const incomeRegex = helpers.withMessage(
      'Valor mínimo permitido R$ 1000,00',
      (value: string) => {
        const incomePattern = /^R\$\s?(?:0|[1-9]\d{0,2})(?:\.\d{3})*(?:,\d{2})?$/;
        const numericValue = parseFloat(value.replace(/[R$\.,]/g, ''));
        console.log("incomePattern " + incomePattern)
        console.log("numericValue " + numericValue)
        return numericValue >= 1000;
      }
    ); 

    const ageValidation = helpers.withMessage(
      'Você deve ter entre 18 e 65 anos.',
      (value: string) => {
        const [day, month, year] = value.split('/');
        const birthDate = new Date(+year, +month - 1, +day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        let dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        return age >= 18 && age <= 65;
      }
    );


    const rules = {
      firstName: { 
        required: helpers.withMessage('O campo Nome Completo é obrigatório.', required), 
        nameRegex
      },
      cpf: { 
        required: helpers.withMessage('O CPF é obrigatório.', required),
        cpfRegex 
      },
      birthDate: { 
        required: helpers.withMessage('A data de nascimento é obrigatória.', required),
        dateRegex,
        ageValidation
      },
      phone: { 
        required: helpers.withMessage('O telefone é obrigatório.', required),
        phoneRegex
      },
      postalCode: { 
        required: helpers.withMessage('O CEP é obrigatório.', required),
        postalRegex
      },
      income: { 
        required: helpers.withMessage('A renda mensal é obrigatória.', required),
        incomeRegex
      },
      city: { 
        required: helpers.withMessage('O Cidade é obrigatório.', required),
      },
      state: { 
        required: helpers.withMessage('O EStado é obrigatório.', required),
      },
      neighborhood: { 
        required: helpers.withMessage('O Bairro é obrigatório.', required),
      },
      address: { 
        required: helpers.withMessage('O Endreço é obrigatório.', required),
      }
    };
        
    const v$ = useVuelidate(rules, form)

    const remove = () => {
      if (form.firstName) v$.value.firstName.$touch();
      if (form.cpf) v$.value.cpf.$touch();
      if (form.birthDate) v$.value.birthDate.$touch();
      if (form.phone) v$.value.phone.$touch();
      if (form.postalCode) v$.value.postalCode.$touch();
      if (form.income) v$.value.income.$touch();
      if (form.city) v$.value.city.$touch();
      if (form.state) v$.value.state.$touch();
      if (form.neighborhood) v$.value.neighborhood.$touch();
      if (form.address) v$.value.address.$touch();

      if (!v$.value.firstName.$invalid) {
        console.log('Validação correta, aplicando borda verde.');
      }     
    }

    const openModal = ref(false);

    const fetchAddress = async (event: Event) => {
      const postalCode = (event.target as HTMLInputElement).value;
      const postCodeClean = postalCode.replace("-","");
      console.log("postCodeClean " + postCodeClean)
      if (postCodeClean.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${postCodeClean}/json/`);
          
          if (response.ok) {
            const data = await response.json();
            
            if (!data.erro) {
              form.postalCode = postalCode;
              form.address = data.logradouro || '';
              form.neighborhood = data.bairro || '';
              form.city = data.localidade || '';
              form.state = data.uf || '';

              v$.value.postalCode.$touch(); 
              v$.value.postalCode.$validate();

              v$.value.address.$touch(); 
              v$.value.address.$validate();
            } else {
              console.error('CEP não encontrado na base de dados');
            }
          } else {
            console.error('Erro na resposta da API:', response.status);
          }
        } catch (error) {
          console.error('Erro ao conectar com o serviço de CEP:', error);
        }
      }
    };

    const submitForm = async () => {
      const isValid = await v$.value.$validate();

      if (!isValid) {
        console.log("Formulário inválido!");
        return;
      }
      try {
        const userData = { ...form };
        const response = await fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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

    return { form, v$, submitForm, openModal, fetchAddress, remove };
  }
};
</script>
