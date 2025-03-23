<template>
    <div class="search-container m-5">
      <input
        v-model="query"
        type="text"
        placeholder="Pesquisar..."
        class="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
        @input="onSearch"
      />
      <button
        @click="clearSearch"
        class="ml-2 bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-600 cursor-pointer"
      >
        Limpar
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  const query = ref('');
  const emit = defineEmits(['search']);  

  const onSearch = () => {
    emit('search', query.value);
  };  

  const clearSearch = () => {
    query.value = '';
    emit('search', query.value);
  };
  </script>
  
  <style scoped>
  .search-container {
    display: flex;
    align-items: center;
  }
  </style>
  