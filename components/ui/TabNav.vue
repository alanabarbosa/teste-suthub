<template>
    <div class="w-full px-2 py-4 sm:px-0">
      <TabGroup>
        <TabList class="mx-6 grid grid-cols-1 lg:grid-cols-4 space-x-1 sm:space-x-0 
        rounded-xl bg-sky-800 p-1 cursor-pointer">
            <Tab
                v-for="category in categories"
                :key="category"
                v-slot="{ selected }"
            >
                <button
                :class="[
                    'cursor-pointer px-4 sm:px-2 w-full rounded-lg py-2 text-sm font-medium leading-5',
                    'border-b-2 border-b-blue-400 lg:border-none ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                    ? 'bg-sky-700 text-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                ]"
                >
                {{ category }}
                </button>
            </Tab>
        </TabList>

        <TabPanels class="mt-2">
          <TabPanel
            :class="[
              'rounded-xl bg-white p-6',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
          >
            <div class="mb-3">
              <h4 class="cursor-pointer font-medium text-gray-900 mb-2">Ingredientes:</h4>
              <ol class="list-decimal pl-5 mb-3">
                <li v-for="(ing, index) in recipe.ingredients" 
                :key="index" 
                class="mb-1 text-sm text-gray-700">
                  {{ ing }}
                </li>
              </ol>
            </div>
          </TabPanel>  

          <TabPanel
            :class="[
              'rounded-xl bg-white p-6',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
          >
            <div class="mb-3">
              <h4 class="cursor-pointer font-medium text-gray-900 mb-2">Instruções:</h4>
              <ol class="list-decimal pl-5 mb-3">
                <li v-for="(ins, index) in recipe.instructions" 
                :key="index" 
                class="mb-1 text-sm text-gray-700">
                  {{ ins }}
                </li>
              </ol>
            </div>
          </TabPanel>  
     
          <TabPanel :class="['rounded-xl bg-white p-6']">
            <div class="mb-4 grid gap-2">
              <p class="flex items-center gap-2">
                <strong>Tempo total de preparação: </strong>{{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} min
                <font-awesome-icon :icon="['fas', 'clock']" class="text-blue-500 h-6 w-6" />
              </p>
              <p class="flex items-center gap-3">
                <strong>Porções: </strong>{{ recipe.servings }}
                <span class="inline-flex flex-wrap">
                  <font-awesome-icon 
                    v-for="index in recipe.servings" 
                    :key="'portion-' + index" 
                    :icon="['fas', 'pizza-slice']" 
                    class="text-yellow-500 h-6 w-6 mr-1 mb-1" 
                  />
                </span>
              </p>
              <p class="flex items-center gap-3">
                <strong>Avaliação: </strong>{{ recipe.rating }}/5
                <span class="inline-flex flex-wrap">
                  <font-awesome-icon 
                    v-for="index in Math.floor(recipe.rating)" 
                    :key="'star-' + index" 
                    :icon="['fas', 'star']" 
                    class="text-orange-400 h-6 w-6 mr-1 mb-1" 
                  />
                  <font-awesome-icon 
                    v-if="recipe.rating % 1 >= 0.5" 
                    :icon="['fas', 'star-half-alt']" 
                    class="text-orange-400 h-6 w-6 mr-1 mb-1" 
                  />
                  <font-awesome-icon 
                    v-for="index in 5 - Math.ceil(recipe.rating)" 
                    :key="'empty-star-' + index"
                    :icon="['far', 'star']" 
                    class="text-orange-400 h-6 w-6 mr-1 mb-1" 
                  />
                </span>
              </p>
              <p class="flex items-center gap-3"><strong>Dificuldade: </strong>{{ getDifficulty }}</p>
            </div>
          </TabPanel>

          <TabPanel
            :class="[
              'rounded-xl bg-white p-6',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
          >
            <div class="mb-3">
              <ul class="h-[70px] mb-3 flex gap-2 items-center flex-wrap 
                font-normal text-gray-900 dark:text-white justify-center">
                    <li v-for="(tag, index) in recipe.tags" 
                    :key="index" 
                    class="mr-2 inline-block 
                    bg-orange-200 rounded-full px-3 py-1 text-sm text-gray-700 dark:bg-orange-700 
                    dark:text-white ">
                    {{ tag }}
                    </li>
                </ul> 
            </div>
          </TabPanel>           
        </TabPanels>
      </TabGroup>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  interface Recipe {
    image: string;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    rating: number;
    tags: string[];
    [key: string]: any;
  }
  
  const props = defineProps({
    recipe: {
      type: Object as () => Recipe,
      required: true
    }
  });
  
  const categories = ref([
    'Ingredientes',
    'Instruções',
    'Detalhes',
    'Tags',
  ]);
  
  const getDifficulty = computed(() => {
    const totalTime = props.recipe.prepTimeMinutes + props.recipe.cookTimeMinutes;
    const stepsCount = props.recipe.instructions.length;
    
    if (totalTime > 60 || stepsCount > 8) {
      return 'Difícil';
    } else if (totalTime > 30 || stepsCount > 5) {
      return 'Médio';
    } else {
      return 'Fácil';
    }
  });
  </script>