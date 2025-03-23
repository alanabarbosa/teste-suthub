<template>
  <div class="slide-top max-w-sm sm:h-[auto]
  border border-sky-200 rounded-lg 
  shadow-sm bg-sky-800 dark:border-sky-700 card-transition">
    <img class="rounded-t-lg" 
    :src="recipe.image" alt="" />
    <div class="p-5 grid gap-5">
      <button class="flex justify-between items-center">
        <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 
        dark:text-white">
          {{ recipe.name }}
        </h5>
        <Heart
          :isActive="isFavorite(recipe.id)"
          @click="toggleFavorite(recipe.id)"
        />       
      </button>

      <ul class="h-[80px] mb-3
      flex gap-2 items-center flex-wrap 
      font-normal text-gray-900 dark:text-white mb-5">
        Tags: 
        <li v-for="(tag, index) in recipe.tags" 
        :key="index" 
        class="mr-2 inline-block 
        bg-orange-200 rounded-full px-3 py-1 text-sm text-gray-700 dark:bg-orange-700 
        dark:text-white">
          {{ tag }}
        </li>
      </ul>        
      <button 
        class="inline-flex items-center px-3 py-2 text-sm font-medium 
        text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 
        focus:ring-4 focus:outline-none focus:ring-gray-300"
        @click="openModal"
      >
        Veja a receita completa
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" 
        aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 14 10">
          <path stroke="currentColor" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
    </div>

    <TransitionRoot as="template" 
    :show="isOpen" 
    @close="isOpen = false">
      <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" 
      @close="isOpen = false">
        <div class="flex items-center justify-center min-h-screen ">
          <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
          <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full">
            <img class="rounded-t-lg w-full h-48 object-cover" 
            :src="recipe.image" alt="" />            
            <DialogTitle as="h3" class="px-3 py-3 text-xl font-semibold text-gray-900">
              {{ recipe.name }}
            </DialogTitle>
            <TabNav :recipe="recipe" />            
            <div class="px-6 py-3 flex justify-end">
              <button @click="isOpen = false" class="cursor-pointer inline-flex 
              items-center px-4 py-2 text-sm font-medium text-white bg-sky-700 
              rounded-lg hover:bg-sky-800">
                Fechar
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, TransitionRoot } from '@headlessui/vue';
import Heart from "~/components/ui/Heart.vue";
import TabNav from "@/components/ui/TabNav.vue";

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
  },    
});

const { saveToLocalStorage, getFromLocalStorage } = useLocalStorage();
const isOpen = ref(false);
const favorites = ref<number[]>(JSON.parse(getFromLocalStorage("recipesFavorites", "[]")));

const toggleFavorite = (recipeId: number): void => {
  console.log("Favorito clicado: ", recipeId);
  const existingFavorites = JSON.parse(getFromLocalStorage("recipesFavorites", "[]"));
  
  if (existingFavorites.includes(recipeId)) {
    favorites.value = existingFavorites.filter((id: number) => id !== recipeId);
  } else {
    favorites.value = [...existingFavorites, recipeId];
  }

  saveToLocalStorage("recipesFavorites", JSON.stringify(favorites.value));    

  window.dispatchEvent(new CustomEvent('favorites-updated'));
};

const isFavorite = (recipeId: number): boolean => {  
  return favorites.value.includes(recipeId);
};

const openModal = () => {
  isOpen.value = true;
};
</script>
