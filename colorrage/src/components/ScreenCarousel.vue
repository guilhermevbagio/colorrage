<template>
    <div >


        <component :is="screens[activeIndex]" :key="activeIndex" class="flex justify-center" />


      <button
        @click="prev"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 transition duration-150 ease-in-out hover:scale-[1.3] p-2 bg-gray-800 text-white rounded-full"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>
      <button
        @click="next"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 transition duration-150 ease-in-out hover:scale-[1.3] p-2 bg-gray-800 text-white rounded-full"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-right" />
      </button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useActiveIndexStore } from '@/stores/activeScreenIndexStore';
  
  const props = defineProps({
    screens: {
      type: Array,
      required: true,
    },
  })
  const activeIndex = computed(() => store.activeIndex); 
  const store = useActiveIndexStore();
  const prev = () => {
    store.prev(props.screens.length); 
  };
  
  const next = () => {
    store.next(props.screens.length);
  };


  </script>
  

  
