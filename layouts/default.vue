<template>
    <div>
        <Header />
        <main>
            <NuxtPage />
        </main>
        <Footer />
    </div>
  </template>
  
  <script>
    import Header from "../components/header.vue"
    import Footer from "../components/footer.vue"
    export default {
        name: '',

        data() {
            return {
            };
        },

        methods: {},
    };
  </script>