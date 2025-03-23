<template>
  <div class="slide-top  overflow-x-auto">
    <table class="min-w-full table-auto bg-white shadow-lg rounded-lg">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th v-for="(header, index) in headers" :key="index" class="px-4 py-2 text-left font-semibold">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in rows" 
        :key="index" :class="index % 2 === 0 ? 'bg-gray-100 border-b' : 'border-b'">
          <td class="px-4 py-2">
            <img :src="user.image" 
            alt="Foto do usuário" 
            class="w-12 h-12 rounded-full">
          </td>
          <td class="px-4 py-2">{{ user.fullName }}</td>
          <td class="px-4 py-2">{{ user.birthDate }}</td>
          <td class="px-4 py-2">{{ user.gender }}</td>
          <td class="px-4 py-2" v-html="user.location"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

interface User {
  image: string;
  fullName: string;
  birthDate: string;
  gender: string;
  location: string;
}

interface TableProps {
  headers: string[];
  rows: User[];
}

const props = defineProps<TableProps>();
</script>