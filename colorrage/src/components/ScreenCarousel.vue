<template>
    <div >
      <!-- Render the active screen component -->
      <component :is="screens[activeIndex]" class="w-full h-full" />
  
      <!-- Navigation Controls -->
      <button
        @click="prev"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
      >
        ‹
      </button>
      <button
        @click="next"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
      >
        ›
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    screens: {
      type: Array,
      required: true,
    },
  })
  const activeIndex = ref(0);
  
  const prev = () => {
    activeIndex.value = (activeIndex.value - 1 + props.screens.length) % props.sscreens.length;
  };
  
  const next = () => {
    activeIndex.value = (activeIndex.value + 1) % props.screens.length;
  };
  </script>
  
  <style scoped>
  /* Styling to ensure each screen fills the container */
  </style>
  
