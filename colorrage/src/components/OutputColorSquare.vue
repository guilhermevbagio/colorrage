<template>
    <div>
      <ColorSquare
        class="cursor-pointer"
        :class="color ? '' : 'border rounded-lg border-dashed border-gray-700'"
        :color="color"
        @click="copyToClipboard(color)"
      >
      <div v-if="copySuccess">
        <span  v-for="(char, index) in text" :key="index" class="text-white  font-extrabold z-10  wave-char wave-text "       :style="{ '--index': index }">{{char}}</span>
      </div>
      <div v-else>
        <font-awesome-icon v-if="color" class="transition duration-150 ease-in-out text-5xl opacity-20 hover:opacity-30 hover:scale-[1.04]" icon="fa-regular fa-copy" />
      </div>
      </ColorSquare>
      

    </div>
  </template>
  
  <script setup>
  import ColorSquare from './ColorSquare.vue';
  import { ref } from 'vue';
  
  const text = 'Copied to clipboard!'

  const copySuccess = ref(false);
  
  const copyToClipboard = async (text) => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        copySuccess.value = true;
        setTimeout(() => {
          copySuccess.value = false;
        }, 3000); 
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };
  
  defineProps({
    color: {
      type: String,
      default: '#06b6d4',
    },
  });
  </script>
  
  
  

  <style scoped>
  .wave-text {
    display: inline-flex;
    font-size: .8rem;
    font-weight: bolder;
  }
  
  .wave-char {
    display: inline-block;
    animation: wave-animation 0.4s ease-out infinite, fadeinout 2s ease-in-out;
    animation-delay: calc(var(--index) * 0.05s);
    opacity: 0; 
  }
  
  .wave-char.show {
    animation: wave-animation 0.4s ease-out infinite, fadeinout 2s ease-in-out;

  }
  
  @keyframes wave-animation {
    0% { transform: translateY(0); }
    50% { transform: translateY(-0.05rem); }
    100% { transform: translateY(0); }
  }
  
  @keyframes fadeinout {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }
  </style>
  
  
  