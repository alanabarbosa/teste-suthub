<template>
  <div class="px-4 lg:px-0 lg:py-0 md:px-8 sm:px-8 container flex justify-center flex-col mt-8 w-full my-0 mx-auto">
    <h2 class="text-base/11 font-semibold text-gray-900">
      Cadastro de Usuário
    </h2>
    <form @submit.prevent="submitForm" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">   

      <div :class="{ error: v$.firstName.$errors.length }">
        <Input v-model="form.firstName"         
            label="Nome Completo" 
            :errorClass="v$.firstName.$dirty && !v$.firstName.$errors.length ? 'border-2 border-green-500 rounded-md' : v$.firstName.$errors.length ? 'border-3 border-red-500 rounded-md' : ''"
            id="firstName" 
            placeholder="Digite seu nome completo" 
           @input="remove('firstName')"
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
          @input="remove('cpf')"
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
          @input="remove('birthDate')"
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
          @input="remove('phone')"
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
          @input="remove('address')"
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
            @input="remove('neighborhood')"
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
            @input="remove('city')"
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
            @input="remove('state')"
            v-mask="'AA'"
            placeholder="Digite o seu estado"
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
            @input="remove('income')"
          />
        <div class="input-errors" 
        v-for="error of v$.income.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>

      <div :class="{ error: v$.car.$errors.length }">
        <div class="grid grid-cols-[auto_1fr] gap-2 items-center">
        <Toggle v-model="form.car" label="Possui carro?" id="car"/>
        <a class="text-center text-sm hover:text-cyan-800" href="#" @click.prevent="openModal = true">Porque precisamos dessa informação?</a>
      </div>
      <div class="input-errors" 
        v-for="error of v$.car.$errors" 
        :key="error.$uid">
          <p class="error-msg text-red-800">{{ error.$message }}</p>
        </div>
      </div>

      <Modal 
      :open="openModal" 
      @close="openModal = false"
      title="Porque nós precisamos dessa informação?"
      text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />

      <Toggle v-model="form.pet" label="Espécie do pet?" id="pet" yesLabel="Cão" noLabel="Gato" />

      <div :class="{ error: v$.petBreed.$errors.length }">
          <div class="flex gap-2 justify-between items-center w-100">
            <Select 
              v-if="form.pet"
              label="Raça do pet" 
              :options="dogBreed" 
              id="petBreed" 
              v-model="form.petBreed"
              :errorClass="v$.petBreed.$dirty && form.petBreed && form.petBreed.id && form.petBreed.id > 0 
              ? 'border-2 border-green-500 rounded-md' 
              : v$.petBreed.$dirty && (!form.petBreed || !form.petBreed.id || form.petBreed.id === 0) 
              ? 'border-3 border-red-500 rounded-md' 
              : ''"
              @change="remove('petBreed')"
            />
            <Select 
              v-if="!form.pet"
              label="Raça do pet" 
              :options="catBreed" 
              id="petBreed"
              v-model="form.petBreed"
              :errorClass="v$.petBreed.$dirty && form.petBreed && form.petBreed.id && form.petBreed.id > 0 
              ? 'border-2 border-green-500 rounded-md' 
              : v$.petBreed.$dirty && (!form.petBreed || !form.petBreed.id || form.petBreed.id === 0) 
              ? 'border-3 border-red-500 rounded-md' 
              : ''"
              @change="remove('petBreed')"
            />
          </div>
          <div class="input-errors" 
            v-if="form.petBreed.id == 0"
            v-for="error of v$.petBreed.$errors" 
            :key="error.$uid">
            <p class="error-msg text-red-800">{{ error.$message }}</p>
          </div>
        </div>
        
        <Button title="Casdastrar" />
    </form>
  </div>
</template>


<script lang="ts">
import Input from '@/components/Input.vue';
import Toggle from '@/components/toggle.vue';
import Modal from '@/components/modal.vue';
import Select from '@/components/select.vue';
import Button from '@/components/button.vue';
import { ref } from 'vue';
import { useValidation } from '@/composables/useValidation';
import { mask } from 'vue-the-mask';

export default {
  components: { Input, Toggle, Modal, Select, Button },
  directives: { mask },
  setup() {
    const { form, v$, validateField,  } = useValidation();

    const openModal = ref(false);

    const { fetchAddress } = useAddress(form, v$);

    const { submitUserData } = useUserService(form, v$);

    const submitForm = async () => {
      const isValid = await v$.value.$validate();
      
      if (!isValid) {
        console.log("Formulário inválido! Corrija os campos destacados.");
        /*Object.keys(v$.value).forEach(key => {
          if (key[0] !== '$' && v$.value[key].$errors.length > 0) {
            console.log(`Campo com erro: ${key}`, v$.value[key].$errors);
          }
        });*/
        return false;
      }
      
      const result = await submitUserData();
      if (result.success) {
        console.log("Formulário enviado com sucesso!");
        return true;
      } else {
        console.error("Erro ao enviar o formulário:", result.error);
        return false;
      }
    };

    const dogBreed = [
      { id: 0, name: 'Selecione uma opção' },
      { id: 1, name: 'Labrador Retriever' },
      { id: 2, name: 'Pastor Alemão' },
      { id: 3, name: 'Golden Retriever' },
      { id: 4, name: 'Bulldog Francês' },
      { id: 5, name: 'Poodle' },
      { id: 6, name: 'Outro' },
    ];

    const catBreed = [
      { id: 0, name: 'Selecione uma opção' },
      { id: 1, name: 'Persa' },
      { id: 2, name: 'Siamês' },
      { id: 3, name: 'Maine Coon' },
      { id: 4, name: 'Bengal' },
      { id: 5, name: 'Sphynx' },
      { id: 6, name: 'Outro' },
    ];

    watch(() => form.pet, () => {
      form.petBreed = { id: null, name: 'Selecione uma opção' };
    });

    watch(() => form.car, (newValue) => {
      if (!newValue) {
        v$.value.car.$touch(); 
      }
    });
    
    
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