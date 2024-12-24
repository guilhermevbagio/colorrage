<template>
  <div class="fixed top-0 right-0">
    <div class="flex flex-row w-screen items-center bg-gray-800 justify-between text-white p-4 z-50">
      <h1 class="text-3xl font-bold flex justify-start tracking-tighter">
          
          <span v-for="(char, index) in text" :key="index" class="wave-char wave-text">
              {{ char }}
          </span>

      </h1>
      <div class="flex justify-center flex-row gap-x-4">
        <p class="font-bold">Tools</p>
        <font-awesome-icon class="text-white text-2xl cursor-pointer transition duration-150 ease-in-out hover:scale-[1.2]" :class="showMenu ? 'opacity-80 scale-[1.2]' : ''" icon="fa-solid fa-bars" @click="toggleMenu()"/>
      </div>
    </div>
    <MenuSelect v-show="showMenu" class="absolute right-0 top-18 w-60 z-50"></MenuSelect>
  </div>

</template>

<script setup>
  import { ref } from 'vue';
import MenuSelect from './MenuSelect.vue';
  const text = 'COLORRAGE.';
  const showMenu = ref(false);
  function toggleMenu(){
    showMenu.value = !showMenu.value
  }

</script>

<style scoped>
.wave-text {
  display: inline-flex;
  font-size: 2rem;
  font-weight: bolder;
}

.wave-char {
  display: inline-block;
  animation: wave-animation 2s ease-in-out infinite;
}

.wave-char:nth-child(1) { animation-delay: 0s; }
.wave-char:nth-child(2) { animation-delay: 0.1s; }
.wave-char:nth-child(3) { animation-delay: 0.2s; }
.wave-char:nth-child(4) { animation-delay: 0.3s; }
.wave-char:nth-child(5) { animation-delay: 0.4s; }
.wave-char:nth-child(6) { animation-delay: 0.5s; }
.wave-char:nth-child(7) { animation-delay: 0.6s; }
.wave-char:nth-child(8) { animation-delay: 0.7s; }
.wave-char:nth-child(9) { animation-delay: 0.8s; }
.wave-char:nth-child(10) { animation-delay: 0.9s; }

@keyframes wave-animation {
  0% { transform: translateY(0); }
  50% { transform: translateY(-.3rem); }
  100% { transform: translateY(0); }
}
</style>

