<template>
    <h2 class="text-2xl font-semibold text-gray-900">
      {{ title }}
    </h2>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  
  export default defineComponent({
    props: {
      title: {
        type: String as PropType<string>,
        required: true
      }
    }
  });
  </script>
  