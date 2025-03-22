<template>
  <div class="w-full max-w-sm px-4">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? 'text-white' : 'text-white/90'"
        class="group inline-flex items-center rounded-md dark:bg-orange-700 
        px-3 py-2 text-base font-medium hover:text-white focus:outline-none 
        focus-visible:ring-2 focus-visible:ring-white/75 cursor-pointer"
      >
        <span>Filtrar por tags</span>
        <ChevronDownIcon
          :class="open ? 'text-orange-300' : 'text-orange-300/70'"
          class="ml-2 h-5 w-5 transition duration-150 ease-in-out 
          group-hover:text-orange-300/80"
          aria-hidden="true"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 
          transform px-4 sm:px-0 lg:max-w-3xl"
        >
          <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <div class="relative gap-8 bg-white p-7
            h-[300px] overflow-y-auto">
              <div class="flex flex-wrap gap-2 my-4">
              <div v-for="tag in tags" :key="tag" class="flex items-center">
                <input
                  type="checkbox"
                  :id="tag"
                  :value="tag"
                  v-model="selectedTagsInternal"
                  class="w-4 h-4 text-sky-600 border-gray-300 rounded 
                  focus:ring-sky-500"
                />
                <label :for="tag" class="ml-2 text-gray-700 dark:text-sky">
                  {{ tag }}
                </label>
              </div>
            </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  tags: {
    type: Array as () => string[],
    default: () => [],
    required: true,
  },
  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedTagsInternal = ref<string[]>([]);

watch(() => props.modelValue, (newVal) => {
  selectedTagsInternal.value = [...newVal];
}, { immediate: true });

watch(selectedTagsInternal, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>
