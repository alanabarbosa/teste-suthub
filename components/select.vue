<template>
  <div class="w-72">
    <label 
      :for="id" 
      class="mt-5 block text-sm/6 font-medium text-gray-900">
      {{ label }}
    </label>
    <Listbox 
    v-model="selectedValue" 
    :class="['border-1 border-gray-300 rounded-md cursor-pointer', 
    errorClass]">        
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm"
        >
          <span class="block truncate cursor-pointer">
            {{ selectedValue?.name || 'Selecione uma opção' }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.name"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-sky-100 text-sky-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4 cursor-pointer',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  :data-id="option.id"
                  >{{ option.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  modelValue: {
    type: Object,
    default: () => ({})
  },
  label: {
    type: String,
    default: 'Selecione uma opção'
  },
  id: {
    type: String,
    default: 'select-dropdown'
  },
  errorClass: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectedValue = ref(props.modelValue || (props.options.length > 0 ? props.options[0] : {}))

// Observe as mudanças no valor selecionado e emita eventos
watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue)
  emit('change', newValue)
})

// Sincronize quando o modelValue mudar externamente
watch(() => props.modelValue, (newValue) => {
  if (newValue && newValue.id !== selectedValue.value?.id) {
    selectedValue.value = newValue
  }
})
</script>