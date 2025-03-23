<template>
  <div class="w-full">
    <label 
      :for="id" 
      class="mt-5 block text-sm/6 font-medium text-gray-900">
      {{ label }}
    </label>
    <Listbox 
      v-model="selectedValue">        
      <div class="relative mt-1">
        <ListboxButton
          :class="[
            'relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-1 -border-offset-1 border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:border-1 focus-visible:border-white/75 focus-visible:border-offset-1 focus-visible:border-offset-sky-300 sm:text-sm',
            hasError ? 'border border-red-500' : errorClass ? errorClass : 'border-gray-300'  
          ]"
        >
          <span class="block truncate cursor-pointer">
            {{ selectedValue?.name || 'Selecione uma opção' }}
          </span>
          <span
            class="cursor-pointer pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400 cursor-pointer"
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
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 focus:outline-none sm:text-sm z-50 top-[-246px] lg:top-[37px]"
          >

            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.id"
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
    
    <div class="input-errors" v-for="(error, index) in validationErrors" :key="index">
      <p class="error-msg text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    ChevronUpDownIcon
  },
  props: {
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
    },
    validationErrors: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue || (props.options.length > 0 ? props.options[0] : {}));
    
    const hasError = computed(() => props.validationErrors.length > 0);

    watch(selectedValue, (newValue) => {
      emit('update:modelValue', newValue);
      emit('change', newValue);
    });

    watch(() => props.modelValue, (newValue) => {
      if (newValue && newValue.id !== selectedValue.value?.id) {
        selectedValue.value = newValue;
      }
    });

    return {
      selectedValue,
      hasError
    };
  }
}
</script>