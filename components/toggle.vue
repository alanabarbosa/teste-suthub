<template>
    <div class="py-2">
      <label :for="id" class=" mb-2 block text-sm/6 font-medium text-gray-900">{{ label }}</label>
      
      <Switch
        v-model="enabled"
        :class="enabled ? 'bg-sky-900' : 'bg-sky-700'"
        class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          :class="enabled ? 'translate-x-9' : 'translate-x-0'"
          class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        />
      </Switch>  
 
      <div class="mt-2">
        <span class="text-sm">{{ enabled ? yesLabel : noLabel }}</span>
      </div>
  
      <input type="hidden" :id="id" :value="enabled ? yesLabel : noLabel" name="toggle-value" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps } from 'vue'
  import { Switch } from '@headlessui/vue'  
 
  const props = defineProps({
    label: String,
    id: String,
    yesLabel: {
      type: String,
      default: 'Sim'
    },
    noLabel: {
      type: String,
      default: 'Não'
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  })  

  const emit = defineEmits(['update:modelValue']);

    // Criar uma ref local para o estado do toggle
    const enabled = ref(props.modelValue);

    // Emitir evento quando o valor mudar
    watch(enabled, (newValue) => {
      emit('update:modelValue', newValue);
    });

    // Atualizar o estado local quando o modelValue mudar
    watch(() => props.modelValue, (newValue) => {
      enabled.value = newValue;
    });
  </script>
  