<template>
    <button
      class="
        col-span-full
        mt-3 mb-3
        px-4 py-2 sm:px-8 sm:py-3
        sm:w-full md:w-max lg:w-max
        rounded-sm text-white
        bg-sky-700 hover:bg-sky-800
        cursor-pointer
      "
    >
      {{ title }}
    </button>
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
        },
        setup(props) {     
            return { props };
        }
    });
  </script>
  