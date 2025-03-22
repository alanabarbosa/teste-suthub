<template>
    <div class="flex items-center">
      <input
        type="checkbox"
        id="checkbox"
        :checked="modelValue"
        @change="updateCheckbox"
        class="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
      />
      <label for="checkbox" class="ml-2 text-gray-700 dark:text-white">{{ label }}</label>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const updateCheckbox = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).checked);
  };
  </script>
  
  <style scoped>
  /* Estilos adicionais para personalização (opcional) */
  </style>
  