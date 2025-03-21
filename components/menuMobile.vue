<template>
    <div class="w-56 text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex w-full justify-center rounded-md">
        <button
            class="sm:hidden text-white focus:outline-none cursor-pointer"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
            >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
            />
            </svg>
        </button>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="z-40 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="px-1 py-1">
            
              <div class="px-1 py-1">
              <MenuItem v-for="(link, index) in menuLinks" :key="index" v-slot="{ active }">
                <NuxtLink
                    v-if="link"
                  :to="link.path"
                  :class="[
                    active ? 'bg-sky-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 cursor-pointer text-sm',
                  ]"
                >
                  {{ link.label }}
                </NuxtLink>
              </MenuItem>
            </div>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
  </template>
  
  <script setup>
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
  import { defineProps } from 'vue';  

  
  defineProps({
    buttonText: {
      type: String,
      default: 'Options',
    },
    menuLinks: {
      type: Array,
      required: true,
    },
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  });


  </script>