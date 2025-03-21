<template>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="$emit('close')">
        <TransitionChild 
        as="template" 
        enter="ease-out duration-300" 
        enter-from="opacity-0" 
        enter-to="opacity-100" 
        leave="ease-in duration-200" 
        leave-from="opacity-100" 
        leave-to="opacity-0">
          <div 
          class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>
  
        <div 
        class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div 
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild 
            as="template" 
            enter="ease-out duration-300" 
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" 
            leave="ease-in duration-200" 
            leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel 
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">                    
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle 
                      as="h3" 
                      class="text-base font-semibold text-gray-900">{{ title }}</DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">{{ text }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">                 
                  <button 
                  type="button" 
                  class="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" 
                  @click="$emit('close')">Fechar</button>
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
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    open: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  });
  const emit = defineEmits(['close']);
  </script>
  