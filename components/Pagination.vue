<template>
  <div class="flex justify-center mt-8">
    <nav class="flex items-center gap-1 py-5">

      <button 
        @click="goToPage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="px-3 py-2 rounded-md text-sm font-medium 
        bg-gray-200 hover:bg-gray-300 disabled:opacity-50 
        disabled:cursor-not-allowed cursor-pointer"
      >
        Anterior
      </button>      

      <button 
        v-if="showFirstButton"
        @click="goToPage(1)"
        class="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
        :class="1 === currentPage ? 'bg-blue-600 text-white' : 
        'bg-gray-200 hover:bg-gray-300'"
      >
        1
      </button>      

      <span v-if="showFirstEllipsis" class="px-2">...</span>      

      <button
        v-for="page in visiblePages" 
        :key="page"
        @click="goToPage(page)"
        class="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
        :class="page === currentPage ? 'bg-blue-600 text-white' : 
        'bg-gray-200 hover:bg-gray-300'"
      >
        {{ page }}
      </button>      

      <span v-if="showLastEllipsis" class="px-2">...</span>      

      <button 
        v-if="showLastButton && totalPages > 1"
        @click="goToPage(totalPages)"
        class="px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
        :class="totalPages === currentPage ? 'bg-blue-600 text-white' : 
        'bg-gray-200 hover:bg-gray-300'"
      >
        {{ totalPages }}
      </button>      

      <button 
        @click="goToPage(currentPage + 1)" 
        :disabled="currentPage === totalPages || totalPages === 0"
        class="px-3 py-2 rounded-md text-sm font-medium bg-gray-200 
        hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed 
        cursor-pointer"
      >
        Próximo
      </button>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  
  emits: ['changePage'],

  setup(props, { emit }) {
    const totalPages = computed(() => {
      return Math.ceil(props.totalItems / props.itemsPerPage) || 0;
    });


    const visiblePages = computed(() => {
      const pages = [];
      let startPage = Math.max(2, props.currentPage - 1);
      let endPage = Math.min(totalPages.value - 1, props.currentPage + 1);

      if (endPage - startPage < 2) {
        if (startPage === 2) {
          endPage = Math.min(4, totalPages.value - 1);
        } else if (endPage === totalPages.value - 1) {
          startPage = Math.max(2, totalPages.value - 3);
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      return pages;
    });
    
    const showFirstButton = computed(() => {
      return totalPages.value > 2 && !visiblePages.value.includes(1);
    });    

    const showLastButton = computed(() => {
      return totalPages.value > 2 && !visiblePages.value.includes(totalPages.value);
    });    

    const showFirstEllipsis = computed(() => {
      return visiblePages.value.length > 0 && visiblePages.value[0] > 2;
    });    

    const showLastEllipsis = computed(() => {
      return visiblePages.value.length > 0 && visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1;
    });

    const goToPage = (pageNumber: number) => {
      if (pageNumber < 1 || pageNumber > totalPages.value || pageNumber === props.currentPage) {
        return;
      }
      emit('changePage', pageNumber);
    };

    return {
      totalPages,
      visiblePages,
      showFirstButton,
      showLastButton,
      showFirstEllipsis,
      showLastEllipsis,
      goToPage
    };
  }
});
</script>