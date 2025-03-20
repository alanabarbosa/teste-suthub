import { ref } from 'vue';

export default function useValidation() {
  const errors = ref({
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
  });

  const validateFirstName = (firstName: string): boolean => {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/;
    return regex.test(firstName);
  };


  const validateCPF = (cpf: string): boolean => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  };

  const validatePhone = (phone: string): boolean => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(phone);
  };

  const validateBirthDate = (birthDate: string): boolean => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(birthDate);
  };

  const validatePostalCode = (postalCode: string): boolean => {
    const regex = /^\d{5}-\d{3}$/;
    return regex.test(postalCode);
  };

  const validateForm = (form: any): boolean => {
    let isValid = true;

   /* errors.value = {
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
        income: ''
      };
*/
    if (!validateFirstName(form.firstName)) {
        errors.value.firstName = 'O nome completo deve conter pelo menos duas palavras';
        isValid = false;
    } else{
        errors.value.firstName = ''
    }

    /*if (!form.lastName) {
      errors.value.lastName = 'Sobrenome é obrigatório';
      isValid = false;
    } else {
      errors.value.lastName = '';
    }*/

    if (!validateCPF(form.cpf)) {
      errors.value.cpf = 'CPF inválido';
      isValid = false;
    } 

    if (!validateBirthDate(form.birthDate)) {
      errors.value.birthDate = 'Data de nascimento inválida';
      isValid = false;
    } 

    if (!validatePhone(form.phone)) {
      errors.value.phone = 'Telefone inválido';
      isValid = false;
    } 

    if (!validatePostalCode(form.postalCode)) {
      errors.value.postalCode = 'CEP inválido';
      isValid = false;
    } 

    if (!form.address) {
      errors.value.address = 'Endereço é obrigatório';
      isValid = false;
    }

    if (!form.bairro) {
      errors.value.bairro = 'Bairro é obrigatório';
      isValid = false;
    } 

    if (!form.city) {
      errors.value.city = 'Cidade é obrigatória';
      isValid = false;
    } 

    if (!form.state) {
      errors.value.state = 'Estado é obrigatório';
      isValid = false;
    } 

    if (!form.income) {
      errors.value.income = 'Renda mensal é obrigatória';
      isValid = false;
    } 

    return isValid;
  };

  return { errors, validateForm };
}
