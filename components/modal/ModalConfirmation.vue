<template>
    <TransitionRoot appear :show="open" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >           
            <div class="mx-auto text-center flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                <CheckCircleIcon class="size-6 text-green-600" aria-hidden="true" />
            </div>
              <DialogTitle
                as="h3"
                class="mt-3 text-xl font-medium leading-6 text-gray-900"
              >
                Cadastro finalizado!
              </DialogTitle>
              <div class="mt-2">
                <p class="text-md text-gray-500">
                  Seu cadastro foi realizado com sucesso.
                </p>
                <div class="mt-4 flex flex-col gap-2">
                  <p><strong>Nome Completo:</strong> {{ form.firstName }}</p>
                  <p><strong>CPF:</strong> {{ form.cpf }}</p>
                  <p><strong>Data de Nascimento:</strong> {{ form.birthDate }}</p>
                  <p><strong>Telefone:</strong> {{ form.phone }}</p>
                  <p><strong>Endereço:</strong> {{ form.address }}</p>
                  <p><strong>Bairro:</strong> {{ form.neighborhood }}</p>
                  <p><strong>Cidade:</strong> {{ form.city }}</p>
                  <p><strong>Estado:</strong> {{ form.state }}</p>
                  <p><strong>Possui Carro?</strong> {{ form.car ? 'Sim' : 'Não' }}</p>
                  <p><strong>Espécie do Pet:</strong> {{ form.pet ? 'Cão' : 'Gato' }}</p>
                  <p><strong>Raça do Pet:</strong> {{ form.petBreed.name }}</p>
                  <p v-if="form.other"><strong>Raça:</strong> {{ form.other }}</p>
                </div>
              </div>
              <div class="mt-4">
                <button
                  type="button"
                  class="cursor-pointer inline-flex justify-center 
                  rounded-md border border-transparent bg-sky-700 px-4 
                  py-2 text-sm font-medium text-stone-50 hover:bg-sky-800"
                  @click="closeModal"
                >
                  Fechar
                </button>
              </div>
            </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
<script setup>
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
  import { CheckCircleIcon } from '@heroicons/vue/24/outline';


  import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        open: {
            type: Boolean,
        },
            form: {
            type: Object
        },
    });
    const emit = defineEmits(['closeModal']);

    const closeModal = () => {
        emit('close');
    };    
</script>
  