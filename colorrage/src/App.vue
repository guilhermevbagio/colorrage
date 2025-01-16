<template>
  <div class="flex flex-col items-center justify-center w-screen min-w-screen min-h-screen gap-y-8 bg-black overflow-hidden">
      <UpBar />

      <ScreenCarousel :screens="screens" />
  </div>

</template>

<script setup>

import UpBar from './components/UpBar.vue';
import ColorMixer from './assets/views/ColorMixer.vue';
import ScreenCarousel from './components/ScreenCarousel.vue';
import ShadeGen from './assets/views/ShadeGen.vue';
import PalleteGen from './assets/views/PalleteGen.vue';
import AIPalleteGen from './assets/views/AIPalleteGen.vue';

const screens=[ColorMixer, ShadeGen, PalleteGen, AIPalleteGen];

</script>


