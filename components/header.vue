<template>
    <header class="bg-sky-700 py-3 px-2">
      <nav class="container flex justify-between flex-wrap text-stone-50 my-o mx-auto">
        <h1>Teste Shuthub</h1>
        <ul class="flex justify-end gap-1 flex-wrap">
          <li>
            <NuxtLink to="/" 
            class="cursor-pointer hover:bg-sky-400 px-2 py-2 rounded-sm hover:text-stone-950"
            exact-active-class="bg-sky-400 text-gray-900">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/register" 
            class="cursor-pointer hover:bg-sky-400 px-2 py-2 rounded-sm hover:text-stone-950"
            exact-active-class="bg-sky-400 text-gray-900">Cadastro de usuarios</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/recipes" 
            class="cursor-pointer hover:bg-sky-400 px-2 py-2 rounded-sm hover:text-stone-950"
            exact-active-class="bg-sky-400 text-gray-900">Galeria de receitas</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/users" 
            class="cursor-pointer hover:bg-sky-400 px-2 py-2 rounded-sm hover:text-stone-950"
            exact-active-class="bg-sky-400 text-gray-900">Lista de usuarios</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>  


  </script>
  
  <style scoped>
 
  </style>
  