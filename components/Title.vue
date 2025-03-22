<template>
  <h2 class="text-2xl font-semibold text-gray-900">
    {{ title }}
  </h2>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>();
</script>
