<template>
  <div class="flex flex-col">
    <label :for="id" class="mt-5 block text-sm/6 font-medium text-gray-900">{{ label }}</label>
    <div class="mt-2">
      <div class="flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300">
        <input 
          type="text" 
          :name="id" 
          :value="modelValue"  
          :id="id" 
          :class="[baseClass, errorClass]" 
          @input="$emit('update:modelValue', $event.target.value)"
          class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          :placeholder="placeholder"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    modelValue: String,
    label: String, 
    id: String, 
    placeholder: String,
    baseClass: { type: String, default: '' }, 
    errorClass: { type: String, default: '' } 
  }
}
</script>
