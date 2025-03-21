import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

export const useValidation = () => {
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
    pet: true,
    petBreed: { id: null, name: '' }
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
      const numericValue = parseFloat(value.replace(/[R$\s\.,]/g, '').replace(',', '.'));
      return numericValue >= 1000;
    }
  ); 

  const stateRegex = helpers.withMessage(
    'O estado deve ser informado no formato abreviado. Ex: SP, RJ, MA',
    (value: string) => /^[A-Z]{2}$/.test(value)
  );

  const carRegex = helpers.withMessage(
    'É obrigatório selecionar “sim”',
    (value: boolean) => value === true
  );

  const petBreedRegex = helpers.withMessage(
    'É obrigatório selecionar uma raça válida.',
    (value: number) => {
      return value > 1;
    }
  );
  

  // Regras de validação
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
      required: helpers.withMessage('O Estado é obrigatório.', required),
      stateRegex
    },
    neighborhood: { 
      required: helpers.withMessage('O Bairro é obrigatório.', required),
    },
    address: { 
      required: helpers.withMessage('O Endereço é obrigatório.', required),
    },
    car: { 
      required: helpers.withMessage('É obrigatório selecionar “sim”', required),
      carRegex
    },
    petBreed: { 
      required: helpers.withMessage('É obrigatório selecionar uma raça', required),
      petBreedRegex
    }
  };
      
  const v$ = useVuelidate(rules, form);

  const validateField = (fieldName: string) => {
    if (fieldName) {
      v$.value[fieldName].$touch();
      return;
    }
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
    if (form.car) v$.value.car.$touch();
    
    if (form.petBreed && form.petBreed.id && form.petBreed.id > 0) {
      v$.value.petBreed.$touch();
    }
  }; 

  return {
    form,
    v$,
    validateField,
  }
};