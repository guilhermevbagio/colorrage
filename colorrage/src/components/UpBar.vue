<template>
  <div class="fixed top-0 right-0">
    <div  :style="{ color: colors.text, backgroundColor: colors.bg }" class="flex flex-row w-screen items-center justify-between p-4 z-50" >
      <h1 class="text-3xl font-bold flex justify-start tracking-tighter">
        <span v-for="(char, index) in text" :key="index" class="wave-char wave-text">
          {{ char }}
        </span>
      </h1>
      <div class="flex justify-center text-white flex-row gap-x-4">
        <p class="font-bold">tools</p>
        <font-awesome-icon
          class=" text-2xl cursor-pointer transition duration-150 ease-in-out hover:scale-[1.2]"
          :class="showMenu ? 'opacity-80 scale-[1.2]' : ''"
          icon="fa-solid fa-bars"
          @mouseover="showMenuF"
          @mouseleave="hideMenuF(); isHovered = false"
        />
      </div>
    </div>
    <MenuSelect
      v-show="showMenu"
      class="absolute right-0 top-18 w-60 z-50"
      @mouseleave="hideMenuF"
      @mouseenter="showMenuF"
    ></MenuSelect>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import MenuSelect from "./MenuSelect.vue";
  import { useColorsStore } from '../stores/colorstore';

  const colors = useColorsStore();


  const text = "COLORRAGE.";
  const showMenu = ref(false);
  const isHovered = ref(false);

  function showMenuF() {
    showMenu.value = true;
    isHovered.value = true;
  }

  const hideMenuF = async () => {
    await delay(200);
    if (!isHovered.value) {
      showMenu.value = false;
    }
    isHovered.value = false;
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
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

