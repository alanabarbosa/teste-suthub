<template>
  <footer class="bg-sky-700 text-stone-50 py-3 px-2">
    <div class="container flex flex-col items-center justify-center">
      <p>Copyright &copy; {{ currentYear }} | Desenvolvido por Alana Barbosa</p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>