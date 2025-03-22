<template>
    <div class="max-w-sm h-[500px] border border-sky-200 rounded-lg 
    shadow-sm bg-sky-800 dark:border-sky-700">
      <img class="rounded-t-lg" 
      :src="image" alt="" />
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 
          dark:text-white">
            {{ title }}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ text }}
        </p>
  
        <p class="h-[70px] mb-3 flex  gap-2 items-center flex-wrap 
        font-normal text-gray-900 dark:text-white">
          Tags: 
          <span v-for="(tag, index) in tags" 
          :key="index" 
          class=" mr-2 inline-block 
          bg-orange-200 rounded-full px-3 py-1 text-sm text-gray-700 dark:bg-orange-700 
          dark:text-white">
            {{ tag }}
          </span>
        </p>        
        <a 
          href="#" 
          class="inline-flex items-center px-3 py-2 text-sm font-medium 
          text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 
          focus:ring-4 focus:outline-none focus:ring-gray-300"
          @click="openModal"
        >
          Veja a receita completa
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 14 10">
            <path stroke="currentColor" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
      <TransitionRoot as="template" 
      :show="isOpen" 
      @close="isOpen = false">
        <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" 
        @close="isOpen = false">
          <div class="flex items-center justify-center min-h-screen">
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
            <div class="relative p-6 bg-white rounded-lg shadow-lg max-w-sm w-full">
              <DialogTitle as="h3" class="text-xl font-semibold text-gray-900 mb-4">
                {{ title }}
              </DialogTitle>
              <button @click="isOpen = false" class="cursor-pointer inline-flex 
              items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 
              rounded-lg hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </template>
  
  
  <script lang="ts" setup>
    import { ref } from 'vue';
    import { Dialog, DialogOverlay, DialogTitle, TransitionRoot } from '@headlessui/vue';
  
    const props = defineProps({
      image: {
        type: String,
        required: true
      },
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      tags: {
            type: Array as PropType<string[]>,
            required: true
        }
    });  

    const isOpen = ref(false);  

    const openModal = () => {
      isOpen.value = true;
    };
  </script>
  