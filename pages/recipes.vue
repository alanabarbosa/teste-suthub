<template>
    <div class="px-4 lg:px-0 lg:py-0 md:px-8 sm:px-8  lg:px-0 lg:py-0 md:px-8 sm:px-8 container flex justify-center flex-col mt-8 w-full my-0 mx-auto">
        <h3 class="col-span-full text-2xl font-medium leading-6 text-gray-900">Receitas:</h3>
      <Title title="Galeria de receitas" />    
      <Checkbox v-model="isChecked" label="Aceito os termos e condições" />  
      <div v-if="recipes.length" class="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div  v-for="recipe in recipes" :key="recipe.name">            
            <Card :image="recipe.image" :title="recipe.name" :tags="recipe.tags" />
        </div>        
      </div>
      <div v-else>
        <p>Carregando receitas...</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { onMounted, ref } from 'vue';
  import Title from "@/components/title.vue";
  import Checkbox from "@/components/checkbox.vue";
  import Card from "@/components/card.vue";  
  import { useRecipeService } from '@/composables/useRecipeService';
  
  export default {
    components: { Title, Card, Checkbox },
  
    setup() {
      const recipes = ref<Recipe[]>([]);
      const { submitRecipeData } = useRecipeService();  
      const selectedTags = ref<string[]>([]);

      const fetchRecipes = async () => {
        const response = await submitRecipeData();
        if (response.success && response.data) {
          recipes.value = response.data.recipes;
        } else {
          console.error(response.error);
        }
      };  

      console.log(selectedTags)

      onMounted(() => {
        fetchRecipes();
      });
  
      return {
        recipes,
        selectedTags
      };
    },
  };
  </script>
  