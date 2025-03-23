<template>
  <div v-if="totalFilteredRecipes" class="px-4 lg:px-0 lg:py-0 md:px-8 sm:px-8 container 
  flex justify-center flex-col mt-8 w-full my-0 mx-auto">    
    <div v-if="availableTags.length > 0" 
      class="mb-6 grid flex-col items-center gap-4 justify-center">
      <h3 class="col-span-full text-2xl font-medium leading-6 text-gray-900">
        Galeria de receitas:
      </h3>
      <Title title="Galeria de receitas" />
      <Checkbox 
        :tags="availableTags" 
        v-model="selectedTags" 
      />
    </div>
    
    <div v-if="isLoading" class="text-center py-10">
        <Loading />
        <p>Carregando receitas...</p>
    </div>
    
    <div v-else="paginatedRecipes.length" class="flex flex-col">
      <div class="mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2
       lg:grid-cols-4 gap-4">
        <div v-for="recipe in paginatedRecipes" :key="recipe.name">
          <Card :recipe="recipe" />
        </div>
      </div>      
   
      <Pagination 
        :totalItems="totalFilteredRecipes" 
        :itemsPerPage="itemsPerPage" 
        :currentPage="currentPage"
        @changePage="onPageChange" 
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Title from "@/components/Title.vue";
import Checkbox from "@/components/Checkbox.vue";
import Pagination from "@/components/Pagination.vue";
import Card from "@/components/Card.vue";
import { useRecipeService } from '@/composables/useRecipeService';
import { useTagService } from '@/composables/useTagService';
import { useLocalStorage } from '@/composables/useLocalStorage';

interface Recipe {
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  rating: number;
  tags: string[];
}

export default {
  components: { Title, Card, Checkbox, Pagination },
  
  setup() {
    const recipes = ref<Recipe[]>([]);
    const availableTags = ref<string[]>([]);
    const selectedTags = ref<string[]>([]);
    const isLoading = ref(true);
    const totalRecipes = ref(0);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const allFilteredRecipes = ref<Recipe[]>([]);
      const allTagsFiltered = ref<string[]>([]);
    
    const { fetchRecipes, fetchRecipesByTag } = useRecipeService();
    const { fetchTags } = useTagService();
    
    const filteredRecipes = computed(() => {
      if (selectedTags.value.length === 0) {
        return recipes.value;
      }
      allFilteredRecipes.value = recipes.value.filter(recipe =>
        selectedTags.value.some(tag => recipe.tags.includes(tag))
      );

      return allFilteredRecipes.value;
    });

    
    // Total de receitas após a filtragem
    const totalFilteredRecipes = computed(() => {
      return filteredRecipes.value.length;
    });

    // Receitas da página atual
    const paginatedRecipes = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return filteredRecipes.value.slice(startIndex, endIndex);
    });
    
    // Carrega as receitas
    const loadRecipes = async () => {
      isLoading.value = true;
      try {   
        console.log(typeof selectedTags.value)
        if (selectedTags.value) {
          const response = await fetchRecipes(1, 100);
          //console.log("fetchRecipesByTag: " + JSON.stringify(response))
          if (response.success && response.data) {
            recipes.value = response.data.recipes;
            totalRecipes.value = response.data.total;
          } else {
            console.error(response.error);
          }
        } else {
          const response = await fetchRecipes(1, 100);
          //console.log("loadRecipes: " + JSON.stringify(response))
          if (response.success && response.data) {
            recipes.value = response.data.recipes;
            totalRecipes.value = response.data.total;
          } else {
            console.error(response.error);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
      } finally {
        isLoading.value = false;
      }
    };
    
    // Carrega as tags disponíveis
    const loadTags = async () => {
      try {
        const response = await fetchTags();
        //console.log("loadTags: " + JSON.stringify(response))
        if (response.success && response.data) {
          availableTags.value = response.data as string[];
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Erro ao carregar tags:", error);
      }
    };
    
    // Manipula a mudança de página
    const onPageChange = (page: number) => {
      currentPage.value = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Reseta a página quando os filtros mudam
    watch(selectedTags, () => {
      currentPage.value = 1;
    });
    
    onMounted(() => {
      Promise.all([loadRecipes(), loadTags()]);
    });
    
    return {
      recipes,
      availableTags,
      selectedTags,
      filteredRecipes,
      paginatedRecipes,
      totalFilteredRecipes,
      currentPage,
      itemsPerPage,
      isLoading,
      onPageChange,
      fetchRecipesByTag,
      useLocalStorage,
    };
  },
};
</script>