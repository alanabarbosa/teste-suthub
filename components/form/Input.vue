<template>
  <div class="flex flex-col">
    <label :for="id" class="mt-5 block text-sm/6 font-medium text-gray-900">{{ label }}</label>
    <div class="mt-2">
      <div :class="[
          'flex items-center rounded-md bg-white outline-1 -outline-offset-1', 
          hasError ? 'outline-red-500' : errorClass ? errorClass : 'outline-gray-300' 
        ]">
        <input 
          type="text" 
          :name="id" 
          :value="modelValue"  
          :id="id" 
          :class="[baseClass, hasError ? 'border border-red-500 ' : errorClass]" 
          @input="handleInput"
          class="block min-w-0 grow py-1.5 pr-3 pl-1 
          text-base text-gray-900 placeholder:text-gray-400 
          focus:outline-none sm:text-sm rounded-md "
          :placeholder="placeholder"
        >
      </div>
    </div>
    <div class="input-errors" v-for="(error, index) in validationErrors" :key="index">
      <p class="error-msg text-red-500">{{ error }}</p>
    </div>
  </div>
</template>


<script lang="ts">
import { computed } from 'vue';

export default { 
  
  props: {
    modelValue: String,
    label: String,
    id: String,
    placeholder: String,
    baseClass: { type: String, default: '' },
    errorClass: { type: String, default: '' },
    validationErrors: { type: Array, default: () => [] }
  },
  setup(props) {
    const hasError = computed(() => props.validationErrors.length > 0);

    return {
      hasError,
    };
  },
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        this.$emit('update:modelValue', target.value);
      }
    }
  }
};
</script>
