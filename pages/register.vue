<template>
  <div class="container flex justify-center flex-col mt-8 w-full my-0 mx-auto">
    <h2 class="text-base/11 font-semibold text-gray-900">
      Cadastro de Usuário
    </h2>
    <form @submit.prevent="submitForm">     

      <div :class="{ error: v$.firstName.$errors.length }">
        <Input v-model="form.firstName"         
            label="Nome Completo" 
            :errorClass="v$.firstName.$dirty && !v$.firstName.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.firstName.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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
          :errorClass="v$.cpf.$dirty && !v$.cpf.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.cpf.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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
          :errorClass="v$.birthDate.$dirty && !v$.birthDate.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.birthDate.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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
          :errorClass="v$.phone.$dirty && !v$.phone.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.phone.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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
          :errorClass="v$.postalCode.$dirty && !v$.postalCode.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.postalCode.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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
          :errorClass="v$.address.$dirty && !v$.address.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.address.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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
            :errorClass="v$.neighborhood.$dirty && !v$.neighborhood.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.neighborhood.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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
            :errorClass="v$.city.$dirty && !v$.city.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.city.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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
            :errorClass="v$.state.$dirty && !v$.state.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.state.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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
            :errorClass="v$.income.$dirty && !v$.income.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.income.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
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

      <Toggle v-model="form.pet" label="Espécie do pet?" id="pet" yesLabel="Cão" noLabel="Gato" />
      
      <Select 
        v-if="form.pet"
        label="Raça do pet" 
        :options="dogBreed" 
        v-model="form.petBreed" 
        id="petBreed" 
      />
      <Select 
          v-if="!form.pet"
          label="Raça do pet" 
          :options="catBreed" 
          v-model="form.petBreed" 
          id="petBreed" 
        />

   
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
import { useValidation } from '@/composables/useValidation';
import { mask } from 'vue-the-mask';

export default {
  components: { Input, Toggle, Modal, Select },
  directives: { mask },
  setup() {
    const { form, v$, validateField,  } = useValidation();

    const openModal = ref(false);

    const { fetchAddress } = useAddress(form, v$);

    const { submitUserData } = useUserService(form, v$);

    const submitForm = async () => {
      const result = await submitUserData();
      return result.success;
    };

    const dogBreed = [
      { name: 'Labrador Retriever' },
      { name: 'Pastor Alemão' },
      { name: 'Golden Retriever' },
      { name: 'Bulldog Francês' },
      { name: 'Poodle' },
      { name: 'Outro' },
    ]

    const catBreed = [
      { name: 'Persa' },
      { name: 'Siamês' },
      { name: 'Maine Coon' },
      { name: 'Bengal' },
      { name: 'Sphynx' },
      { name: 'Outro' },
    ]

    if (form.pet === undefined) {
      form.pet = true; // Por padrão, começa com "Cão"
    }
    
    // Limpar a raça quando mudar o tipo de pet
    const watchPetType = () => {
      if (form.petBreed) {
        form.petBreed = null;
      }
    };
    
    // Observar mudanças no tipo de pet
    watch(() => form.pet, watchPetType);

    
    return { 
      form, 
      v$, 
      submitForm, 
      openModal, 
      fetchAddress, 
      remove: validateField,
      catBreed,
      dogBreed
    };
  }
};
</script>