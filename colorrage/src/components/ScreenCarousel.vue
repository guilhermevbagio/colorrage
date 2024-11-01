<template>
    <div >


        <component :is="screens[activeIndex]" :key="activeIndex" class="flex justify-center" />


      <button
        @click="prev"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>
      <button
        @click="next"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
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
    activeIndex.value = (activeIndex.value - 1 + props.screens.length) % props.screens.length;
  };
  
  const next = () => {
    activeIndex.value = (activeIndex.value + 1) % props.screens.length;
  };
  </script>
  

  
