<template>
  <div class="flex flex-col py-2">
    <label :for="id" class="mb-2 block text-sm/6 font-medium text-gray-900">{{ label }}</label>
    
    <div class="flex items-center">
      <Switch
        v-model="enabled"
        :class="[
          enabled ? 'bg-sky-900' : 'bg-sky-700',
          hasError ? 'ring-2 ring-red-500' : ''
        ]"
        class="relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          :class="enabled ? 'translate-x-9' : 'translate-x-0'"
          class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        />
      </Switch>

      <div class="ml-2">
        <span class="text-sm">{{ enabled ? yesLabel : noLabel }}</span>
      </div>
    </div>

    <div class="input-errors mt-5" v-for="(error, index) in validationErrors" :key="index">
      <p class="error-msg text-red-500">{{ error }}</p>
    </div>
    
    <input type="hidden" :id="id" :value="enabled ? yesLabel : noLabel" name="toggle-value" />
  </div>
</template>

<script lang="ts">
import { ref, watch, computed } from 'vue'
import { Switch } from '@headlessui/vue'

export default {
  components: { Switch },
  props: {
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
    },
    validationErrors: {
      type: Array,
      default: () => []
    },
    errorClass: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const enabled = ref(props.modelValue);
    const hasError = computed(() => props.validationErrors.length > 0);
    
    watch(enabled, (newValue) => {
      emit('update:modelValue', newValue);
    });

    watch(() => props.modelValue, (newValue) => {
      enabled.value = newValue;
    });

    return {
      enabled,
      hasError
    };
  }
}
</script>